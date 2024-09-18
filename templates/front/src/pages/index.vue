<template>
	<div class="main-containers">
		<div class="body-containers" :style='{"minHeight":"100vh","padding":"40px 0 0","margin":"0","position":"relative","background":"#F6F8FA"}'>
		<div class="top-container" :style='{"boxShadow":"none","padding":"0 ","top":"0","alignItems":"center","left":"0","background":"#ffffff","display":"flex","width":"100%","position":"absolute","justifyContent":"flex-start","height":"40px","zIndex":"1002"}'>
			<!-- info -->
			<div :style='{"width":"100%","position":"absolute","top":"calc(100% + 450px)","left":"0","display":"block","zIndex":"999"}'>
			  <span :style='{"padding":"0 0 0 12px","color":"#FF961B","textAlign":"center","background":"#00000050","width":"100%","lineHeight":"90px","fontSize":"40px","float":"left","fontWeight":"bold"}'>基于Django花卉商城系统的设计与实现</span>
			</div>
			
			<div v-if="false" :style='{"color":"#666","margin":"0 10px","fontSize":"14px"}'>0753-1234567</div>
			<el-button v-if="Token" class="btn-shop" @click.native="goMenu('/index/cart')">
				<span class="icon iconfont icon-wuliu8" :style='{"color":"inherit","padding":"0 4px","fontSize":"16px"}'></span>
				购物车
			</el-button>
			<el-button v-if="Token" class="btn-service" @click.native="goChat">
				<span class="icon iconfont icon-touxiang09" :style='{"color":"inherit","padding":"0 4px","fontSize":"16px"}'></span>
					联系我们
			</el-button>
			
			<img v-if="headportrait&&Token" :style='{"width":"40px","margin":"0 12px","borderRadius":"50%","display":"none","height":"40px"}' :src="headportrait?baseUrl + headportrait:require('@/assets/avator.png')">
			<div v-if="Token" :style='{"padding":"0 12px","color":"#fff","top":"calc(100% + 540px)","textAlign":"center","left":"0","background":"#00000050","width":"100%","fontSize":"16px","lineHeight":"60px","position":"absolute","height":"60px"}'>{{username}}</div>
			<div v-if="Token && notAdmin" :style='{"cursor":"pointer","padding":"0 0","color":"#fff","top":"calc(100% + 540px)","fontSize":"16px","lineHeight":"60px","position":"absolute","right":"41%","height":"60px","zIndex":"1003"}' @click="goMenu('/index/center')">个人中心</div>
			<el-button v-if="!Token" @click="toLogin()" :style='{"border":"none","padding":"0 12px","margin":"0 10px","color":"#909090","borderRadius":"0","background":"none","display":"inline-block","fontSize":"14px","lineHeight":"40px","position":"absolute","right":"75px","height":"40px"}'>登录/注册</el-button>
			<el-button v-if="Token" @click="logout" :style='{"border":"none","padding":"0 12px","margin":"0 10px","color":"#808080","borderRadius":"0","background":"none","display":"inline-block","fontSize":"14px","lineHeight":"40px","position":"absolute","right":"20px","height":"40px"}'>退出</el-button>
		</div>


			<div class="menu-preview" :style='{"padding":"0 60px","borderColor":"#efefef","top":"0","left":"10%","background":"#ffffff","borderWidth":"0 0 1px 0","clipPath":"polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)","width":"80%","position":"absolute","borderStyle":"solid","height":"auto","zIndex":"1003"}'>
			<el-scrollbar wrap-class="scrollbar-wrapper-horizontal">
				<el-menu class="el-menu-horizontal-demo" :style='{"border":0,"padding":"0","listStyle":"none","margin":"0","background":"#fff","display":"flex","position":"relative","justifyContent":"center"}' :default-active="activeMenu" :unique-opened="true" mode="horizontal" :router="true" @select="handleSelect">
					<div class="userinfo" :style='{"width":"84px","padding":"6px 10px 0","display":"none","height":"auto"}'>
					  <el-image :style='{"width":"100%","objectFit":"cover","borderRadius":"20px","display":"block","height":"32px"}' src="http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg" fit="cover"></el-image>
					  <div :style='{"fontSize":"12px","lineHeight":"1.5","color":"#333","textAlign":"center"}'>nickname</div>
					</div>
					<el-menu-item class="home" index="/index/home" @click.native="goMenu('/index/home')">
						<span :style='{"padding":"0 5px 0 0","margin":"0","color":"inherit","width":"14px","lineHeight":"66px","fontSize":"inherit","height":"66px"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0 5px 0 10px","lineHeight":"66px","fontSize":"inherit","color":"inherit","height":"66px"}'>首页</span>
					</el-menu-item>
					<el-menu-item class="item" v-for="(menu, index) in menuList" :index="menu.url" :key="index" @click.native="goMenu(menu.url)">
						<i :style='{"padding":"0 5px 0 0","margin":"0","color":"inherit","width":"14px","lineHeight":"66px","fontSize":"inherit","height":"66px"}' :class="iconArr[index]"></i>
						<span :style='{"padding":"0 5px 0 10px","lineHeight":"66px","fontSize":"inherit","color":"inherit","height":"66px"}'>{{menu.name}}</span>
					</el-menu-item>
					<el-menu-item class="service" @click="goChat">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"66px","fontSize":"inherit","height":"66px"}' class="icon iconfont icon-touxiang09"></span>
						<span :style='{"padding":"0 20px","lineHeight":"66px","fontSize":"inherit","color":"inherit","height":"66px"}'>
							联系我们
						</span>
					</el-menu-item>
					<el-menu-item class="shop" index="/index/cart" @click.native="goMenu('/index/cart')">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"66px","fontSize":"inherit","height":"66px"}' class="icon iconfont icon-wuliu8"></span>
						<span :style='{"padding":"0 20px","lineHeight":"66px","fontSize":"inherit","color":"inherit","height":"66px"}'>购物车</span>
					</el-menu-item>
					<el-menu-item class="user" index="/index/center" v-if="Token && notAdmin" @click.native="goMenu('/index/center')">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"66px","fontSize":"inherit","height":"66px"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0 20px","lineHeight":"66px","fontSize":"inherit","color":"inherit","height":"66px"}'>个人中心</span>
					</el-menu-item>
				</el-menu>
			</el-scrollbar>
			</div>



			<div :style='{"width":"100%","margin":"0 auto","background":"#fff","height":"auto"}'>
			  <div class="swiper21" :style='{"width":"100%","height":"auto"}'>
			    <div class="swiper-container mySwiper21">
			      <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
			          <div :style='{"width":"100%","height":"auto"}'>
			            <el-image @click="carouselClick(item.url)" :style='{"objectFit":"cover","width":"100%","height":"600px"}' :src="baseUrl + item.value" fit="cover"></el-image>
			          </div>
			        </div>
			      </div>
			      <div class="swiper-button-prev" :style='{"width":"24px","margin":"-12px 0 0","top":"50%","height":"24px"}'>
			        <span class="icon iconfont icon-jiantou39" :style='{"width":"24px","fontSize":"24px","color":"#fff","height":"24px"}'></span>
			      </div>
			      <div class="swiper-button-next" :style='{"width":"24px","margin":"-12px 0 0","top":"50%","height":"24px"}'>
			        <span class="icon iconfont icon-jiantou18" :style='{"width":"24px","fontSize":"24px","color":"#fff","height":"24px"}'></span>
			      </div>
			    </div>
			  </div>
			  <div class="swiper22" :style='{"width":"100%","margin":"10px 10px 0","height":"auto"}'>
			    <div class="swiper-container mySwiper22">
			      <div class="swiper-wrapper">
			        <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
			          <div>
			            <el-image :style='{"objectFit":"cover","width":"100%","height":"120px"}' :src="baseUrl + item.value" fit="cover"></el-image>
			          </div>
			        </div>
			      </div>
			      <div class="swiper-button-prev" :style='{"width":"14px","margin":"-7px 0 0","top":"50%","height":"14px"}'>
			        <span class="icon iconfont icon-jiantou33" :style='{"width":"14px","fontSize":"14px","color":"#FF961B","height":"14px"}'></span>
			      </div>
			      <div class="swiper-button-next" :style='{"width":"14px","margin":"-7px 0 0","top":"50%","height":"14px"}'>
			        <span class="icon iconfont icon-jiantou34" :style='{"width":"14px","fontSize":"14px","color":"#FF961B","height":"14px"}'></span>
			      </div>
			    </div>
			  </div>
			</div>

			<router-view id="scrollView"></router-view>
			
			<div class="bottom-preview" :style='{"width":"100%","height":"auto"}'>
				<div :style='{"width":"100%","padding":"20px","overflow":"hidden","background":"#000","height":"auto"}'><div v-html="bottomContent"></div></div>
			</div>
		</div>
		
        <el-dialog title="联系我们" :visible.sync="chatFormVisible" width="600px" :before-close="chatClose">
            <div class="chat-content" id="chat-content">
                <div v-bind:key="item.id" v-for="item in chatList">
                    <div v-if="item.ask" class="right-content">
                        <el-alert class="text-content" :title="item.ask" :closable="false"
                            type="warning"></el-alert>
                    </div>
                    <div v-else class="left-content">
                        <el-alert class="text-content" :title="item.reply" :closable="false"
                            type="success"></el-alert>
                    </div>
                    <div class="clear-float"></div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-input v-model="form.ask" placeholder="请输入内容" style="width: calc(100% - 80px);float: left;">
                </el-input>
                <el-button type="primary" @click="addChat">发送</el-button>
            </div>
        </el-dialog>
	</div>
