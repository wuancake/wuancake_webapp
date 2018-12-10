<template>
  <transition name="toast-fade">
    <div :class="{ 'show': show }" class="toast">
      {{ message }}
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      message: '',
      show: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.toast
  text-align center
  font-size 28px
  color #ffffff
  max-width 700px
  max-height 300px
  margin 0 auto
  background-color rgba(0, 0, 0, .5)
  padding 10px 20px
  border-radius 5px
  position fixed
  top -200px
  left 50%
  transform translateX(-50%)
  z-index 1000

.show
  transition top .5s ease
  top 120px
</style>
