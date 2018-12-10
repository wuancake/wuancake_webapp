<template>
    <transition name="fade">
        <div>
            <aside @click.self="tabSidebar" class="wuan_cake_sidebar">
                <div class="wuan_cake_sidebar_left">
                    <img class="wuan_cake_portrait" :src="logoUrl"/>
                    <div class="wuan_cake_info">
                        <span v-if="grouping" class="wuan_cake_grouping">{{ grouping }}：</span>
                        <span v-if="username" class="wuan_cake_name">{{ username }}</span>
                    </div>
                    <ul class="wuan_cake_list">
                        <li @click="jump('/')"><router-link tag="span" to="">首页</router-link></li>
                        <li @click="jump('/my-weeklys')"><router-link tag="span" to="">我的周报</router-link></li>
                        <li @click="jump('/my-account')"><router-link tag="span" to="">我的账号</router-link></li>
                    </ul>
                    <input @click="leave" class="wuan_btn_abort" type="button" value="退出"/>
                </div>
            </aside>
        </div>
    </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'sidebar',
    props:{
        grouping:{
            type: String,
            default: 'UI'
        },
        username:{
            type: String,
            default: '用户名'
        },
        logoUrl: {
            type: String,
            default: '/static/img/logo.jpg'
        }
    },
    computed: {
        ...mapState('user', {
            aside: state => state.aside,
            userInfo: state => state.userInfo
        })
    },
    methods:{
        ...mapMutations('user', ['setAside', 'clear']),
        tabSidebar () {
            this.setAside(!this.aside)
        },
        jump (pathValue) {
            if (!this.userInfo.userId) {
                this.$router.push({
                    path: '/login'
                })
                return
            }
            this.$router.push({
                path: `${pathValue}`
            })
            this.tabSidebar()
        },
        leave () {
            this.$router.push({
                path: '/login'
            })
            this.clear()
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

.wuan_cake_sidebar
    mask()

    .wuan_cake_sidebar_left
        width 70%
        height 100%
        background-color #fff
        padding-top 165px
        
        .wuan_cake_portrait
            margin 0 auto 
            portrait()

.wuan_cake_info
    padding-top:40px
    padding-bottom:80px
    font-size   32px
    color #222222


.wuan_cake_list
    border-top 1px solid #cecece
    border-bottom 1px solid #cecece
    margin-bottom  190px
    color #555555

    li
       font-size 30px
       height 90px
       line-height 90px
       border-bottom 1px solid #f4f4f4

       &:last-child
            border-bottom none

.wuan_btn_abort
    height 70px
    line-height 70px
    padding 0 100px
    border 1px solid #f27a7a
    background-color #fff
    color #ff5b5b
    border-radius 4px

</style>