<template>
  <div class="leave">
    <div class="leave-item">
      <label>{{ groupDate[userInfo.groupId - 1].groupName }}：</label>
      <span>{{ userInfo.userName }}</span>
    </div>
    <div class="leave-item">
      <label>当前周数：</label>
      <span>{{ userInfo.currWeek }}周</span>
    </div>
    <div class="leave-item">
      <label>报告状态：</label>
      <span class="leave-item-info">{{ statusData[userInfo.status] }}</span>
    </div>
    <div class="leave-item">
      <label>请假周数：</label>
      <div @click="selectWeekNumber">
        <span id="1" class="input-common-style leave-week-number" :class="{ 'active': selectValue == 1 }">一周</span>
        <span id="2" class="input-common-style leave-week-number" :class="{ 'active': selectValue == 2 }">二周</span>
        <span id="3" class="input-common-style leave-week-number" :class="{ 'active': selectValue == 3 }">三周</span>
      </div>
    </div>
    <div class="leave-item">
      <label>请假理由（必填）：</label>
      <textarea v-model="reason" class="input-common-style" />
    </div>
    <button @click="submit" class="push-btn">提交请假申请</button>
  </div>
</template>
<script>
import { leave } from '../api/index.js'
import { mapMutations } from 'vuex';
export default {
  data () {
    return {
      reason: '',
      statusData: ['', '未提交', '已提交', '已请假'],
      selectValue: null
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
        leave({
          complete: this.complete,
          weekNum: this.$store.state.user.userInfo.currWeek,
          reason: this.reason,
          userId: this.$store.state.user.userInfo.userId,
          groupId: this.$store.state.user.userInfo.groupId
        }).then(res => {
          if (res.data.infoCode != 200) {
            alert(res.data.infoText)
          } else {
            this.setUserInfo({ status: 3 })
            this.$router.push({
              path: '/'
            })
          }
        })
      }
    },
    check () {
      if (this.reason) {
        return true
      }
      return false
    },
    selectWeekNumber (event) {
      this.selectValue = event.target.id
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'
pushBtn()

.leave
  padding 48px 29px
  width 100%
  box-sizing border-box
  font-size 32px
  font-weight bold
  .leave-item
    width 100%
    margin-bottom 47px
    text-align left
    label
      color #2f94ff
    span
      color #555555
      &.leave-item-info
        color #fe0000
      &.leave-week-number
        color #3d9bff
      &.active
        color #fff
        background-color #3d9bff
    textarea
      height 180px
      width 100%
    input
      height 80px
      width 100%
    div
      display inline-block

.input-common-style
  display block
  margin-top 19px
  border 1px solid #adccff
  border-radius 6px
  box-shadow 0 2px 1px 0 #4d156e30 inset, 0 0 3px 0 #4d156e30
  outline none
  resize none
.leave-week-number
  display inline-block
  font-size 30px
  border 1px solid #3d9bff
  border-radius 3px
  box-sizing border-box
  width 88px
  height 40px
  line-height 40px
  text-align center
  margin-right 30px
  &:last-child
    margin-right 0
</style>
