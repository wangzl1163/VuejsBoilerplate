import Vue from 'vue'
import { common } from '@/Components'

const componentNames = Object.keys(common)

// 公共组件注册为全局组件
componentNames.forEach(name => Vue.component(name, common[name]))
