<template>
  <div class="forget-password">
    <p>忘记密码？</p>
    <div class="forget-form">
      <w-input placeholder="注册的电子邮箱" :value="email" @on-blur="emailInput" :verification="isVerificationEmail"></w-input>
      <p v-if="verificationEamil === 2">邮箱地址格式不正确</p>
      <p v-if="verificationEamil === 1">邮箱地址是必填项</p>
    </div>
    <button class="push-btn" @click="push">提交</button>
    <p>提交后我们将修改密码的地址以邮件的形式发送到您的邮箱中，请注意查收！</p>
    <button @click="toLogin" class="footer-btn">已有账号？点击登录</button>
  </div>
</template>

<script>
import WInput from '../components/WInput'
import { pushEmail } from '../api/index.js'
export default {
  components: {
    'w-input': WInput
  },
  data () {
    return {
      verificationEamil: 0,
      isVerificationEmail: true,
      email: '',
      emailOk: false,
      deal: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$'
    }
  },
  methods: {
    emailInput (event) {
      let a = new RegExp(this.deal)
      if (event.target.value) {
        this.email = event.target.value
        if (a.test(this.email)) {
          this.emailOk = true
        } else {
          this.emailOk = false
        }
      }
    },
    push () {
      if (this.emailOk && this.email) {
        this.isVerificationEmail = true
        pushEmail({
          userid: 1,
          email: this.email
        }).then(res => {
          console.log(res)
          if (res.data.infoCode === 200) {

          }
        })
      } else {
        this.isVerificationEmail = false
        if (!this.emailOk) {
          this.verificationEamil = 2
        }
        if (!this.email) {
          this.verificationEamil = 1
        }
      }
    },
    toLogin () {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

p
  margin 0

button
  border 0
  padding 0

.forget-password
  position relative
  width 100%
  box-sizing border-box
  padding 0 60px
  > p:first-child
    font-size 38px
    color #222
    text-align center
    margin-top 123px
    margin-bottom 56px
  
  > p:last-child
    font-size 28px
    color #828282
    line-height 31px
  
  .forget-form
    position relative
    width min-content
    margin 0 auto 58px
    p
      position absolute
      font-size 12px
      color red
      padding-left 40px
      height ($input-bottomGap * 1.5)
      line-height ($input-bottomGap * 1.5)
      box-sizing border-box

.push-btn
  font-size 38px
  color #ffffff
  text-align center
  width $input-widthColumn
  height 84px
  line-height 84px
  border-radius 42px
  background $input-primaryLightBLue
  display block
  box-sizing border-box
  margin 0 auto 56px

.footer-btn
  color $input-primaryDeepSkyBlue
  font-size 32px
  position absolute
  bottom 27px
  right 32px
  background transparent
</style>
