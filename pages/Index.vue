<template>
  <div>
    <button @click="goSignUp">注册</button>
    <button @click="goLogin">登录</button>
    <button @click="goGrouping">分组</button>
    <button @click="goMyAccount">我的账号</button>
    <button @click="goChnagePassword">修改密码</button>
    <button @click="showToast">show toast</button>

    <w-ball/>

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
    return {}
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
  created() {
    this.setTitle('午安煎饼计划')
  },
  beforeMount() {
    if (this.userInfo.userId) {
      this.getGroupDate()
      this.getMainData()
    }
  },
  methods: {
    residueTime(){
      var newtime = new Date();
    },
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

</style>
