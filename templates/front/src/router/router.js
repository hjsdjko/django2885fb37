import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import AddrList from '../pages/shop-address/list'
import AddrAdd from '../pages/shop-address/addOrUpdate'
import Order from '../pages/shop-order/list'
import OrderConfirm from '../pages/shop-order/confirm'
import Cart from '../pages/shop-cart/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import huahuizhongleiList from '../pages/huahuizhonglei/list'
import huahuizhongleiDetail from '../pages/huahuizhonglei/detail'
import huahuizhongleiAdd from '../pages/huahuizhonglei/add'
import huahuixinxiList from '../pages/huahuixinxi/list'
import huahuixinxiDetail from '../pages/huahuixinxi/detail'
import huahuixinxiAdd from '../pages/huahuixinxi/add'
import zizhudinghuaList from '../pages/zizhudinghua/list'
import zizhudinghuaDetail from '../pages/zizhudinghua/detail'
import zizhudinghuaAdd from '../pages/zizhudinghua/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'
import discusshuahuixinxiList from '../pages/discusshuahuixinxi/list'
import discusshuahuixinxiDetail from '../pages/discusshuahuixinxi/detail'
import discusshuahuixinxiAdd from '../pages/discusshuahuixinxi/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'storeup',
					component: Storeup
				},
                {
                    path: 'shop-address/list',
                    component: AddrList
                },
                {
                    path: 'shop-address/addOrUpdate',
                    component: AddrAdd
                },
				{
					path: 'shop-order/order',
					component: Order
				},
				{
					path: 'cart',
					component: Cart
				},
				{
					path: 'shop-order/orderConfirm',
					component: OrderConfirm
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'huahuizhonglei',
					component: huahuizhongleiList
				},
				{
					path: 'huahuizhongleiDetail',
					component: huahuizhongleiDetail
				},
				{
					path: 'huahuizhongleiAdd',
					component: huahuizhongleiAdd
				},
				{
					path: 'huahuixinxi',
					component: huahuixinxiList
				},
				{
					path: 'huahuixinxiDetail',
					component: huahuixinxiDetail
				},
				{
					path: 'huahuixinxiAdd',
					component: huahuixinxiAdd
				},
				{
					path: 'zizhudinghua',
					component: zizhudinghuaList
				},
				{
					path: 'zizhudinghuaDetail',
					component: zizhudinghuaDetail
				},
				{
					path: 'zizhudinghuaAdd',
					component: zizhudinghuaAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
				{
					path: 'discusshuahuixinxi',
					component: discusshuahuixinxiList
				},
				{
					path: 'discusshuahuixinxiDetail',
					component: discusshuahuixinxiDetail
				},
				{
					path: 'discusshuahuixinxiAdd',
					component: discusshuahuixinxiAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
