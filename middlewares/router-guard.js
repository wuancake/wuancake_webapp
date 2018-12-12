export default function ({store, redirect, route}) {
  if (!store.state.user.userInfo.userId && route.path !== '/login' && route.path !== '/sign-up') {
    redirect({
      path: '/login'
    })
  }
}