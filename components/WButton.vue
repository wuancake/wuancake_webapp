<template>
    <button :class="classes">
        <span><slot></slot></span>
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
                    [`${beseCls}-${this.size}`]: this.size !== 'defautl'
                }
            ]
        }
    }
}
</script>

<style lang="stylus" scoped>
.w-btn {
    border 1px solid #000000
    box-sizing border-box
    outline none
}
</style>
