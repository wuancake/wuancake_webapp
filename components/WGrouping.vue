<template>
    <div>
        <aside class="wuan_cake_grouping">
            <ul class="wuan_cake_list">
                <li class="wuan_cake_radio">
                    <div class="wuan_cake_radio_block">
                        <input type="radio" name="grouping" class="wuan_cake_radio_input" />
                    </div>
                    <div class="wuan_cake_radio_label">{{ grouping }}</div>
                </li>
                
             
            </ul>
        </aside>
    </div>
</template>

<script>

export default {
    name: 'grouping',
    props:{
        grouping:{
            type: String,
            default: '11111'
        },
    },
    methods:{

    }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/common.styl'

.wuan_cake_grouping
    // width 80%

.wuan_cake_list
    border 1px solid #cecece
    margin-bottom  190px
    color #555555
    

    li
       font-size 30px
       height 100px
       line-height 100px
       border-bottom 1px solid #f4f4f4
       display flex
       justify-content flex-start
       align-items center

       &:nth-child(even){
           background-color #f5f9ff;
       }
       &:nth-child(odd){
           background-color #ffffff;
       }

       &:last-child
            border-bottom none

    .wuan_cake_radio_block
        width 100px
        height 100px
        border-right 1px solid #cecece

       .wuan_cake_radio_input
           radio()

    .wuan_cake_radio_label
        width 100%
        text-align center

    
    

</style>