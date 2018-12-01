<template>
  <div class="my-weeklys">
    <div @click="handleSelectBtn" class="select-week-btn">
      <i class="iconfont">&#xe65a;</i>
      <span class="weeks">{{ nowWeeklyNumber }}周</span>
      <span class="select-icon"></span>
    </div>
    <div class="my-weeklys-main">
      <p>
        <label>{{ statusData[weeklys.status] }}时间：</label>
        <span v-if="weeklys.replyTime">{{ weeklys.replyTime | dealTime }}</span>
      </p>
      <p v-if="weeklys.status === 2">
        <label>本周完成：</label>
        <span>{{ weeklys.complete }}</span>
      </p>
      <p v-if="weeklys.status === 3">
        <label>请假理由：</label>
        <span>{{ weeklys.text }}</span>
      </p>
      <p v-if="weeklys.status === 2">
        <label>所遇问题：</label>
        <span>{{ weeklys.trouble }}</span>
      </p>
      <p v-if="weeklys.status === 2">
        <label>下周计划：</label>
        <span>{{ weeklys.plane }}</span>
      </p>
      <p v-if="weeklys.status === 2">
        <label>作品链接：</label>
        <span v-if="weeklys.url != 'null'"><a :href="weeklys.url">{{ weeklys.url }}</a></span>
      </p>
    </div>
    <w-modal v-model="showModal" title="选择周数">
      <div class="select-weekly-numbers">
        <div @click="handleWeeklySpan" class="select-weeklys-box">
          <span :id="userInfo.currWeek - i + 1" :class="{ 'active': nowWeeklyNumber == (userInfo.currWeek - i + 1) }" v-for="i in userInfo.currWeek" :key="i">{{ userInfo.currWeek - i + 1 }}</span>
        </div>
      </div>
    </w-modal>
  </div>
</template>
<script>
import { fetchWeeklys } from '../api/weekly.js'
import WModal from '../components/WModal'
export default {
  data () {
    return {
      pageNum: 1,
      weeklys: {},
      statusData: ['', '', '提交', '请假'],
      nowWeeklyNumber: 1,
      showModal: false
    }
  },
  components: {
    'w-modal': WModal
  },
  computed: {
    userInfo () {
      return this.$store.state.user.userInfo
    }
  },
  created() {
    this.nowWeeklyNumber = this.userInfo.currWeek
    this.fetchWeeklyData(this.nowWeeklyNumber)
  },
  methods: {
    fetchWeeklyData (weekNum) {
      fetchWeeklys({
        userId: this.userInfo.userId,
        groupId: this.userInfo.groupId,
        pageNum: weekNum,
        weekNum: 1
      }).then(res => {
        if (res.data.infoCode) {
          alert(res.data.infoText)
        } else {
          this.weeklys = res.data.reports[0]
        }
      })
    },
    handleWeeklySpan (event) {
      if (event.target.id) {
        this.nowWeeklyNumber = Number(event.target.id)
        this.handleSelectBtn()
        this.fetchWeeklyData(this.nowWeeklyNumber)
      }
    },
    handleSelectBtn () {
      this.showModal = !this.showModal
    }
  },
  filters: {
    dealTime (time) {
      return `${time.slice(0, 10)} ${time.slice(11, 19)}`
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-weeklys
  width 100%
  box-sizing border-box
  padding 64px 52px 30px 30px
  .select-week-btn
    width 311px
    height 100px
    margin-bottom 99px
    box-sizing border-box
    border 1px solid #adccff
    box-shadow 0 2px 1px 0 #4d156e30 inset, 0 0 3px 0 #4d156e30
    border-radius 50px
    line-height 100px
    text-align center
    font-size 32px
    color #2f94ff
    position relative
    .weeks
      display inline-block
      margin 0 58px 0 18px
    .select-icon
      display inline-block
      border 15px solid #2f94ff
      border-left-color transparent
      border-right-color transparent
      border-bottom-color transparent
      position absolute
      top 50%
      transform translateY(-25%)
  .my-weeklys-main
    font-size 32px
    font-weight bold
    color #555
    > p
      text-align left
      margin-top 0
      margin-bottom 72px
      word-break break-all
      line-height 1.5
      &:last-child
        margin-bottom 0
      > label
        color #2f94ff

.select-weekly-numbers
  font-size 36px
  font-weight bold
  color #555555
  background-color #ffffff
  height 540px
  box-sizing border-box
  overflow hidden
  -webkit-overflow-scrolling touch
  overflow-y scroll
  .select-weeklys-box
    display flex
    flex-direction column
    > span 
      display block
      box-sizing border-box
      width 100%
      text-align center
      height 108px
      line-height 108px
      border-bottom 1px solid #dcdcdc
      &.active
        color #2f94ff
</style>
