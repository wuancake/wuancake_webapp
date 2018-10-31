<template>
  <div>
    <button @click="goSignUp">注册</button>
    <button @click="goLogin">登录</button>
    <button @click="goGrouping">分组</button>
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
    },
    goGrouping () {
      this.$router.push({
        path: '/grouping'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
