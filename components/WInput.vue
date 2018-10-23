<template>
    <input
        v-if="!row"
        :class="classes"
        :style="{ width: `${this.width}px`, 'border-color': verification ? '#adccff' : '#ff5b5b' }"
        :value="value"
        :placeholder="placeholder"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        :type="type">
    <textarea
        v-else
        :rows="row"
        :class="classes"
        :style="{ width: `${this.width}px` }"
        :value="value"
        :placeholder="placeholder"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"></textarea>
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
        // line: {
        //     type: Boolean
        // },
        width: {
            type: Number
        },
        row: {
            type: Number
        },
        verification: {
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
                `${baseCls}`,
                {
                    [`${baseCls}-type-${this.type}`]: this.type === 'textarea',
                    [`${baseCls}-type-default`]: this.type === 'text' || this.type === 'password',
                    [`${baseCls}-line`]: this.type === 'line'
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
    box-sizing: border-box;
    border: 1px solid #adccff;
    box-sizing: border-box;
    outline: none;
}
.w-input-type-default {
    width: 540px;
    height: 86px;
    border-radius: 43px;
    text-align: center;
    box-shadow: 0 2px 1px 0 #4d156e30 inset, 0 0 3px 0 #4d156e30;
    font-size: 34px;
}
.w-input::-webkit-input-placeholder {
    color #9f9f9f
}
.w-input-type-textarea {
    width 690px
    border-radius 6px
    resize none
    padding 20px
}
.w-input-line {
    border 0
    border-bottom 1px solid #555
    font-size 12px
    color #9f9f9f
    box-shadow 0
    border-radius 0
    padding 10px
    background transparent
}
</style>
