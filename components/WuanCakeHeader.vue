<template>
  <div aspectratio w-750-100>
    <div class="wuan_cake_header" aspectratio-content>
      <div>
        <slot name="left"></slot>
      </div>
      <div class="wuan_cake_header_title">
        <slot></slot>
      </div>
      <div>
        <slot name="right"></slot>
      </div>
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
[w-750-100] {
  aspect-ratio: '750:100';
}

.wuan_cake_header
  width 100%
  height 100px
  background #2f94ff
  font-size 38px
  color #fff
  display flex
  align-items center
  position absolute
  z-index 9999
  box-shadow 1px 2px 3px rgba(74, 161, 255, 0.84)
  .wuan_cake_header_title
    flex 1
    text-align center
</style>
