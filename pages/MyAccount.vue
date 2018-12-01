<template>
    <div>
        <aside class="wuan_cake_sidebar">
            <div class="wuan_cake_sidebar_left">
                <div class="wuan_cake_info">
                    <img class="wuan_cake_portrait" src=""/>
                    <span class="wuan_cake_name">{{ username }}<i class=""></i></span>
                </div>
                <ul class="wuan_cake_list">
                    <li>
                        <span><i class="point"/>邮箱</span>
                        <span class="info">537894524@qq.com</span>
                    </li>
                    <li>
                        <span><i class="point"/>分组</span>
                        <span class="info">UI 组</span>
                    </li>
                    <li>
                        <span><i class="point"/>修改密码</span>
                        <span class="info"><i class="iconfont icon-xiangyou-copy"></i></span>
                    </li>
                </ul>
                <div class="login-btns">
                    <button class="login-btn login-btn-item">退出分组</button>
                </div>
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