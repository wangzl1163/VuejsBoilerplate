<template>
    <div :class="{'has-logo': true}">
        <logo :collapse="isCollapse" />{{permissionRoutes}}
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="true"
                :active-text-color="theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in permissionRoutes"
                    :key="route.path + index"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/Assets/Style/Variables.less'

export default {
   components: { SidebarItem, Logo },
   computed: {
      ...mapGetters(['permissionRoutes', 'sidebar', 'theme']),
      activeMenu () {
         const route = this.$route
         const { meta, path } = route
         // if set path, the sidebar will highlight the path you set
         if (meta.activeMenu) {
            return meta.activeMenu
         }
         return path
      },
      variables () {
         return variables
      },
      isCollapse () {
         return !this.sidebar.opened
      }
   }
}
</script>
