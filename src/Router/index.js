import Vue from 'vue'
import Router from 'vue-router'
import * as routes from './Routes'

Vue.use(Router)

const router = new Router({
   routes: routes.constantRoutes
})

export default router
