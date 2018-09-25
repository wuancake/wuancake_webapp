<template>
    <button>
        <span><slot></slot></span>
    </button>
</template>

<script>
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
    }
}
</script>

<style lang="stylus" scoped>

</style>
