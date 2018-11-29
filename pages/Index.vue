<template>
  <div>
    <button @click="goSignUp">注册</button>
    <button @click="goLogin">登录</button>
    <button @click="goGrouping">分组</button>
    <button @click="goChnagePassword">修改密码</button>
    <div class="count-down">
      <p class="count-down-info">{{ groupDate[userInfo.groupId - 1].groupName }}：{{ userInfo.userName }}</p>
    </div>
    <div class="btns">
      <button @click="goSubmitWeekly" class="push-btn">提交周报</button>
      <button @click="goLeave" class="push-btn">我要请假</button>
    </div>
  </div>
</template>

<script>
import { findAllGroupInfo, queryMain } from '../api/index.js'
import { mapMutations } from 'vuex';
export default {
  data () {
    return {}
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    },
    groupDate () {
      return this.$store.state.user.group
    }
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
    ...mapMutations('user', ['setGroup', 'setUserInfo']),
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
          alert(res.data.infoText)
        } else {
          this.setUserInfo({ status: res.data.status })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

pushBtn()

.btns
  button
    &:first-child
      background-color #1987fc
      margin-bottom 40px
    &:last-child
      background-color #fff
      box-sizing border-box
      border 1px solid #3e9cff
      color #2f94ff

.count-down-info
  font-size 28px
  color #828282
</style>
