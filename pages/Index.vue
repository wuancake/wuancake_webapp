<template>
  <div>
    <!-- <button @click="goSignUp">注册</button>
    <button @click="goLogin">登录</button>
    <button @click="goGrouping">分组</button>
    <button @click="goMyAccount">我的账号</button>
    <button @click="goChnagePassword">修改密码</button>
    <button @click="showToast">show toast</button> -->

    <w-ball 
      :type="ball.type" 
      :isCountdown="ball.isCountdown" 
      :instructions="ball.instructions"/>

    <div class="count-down">
      <p v-if="userInfo.groupId" class="count-down-info">{{ userInfo.groupName }}：{{ userInfo.userName }}</p>
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
import { mapMutations, mapState } from 'vuex';
import WBall from '../components/WBall';
export default {
  data () {
    return {
      ball:{
        type:'w', 
        isCountdown:true,
        instructions:''
      },
      instructions_:['本周剩余时间','本周已提交','本周已请假']
    }
  },
  components:{
    'w-ball':WBall
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.userInfo,
      groupDate: state => state.group
    })
  },
  // 标题
  created() {
    this.setTitle('午安煎饼计划');
  },
  beforeMount() {
    if (this.userInfo.userId) {
      this.getGroupDate();
      this.getMainData();
    }
  },
  mounted(){
    
  },
  methods: {
    ...mapMutations('user', ['setGroup', 'setUserInfo', 'setTitle']),
    // 页面跳转
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
    // 取消请假
    cancelLeave () {
      cancelLeave({
        userId: this.userInfo.userId,
        groupId: this.userInfo.groupId
      }).then(res => {
        if (res.data.infoCode != 200) {
          this.$toast(res.data.infoText);
        } else {
          this.setUserInfo({
            status: 1
          })
          this.$toast(res.data.infoText);
          console.log(this.userInfo.status)
          this.typeJudge(this.userInfo.status);
        }
      })
    },
    // 得到群组信息
    getGroupDate () {
      findAllGroupInfo().then(res => {
        if(res.data.infoCode == 200){
          this.groups = res.data.groups;
          this.setGroup(res.data.groups);
        }
      })
    },
    // 首页
    getMainData(){
      queryMain({
        userId: this.userInfo.userId
      }).then(res => {
        if (res.data.infoCode != 200) {
          this.$toast(res.data.infoText);
        } else {
          // 成功返回状态码：1表示未提交，2表示已提交，3表示已请假 
          this.setUserInfo({ status: res.data.status, currWeek: res.data.weekNum });
          this.typeJudge(res.data.status);
        }
      })
    },
    // 我的周报
    myWeekly () {
      this.$router.push({
        path: '/my-weeklys'
      })
    },
    typeJudge(val){
      switch (val) {
        case 1:
          this.ball.type= "w";
          this.ball.isCountdown=true;
          this.ball.instructions = this.instructions_[0];
          break;

        case 2:
          this.ball.type="complete";
          this.ball.isCountdown=false;
          this.ball.instructions = this.instructions_[1];
          break;

        case 3:
          this.ball.type="leave";
          this.ball.isCountdown=false;
          this.ball.instructions = this.instructions_[2];
        break;
      }
    },
    // 黑色提示框
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
  margin-bottom  50px
  color #828282

.homepage
  margin-top 100px

</style>
