<template>
    <div>
        <div class="cell-left">
            <slot name="left-icon"></slot>
            <slot name="left-text"></slot>
        </div>
        <slot></slot>
        <div class="cell-right">
            <slot name="right-text"></slot>
            <slot name="right-icon"></slot>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
