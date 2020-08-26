/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 路由（后端返回的路由结构）示例
// {
//    "name": "System",
//    "path": "/system",
//    "hidden": false,
//    "redirect": "noRedirect",
//    "moduleCode": "system",
//    "level": 1,                   // 页面级别
//    "alwaysShow": true,
//    "meta": {
//        "title": "系统管理",
//        "icon": "system"
//    },
//    "children": [
//        {
//            "name": "User",
//            "path": "user",
//            "hidden": false,
//            "moduleCode": "user",
//            "meta": {
//                "title": "用户管理",
//                "icon": "user"
//            }
//        },
//        {
//            "name": "Log",
//            "path": "log",
//            "hidden": false,
//            "redirect": "noRedirect",
//            "moduleCode": "log",
//            "alwaysShow": true,
//            "meta": {
//                "title": "日志管理",
//                "icon": "log"
//            },
//            "children": [
//                {
//                    "name": "Operlog",
//                    "path": "operlog",
//                    "hidden": false,
//                    "moduleCode": "operateLog",
//                    "meta": {
//                        "title": "操作日志",
//                        "icon": "form"
//                    }
//                }
//            ]
//        }
//    ]
// }

// 公共路由
export const constantRoutes = [
   {
      path: '/login',
      hidden: true,
      component: () => import(/* webpackChunkName: "login" */ '@/Views/Login'),
      meta: {
         title: '登录'
      }
   },
   {
      path: '/',
      level: 1,
      redirect: 'index',
      component: () => import('@/Components/Layout'),
      children: [
         {
            path: 'index',
            component: () => import(/* webpackChunkName: "home" */ '@/Views/Home'),
            name: '首页',
            meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
         }
      ]
   },
   {
      path: '/profile',
      hidden: true,
      redirect: 'user',
      children: [
         {
            path: '/user',
            name: 'user',
            component: () => import(/* webpackChunkName: "profile" */ '@/Views/User'),
            meta: {
               title: '个人中心'
            }
         }
      ]
   },
   {
      path: '/403',
      hidden: true,
      component: () => import(/* webpackChunkName: "page403" */ '@/Views/SystemPages/403.vue'),
      meta: {
         title: '没有权限'
      }
   },
   {
      path: '/500',
      hidden: true,
      component: () => import(/* webpackChunkName: "page500" */ '@/Views/SystemPages/500.vue'),
      meta: {
         title: '服务器错误'
      }
   },
   {
      path: '*',
      hidden: true,
      component: () => import(/* webpackChunkName: "page404" */ '@/Views/SystemPages/404.vue'),
      meta: {
         title: '页面不存在'
      }
   }
]

// moduleCode 与 页面组件的映射
export const mapComponents = []
