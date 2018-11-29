<template>
  <div>
    <button @click="goSignUp">注册</button>
    <button @click="goLogin">登录</button>
    <button @click="goChnagePassword">修改密码</button>
    <button @click="goSelectGroup">选择分组</button>
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
    goChnagePassword () {
      this.$router.push({
        path: '/change-password'
      })
    },
    goSelectGroup () {
      this.$router.push({
        path: '/select-group'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
