<template>
	<div class="addEdit-block" :style='{"width":"calc(100vw - 270px)","padding":"30px","margin":"0 0 0 210px","background":"rgba(0,0,0,0.5)"}'>
		<el-form
			:style='{"borderRadius":"6px","padding":"30px","boxShadow":"none"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="180px"
		>
			<template >
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'" label="花卉编号" prop="huahuibianhao">
					<el-input v-model="ruleForm.huahuibianhao" placeholder="花卉编号" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-else-if="ruleForm.huahuibianhao" label="花卉编号" prop="huahuibianhao">
					<el-input v-model="ruleForm.huahuibianhao" placeholder="花卉编号" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="花卉名称" prop="huahuimingcheng">
					<el-input v-model="ruleForm.huahuimingcheng" placeholder="花卉名称" clearable  :readonly="ro.huahuimingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="花卉名称" prop="huahuimingcheng">
					<el-input v-model="ruleForm.huahuimingcheng" placeholder="花卉名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="select" v-if="type!='info'"  label="花卉种类" prop="huahuizhonglei">
					<el-select :disabled="ro.huahuizhonglei" v-model="ruleForm.huahuizhonglei" placeholder="请选择花卉种类" >
						<el-option
							v-for="(item,index) in huahuizhongleiOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="花卉种类" prop="huahuizhonglei">
					<el-input v-model="ruleForm.huahuizhonglei"
						placeholder="花卉种类" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="upload" v-if="type!='info' && !ro.huahuifengmian" label="花卉封面" prop="huahuifengmian">
					<file-upload
						tip="点击上传花卉封面"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.huahuifengmian?ruleForm.huahuifengmian:''"
						@change="huahuifengmianUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="upload" v-else-if="ruleForm.huahuifengmian" label="花卉封面" prop="huahuifengmian">
					<img v-if="ruleForm.huahuifengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.huahuifengmian.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.huahuifengmian.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="花卉规格" prop="huahuiguige">
					<el-input v-model="ruleForm.huahuiguige" placeholder="花卉规格" clearable  :readonly="ro.huahuiguige"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="花卉规格" prop="huahuiguige">
					<el-input v-model="ruleForm.huahuiguige" placeholder="花卉规格" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="date" v-if="type!='info'" label="上架日期" prop="shangjiariqi">
					<el-date-picker
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						v-model="ruleForm.shangjiariqi" 
						type="date"
						:readonly="ro.shangjiariqi"
						placeholder="上架日期"
					></el-date-picker> 
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-else-if="ruleForm.shangjiariqi" label="上架日期" prop="shangjiariqi">
					<el-input v-model="ruleForm.shangjiariqi" placeholder="上架日期" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="单限" prop="onelimittimes">
					<el-input v-model.number="ruleForm.onelimittimes" placeholder="单限" clearable  :readonly="ro.onelimittimes"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="单限" prop="onelimittimes">
					<el-input v-model="ruleForm.onelimittimes" placeholder="单限" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="库存" prop="alllimittimes">
					<el-input v-model.number="ruleForm.alllimittimes" placeholder="库存" clearable  :readonly="ro.alllimittimes"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="库存" prop="alllimittimes">
					<el-input v-model="ruleForm.alllimittimes" placeholder="库存" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="价格" prop="price">
					<el-input-number v-model="ruleForm.price" placeholder="价格" :readonly="ro.price"></el-input-number>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="价格" prop="price">
					<el-input v-model="ruleForm.price" placeholder="价格" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="textarea" v-if="type!='info'" label="相关话语" prop="xiangguanhuayu">
					<el-input
					  style="min-width: 200px; max-width: 600px;"
					  type="textarea"
					  :rows="8"
					  placeholder="相关话语"
					  v-model="ruleForm.xiangguanhuayu" >
					</el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="ruleForm.xiangguanhuayu" label="相关话语" prop="xiangguanhuayu">
					<span :style='{"border":"1px solid rgba(0,0,0,0.3)","padding":"0 10px","boxShadow":"0 0 6px rgba(0,0,0,0.3)","borderRadius":"4px","color":"#fff","background":"rgba(0,0,0,0.4)","display":"inline-block","fontSize":"14px","lineHeight":"40px","fontWeight":"500"}'>{{ruleForm.xiangguanhuayu}}</span>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-if="type!='info'"  label="花卉详情" prop="huahuixiangqing">
					<editor 
						style="min-width: 200px; max-width: 600px;"
						v-model="ruleForm.huahuixiangqing" 
						class="editor" 
						action="file/upload">
					</editor>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="ruleForm.huahuixiangqing" label="花卉详情" prop="huahuixiangqing">
                    <span :style='{"border":"1px solid rgba(0,0,0,0.3)","padding":"0 10px","boxShadow":"0 0 6px rgba(0,0,0,0.3)","borderRadius":"4px","color":"#fff","background":"rgba(0,0,0,0.4)","display":"inline-block","fontSize":"14px","lineHeight":"40px","fontWeight":"500"}' v-html="ruleForm.huahuixiangqing"></span>
                </el-form-item>
			<el-form-item :style='{"padding":"0","margin":"0"}' class="btn">
				<el-button class="btn3"  v-if="type!='info'" type="success" @click="onSubmit">
					<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
					提交
				</el-button>
				<el-button class="btn4" v-if="type!='info'" type="success" @click="back()">
					<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
					取消
				</el-button>
				<el-button class="btn5" v-if="type=='info'" type="success" @click="back()">
					<span class="icon iconfont icon-xihuan" :style='{"margin":"0 2px","fontSize":"14px","color":"#fff","height":"40px"}'></span>
					返回
				</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
			ro:{
				huahuibianhao : false,
				huahuimingcheng : false,
				huahuizhonglei : false,
				huahuifengmian : false,
				huahuiguige : false,
				xiangguanhuayu : false,
				shangjiariqi : false,
				huahuixiangqing : false,
				onelimittimes : false,
				alllimittimes : false,
				clicktime : false,
				clicknum : false,
				discussnum : false,
				price : false,
				storeupnum : false,
			},
			
			
			ruleForm: {
				huahuibianhao: this.getUUID(),
				huahuimingcheng: '',
				huahuizhonglei: '',
				huahuifengmian: '',
				huahuiguige: '',
				xiangguanhuayu: '',
				shangjiariqi: '',
				huahuixiangqing: '',
				onelimittimes: '1',
				alllimittimes: '1',
				clicktime: '',
				price: '',
			},
		
			huahuizhongleiOptions: [],

			
			rules: {
				huahuibianhao: [
				],
				huahuimingcheng: [
					{ required: true, message: '花卉名称不能为空', trigger: 'blur' },
				],
				huahuizhonglei: [
					{ required: true, message: '花卉种类不能为空', trigger: 'blur' },
				],
				huahuifengmian: [
				],
				huahuiguige: [
				],
				xiangguanhuayu: [
				],
				shangjiariqi: [
				],
				huahuixiangqing: [
				],
				onelimittimes: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				alllimittimes: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				clicktime: [
				],
				clicknum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				discussnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				price: [
					{ required: true, message: '价格不能为空', trigger: 'blur' },
					{ validator: validateNumber, trigger: 'blur' },
				],
				storeupnum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
    components: {
    },
	created() {
		this.ruleForm.shangjiariqi = this.getCurDate()
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
				for (var o in obj){
						if(o=='huahuibianhao'){
							this.ruleForm.huahuibianhao = obj[o];
							this.ro.huahuibianhao = true;
							continue;
						}
						if(o=='huahuimingcheng'){
							this.ruleForm.huahuimingcheng = obj[o];
							this.ro.huahuimingcheng = true;
							continue;
						}
						if(o=='huahuizhonglei'){
							this.ruleForm.huahuizhonglei = obj[o];
							this.ro.huahuizhonglei = true;
							continue;
						}
						if(o=='huahuifengmian'){
							this.ruleForm.huahuifengmian = obj[o];
							this.ro.huahuifengmian = true;
							continue;
						}
						if(o=='huahuiguige'){
							this.ruleForm.huahuiguige = obj[o];
							this.ro.huahuiguige = true;
							continue;
						}
						if(o=='xiangguanhuayu'){
							this.ruleForm.xiangguanhuayu = obj[o];
							this.ro.xiangguanhuayu = true;
							continue;
						}
						if(o=='shangjiariqi'){
							this.ruleForm.shangjiariqi = obj[o];
							this.ro.shangjiariqi = true;
							continue;
						}
						if(o=='huahuixiangqing'){
							this.ruleForm.huahuixiangqing = obj[o];
							this.ro.huahuixiangqing = true;
							continue;
						}
						if(o=='onelimittimes'){
							this.ruleForm.onelimittimes = obj[o];
							this.ro.onelimittimes = true;
							continue;
						}
						if(o=='alllimittimes'){
							this.ruleForm.alllimittimes = obj[o];
							this.ro.alllimittimes = true;
							continue;
						}
						if(o=='clicktime'){
							this.ruleForm.clicktime = obj[o];
							this.ro.clicktime = true;
							continue;
						}
						if(o=='clicknum'){
							this.ruleForm.clicknum = obj[o];
							this.ro.clicknum = true;
							continue;
						}
						if(o=='discussnum'){
							this.ruleForm.discussnum = obj[o];
							this.ro.discussnum = true;
							continue;
						}
						if(o=='price'){
							this.ruleForm.price = obj[o];
							this.ro.price = true;
							continue;
						}
						if(o=='storeupnum'){
							this.ruleForm.storeupnum = obj[o];
							this.ro.storeupnum = true;
							continue;
						}
				}
				









				this.ruleForm.onelimittimes = Number('1'); 
				this.ruleForm.alllimittimes = Number('1'); 




			}
			
			// 获取用户信息
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
				} else {
					this.$message.error(data.msg);
				}
			});
			
            this.$http({
				url: `option/huahuizhonglei/huahuizhonglei`,
				method: "get"
            }).then(({ data }) => {
				if (data && data.code === 0) {
					this.huahuizhongleiOptions = data.data;
				} else {
					this.$message.error(data.msg);
				}
            });
			
		},
    // 多级联动参数

    info(id) {
      this.$http({
        url: `huahuixinxi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        this.ruleForm.huahuixiangqing = this.ruleForm.huahuixiangqing.replace(reg,'../../../django2885fb37/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {
		if(this.ruleForm.huahuibianhao) {
			this.ruleForm.huahuibianhao = String(this.ruleForm.huahuibianhao)
		}
	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	if(this.ruleForm.huahuifengmian!=null) {
		this.ruleForm.huahuifengmian = this.ruleForm.huahuifengmian.replace(new RegExp(this.$base.url,"g"),"");
	}
	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }

	  if(this.ruleForm.price<0){
		this.$message.error("价格不能输入负数");
		return
	  }
	  if(this.ruleForm.alllimittimes<0){
		this.$message.error("库存不能输入负数");
		return
	  }
	  if(this.ruleForm.onelimittimes<0){
		this.$message.error("单次购买不能输入负数");
		return
	  }


var objcross = this.$storage.getObj('crossObj');

      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
		 if(crossrefid && crossuserid) {
			 this.ruleForm.crossuserid = crossuserid;
			 this.ruleForm.crossrefid = crossrefid;
			let params = { 
				page: 1, 
				limit: 10, 
				crossuserid:this.ruleForm.crossuserid,
				crossrefid:this.ruleForm.crossrefid,
			} 
			this.$http({ 
				url: "huahuixinxi/page", 
				method: "get", 
				params: params 
			}).then(({ 
				data 
			}) => { 
				if (data && data.code === 0) { 
				       if(data.data.total>=crossoptnum) {
					     this.$message.error(this.$storage.get('tips'));
					       return false;
				       } else {
					 this.$http({
					   url: `huahuixinxi/${!this.ruleForm.id ? "save" : "update"}`,
					   method: "post",
					   data: this.ruleForm
					 }).then(({ data }) => {
					   if (data && data.code === 0) {
					     this.$message({
					       message: "操作成功",
					       type: "success",
					       duration: 1500,
					       onClose: () => {
						 this.parent.showFlag = true;
						 this.parent.addOrUpdateFlag = false;
						 this.parent.huahuixinxiCrossAddOrUpdateFlag = false;
						 this.parent.search();
						 this.parent.contentStyleChange();
					       }
					     });
					   } else {
					     this.$message.error(data.msg);
					   }
					 });

				       }
				} else { 
				} 
			});
		 } else {
			 this.$http({
			   url: `huahuixinxi/${!this.ruleForm.id ? "save" : "update"}`,
			   method: "post",
			   data: this.ruleForm
			 }).then(({ data }) => {
			   if (data && data.code === 0) {
			     this.$message({
			       message: "操作成功",
			       type: "success",
			       duration: 1500,
			       onClose: () => {
				 this.parent.showFlag = true;
				 this.parent.addOrUpdateFlag = false;
				 this.parent.huahuixinxiCrossAddOrUpdateFlag = false;
				 this.parent.search();
				 this.parent.contentStyleChange();
			       }
			     });
			   } else {
			     this.$message.error(data.msg);
			   }
			 });
		 }
         }
       });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.huahuixinxiCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    huahuifengmianUploadChange(fileUrls) {
	    this.ruleForm.huahuifengmian = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #fff;
	  	  font-weight: 500;
	  	  width: 180px;
	  	  font-size: 14px;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 180px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 1px solid rgba(0,0,0,0.3);
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
	  	  border: 1px solid rgba(0,0,0,0.3);
	  	  border-radius: 4px;
	  	  padding: 0 12px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 0;
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  outline: none;
	  	  color: #000;
	  	  background: #fff;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 0;
	  	  border-radius: 4px;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  outline: none;
	  	  background: #fff;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 200px;
	  	  text-align: center;
	  	  height: 200px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 200px;
	  	  text-align: center;
	  	  height: 200px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  background: #fff;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 200px;
	  	  text-align: center;
	  	  height: 200px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 0;
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  box-shadow: 0 0 6px rgba(0,0,0,0.3);
	  	  outline: none;
	  	  background: #fff;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 120px;
	  	}
	
	.add-update-preview .btn .btn1 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn1:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn2 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn2:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn3 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn3:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn4 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn4:hover {
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn5 {
				border: 1px solid  rgba(0,0,0,0.3);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 24px;
				margin: 4px;
				outline: none;
				color: #fff;
				background:  rgba(0,0,0,0.3);
				width: auto;
				font-size: 14px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn5:hover {
				opacity: 0.8;
			}
</style>
