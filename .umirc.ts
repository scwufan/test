import { defineConfig } from 'umi';

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
          title:'首页',
          incon: 'AppstoreOutlined'
        },
        
        {
          path: '/carousel', 
          component: '@/pages/Administration/carousel',
          title:'轮播图',
          icon:'CloudOutlined'
          
        },
        {
          path: '/praise', 
          component: '@/pages/Administration/praise',
          title:'好评排行',
          icon:'BarChartOutlined'
        },
        {
          path: '/newProducts', 
          component: '@/pages/Administration/newProducts',
          title:'新品好物',
          icon:'ShopOutlined'
          
        },
        {
          path: '/recommend', 
          component: '@/pages/Administration/recommend',
          title:'推荐',
          icon:'TeamOutlined'
        },
        {
          path: '/shopList', 
          component: '@/pages/shop/shop',
          title:'商品列表',
          icon:'UserOutlined'
        },
        {
          path: '/shopClass', 
          component: '@/pages/shop/shopClass',
          title:'商品分类',
          icon:'UploadOutlined'
        },
        {
          path: '/shopParameter', 
          component: '@/pages/shop/shopParameter',
          title:'分类参数',
          icon:'VideoCameraOutlined'
        },
        {
          path: '/seckill', 
          component: '@/pages/active/seckill',
          title:'秒杀',
          icon:'WechatOutlined'
        },
        {
          path: '/groupWork', 
          component: '@/pages/active/groupWork',
          title:'拼团',
          icon:'MedicineBoxOutlined'
        },
        {
          path: '/coupon', 
          component: '@/pages/Market/coupon',
          title:'优惠券',
          icon:'LockOutlined'
        },
        {
          path: '/redEnvelopes', 
          component: '@/pages/Market/redEnvelopes',
          title:'红包',
          icon:'CloudOutlined'
        },
        {
          path: '/userList', 
          component: '@/pages/user/userList',
          title:'用户列表',
          icon:'DesktopOutlined'
        },
        {
          path: '/vip', 
          component: '@/pages/user/vip',
          title:'会员中心',
          icon:'FolderAddOutlined'
        },
        {
          path: '/order', 
          component: '@/pages/order/orderList',
          title:'订单列表',
          icon:'HddOutlined'
        },
        {
          path: '/addshop', 
          component: '@/pages/shop/addshop',
          title:'商品列表',
          icon:'HddOutlined'
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
      target: 'http://192.168.101.210:7001',
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

