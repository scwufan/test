import { defineConfig } from 'umi';

// export default defineConfig({
//   nodeModulesTransform: {
//     type: 'none',
//   },
//   routes: [
//     { path: '/', component: '@/pages/index' },
//   ],
//   fastRefresh: {},
// });

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login', 
      component: '@/pages/login/login',
      title: '登录'
    },
    { 
      path: '/', 
      component: '@/pages/layouts/layouts',
      routes:[
        {
          path: '/', 
          component: '@/pages/index',
          title:'首页'
        },
        {
          path: '/shop', 
          component: '@/pages/shop/shop',
          title:'商品列表'
        }
      ]
   },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      ws: false,
      // 只需要改动target 改成后端接口的根路径
      // 我们把后端接口的根路径代理成立/api
      // 这种方式只存在开发阶段 如果项目上线了 后端会处理跨域
      target: 'http://192.168.101.98:7001',
      changeOrigin: true,
      withCredentials:true,
      pathRewrite: {
        '^/api': ''
      }
    },
  },
  locale:{
    default: 'zh-cn'
  },
  dva:{
    immer: true
  }
});

