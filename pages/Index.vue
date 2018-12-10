<template>
  <div>
    <button @click="goSignUp">注册</button>
    <button @click="goLogin">登录</button>
    <button @click="goGrouping">分组</button>
    <button @click="goMyAccount">我的账号</button>
    <button @click="goChnagePassword">修改密码</button>
    <button @click="showToast">show toast</button>

  <div class="homepage">
    <div class="timeboxout  ball">
      <div class="timeboxmiddle ball">
        <div class="timeboxin">
          <div class="box">
            <div class="percent">
              <p id="prompt1">第<span id="nw"></span>周</p>
              <p id="prompt2">本周剩余时间</p>
              <p id="prompt3">
                <!-- JS获取时间信息 -->

                <span id="days"></span>
                <span id="hours"></span>
                <span id="minutes"></span>
                <span id="seconds"></span>
              </p>
            </div>
            
            <div id="water" class="water ball"> <!-- 最底层水量 -->
            <!-- 后面的水波 -->
              <svg viewBox="0 0 560 20" class="water_wave water_wave_back ball">
                <use xlink:href="#wave"></use>
              </svg>
              <!-- 水波前面的波浪 -->
              <svg viewBox="0 0 560 20" class="water_wave water_wave_front ball">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
        </div>
      </div>
    </div>
 </div>
<!-- SVG波浪瞄点 -->

    <svg version="1.1" 
 x="0px" y="0px" style="display: none;">
            <symbol id="wave">
                <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,
                                27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,
                                31.5-2.7c0,0,0,0,0,0v20H420z"></path>
                <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,
                                6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
                <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,
                                27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,
                                31.5-2.7c0,0,0,0,0,0v20H140z"></path>
                <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,
                                6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
            </symbol>
      </svg>
</div>


    <div class="count-down">
      <p v-if="userInfo.groupId" class="count-down-info">{{ groupDate[userInfo.groupId - 1].groupName }}：{{ userInfo.userName }}</p>
    </div>
    <div class="btns">
      <button v-if="userInfo.status == 1" @click="goSubmitWeekly" class="push-btn">提交周报</button>
      <button v-if="userInfo.status == 1" @click="goLeave" class="push-btn">我要请假</button>
      <button v-if="userInfo.status == 2 || userInfo.status == 3" @click="myWeekly" class="push-btn">我的周报</button>
      <button v-if="userInfo.status == 3" @click="cancelLeave" class="push-btn">取消请假</button>
    </div>
  </div>
</template>

