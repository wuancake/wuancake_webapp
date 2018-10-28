<template>
    <div>
        <aside class="wuan_cake_sidebar">
            <div class="wuan_cake_sidebar_left">
                <img class="wuan_cake_portrait" src=""/>
                <div class="wuan_cake_info">
                    <span class="wuan_cake_grouping">{{ grouping }}</span>
                    <span class="wuan_cake_name">{{ username }}</span>
                </div>
                <ul class="wuan_cake_list">
                    <li><router-link to="index">首页</router-link></li>
                    <li><router-link to="">我的周报</router-link></li>
                    <li><router-link to="">我的账号</router-link></li>
                </ul>
                <input class="wuan_btn_abort" type="button" value="退出"/>
            </div>
        </aside>
    </div>
</template>

<script>

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
        }
    },
    methods:{

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