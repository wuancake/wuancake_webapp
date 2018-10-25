<template>
  <div class="change-password">
    <div class="form-items">
      <div class="form-item">
        <w-input placeholder="输入原密码" :value="password" type="password" @on-blur="passwordInput" :verification="isVerificationPassword"></w-input>
        <p v-if="verificationPassword === 1" class="input-label">原密码是必输项</p>
      </div>
      <div class="form-item">
        <w-input placeholder="输入新密码" :value="newPassword" type="password" @on-blur="newPasswordInput" :verification="isVerificationNewPassword"></w-input>
        <p v-if="verificationNewPassword === 1" class="input-label">新密码是必输项</p>
      </div>
      <div class="form-item">
        <w-input placeholder="再输一遍新密码" :value="confirmPasswd" type="password" @on-blur="confirmPasswdInput" :verification="isVerificationConfirmPassword"></w-input>
        <p v-if="verificationConfirmPassword === 1" class="input-label">验证新密码是必输项</p>
        <p v-if="verificationConfirmPassword === 2" class="input-label">两项密码不一致</p>
      </div>
      <button @click="push" class="push-btn">提交</button>
    </div>
  </div>
</template>

<script>
import WInput from '../components/WInput'
import { changePassword } from '../api/index.js'
import { mapState } from 'vuex'
export default {
  components: {
    'w-input': WInput
  },
  data () {
    return {
      password: '', // 旧密码
      newPassword: '', // 新密码
      confirmPasswd: '', // 确认新密码
      isVerificationPassword: true,
      isVerificationNewPassword: true,
      isVerificationConfirmPassword: true,
      verificationPassword: 0,
      verificationNewPassword: 0,
      verificationConfirmPassword: 0,
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    push () {
      this.init()
      if (this.password && this.newPassword && this.confirmPasswd && this.newPassword === this.confirmPasswd) {
        changePassword({
          userId: this.userInfo.userId,
          password: this.password,
          newPassword: this.newPassword,
          confirmPasswd: this.confirmPasswd
        }).then(res => {
          console.log(res)
          if (res.data.infoCode == 200) {
            alert(res.data.infoText)
            this.$router.push({
              path: '/login'
            })
          } else {
            alert(res.data.infoText)
          }
        })
      } else {
        if (!this.password) {
          this.verificationPassword = 1
          this.isVerificationPassword = false
        }
        if (!this.newPassword) {
          this.verificationNewPassword = 1
          this.isVerificationNewPassword = false
        }
        if (!this.confirmPasswd) {
          this.verificationConfirmPassword = 1
          this.isVerificationConfirmPassword = false
        } else if (this.newPassword !== this.confirmPasswd) {
          this.verificationConfirmPassword = 2
          this.isVerificationConfirmPassword = false
        }
      }
    },
    init () {
      this.isVerificationPassword = true
      this.isVerificationNewPassword = true
      this.isVerificationConfirmPassword = true
      this.verificationPassword = 0
      this.verificationNewPassword = 0
      this.verificationConfirmPassword = 0
    },
    passwordInput (event) {
      if (event.target.value) {
        this.password = event.target.value
      }
    },
    newPasswordInput (event) {
      if (event.target.value) {
        this.newPassword = event.target.value
      }
    },
    confirmPasswdInput (event) {
      if (event.target.value) {
        this.confirmPasswd = event.target.value
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

inputLabel()
pushBtn()

.form-items
  margin-top 112px

.form-item
  position relative
  width min-content
  margin 0 auto
  margin-bottom ($input-bottomGap * 2)
</style>
