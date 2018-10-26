<template>
  <div class="signup-page">
    <!-- 椭圆表单 begin -->
    <div class="form-radius">
      <w-input :value="username" :verification="isVerification.userName" class="radius-input"  placeholder="输入账号"></w-input>

      <w-input :value="email" :verification="isVerification.Email" class="radius-input"  @on-blur="emailInput" placeholder="输入电子邮箱"></w-input>
      <p v-if="verification.Eamil === 1">邮箱地址是必填项</p>
      <p v-if="verification.Eamil === 2">邮箱地址格式错误</p>

      <w-input :value="QQ" :verification="isVerification.QQ" class="radius-input" @on-blur="qqInput"   placeholder="输入QQ"></w-input>
      <p v-if="verification.QQ === 2">QQ格式错误</p>

      <w-input :value="password" type="password" :verification="isVerification.Password"   class="radius-input" @on-blur="passwordInput" placeholder="输入密码"></w-input>

      <!-- <w-input :value="user.passwordT" type="password" :verification="isVerification.PasswordT"   class="radius-input" @on-blur="passwordInput" placeholder="确认密码"></w-input> -->
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
        username:'',
        email:'',
        QQ:'',
        password:'',
        passwordT:'',
      },
        isVerification:{
        UserName:true,
        Email:true,
        QQ:true,
        Password:true,
        PasswordT:true,
      },
      verification:{
        UserName:0,
        Email:0,
        QQ:0,
        Password:0,
        PasswordT:0,
      },
      deal:{ 
        Email: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$',
        QQ:'^[0-9]*$'
      }
    }
  },
  methods:{
    ...mapMutations('user', ['setUserInfo']),
    
    getSignUp() {
      if (condition) {
        
      } else {
        
      }
      // 注册
      signup({
        userName: this.user.username,
        email: this.user.email,
        qq:this.user.QQ,
        password:this.user.password
      }).then(res =>{
        console.log(res)
        if(res.data.infoCode === 200){
          this.setUserInfo(res.data)
          alert(res.data.infoText)
        }
        else if(res.data.infoCode === 500){
          alert(res.data.infoText)
        }
        else{
          this.setUserInfo(res.data)
          alert("注册失败")
        }
      })

      this.$router.push({
        // path: '/login'
      })
    },
    accountInput(){
      user.account = true;
    },
    // 电子邮箱验证
    emailInput(event) {
      let a = new RegExp(this.deal.Email);
      this.user.email = event.target.value;
      if(event.target.value) {
    
        if(a.test(this.user.email)) {
          this.verification.Email = 0;
          this.isVerification.Email = true;
          console.log(this.user.email,this.verification.Email,111)
        }
        else{
          this.verification.Email = 2;
          this.isVerification.Email = false;
          console.log(this.user.email,this.verification.Email,222)
        }
      }
      else{
        console.log(this.user.email,this.verification.Email,0)
      }
    },
    // QQ验证
    qqInput(event){
      let a = new RegExp(this.deal.QQ);
      this.user.QQ = event.targt.value;
      if(event.target.value) {
    
        if(a.test(this.user.QQ)) {
          this.verification.QQ = 0;
          this.isVerification.QQ = true;
          console.log(this.user.QQ,this.verification.QQ,111)
        }
        else{
          this.verification.QQ = 2;
          this.isVerification.QQ = false;
          console.log(this.user.QQ,this.verification.QQ,222)
        }
      }
      else{
        console.log(this.user.email,this.verification.Email,0)
      }
    },
    passwordInput(event) {
      if (event.target.value) {
        this.password = event.target.value;
      }
    },
    goLogin(){

      if(this.user.email === "" || this.user.email === null){
          this.verification.Email = 1;
          console.log(this.verification.Email)
          console.log(this.user.email,1111)
      }


      this.$router.push({
        // path:'/login'
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

