/* eslint-disable */
// 工具
import UtilIce from '@/libs/util-ice.js'; // 页面和布局

import Index from './pages/Index';
import Login from './pages/Login';
import Error404 from './pages/Error404';
import HeaderAside from './layouts/HeaderAside'; // 变量名 routerConfig 为 iceworks 检测关键字
// 文档

import JARVIS_UTILS from './pages/FILE_HTML/JARVIS_UTILS';
import HTML_INPUT from './pages/FILE_HTML/HTML_INPUT';
import HTML_LOG from './pages/FILE_HTML/HTML_LOG'; // ice 会自动在这个变量下添加路由数据
import Hardware from './pages/FILE_HTML/hardware'; // 家庭式主机界面
// 请不要修改名称
// 备注 ice 自动添加的路由记录是以下格式
// {
//   path: '/page4',
//   layout: d2LayoutMain,
//   component: 4
// }
// 如果不指定 name 字段，会根据 path 生成 name = page-demo1
// 转换规则见 UtilIce.recursiveRouterConfig 中 path2name 方法
// meta 字段会和默认值使用 Object.assign 合并
// 如果不指定 meta.name 的话，name 字段会使用和上面路由 name 一样的取值逻辑
// 下面两个页面就是对比 你可以分别观察两个页面上显示的路由数据差异

const routerConfig = [
  {
    path: '/',
    name: 'index',
    layout: HeaderAside,
    component: Index,
  },
  {
    path: '/hardware',
    name: 'Hardware',
    component: Hardware,
  },
  {
    path: '/FILE/HTML/HTML_INPUT',
    name: 'HTML_INPUT',
    layout: HeaderAside,
    component: HTML_INPUT,
    meta: {
      requiresAuth: true,
      title: '日志',
    },
  },
  {
    path: '/FILE/JARVIS/UTILS',
    name: 'JARVIS_UTILS',
    layout: HeaderAside,
    component: JARVIS_UTILS,
    meta: {
      requiresAuth: true,
      title: 'Jarvis',
    },
  },
]; // 不参与菜单显示的
// ice 不会处理这部分
// 但是这部分路由也会被注册
// 处理规则同 routerConfig

const routerConfigMenuOut = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '*',
    component: Error404,
  },
]; // 导出全部路由设置
// 这个数据会在 router.js 中被扁平处理

export default UtilIce.recursiveRouterConfig([
  ...routerConfig,
  ...routerConfigMenuOut,
]); // 导出参与多标签页处理的路由设置
// 这个数据会在 mian.js 中使用

export const frameInRoutes = UtilIce.recursiveRouterConfig(routerConfig).map(
  e => {
    const route = e.children ? e.children[0] : e;
    return {
      path: e.path,
      name: route.name,
      meta: route.meta,
    };
  }
);
