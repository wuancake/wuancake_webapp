<template>
    <input :class="classes" :style="{ width: `${this.width}px` }" :value="value" :placeholder="placeholder" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur" :type="type">
</template>

<script>
const baseCls = 'w-input'
export default {
    props: {
        value: {
            type: String
        },
        type: {
            default: 'text'
        },
        placeholder: {
            type: String
        },
        line: {
            type: Boolean
        },
        width: {
            type: Number
        }
    },
    data () {
        return {
            
        }
    },
    computed: {
        classes () {
            return [
                `${baseCls}`,
                {
                    [`${baseCls}-type-${this.type}`]: this.type === 'textarea',
                    [`${baseCls}-line`]: this.line
                }
            ]
        }
    },
    methods: {
        handleInput (event) { // 输入中触发的事件
            // console.log('handleInput')
            this.$emit('on-input', event)
        },
        handleChange (event) { // 输入框失去焦点且数据与上次不同时触发的事件
            // console.log('handleChange')
            this.$emit('on-change', event)
        },
        handleFocus (event) { // 输入框获取焦点时触发的事件
            // console.log('handleFocus')
            this.$emit('on-focus', event)
        },
        handleBlur (event) { // 输入框失去焦点时触发的事件
            // console.log('handleBlur')
            this.$emit('on-blur', event)
        }
    }
}
</script>

<style lang="stylus" scoped>
.w-input {
    box-sizing border-box
}
.w-input-type-textarea {

}
.w-input-line {

}
</style>
