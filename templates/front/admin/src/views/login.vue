<template>
  <div>
    <div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":" url(http://codegen.caihongy.cn/20231204/37d896cc8d8749188848bac7045860b5.jpg)","display":"flex","width":"100%","backgroundSize":"cover","backgroundPosition":"center center","backgroundRepeat":"no-repeat","justifyContent":"center"}'>
      <el-form :style='{"border":"1px solid rgb(245, 240, 207)","padding":"20px","boxShadow":"10px 10px 10px rgba(0, 0, 0, 0.4)","margin":"0","background":" linear-gradient(45deg, #FDB813, #E66C0A, #E33181, #FFFFFF)","minWidth":"500px","textShadow":"2px 2px 4px rgba(106, 13, 173, 0.8","height":"auto"}'>
        <div v-if="true" :style='{"margin":"0 0 10px 0","fontFamily":"Arial","color":"#FFF","textAlign":"center","width":"100%","letterSpacing":"2px","lineHeight":"44px","fontSize":"20px","fontWeight":"700"}' class="title-container">基于Django花卉商城系统的设计与实现登录</div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"80%","margin":"0 auto 10px","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"width":"64px","lineHeight":"44px","fontSize":"16px","color":"white","fontWeight":"700"}'>用户名：</div>
          <input :style='{"border":"1px solid rgba(0,0,0,0.4)","padding":"0 10px","outlineOffset":"4px","borderRadius":"20px","color":"#808080","width":"80%","fontSize":"14px","height":"44px"}' placeholder="请输入用户名" name="username" type="text" v-model="rulesForm.username">
        </div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"80%","margin":"0 auto 10px","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"width":"64px","lineHeight":"44px","fontSize":"16px","color":"white","fontWeight":"700"}'>密码：</div>
          <input :style='{"border":"1px solid rgba(0,0,0,0.4)","padding":"0 10px","outlineOffset":"4px","borderRadius":"20px","color":"#808080","width":"80%","fontSize":"14px","height":"44px"}' placeholder="请输入密码" name="password" type="password" v-model="rulesForm.password">
        </div>

        <div :style='{"width":"80%","margin":"20px auto"}' v-if="roles.length>1" prop="loginInRole" class="list-type">
          <el-radio v-for="item in roles" v-bind:key="item.roleName" v-model="rulesForm.role" :label="item.roleName">{{item.roleName}}</el-radio>
        </div>

		
        <div :style='{"width":"80%","margin":"20px auto","alignItems":"center","justifyContent":"center","display":"flex"}'>
          <el-button v-if="loginType==1" :style='{"border":"1px solid rgba(247, 185, 2,0.8)","cursor":"pointer","padding":"0 24px","margin":"0 10px","outline":"none","color":"#ffffff","borderRadius":"4px","background":"rgba(247, 185, 2,0.8)","width":"auto","fontSize":"14px","height":"44px"}' type="primary" @click="login()" class="loginInBt">登录</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>
<script>
import menu from "@/utils/menu";
export default {
  data() {
    return {
		verifyCheck2: false,
		flag: false,
      baseUrl:this.$base.url,
      loginType: 1,
      rulesForm: {
        username: "",
        password: "",
        role: "",
      },
      menus: [],
      roles: [],
      tableName: "",
    };
  },
  mounted() {
    let menus = menu.list();
    this.menus = menus;

    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].hasBackLogin=='是') {
        this.roles.push(this.menus[i])
      }
    }

  },
  created() {

  },
  destroyed() {
	    },
  components: {
  },
  methods: {

    //注册
    register(tableName){
		this.$storage.set("loginTable", tableName);
		this.$router.push({path:'/register',query:{pageFlag:'register'}})
    },
    // 登陆
    login() {

		if (!this.rulesForm.username) {
			this.$message.error("请输入用户名");
			return;
		}
		if (!this.rulesForm.password) {
			this.$message.error("请输入密码");
			return;
		}
		if(this.roles.length>1) {
			if (!this.rulesForm.role) {
				this.$message.error("请选择角色");
				return;
			}

			let menus = this.menus;
			for (let i = 0; i < menus.length; i++) {
				if (menus[i].roleName == this.rulesForm.role) {
					this.tableName = menus[i].tableName;
				}
			}
		} else {
			this.tableName = this.roles[0].tableName;
			this.rulesForm.role = this.roles[0].roleName;
		}
		
		this.loginPost()
    },
	loginPost() {
		this.$http({
			url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
			method: "post"
		}).then(({ data }) => {
			if (data && data.code === 0) {
				this.$storage.set("Token", data.token);
				this.$storage.set("role", this.rulesForm.role);
				this.$storage.set("sessionTable", this.tableName);
				this.$storage.set("adminName", this.rulesForm.username);
				this.$router.replace({ path: "/" });
			} else {
				this.$message.error(data.msg);
			}
		});
	},
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
      background:  url(http://codegen.caihongy.cn/20231204/37d896cc8d8749188848bac7045860b5.jpg);
        
  .list-item /deep/ .el-input .el-input__inner {
		border: 1px solid rgba(0,0,0,0.4);
		border-radius: 20px;
		padding: 0 10px;
		color: #808080;
		width: 80%;
		font-size: 14px;
		outline-offset: 4px;
		height: 44px;
	  }
  
  .list-item.select /deep/ .el-select .el-input__inner {
		border: 1px solid rgba(64, 158, 255, 1);
		padding: 0 10px;
		box-shadow: 0 0 6px rgba(64, 158, 255, .5);
		outline: 1px solid #efefef;
		color: rgba(64, 158, 255, 1);
		width: 288px;
		font-size: 14px;
		outline-offset: 4px;
		height: 44px;
	  }
  
  .list-code /deep/ .el-input .el-input__inner {
  	  	border: 1px solid  rgba(0,0,0,0.4);
  	  	padding: 0 10px;
  	  	color: #808080;
  	  	width: calc(100% - 80px);
  	  	font-size: 14px;
  	  	height: 46px;
  	  }

  .list-type /deep/ .el-radio__input .el-radio__inner {
		background: rgba(53, 53, 53, 0);
		border-color: white;
	  }
  .list-type /deep/ .el-radio__input.is-checked .el-radio__inner {
        background: rgb(251, 189, 6);
        border-color: white;
      }
  .list-type /deep/ .el-radio__label {
		color: white;
		font-weight: 700;
		font-size: 16px;
	  }
  .list-type /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: rgb(251, 189, 6);
        font-weight: 700;
        font-size: 16px;
      }
}

</style>
