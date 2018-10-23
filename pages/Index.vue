<template>
  <div>
    <button @click="goSignUp">注册</button>
    <button @click="goLogin">登录</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    goSignUp () {
      this.$router.push({
        path: '/sign-up'
      })
    },
    goLogin () {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
