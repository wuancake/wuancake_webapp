<template>
    <div>
        <aside class="wuan_cake_sidebar">
            <div class="wuan_cake_sidebar_left">
                <div class="wuan_cake_info">
                    <img class="wuan_cake_portrait" :src="url"/>
                    <span v-if="update" class="wuan_cake_name" >
                        {{ userInfo.userName }}
                        <i class="iconfont icon-bianjixiugai-copy" @click="updateUserName"/>
                    </span>
                    <span v-else class="wuan_cake_name" >
                        <!-- <input :value="userInfo.userName"/> -->
                        <w-input :value="user.username" @on-blur="userInput"></w-input>
                        <i class="iconfont icon-bianjixiugai-copy" @click="changeUserName"/>
                    </span>
                </div>
                <ul class="wuan_cake_list">
                    <li>
                        <span><i class="point"/>邮箱</span>
                        <span class="info"></span>
                    </li>
                    <li>
                        <span><i class="point"/>分组</span>
                        <span class="info">{{ userInfo.groupName }}</span>
                    </li>
                    <li>
                        <span><i class="point"/>修改密码</span>
                        <span class="info"><i class="iconfont icon-xiangyou-copy" @click="goChnagePassword"/></span>
                    </li>
                </ul>
                <div class="login-btns">
                    <button class="login-btn login-btn-item" @click="showOutGroup">退出分组</button>

                </div>
            </div>
        <!-- 退出分组 -->
        <w-modal v-model="showModal" title="退出分组">
            <div class="modal-content">
                <p>退出分组后，该账号首次登录，即可重选分组；当然，如果你一直不回来，账号也会为你保留；</p>
                <p>总之，欢迎你在试错的过程中找到最适合自己的方向~</p>
                 <div class="login-btns">
                    <button class="login-btn login-btn-item" @click="handOutGroup">我知道了，继续退出</button>
                </div>
            </div>
        </w-modal>
        </aside>
    </div>
</template>

<script>
import WInput from '../components/WInput'
import WModal from '../components/WModal'
import logoUrl from '../static/img/logo.jpg'
import { quitGroup } from '../api/index.js'
import { mapMutations } from 'vuex';

export default {
    name: 'sidebar',
    components:{
        'w-modal':WModal,
        'w-input': WInput
    },
    computed: {
      userInfo () {
        return this.$store.state.user.userInfo
      },
    },
    data(){
        return{
          url:logoUrl,
          showModal:false,
          update:true,
        }
    },
    props:{

    },
    methods:{
        goChnagePassword(){
          console.log(this.$store.state.user.userInfo)
          console.log(this.$store.state.user.group)
          console.log(this.$store.state.user)
          // this.$router.push({
          //   path:'change-password'
          // })
        },
        showOutGroup(){
            this.showModal = true;
        },
        ...mapMutations('user', ['setUserInfo']),
        handOutGroup(){
            quitGroup({
                id:this.$store.state.user.userInfo.userId
            }).then(res => {
                if(res.data.infoCode == 200){
                    alert(res.data.infoText)
                    debugger
                    console.log(this.$store.state.user.group,11111)
                    this.showModal = false;
                    // 退出分组返回登录页
                    this.$router.push({
                        path:'/login'
                    })
                }else{
                    alert(res.data.infoText)
                    this.showModal = false;
                    this.$router.push({
                        path:'/login'
                    })
                }
            })
        },
        userInput(event){
          this.$store.state.user.userInfo.userName = event.target.value;
          console.log(this.user.username)
        },
        updateUserName(){
          this.update = !this.update
        },
        changeUserName(){

          updateUserName({
            id:this.$store.state.user.userInfo.userId,
            userName:userInfo.userName
          }).then(res => {
            if (res.data.infoCode === 200) {
              alert(res.data.infoText);
              console.log(userInfo.userName,111)
            }else{
              alert(res.data.infoText);
              console.log(userInfo.userName,222)
            }
          })   
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

.modal-content
    padding 50px 60px 70px
    background-color #fff
    text-align left

    & p
        line-height 60px
        text-indent:2em

.login-btns
    padding-top  30px



.iconfont.icon-bianjixiugai-copy
    color #2f94ff

.info
    color #9f9f9f

.login-btns
    text-align center
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

.point
    display inline-block
    margin-right 10px;
    point(#7abafe,20px)

.wuan_cake_sidebar

    .wuan_cake_sidebar_left
        text-align left 
        width 100%
        height 100%
        background-color #fff
        padding 70px 30px 0
        
        .wuan_cake_portrait
            portrait()
            margin-right 35px
            margin-bottom 25px

.wuan_cake_info
    font-size   32px
    color #222222
    pageFlexCenter(alignItems = center,justifyContent = start)

.wuan_cake_list
    margin-bottom  190px
    color #555555

    li
       font-size 30px
       height 90px
       line-height 90px
       width 100%
       border-bottom 1px solid #f4f4f4
       display inline-flex
       justify-content space-between

.wuan_btn_abort
    height 70px
    line-height 70px
    padding 0 100px
    border 1px solid #f27a7a
    background-color #fff
    color #ff5b5b
    border-radius 4px

</style>