</template>

<script>
import Vue from 'vue'
import Swiper from "swiper";
import axios from 'axios'

export default {
    data() {
		return {
            activeIndex: '0',
			roleMenus: [{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-shop","buttons":["新增","查看","修改","删除"],"menu":"用户","menuJump":"列表","tableName":"yonghu"}],"menu":"用户管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-paint","buttons":["新增","查看","修改","删除"],"menu":"花卉种类","menuJump":"列表","tableName":"huahuizhonglei"}],"menu":"花卉种类管理"},{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-copy","buttons":["新增","查看","修改","删除","查看评论"],"menu":"花卉信息","menuJump":"列表","tableName":"huahuixinxi"}],"menu":"花卉信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核","支付"],"appFrontIcon":"cuIcon-cardboard","buttons":["查看","修改","删除","审核"],"menu":"自助订花","menuJump":"列表","tableName":"zizhudinghua"}],"menu":"自助订花管理"},{"child":[{"allButtons":["查看","修改"],"appFrontIcon":"cuIcon-form","buttons":["查看","修改"],"menu":"关于我们","tableName":"aboutus"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-similar","buttons":["查看","修改","删除"],"menu":"轮播图管理","tableName":"config"},{"allButtons":["查看","修改"],"appFrontIcon":"cuIcon-explore","buttons":["查看","修改"],"menu":"系统简介","tableName":"systemintro"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"商城资讯","tableName":"news"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"商城资讯分类","tableName":"newstype"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-service","buttons":["新增","查看","修改","删除"],"menu":"联系我们","tableName":"chat"}],"menu":"系统管理"},{"child":[{"allButtons":["新增","查看","修改","删除","导出","日销量","月销量","年销量","品销量","类销量","日销额","月销额","年销额","品销额","类销额","发货","物流","核销"],"appFrontIcon":"cuIcon-taxi","buttons":["查看","删除","发货","物流"],"menu":"已支付订单","tableName":"orders/已支付"},{"allButtons":["新增","查看","修改","删除","导出","日销量","月销量","年销量","品销量","类销量","日销额","月销额","年销额","品销额","类销额","物流","退货审核"],"appFrontIcon":"cuIcon-newshot","buttons":["查看","删除","日销量","月销量","月销额","退货审核"],"menu":"已完成订单","tableName":"orders/已完成"},{"allButtons":["新增","查看","修改","删除","导出","日销量","月销量","年销量","品销量","类销量","日销额","月销额","年销额","品销额","类销额"],"appFrontIcon":"cuIcon-goods","buttons":["查看","删除"],"menu":"已取消订单","tableName":"orders/已取消"},{"allButtons":["新增","查看","修改","删除","导出","日销量","月销量","年销量","品销量","类销量","日销额","月销额","年销额","品销额","类销额","物流"],"appFrontIcon":"cuIcon-goodsnew","buttons":["查看","删除"],"menu":"已退款订单","tableName":"orders/已退款"},{"allButtons":["新增","查看","修改","删除","导出","日销量","月销量","年销量","品销量","类销量","日销额","月销额","年销额","品销额","类销额","确认收货","物流"],"appFrontIcon":"cuIcon-paint","buttons":["查看","删除","物流"],"menu":"已发货订单","tableName":"orders/已发货"},{"allButtons":["新增","查看","修改","删除","导出","日销量","月销量","年销量","品销量","类销量","日销额","月销额","年销额","品销额","类销额"],"appFrontIcon":"cuIcon-vipcard","buttons":["查看","删除"],"menu":"未支付订单","tableName":"orders/未支付"}],"menu":"订单管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-time","buttons":["查看","查看评论"],"menu":"花卉信息列表","menuJump":"列表","tableName":"huahuixinxi"}],"menu":"花卉信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","审核","支付"],"appFrontIcon":"cuIcon-cardboard","buttons":["新增","查看","修改","删除","支付"],"menu":"自助订花","menuJump":"列表","tableName":"zizhudinghua"}],"menu":"自助订花管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","查看评论"],"appFrontIcon":"cuIcon-time","buttons":["查看","查看评论"],"menu":"花卉信息列表","menuJump":"列表","tableName":"huahuixinxi"}],"menu":"花卉信息模块"}],"hasBackLogin":"否","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"用户","tableName":"yonghu"}],
			baseUrl: '',
			carouselList: [],
			menuList: [],
			chatFormVisible: false,
			chatList: [],
			form: {
				ask: '',
				userid: localStorage.getItem('frontUserid')
			},
			headportrait: localStorage.getItem('frontHeadportrait')?localStorage.getItem('frontHeadportrait'):'',
			Token: localStorage.getItem('frontToken'),
            username: localStorage.getItem('username'),
            notAdmin: localStorage.getItem('frontSessionTable')!='"users"',
			timer: '',
			iconArr: [
				'el-icon-star-off',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-question',
				'el-icon-info',
				'el-icon-help',
				'el-icon-picture-outline-round',
				'el-icon-camera-solid',
				'el-icon-video-camera-solid',
				'el-icon-video-camera',
				'el-icon-bell',
				'el-icon-s-cooperation',
				'el-icon-s-order',
				'el-icon-s-platform',
				'el-icon-s-operation',
				'el-icon-s-promotion',
				'el-icon-s-release',
				'el-icon-s-ticket',
				'el-icon-s-management',
				'el-icon-s-open',
				'el-icon-s-shop',
				'el-icon-s-marketing',
				'el-icon-s-flag',
				'el-icon-s-comment',
				'el-icon-s-finance',
				'el-icon-s-claim',
				'el-icon-s-opportunity',
				'el-icon-s-data',
				'el-icon-s-check'
			],
			bottomContent: '',
		}
    },
    created() {
		this.baseUrl = this.$config.baseUrl;
		this.menuList = this.$config.indexNav;
		this.getCarousel();
        if(localStorage.getItem('frontToken') && localStorage.getItem('frontToken')!=null) {
			this.getSession()
        }
    },
    mounted() {
        this.activeIndex = localStorage.getItem('keyPath') || '0';


		// banner
		setTimeout(()=>{
			let mySwiper22 = new Swiper(".mySwiper22", {"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"},"freeMode":true,"watchSlidesVisibility":true,"watchSlidesProgress":true,"loopedSlides":5,"slidesPerView":4,"spaceBetween":10,"autoplay":{"delay":2500}})
			let option21 = {"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"},"loopedSlides":5,"spaceBetween":10,"autoplay":{"delay":2500,"disableOnInteraction":false}}
			option21.thumbs = {
				swiper: mySwiper22
			}
			new Swiper(".mySwiper21", option21)
		}, 500)

    },
    computed: {
		activeMenu() {
			const route = this.$route
			const {
				meta,
				path
			} = route
			// if st path, the sidebar will highlight the path you sete
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
    },
    watch: {
        $route(newValue) {
            let that = this
            let url = window.location.href
            let arr = url.split('#')
            for (let x in this.menuList) {
                if (newValue.path == this.menuList[x].url) {
                    this.activeIndex = x
                }
            }
            this.Token = localStorage.getItem('frontToken')
            if(arr[1]!='/index/home'){
            	var element = document.getElementById('scrollView');
            	var distance = element.offsetTop;
            	window.scrollTo( 0, distance )
            }else{
            	window.scrollTo( 0, 0 )
            }
        },
		headportrait(){
			this.$forceUpdate()
		},
    },
    methods: {

		async getSession() {
			await this.$http.get(`${localStorage.getItem('UserTableName')}/session`, {emulateJSON: true}).then(async res => {
				if (res.data.code == 0) {
					localStorage.setItem('sessionForm',JSON.stringify(res.data.data))
					localStorage.setItem('frontUserid', res.data.data.id);
					if(res.data.data.vip) {
						localStorage.setItem('vip', res.data.data.vip);
					}
					if(res.data.data.touxiang) {
						this.headportrait = res.data.data.touxiang
						localStorage.setItem('frontHeadportrait', res.data.data.touxiang);
					} else if(res.data.data.headportrait) {
						this.headportrait = res.data.data.headportrait
						localStorage.setItem('frontHeadportrait', res.data.data.headportrait);
					}
				}
			});
		},
        handleSelect(keyPath) {
            if (keyPath) {
                localStorage.setItem('keyPath', keyPath)
            }
        },
		toLogin() {
		  this.$router.push('/login');
		},
        logout() {
            localStorage.clear();
            Vue.http.headers.common['Token'] = "";
            this.$router.push('/index/home');
            this.activeIndex = '0'
            localStorage.setItem('keyPath', this.activeIndex)
            this.Token = ''
            this.$forceUpdate()
            this.$message({
                message: '登出成功',
                type: 'success',
                duration: 1000,
            });
        },
		getCarousel() {
			this.$http.get('config/list', {params: { page: 1, limit: 3 }}).then(res => {
				if (res.data.code == 0) {
					this.carouselList = res.data.data.list;
				}
			});
		},
		// 轮播图跳转
		carouselClick(url) {
			if (url) {
				if (url.indexOf('https') != -1) {
					window.open(url)
				} else {
					this.$router.push(url)
				}
			}
		},
		goBackend() {
			localStorage.setItem('Token', localStorage.getItem('frontToken'));
			localStorage.setItem('role', localStorage.getItem('frontRole'));
			localStorage.setItem('sessionTable', localStorage.getItem('frontSessionTable'));
			localStorage.setItem('headportrait', localStorage.getItem('frontHeadportrait'));
			localStorage.setItem('userid', localStorage.getItem('frontUserid'));
			window.open(`${this.$config.baseUrl}admin/dist/index.html`, "_blank");
		},
		getChatList() {
			this.$http.get('chat/list', {params: { userid: localStorage.getItem('frontUserid'), sort: 'addtime', order: 'asc',limit: 1000 }}).then(res => {
				if (res.data.code == 0) {
					this.chatList = res.data.data.list;
                    let div = document.getElementsByClassName('chat-content')[0]
                    setTimeout(() => {
                        if (div)
                            div.scrollTop = div.scrollHeight
                    }, 0)
				}
			});
		},
		addChat() {
			this.$http.post('chat/add', this.form).then(res => {
				if (res.data.code == 0) {
					this.form.ask = '';
					this.getChatList();
				}
			});
		},
		chatClose() {
			clearInterval(this.timer);
			this.chatFormVisible = false;
		},
		goChat() {
            if(!localStorage.getItem('frontToken')) {
                this.toLogin();
                return;
            }
			this.chatFormVisible = true;
			this.timer = setInterval(this.getChatList, 2000);
		},
		goMenu(path) {
            this.$router.push(path);
		},
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.menu-preview {
	  .el-scrollbar {
	    height: 100%;
	  
	    & /deep/ .scrollbar-wrapper-vertical {
	      overflow-x: hidden;
	    }
	  
	    & /deep/ .scrollbar-wrapper-horizontal {
	      overflow-y: hidden;
	  
	      .el-scrollbar__view {
	        white-space: nowrap;
	      }
	    }
	  }
	}
	
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home {
				cursor: pointer;
				border: 1px solid #fff;
				padding: 0 12px;
				color: #7f7f7f;
				white-space: nowrap;
				display: flex;
				font-size: 16px;
				line-height: 66px;
				background: #fff;
				border-width: 0 0 4px;
				align-items: center;
				position: relative;
				list-style: none;
				height: 66px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home:hover {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home.is-active {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user {
				cursor: pointer;
				border: 1px solid #fff;
				padding: 0 12px;
				color: #7f7f7f;
				white-space: nowrap;
				display: none;
				font-size: 16px;
				line-height: 66px;
				background: #fff;
				border-width: 0 0 4px;
				align-items: center;
				position: relative;
				list-style: none;
				height: 66px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user:hover {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user.is-active {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service {
				cursor: pointer;
				border: 1px solid #fff;
				padding: 0 12px;
				color: #7f7f7f;
				white-space: nowrap;
				display: none;
				font-size: 16px;
				line-height: 66px;
				background: #fff;
				border-width: 0 0 4px;
				align-items: center;
				position: relative;
				list-style: none;
				height: 66px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service:hover {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service.is-active {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop {
				cursor: pointer;
				border: 1px solid #fff;
				padding: 0 12px;
				color: #7f7f7f;
				white-space: nowrap;
				display: none;
				font-size: 16px;
				line-height: 66px;
				background: #fff;
				border-width: 0 0 4px;
				align-items: center;
				position: relative;
				list-style: none;
				height: 66px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop:hover {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop.is-active {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back {
				cursor: pointer;
				border: 1px solid #fff;
				padding: 0 12px;
				color: #7f7f7f;
				white-space: nowrap;
				display: none;
				font-size: 16px;
				line-height: 66px;
				background: #fff;
				border-width: 0 0 4px;
				align-items: center;
				position: relative;
				list-style: none;
				height: 66px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back:hover {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back.is-active {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item {
				cursor: pointer;
				border: 1px solid #fff;
				padding: 0 12px;
				color: #7f7f7f;
				white-space: nowrap;
				display: flex;
				font-size: 16px;
				line-height: 66px;
				background: #fff;
				border-width: 0 0 4px;
				align-items: center;
				position: relative;
				list-style: none;
				height: 66px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item:hover {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item.is-active {
				border: 1px solid #FF961B;
				color: #FF961B;
				background: none;
				border-width: 0 0 4px;
			}
	
	.banner-preview {
	  .el-carousel /deep/ .el-carousel__indicator button {
	    width: 0;
	    height: 0;
	    display: none;
	  }
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: #F98805;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: #F98805;
	}

	.banner-preview .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0;
		z-index: 2;
		display: none;
		position: absolute;
		list-style: none;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 0.4;
		transition: 0.3s;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li:hover {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 0.7;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li.is-active {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 1;
		height: 12px;
	}

    .chat-content {
        padding-bottom: 20px;
        width: 100%;
        margin-bottom: 10px;
        max-height: 300px;
        height: 300px;
        overflow-y: scroll;
        border: 1px solid #eeeeee;
        background: #fff;

        .left-content {
            float: left;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }

        .right-content {
            float: right;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }
    }

    .clear-float {
        clear: both;
    }

	.swiper21 .swiper-button-prev:after {
      display:none;
    }
    .swiper21 .swiper-button-next:after {
      display:none;
    }
    .swiper22 .swiper-button-prev:after {
      display:none;
    }
    .swiper22 .swiper-button-next:after {
      display:none;
    }
	
	.swiper22 .swiper-slide div {
				width: 100%;
				opacity: 0.4;
				height: auto;
			}
	
	.swiper22 .swiper-slide.swiper-slide-thumb-active div {
				opacity: 1;
			}

	
	// -------- search --------
	.main-containers .search .select /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 30px 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	
	.main-containers .search .input /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	// -------- search --------
	
	.main-containers .btn-service {
				border: 0;
				cursor: pointer;
				padding: 0 0;
				margin: 0 0;
				z-index: 1003;
				color: #fff;
				font-size: 16px;
				line-height: 60px;
				top: calc(100% + 540px);
				left: 41%;
				background: none;
				width: auto;
				position: absolute;
				height: 60px;
			}
	
	.main-containers .btn-service:hover {
				color: #fff;
				background: none;
			}
	
	.main-containers .btn-shop {
				border: 0;
				cursor: pointer;
				padding: 0 0;
				margin: 0 0;
				z-index: 1003;
				color: #fff;
				font-size: 16px;
				line-height: 60px;
				top: calc(100% + 540px);
				left: 33%;
				background: none;
				width: auto;
				position: absolute;
				height: 60px;
			}
	
	.main-containers .btn-shop:hover {
				color: #fff;
				background: none;
			}
</style>
