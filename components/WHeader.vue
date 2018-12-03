<template>
  <div style="z-index: 9999;" aspectratio w-750-100>
    <div class="wuan_cake_header" aspectratio-content>
      <div @click="tapLeft">
        <slot name="left"></slot>
      </div>
      <div @click="tapTitle" class="wuan_cake_header_title">
        <slot>{{ headerTitle }}</slot>
      </div>
      <div @click="tapRight">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {
      
    }
  },
  computed: {
    headerTitle () {
      if (this.title) {
        return this.title
      } else if (this.$store.state.user.title) {
        return this.$store.state.user.title
      }
    }
  },
  methods: {
    tapLeft () {
      this.$emit('on-click-left')
    },
    tapRight () {
      this.$emit('on-click-right')
    },
    tapTitle () {
      this.$emit('on-click-title')
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
