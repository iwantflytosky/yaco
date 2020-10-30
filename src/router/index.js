import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
const index= ()=>import ('../pages/index/index.vue')
// const menu= ()=>import ('../pages/menu/menu.vue')
// const umodel= ()=>import ('../pages/umodel/umodel.vue')
// const userM= ()=>import ('../pages/userM/userM.vue')
Vue.use(Router)
export const indexRoutes = [
  {
    path: "/menu",
    component: () => import("../pages/menu/menu"),
    name: "菜单管理"
  },
  {
    path: "/role",
    component: () => import("../pages/role/role"),
    name: "角色管理"
  },
  {
    path: "/manage",
    component: () => import("../pages/manage/manage"),
    name: "管理员管理"
  },
  {
    path: "/cate",
    component: () => import("../pages/cate/cate"),
    name: "商品分类"
  },
  {
    path: "/spec",
    component: () => import("../pages/spec/spec"),
    name: "商品规格"
  },
  {
    path: "/goods",
    component: () => import("../pages/goods/goods"),
    name: "商品管理"
  },
  {
    path: "/banner",
    component: () => import("../pages/banner/banner"),
    name: "轮播图管理"
  },
  {
    path: "/member",
    component: () => import("../pages/member/member"),
    name: "会员管理"
  },
  {
    path: "/seckill",
    component: () => import("../pages/seckill/seckill"),
    name: "秒杀活动"
  },
];
export default new Router({
  routes: [
    {
      path: '/',
      component:login
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path:"",
          component:()=>import("../pages/home/home")
        },
        // ...indexRoutes
      ].concat(indexRoutes)
    },
    
  ]
})