<script>
import { findAllGroupInfo, queryMain, cancelLeave } from '../api/index.js'
import { ball } from '../store/ball.js';
import { mapMutations, mapState } from 'vuex';
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo,
      groupDate: state => state.group
    })
  },
  created() {
    this.setTitle('午安煎饼计划')
  },
  beforeMount() {
    if (this.userInfo.userId && this.groupDate.length > 0) {
      this.getGroupDate()
      this.getMainData()
    } else {
      this.$router.push({
        path: '/login'
      })
    }
  },
  methods: {
    ...mapMutations('user', ['setGroup', 'setUserInfo', 'setTitle']),
    goSignUp () {
      this.$router.push({
        path: '/sign-up'
      })
    },
    goLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    goGrouping () {
      this.$router.push({
        path: '/grouping'
      })
    },
    goMyAccount () {
      this.$router.push({
        path: '/my-account'
      })
    },
    goChnagePassword () {
      this.$router.push({
        path: '/change-password'
      })
    },
    goSelectGroup () {
      this.$router.push({
        path: '/select-group'
      })
    },
    goSubmitWeekly () {
      this.$router.push({
        path: '/submit-weekly'
      })
    },
    goLeave () {
      this.$router.push({
        path: '/leave'
      })
    },
    cancelLeave () {
      cancelLeave({
        userId: this.userInfo.userId,
        groupId: this.userInfo.groupId
      }).then(res => {
        if (res.data.infoCode != 200) {
          this.$toast(res.data.infoText)
        } else {
          this.setUserInfo({
            status: 1
          })
          this.$toast(res.data.infoText)
        }
      })
    },
    getGroupDate () {
      findAllGroupInfo().then(res => {
        if(res.data.infoCode == 200){
          this.groups = res.data.groups
          this.setGroup(res.data.groups)
        }
      })
    },
    getMainData () {
      queryMain({
        userId: this.userInfo.userId
      }).then(res => {
        if (res.data.infoCode != 200) {
          this.$toast(res.data.infoText)
        } else {
          this.setUserInfo({ status: res.data.status })
        }
      })
    },
    myWeekly () {
      this.$router.push({
        path: '/my-weeklys'
      })
    },
    showToast () {
      this.$toast('show toast show toast show toast show toast show toast show toast show toast ')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

pushBtn()

.btns
  button
    outline none
    &:nth-child(odd)
      background-color #1987fc
      margin-bottom 40px
    &:nth-child(even)
      background-color #fff
      box-sizing border-box
      border 1px solid #3e9cff
      color #2f94ff

.count-down-info
  font-size 28px
  color #828282


.homepage .box{
      width: 56%;
      height: 100%;
      /*ackground-color: #f2f2f2;*/  /*球体内部背景色*/
}
      
      
.homepage .timeboxout{
      width: 11.5625rem;
      height: 11.5625rem;
      box-sizing: border-box;
      border: 1px solid #2edb75;
      border-radius: 50%;
      position: relative;
      margin-left: auto;margin-right: auto;
      margin-bottom: 1rem;
}

.homepage .timeboxmiddle{
      width: 10.9375rem;height: 10.9375rem;
      box-sizing: border-box;
      background: -webkit-linear-gradient(top,#ffffff,#f8cd51);
      border-radius: 50%;
      position: absolute;
      top: 50%;left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
}

.homepage .timeboxin{
      background-color: #ffffff;
      width: 10.875rem;height: 10.875rem;
      box-sizing: border-box;
      border-radius: 50%;
      position: absolute;
      top: 50%;left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
}
     

.homepage .box {
    height: 10.875rem;
    width: 10.875rem;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 100%;
    overflow: hidden;
}
.homepage .box .percent {
   text-align: center;
   color: black;
   margin-top: 2.03125rem;
   z-index: 3;
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   height: 100%;width: 100%;
}
/*.homepage p{margin-bottom: 0.5625rem;}*/
#prompt1{
      font-size: 1.1875rem;
}
#prompt2{
      font-size: 0.8125rem;
}
#prompt3{
      font-size: 1.125rem;
}
.homepage .box .water {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      -webkit-transform: translate(0, 100%);
      transform: translate(0, 100%);
      background: #2edb75;
}

.homepage .box .water_wave {
      width: 200%;
      position: absolute;
      bottom: 100%;
}
.homepage .box .water_wave_back {               /*后面的波纹*/
      right: 0;
      fill: #7befaa;
      -webkit-animation: wave-back 1.4s infinite linear;
      animation: wave-back 1.4s infinite linear;
}
.homepage .box .water_wave_front {              /*前面的波纹*/
      left: 0;
      fill: #2edb75;
      margin-bottom: -1px;
      -webkit-animation: wave-front .7s infinite linear;
      animation: wave-front .7s infinite linear;
}

/*是波浪匀速移动*/

@-webkit-keyframes wave-front {
      100% {
            -webkit-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
      }
}
@keyframes wave-front {
      100% {
            -webkit-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
      }
}
@-webkit-keyframes wave-back {
      100% {
            -webkit-transform: translate(50%, 0);
            transform: translate(50%, 0);
      }
}
@keyframes wave-back {
      100% {
            -webkit-transform: translate(50%, 0);
            transform: translate(50%, 0);
      }
}
</style>
