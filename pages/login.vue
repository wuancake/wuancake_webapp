<template>
  <div class="login-page">
    <img class="login-img" v-if="url" :src="url" alt="">
    <div class="login-img img-info" v-else>LOGO</div>
    <div class="form-items">
      <div class="form-item">
        <w-input class="radius-input input-email-label" :style="verificationEamil ? setMargin : ''" :value="email" :verification="isVerificationEmail" @on-blur="emailInput" placeholder="输入电子邮箱"></w-input>
        <p v-if="verificationEamil === 1">邮箱地址是必填项</p>
        <p v-if="verificationEamil === 2">邮箱地址格式错误</p>
      </div>
      <div class="form-item">
        <w-input class="radius-input input-password-label" :style="verificationPassword ? setMargin : ''" :value="password" type="password" :verification="isVerificationPassword" @on-blur="passwordInput" placeholder="输入登录密码"></w-input>
        <p v-if="verificationPassword === 1">登录密码不能为空</p>
      </div>
    </div>

    <div class="login-btns">
      <button @click="goSignUp" class="login-btn login-btn-item">注册</button>
      <button @click="toLogin" class="login-btn login-btn-item">登录</button>
    </div>
    <button @click="goForgetPassword" class="login-btn login-btn-footer">忘记密码？</button>
  </div>
</template>

<script>
import WInput from '../components/WInput'
import logoUrl from '../static/img/logo.jpg'
import { login, findAllGroupInfo } from '../api/index.js'
import { mapMutations } from 'vuex';
export default {
  components: {
    'w-input': WInput
  },
  data() {
    return {
      url: logoUrl,
      email: '',
      password: '',
      deal: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$',
      emailOk: false,
      isVerificationEmail: true,
      isVerificationPassword: true,
      verificationEamil: 0,
      verificationPassword: 0,
      setMargin: {
        'margin-bottom': 0
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setUserInfo', 'setGroup']),
    toLogin () {
      if (this.emailOk && this.password) {
        this.isVerificationEmail = true
        this.isVerificationPassword = true
        this.verificationPassword = 0
        this.verificationEamil = 0
        login({
          email: this.email,
          password: this.password
        }).then(res => {
          console.log(res)
          if (res.data.infoCode != 200) {
            // TODO: 全局消息提醒
            alert(res.data.infoText)
          } else {
            alert(res.data.infoText)
            this.setUserInfo(res.data)
            if (!res.data.groupId) {
              this.$router.push({
                path: '/grouping'
              })
            } else {
              findAllGroupInfo().then(res => {
                if(res.data.infoCode == 200){
                  this.setGroup(res.data.groups)
                  this.$router.push({
                    path: '/'
                  })
                }
              })
            }
          }
        })
      } else {
        if (!this.emailOk || !this.email) {
          this.isVerificationEmail = false
        } else {
          this.isVerificationEmail = true
        }
        if (!this.password) {
          this.isVerificationPassword = false
        } else {
          this.isVerificationPassword = true
        }
        if (!this.email) {
          this.verificationEamil = 1
        }
        if (!this.emailOk) {
          this.verificationEamil = 2
        }
        if (!this.password) {
          this.verificationPassword = 1
        }
      }
    },
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
    passwordInput (event) {
      if (event.target.value) {
        this.password = event.target.value
      }
    },
    goSignUp () {
      this.$router.push({
        path: '/sign-up'
      })
    },
    goForgetPassword () {
      this.$router.push({
        path: '/forget-password'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

.login-page
  pageFlexCenter()
  pageTopGap()

  .login-img
    width 200px
    height 200px
    box-shadow 0 2px 1px 0 #4d156e30 inset, 0 0 3px 0 #4d156e30
    border 1px solid #4285f4
    margin-bottom 49px

  .img-info
    text-align center
    line-height 200px

  .login-bnts
    width 100%
    outline none
    pageFlexCenter()

.login-btn
  width 260px
  height 84px
  text-align center
  line-height 84px
  box-sizing border-box
  font-size 34px
  border 0

.login-btn-item
  border-radius 42px
  &:first-child
    border 1px solid $input-primaryLightBLue
    box-shadow 0 2px 1px 0 #4d156e30 inset, 0 0 3px 0 #4d156e30
    background #ffffff
    color $input-primaryDeepSkyBlue
  &:last-child
    background $input-primaryDeepSkyBlue
    color #ffffff

.login-btn-footer
  background transparent
  color $input-primaryDeepSkyBlue
  font-size 32px
  position absolute
  bottom 10px
  right 0

.form-radius
  radiusInput()

// .form-items

.form-item
  position relative
  margin-bottom ($input-bottomGap * 1.5)
  &:last-child
    margin-bottom ($input-bottomGap*3)
  p
    margin 0
    position absolute
    font-size 12px
    color red
    height ($input-bottomGap * 1.5)
    line-height ($input-bottomGap * 1.5)
    box-sizing border-box
    padding-left 40px
</style>
