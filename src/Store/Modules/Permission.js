import { SET_ROUTES } from '../MutationTypes'
import { constantRoutes, mapComponents } from '@/Router/Routes'
import getRouters from '@/Apis/Menu'
import layout from '@/Components/Layout/index'

const permission = {
   state: {
      routes: [],
      addRoutes: []
   },
   mutations: {
      [SET_ROUTES]: (state, routes) => {
         state.addRoutes = routes
         state.routes = constantRoutes.concat(routes)
      }
   },
   actions: {
      // 生成路由
      GenerateRoutes ({ commit }) {
         return new Promise(resolve => {
            // 向后端请求路由数据
            getRouters().then(res => {
               const accessedRoutes = filterAsyncRouter(res.data)
               accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
               commit(SET_ROUTES, accessedRoutes)
               resolve(accessedRoutes)
            })
         })
      }
   },
   getters: {
      permissionRoutes: state => state.routes,
      addRoutes: state => state.addRoutes
   }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter (asyncRouterMap) {
   return asyncRouterMap.filter(route => {
      if (route.moduleCode) {
         if (route.level === 1) {
            route.component = layout
         } else {
            route.component = loadView(route.moduleCode)
         }
      }

      if (route.children != null && route.children && route.children.length) {
         route.children = filterAsyncRouter(route.children)
      }

      return true
   })
}

export const loadView = (moduleCode) => { // 路由懒加载
   return mapComponents[moduleCode]
}

export { permission }
