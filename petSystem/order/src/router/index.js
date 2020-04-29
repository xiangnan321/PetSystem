import Vue from 'vue'
import VueRouter from 'vue-router'
// 一级路由
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AdminBody from '@/views/AdminBody.vue'
import BusBody from '@/views/BusBody.vue'
// 二级路由
import AdminList from '@/components/AdminBody/AdminList.vue'
import UserList from '@/components/AdminBody/UserList.vue'
import BusList from '@/components/AdminBody/BusList.vue'
import ShopList from '@/components/AdminBody/ShopList.vue'
import Statistics from '@/components/AdminBody/Statistics.vue'
import ApplyList from '@/components/AdminBody/ApplyList.vue'

import GoodsList from '@/components/BusBody/GoodsList.vue'
import ServerList from '@/components/BusBody/ServerList.vue'
import Order from '@/components/BusBody/Order.vue'
import AddGood from '@/components/BusBody/AddGood.vue'
import AddServer from '@/components/BusBody/AddServer.vue'

import AddAdmin from '@/components/AddAdmin.vue'
import ModifyShop from '@/components/ModifyShop.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'loginLink'
    }
  },
  {
    path: '/Login',
    name: 'loginLink',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/adminBody',
    name: 'adminBody',
    component: AdminBody,
    // redirect: '/adminBody',
    children: [
      {
        path: '/adminBody/adminList',
        name: "adminList",
        component: AdminList
      },
      {
        path: '/adminBody/busList',
        name: "busList",
        component: BusList
      },
      {
        path: '/adminBody/userList',
        name: "userList",
        component: UserList
      },
      {
        path: '/adminBody/shopList',
        name: "admShopList",
        component: ShopList
      },
      {
        path: '/adminBody/applyList',
        name: "applyList",
        component: ApplyList
      },
      {
        path: '/adminBody/statistics',
        name: "statistics",
        component: Statistics
      },
      {
        path: '/adminBody/addAdmin',
        name: "addAdmin",
        component: AddAdmin
      },
      {
        path: '/adminBody/modifyShop',
        name: "admModifyShop",
        component: ModifyShop
      },
    ]
  },
  {
    path: '/busBody',
    name: 'busBody',
    component: BusBody,
    children: [
      {
        path: '/busBody/shopList',
        name: "busShopList",
        component: ShopList
      },
      {
        path: '/busBody/goodsList',
        name: "goodsList",
        component: GoodsList
      },
      {
        path: '/busBody/serverList',
        name: "serverList",
        component: ServerList
      },
      {
        path: '/busBody/order',
        name: "order",
        component: Order
      },
      {
        path: '/busBody/modifyShop',
        name: "modifyShop",
        component: ModifyShop
      },
      {
        path: '/busBody/addGood',
        name: "addGood",
        component: AddGood
      },
      {
        path: '/busBody/addServer',
        name: "addServer",
        component: AddServer
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
