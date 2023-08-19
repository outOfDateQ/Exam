import router from '@/router'

// 路由鉴权
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})