<template>
  <transition name="fade">
    <div v-if="value" @click.self="handleInput(false)" class="w-modal">
      <div class="modal-main">
        <header>{{ title }}</header>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ['title', 'value'],
  data () {
    return {}
  },
  methods: {
    handleInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../assets/css/common.styl'

.w-modal
  mask()
  box-sizing border-box
  display flex
  justify-content center
  align-items flex-end
  .modal-main
    background-color #fff
    border-top-left-radius 40px
    border-top-right-radius 40px
    width 100%
    > header
      height 98px
      line-height 98px
      font-size 38px
      font-weight bold
      color #ffffff
      background-color #3c9bff
      border-top-left-radius 40px
      border-top-right-radius 40px
</style>
