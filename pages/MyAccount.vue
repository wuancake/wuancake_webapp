<template>
    <div>
        <aside class="wuan_cake_sidebar">
            <div class="wuan_cake_sidebar_left">
                <div class="wuan_cake_info">
                    <img class="wuan_cake_portrait" :src="url"/>
                    <span class="wuan_cake_name" >
                        <!-- 只读昵称 -->
                        <span v-if="isReadOnly">{{ userInfo.userName }}</span>     <!-- 修改昵称 -->
                        <input v-else class="stealth-input" @change="userInput" :value="userInfo.userName"/>
                        <i class="iconfont icon-bianjixiugai-copy" @click="updateUserName"/>
                    </span>
                </div>
                <ul class="wuan_cake_list">
                    <li>
                        <span><i class="point"/>邮箱</span>
                        <span class="info">{{ login.email }}</span>
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
import { quitGroup, updateUserName } from '../api/index.js'
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'sidebar',
    components:{
        'w-modal':WModal,
        'w-input': WInput
    },
    computed:{
        ...mapState('user', {
        userInfo: state => state.userInfo,
        groupDate: state => state.group,
        login: state => state.login
        })
    },
    data(){
        return{
          url:logoUrl,
          showModal:false,
          isReadOnly:true,
        }
    },
    created() {
        this.setTitle('我的账号')
    },
    props:{

    },
    methods:{
        ...mapMutations('user', ['setUserInfo', 'setLogin', 'setTitle']),
        goChnagePassword(){
          this.$router.push({
            path:'change-password'
          })
        },
        showOutGroup(){
            this.showModal = true;
        },
        // 退出分组
        handOutGroup(){
            quitGroup({
                id:this.$store.state.user.userInfo.userId
            }).then(res => {
                if(res.data.infoCode == 200){
                    this.$toast(res.data.infoText)

                    this.showModal = false;
                    // 退出分组返回登录页
                    this.$router.push({
                        path:'/login'
                    })
                }else{
                    this.$toast(res.data.infoText)
                    this.showModal = false;
                    this.$router.push({
                        path:'/login'
                    })
                }
            })
        },
        userInput(event){
          this.$store.state.user.userInfo.userName = event.target.value;
        },
        // 修改昵称
        updateUserName(){
          console.log(this.$store.state.user.login.email)
          if (this.isReadOnly === true) {
              this.isReadOnly = !this.isReadOnly;
              
          } else if(this.isReadOnly === false){
            // debugger
            updateUserName({
                id:this.$store.state.user.userInfo.userId,
                userName:this.$store.state.user.userInfo.userName
            }).then(res => {
                if (res.data.infoCode === 200) {
                    this.$toast(res.data.infoText);
                }else{
                    this.$toast(res.data.infoText);
            }
            })   
            this.isReadOnly = !this.isReadOnly;
          }
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