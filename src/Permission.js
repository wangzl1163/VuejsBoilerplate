import router from './Router'
import loadingBar from './Plugins/LoadingBar/Index'
import { Message } from 'element-ui'
import store from './Store'

const whiteList = ['/login', '/register']

/** 配置全局导航守卫--权限验证 */
router.beforeEach((to, from, next) => {
   loadingBar.start()
   document.title = to.meta.title

   if (store.state.token.token) {
      // 如果未加载用户信息先加载用户信息
      if (!store.state.user.name) {
         store.dispatch('GetUserInfo').then(res => {
            // 拉取user_info
            store.dispatch('GenerateRoutes').then(accessRoutes => {
               // 测试 默认静态页面
               // store.dispatch('generateRoutes', { roles }).then(accessRoutes => {
               // 根据roles权限生成可访问的路由表
               router.addRoutes(accessRoutes) // 动态添加可访问路由表
               next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            })
         }).catch(err => {
            store.dispatch('FedLogOut').then(() => {
               Message.error(err.message || err)
               next({ path: '/' })
            })
         })
      } else {
         next()
      }
   } else {
      // 在免登录白名单，直接进入
      if (whiteList.includes(to.path)) {
         next()
         return
      }

      Message.error('您还没有登录，即将跳转到登录页面')
      setTimeout(() => {
         next('/login')
      }, 3000)
      loadingBar.finish()
   }
})

router.afterEach((to, from, next) => {
   to.matched.forEach(record => {
      if (record.path === to.path) {
         if (Object.keys(to.query).length > 0) {
            record.query = to.query
         }

         if (Object.keys(to.params).length > 0) {
            record.params = to.params
         }
      }
   })

   loadingBar.finish()
})
