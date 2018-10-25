<template>
    <button @click="tapButton" :disabled="disabled" :style="{ width: `${width}px`, borderColor: `${borderColor}`, color: `${color}` }" :class="classes">
        <i class="iconfont" v-html="iconLeft"></i>
        <span><slot></slot></span>
        <i class="iconfont" v-html="iconRight"></i>
    </button>
</template>

<script>
const beseCls = 'w-btn'
export default {
    props: {
        type: {
            type: String,
            validator (value) {
                return ['default', 'ghost', 'success', 'warning', 'error', 'primary', 'text', 'info'].indexOf(value) !== -1
            },
            default: 'default'
        },
        size: {
            type: String,
            validator (value) {
                return ['default', 'small', 'middle', 'large', 'long'].indexOf(value) !== -1
            },
            default: 'default'
        },
        iconLeft: { // 左边 icon 的值
            type: String
        },
        iconRight: { // 右边 icon 的值
            type: String
        },
        width: { // button 宽度
            type: String
        },
        borderColor: { // border 颜色
            type: String
        },
        color: { // 字体颜色
            type: String
        },
        disabled: {
            type: Boolean
        }
    },
    data () {
        return {
            
        }
    },
    computed: {
        classes () {
            return [
                `${beseCls}`,
                `${beseCls}-${this.type}`,
                {
                    [`${beseCls}-size-${this.size}`]: this.size !== 'defautl'
                }
            ]
        }
    },
    methods: {
        tapButton () {
            this.$emit('on-click-button')
        }
    }
}
</script>

<style lang="stylus" scoped>


.w-btn {
    border none
    border-radius 5px
    padding 25px 30px
    box-sizing border-box
    outline none
    display inline-flex
    align-items center
    justify-content center
    & > span {
        margin 0 10px
    }
}
.w-btn-default {
    color #ffffff
    background $input-primaryLightBLue
}
.w-btn-ghost {
    background transparent
    color $input-primaryDeepSkyBlue
    border 1px solid $input-primaryLightBLue
}
.w-btn-warning {
    background #ffffff
    color #f27a7a
    border 1px solid #f27a7a
}
.w-btn-primary {
    background $input-primaryDeepSkyBlue
    color #ffffff
}
</style>
