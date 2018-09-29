<template>
    <input :value="value" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur" :type="type">
</template>

<script>
export default {
    props: {
        value: {},
        type: {
            default: 'text'
        }
    },
    data () {
        return {
            
        }
    },
    methods: {
        handleInput (event) {
            console.log('handleInput')
            this.$emit('on-input', event)
        },
        handleChange (event) {
            this.$emit('on-change', event)
        },
        handleFocus (event) {
            this.$emit('on-focus', event)
        },
        handleBlur (event) {
            this.$emit('on-blur', event)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
