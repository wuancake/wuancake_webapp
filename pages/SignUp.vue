<template>
  <div class="signup-page">
    <!-- 椭圆表单 begin -->
    <div class="form-radius">
      <w-input :value="user.account" :verification="isVerification.Account" class="radius-input" @on-blur="accountInput" placeholder="输入账号"></w-input>
      <w-input :value="user.email" :verification="isVerification.Email" class="radius-input"  @on-blur="emailInput" placeholder="输入电子邮箱"></w-input>
      <w-input :value="user.QQ" :verification="isVerification.QQ" class="radius-input" @on-blur="qqInput"   placeholder="输入QQ"></w-input>
      <w-input :value="user.password" type="password" :verification="isVerification.Password"   class="radius-input" @on-blur="passwordInput" placeholder="输入密码"></w-input>
      <w-input :value="user.passwordT" type="password" :verification="isVerification.PasswordT"   class="radius-input" @on-blur="passwordTInput" placeholder="确认密码"></w-input>
    </div>
    <!-- 椭圆表单 end -->

    <div class="login-btns">
      <button @click="getSignUp" class="login-btn login-btn-item">注册</button>
    </div>
    <button class="login-btn login-btn-footer" @click="goLogin">已有账号？点击登录</button>
  </div>
</template>

<script>
import WInput from '../components/WInput'
import { signup } from '../api/index.js'
import { mapMutations } from 'vuex';

export default {
  components:{
    'w-input': WInput
  },
  data () {
    return {
      user:{
        account:'',
        email:'',
        QQ:'',
        password:'',
        passwordT:''
      },
      isVerification:{
        Account:true,
        Email:true,
        QQ:true,
        Password:true,
        PasswordT:true
      }
    }
  },
  methods:{

    getSignUp() {
      // 注册
     
      signup({
        userName: this.user.account,
        email: this.user.email,
        qq:this.user.QQ,
        password:this.user.password
      }).then(res =>{
         debugger
        if(res.data.infoCode === 200){
          alert(res.data.infoText)
        }
        else if(res.data.infoCode === 500){
          alert(res.data.infoText)
        }
        else{
          alert("注册失败")
        }
      })

      this.$router.push({
        // path: '/login'
      })
    },
    accountInput(){
      console.log(user.account);
    },
    emailInput(){
      console.log(user.account);
    },
    qqInput(){
      // console.log('qqInput');
    },
    passwordInput(){
      // console.log('passwordInput');
    },
    passwordTInput(){
      // console.log('passwordTInput');
    },
    goLogin(){
      this.$router.push({
        path:'/login'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

.signup-page
  pageFlexCenter()
  pageTopGap()

.login-btn
  width: 540px
  height 84px
  text-align center
  line-height 84px
  box-sizing border-box
  font-size 34px
  border 0

.login-btn-item
  border-radius 42px
  &:last-child
    background  $input-primaryLightBLue
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

</style>

