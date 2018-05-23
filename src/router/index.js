import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component:resolve=>require(["@/components/login"],resolve)
    },
    {
      path: '/list',
      component:resolve=>require(["@/components/list/list"],resolve),
      children:[
        {
          path: 'CuserManagement',
          name:"C端用户管理",
          component:resolve=>require(["@/components/CuserManagement"],resolve)       
        },
        {
          path: 'BuserManagement',
          name:"B端用户管理",
          component:resolve=>require(["@/components/BuserManagement"],resolve)
        },
        {
          path: 'c_inform',
          name:"消息管理",
          component:resolve=>require(["@/components/c_inform"],resolve)
        },
        {
          path: 'c_class',
          name:"分类管理",
          component:resolve=>require(["@/components/c_class"],resolve)
        },
      ]
    },
  ]
})
