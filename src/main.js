import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import screenfull from 'screenfull'
import '@/components'
import '@/plugin/axios'
import '@/mock/register'
import '@/assets/svg-icons'
import store from '@/store/index'
import util from '@/libs/util.js'
import pluginOpen from '@/plugin/open'
import 'element-ui/lib/theme-chalk/index.css'
import { wsEventBus, WSMonitor } from '@/plugin/ws/socket'
import * as websocketMsgType from '@/constants/websocketMsgType'

// 菜单和路由设置
import App from './App'
import router from './router'
import { menuHeader } from './menuConfig'
import { frameInRoutes } from './routerConfig'

Vue.use(ElementUI)
Vue.use(pluginOpen)

Vue.config.productionTip = false

Vue.prototype.$env = process.env.NODE_ENV
Vue.prototype.$baseUrl = process.env.BASE_URL

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.getAllPageFromRoutes()
    // 设置顶栏菜单
    this.$store.commit('d2adminMenuHeaderSet', menuHeader)
    // 设置侧边栏菜单
    // this.$store.commit('d2adminMenuAsideSet', menuAside)

    // 初始化socket
    const ip = '47.92.226.156' || location.host.split(`:${location.port}`)[0]
    Vue.prototype.socket = new WSMonitor(`ws://${ip}:8889/`)
    this.registerWSMessageEvent()
  },
  mounted () {
    // 获取并记录用户 UA
    this.$store.commit('d2adminUaGet')
    // 展示系统信息
    util.showInfo()
    // 用户登陆后从数据库加载一系列的设置
    this.$store.commit('d2adminLoginSuccessLoad')
    // 初始化全屏监听
    this.fullscreenListenerInit()
  },
  methods: {
    /**
     * 初始化全屏监听
     */
    fullscreenListenerInit () {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          if (!screenfull.isFullscreen) {
            this.$store.commit('d2adminFullScreenSet', false)
          }
        })
      }
    },
    /**
     * 处理路由 得到所有的页面
     */
    getAllPageFromRoutes () {
      const pool = []
      function push (routes) {
        routes.forEach((route) => {
          if (route.children) {
            push(route.children)
          } else {
            const { meta, name, path } = route
            pool.push({ meta, name, path })
          }
        })
      }
      push(frameInRoutes)
      this.$store.commit('d2adminPagePoolSet', pool)
    },

    registerWSMessageEvent () {
      wsEventBus.$on('wsmessage', (data) => {
        const code = data.code
        if (code !== 0 && code !== 3 && code !== 4) {
          console.warn('>>', data)
        }

        this.handleWebsocket(data)
      })

      // 心跳包
      wsEventBus.$on('wstimeout', () => {
        this.socket.send({
          msgType: websocketMsgType.REQUEST_ISSTATUS,
          code: 0
        })
      })
    },

    handleWebsocket (data) {
    }
  }
}).$mount('#app')
