<template>
  <div class="submit-weekly">
    <div class="submit-weekly-item">
      <label>{{ groupDate[userInfo.groupId - 1].groupName }}：</label>
      <span>{{ userInfo.userName }}</span>
    </div>
    <div class="submit-weekly-item">
      <label>当前周数：</label>
      <span>{{ userInfo.currWeek }}周</span>
    </div>
    <div class="submit-weekly-item">
      <label>报告状态：</label>
      <span class="submit-weekly-item-info">{{ statusData[userInfo.status] }}</span>
    </div>
    <div class="submit-weekly-item">
      <label>本周完成（必填）：</label>
      <textarea v-model="complete" class="input-common-style" />
    </div>
    <div class="submit-weekly-item">
      <label>所遇问题（必填）：</label>
      <textarea v-model="trouble" class="input-common-style" />
    </div>
    <div class="submit-weekly-item">
      <label>下周计划（必填）：</label>
      <textarea v-model="plane" class="input-common-style" />
    </div>
    <div class="submit-weekly-item">
      <label>作品链接：</label>
      <input v-model="link" class="input-common-style" type="text" />
    </div>
    <button @click="submit" class="push-btn">提交周报</button>
  </div>
</template>
<script>
import { submitWeekly } from '../api/weekly.js'
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      complete: '',
      trouble: '',
      plane: '',
      link: '',
      statusData: ['', '未提交', '已提交', '已请假']
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    },
    groupDate () {
      return this.$store.state.user.group
    }
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    submit () {
      let checkValue = this.check()
      if (checkValue) {
        submitWeekly({
          complete: this.complete,
          trouble: this.trouble,
          plane: this.plane,
          link: this.link,
          userId: this.$store.state.user.userInfo.userId,
          groupId: this.$store.state.user.userInfo.groupId
        }).then(res => {
          console.log(res)
          if (res.data.infoCode != 200) {
            this.$toast(res.data.infoText)
          } else {
            this.$toast(res.data.infoText)
            this.setUserInfo({ status: 2 })
            this.$router.push({
              path: '/'
            })
          }
        })
      }
    },
    check () {
      if (this.complete && this.trouble && this.plane) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'
pushBtn()

.submit-weekly
  padding 48px 29px
  width 100%
  box-sizing border-box
  font-size 32px
  font-weight bold
  overflow auto
  -webkit-overflow-scrolling touch
  .submit-weekly-item
    width 100%
    margin-bottom 47px
    text-align left
    label
      color #2f94ff
    span
      color #555555
      &.submit-weekly-item-info
        color #fe0000
    textarea
      height 180px
    input
      height 80px

.input-common-style
  display block
  margin-top 19px
  border 1px solid #adccff
  border-radius 6px
  box-shadow 0 2px 1px 0 #4d156e30 inset, 0 0 3px 0 #4d156e30
  width 100%
  outline none
  resize none
</style>
