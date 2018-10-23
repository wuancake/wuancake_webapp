<template>
  <div class="login-page">
    <img class="login-img" v-if="url" :src="url" alt="">
    <div class="login-img img-info" v-else>LOGO</div>
    <w-input :value="email" :verification="isVerificationEmail" @on-blur="emailInput" placeholder="输入电子邮箱"></w-input>
    <w-input :value="password" type="password" :verification="isVerificationPassword" @on-blur="passwordInput" class="login-input" placeholder="输入登录密码"></w-input>
    <div class="login-btns">
      <button @click="goSignUp" class="login-btn login-btn-item">注册</button>
      <button @click="toLogin" class="login-btn login-btn-item">登录</button>
    </div>
    <button class="login-btn login-btn-footer">忘记密码？</button>
  </div>
</template>

<script>
import WInput from '../components/WInput'
import logoUrl from '../static/img/1.jpg'
import { login } from '../api/index.js'
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
      isVerificationPassword: true
    }
  },
  methods: {
    ...mapMutations('user', ['setUserInfo']),
    toLogin () {
      if (this.emailOk && this.password) {
        this.isVerificationEmail = true
        this.isVerificationPassword = true
        login({
          email: this.email,
          password: this.password
        }).then(res => {
          console.log(res)
          if (res.data.infoCode != 200) {
            // TODO: 全局消息提醒
            alert(res.data.infoText)
          } else {
            this.setUserInfo(res.data)
            this.$router.push({
              path: '/'
            })
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-page
  width 100%
  display flex
  flex-direction column
  align-items center
  padding-top 88px
  position relative

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
    display flex
    justify-content center
    align-items center

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
    border 1px solid #7abafe
    box-shadow 0 2px 1px 0 #4d156e30 inset, 0 0 3px 0 #4d156e30
    background #ffffff
    color #1987fc
  &:last-child
    background #1987fc
    color #ffffff

.login-btn-footer
  background transparent
  color #1987fc
  font-size 32px
  position absolute
  bottom 10px
  right 0

.login-input
  margin-top 24px
  margin-bottom 66px
</style>
