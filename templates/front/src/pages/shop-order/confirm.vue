<template>
  <div :style='{"width":"100%","padding":"0 10%","margin":"0 auto","position":"relative","background":"none"}'>
    <div class="section-title" :style='{"border":"1px solid #D3D3D3","margin":"10px 0","color":"#FF961B","textAlign":"center","background":"#fff","fontSize":"28px","lineHeight":"54px","fontWeight":"bold"}'>确认{{totalPrice>0?'下单':'预订'}}</div>
    <el-descriptions v-if="seat!=1" title="选择收货地址"></el-descriptions>
    <el-table v-if="seat!=1"
      :data="addressList"
      style="width: 100%;padding: 0 10px;">
      <el-table-column
        label="选择"
        width="55">
        <template slot-scope="scope">
          <el-radio
            v-model="radio"
            :label="scope.$index"
            @change.native="getCurrentRow(scope.$index)">
            &nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        label="收件人"
        prop="name">
      </el-table-column>
      <el-table-column
        label="联系方式"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="地址"
        prop="address">
      </el-table-column>
    </el-table>
	<div style="width:100%;display:flex;align-items:center;justify-content:center;margin:10px 0">
		<el-button type="success" @click="addAddress">添加收货地址</el-button>
	</div>
    <el-descriptions title="清单列表"></el-descriptions>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="商品名称">
        <template slot-scope="scope">
          <div class="shangpin">
            <el-image
              style="width: 100px; height: 100px"
              :src="baseUrl + scope.row.picture"
              fit="fill"></el-image>
            <span style="margin-left: 10px">{{ scope.row.goodname }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="totalPrice>0"
        label="价格">
        <template slot-scope="scope">
          <span v-if="type == 2">{{ scope.row.price }} 积分</span>
          <span v-else><span :style='{"fontSize":"12px"}'>￥</span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="seat==1"
        label="座位">
        <template slot-scope="scope">
          <span>{{ scope.row.activeSeat }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="seat!=1"
        label="数量">
        <template slot-scope="scope">
          <span>{{ scope.row.buynumber }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="totalPrice>0"
        label="总价">
        <template slot-scope="scope">
          <span v-if="type == 2">{{ scope.row.price * scope.row.buynumber }} 积分</span>
          <span v-else><span :style='{"fontSize":"12px"}'>￥</span>{{ changePrice(scope.row) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%;padding: 12px;box-sizing: border-box;display: flex;align-items: center;">
        <span style="width: 80px; font-size: 14px;">备注：</span><el-input type="textarea" v-model="remark" placeholder="备注" style="width: calc(100% - 80px);"></el-input>
    </div>
    <div class="buy" v-if="seat!=1 && tableData.length > 0">
      <template v-if="type == 2">
        <span style="color: red;margin-right: 10px;font-weight: 700;">总价：{{totalPrice}} 积分</span>
        <el-button type="warning" @click="jfClick">兑换</el-button>
      </template>
      <template v-else>
        <span style="color: red;margin-right: 10px;font-weight: 700;">总价：<span :style='{"fontSize":"12px"}'>￥</span>{{totalPrice}}</span>
        <el-button type="success" @click="payClick">支付</el-button>
      </template>
    </div>
    <div class="buy" v-if="seat==1 && tableData.length > 0">
      <template v-if="type == 2">
        <span style="color: red;margin-right: 10px;font-weight: 700;">总价：{{totalPrice}} 积分</span>
        <el-button type="success" @click="xzJfClick">兑换</el-button>
      </template>
      <template v-else>
        <span style="color: red;margin-right: 10px;font-weight: 700;" v-if="totalPrice>0">总价：<span :style='{"fontSize":"12px"}'>￥</span>{{totalPrice}}</span>
        <el-button type="success" @click="xzPayClick">{{totalPrice>0?'支付':'预订'}}</el-button>
      </template>
    </div>
  </div>
</template>

<script>
import config from '@/config/config'
export default {
    data() {
		return {
			baseUrl: config.baseUrl,
			userTableName: localStorage.getItem('UserTableName'),
			addressList: [],
			tableData: [],
			currentRow: null,
			radio: -1,
			order: {
				address: "",
				buynumber: 0,
				consignee: '',
				discountprice: 0,
				discounttotal: 0,
				goodid: 0,
				goodname: "",
				orderid: "",
				picture: "",
				price: 0,
				status: "未支付",
				tablename: "",
				tel: "",
				total: 0,
				type: 1,
				userid: localStorage.getItem('frontUserid')
			},
			user: {},
			type: 0,
			seat: 0,
			buynumber: 0,
			remark:'',
			orderIdList: {},
		}
    },
    created() {
		if(this.$route.query.type != undefined) {
			this.type = this.$route.query.type;
		}
		if(this.$route.query.seat != undefined) {
			this.seat = this.$route.query.seat;
		}
		if(this.$route.query.tablename != undefined) {
			this.order.tablename = this.$route.query.tablename;
		}
		this.getSession();
		this.getAddrList();
		// 获取商品购买的清单列表
		var orderGoods = localStorage.getItem('orderGoods')
		// 转换成json类型，localstorage保存的是string数据
		this.tableData = JSON.parse(orderGoods);
		this.type = this.$route.query.type;
    },
    methods: {
		changePrice(row){
			let price = row.price * row.buynumber
			row.total = (price).toFixed(2)
			return (price).toFixed(2)
		},
		getSession() {
			if(!this.userTableName){
				this.$router.push('/login');
				return false
			}
			this.$http.get(`${this.userTableName}/session`, {emulateJSON: true}).then(res => {
				if (res.data.code == 0) {
					this.user = res.data.data;
				}
			});
		},
		getCurrentRow(index) {
			this.radio = index;　
		},
		getAddrList() {
			this.$http.get('address/list', {params: {userid: localStorage.getItem('frontUserid')}}).then(res => {
				if (res.data.code == 0) {
					this.addressList = res.data.data.list;
					this.addressList.forEach((item, index) => {
						if (item.isdefault == '是') {
							this.radio = index;
						}
					});
				}
			});
		},
		addAddress(){
			this.$router.push('/index/shop-address/addOrUpdate');
		},
		getCartList() {
			this.$http.get('cart/list', {params: {page: 1, limit: 1000, userid: localStorage.getItem('frontUserid')}}).then(res => {
				if (res.data.code == 0) {
					this.tableData = res.data.data.list;
					if (this.$route.query.id != undefined || this.$route.query.type != undefined) {
						this.tableData = [];
						this.buynumber = this.$route.query.buynumber;
						let detailObj = JSON.parse(this.$route.query.detailObj);
						this.order.tablename = this.$route.query.tablename;
						if (this.$route.query.type == 1) {
							this.tableData.push({
								buynumber: this.buynumber,
								goodid: detailObj.id,
								picture: this.$route.query.picture,
								goodname: this.$route.query.goodname,
								goodtype: this.$route.query.goodtype,
								tablename: this.$route.query.tablename,
								userid: localStorage.getItem('frontUserid'),
								price: this.$route.query.price
							});
						}
						if (this.$route.query.type == 2) {
							this.tableData.push({
								buynumber: this.buynumber,
								goodid: detailObj.id,
								picture: this.$route.query.picture,
								goodname: this.$route.query.goodname,
								tablename: this.$route.query.tablename,
								userid: localStorage.getItem('frontUserid'),
								jf: detailObj.jf
							});
						}
					}
				}
			});
		},
		handleChange(value, index, goodid) {
			this.$http.get(`${this.order.tablename}/detail/${goodid}`).then(res => {
				if (res.data.code == 0 && value > res.data.data.onelimittimes) {
					this.tableData[index].buynumber = --value;
					this.$message.error(`每人单次只能购买${res.data.data.onelimittimes}件`);
				}
			});
		},
        // 正常下单，生成订单，减少余额，添加积分，减少库存，修改状态已支付
         payClick() {
			let that = this
            if (this.radio == -1) {
				this.$message({
					message: '请选择收货地址',
					type: 'error',
					duration: 1500
				});
				return;
            }
            // 生成订单
            for(let index in this.tableData){
				let item = this.tableData[index]
				setTimeout(()=>{
					
                // 获取商品详情信息
                 this.$http.get(`${item.tablename}/info/${item.goodid}`).then( res => {
                    // 订单编号
                    this.orderIdList['orderId' + Number(index)] = String(this.createOrder())
                    let data = res.data.data;
                    data.alllimittimes = data.alllimittimes - item.buynumber;
                    // 更新库存信息
                     this.$http.post(`${item.tablename}/update`, data).then( res => {
                        // 添加订单信息
                        let order = {
                            orderid: this.orderIdList['orderId' + Number(index)],
                            tablename: item.tablename,
                            userid: this.user.id,
                            goodid: item.goodid,
                            goodname: item.goodname,
                            goodtype: item.goodtype,
                            picture: item.picture,
                            buynumber: item.buynumber,
                            discountprice: item.price,
                            price: item.price,
                            total: Number(item.total),
                            discounttotal: Number(item.total),
                            type: this.type?Number(this.type):1,
                            //total: this.totalPrice,
                            address: this.addressList[this.radio].address,
                            tel: this.addressList[this.radio].phone,
                            consignee: this.addressList[this.radio].name,
                            remark: this.remark,
                            status: '未支付',
							sfsh: '',
							role: this.userTableName,
                        }
						this.$http.post('orders/add', order).then( res => {
                            // 减少余额，更新订单状态
                            // 判断余额是否充足
                            if (Number(this.user.money) < Number(item.total)) {
                                this.$message({
                                    message: '余额不足，请先充值',
                                    type: 'error',
                                    duration: 1500,
								onClose(){
									that.$router.push('/index/center')
								}
                                });
                                return
                            }
                            // 如果该商品存在积分
                            if (data.jf) {
                                this.user.jf = Number((Number(this.user.jf) + Number(item.total)).toFixed(2))
                            }
                            this.user.money = Number((Number(this.user.money) - Number(item.total)).toFixed(2))
                            // 更新用户余额
                            this.$http.post(`${this.userTableName}/update`, this.user).then(res => {
								localStorage.setItem('sessionForm',JSON.stringify(this.user))
                                order.status = '已支付'
                                var params = {
                                    orderid: this.orderIdList['orderId' + Number(index)],
                                    page: 1,
                                    limit: 1,
                                }
                                this.$http.get('orders/list', {params: params}).then(res => {
                                    order.id = res.data.data.list[0].id;
                                    this.$http.post(`orders/update`, order).then(res => {
                                        // 删除购物车数据(如果是购物车下单)
                                        if (item.id) {
                                            this.$http.post('cart/delete', [item.id]).then(res => {});
                                        }
                                        this.$message({
											message: '购买成功',
											type: 'success',
											duration: 1500,
											onClose: () => {
                                                this.$router.push('/index/shop-order/order');
											}
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
				},500)
            }
        },
		createOrder() {
			let order = '';
			let now = new Date();
			order += now.getFullYear();
			order += now.getMonth() + 1;
			order += now.getDate();
			order += now.getHours();
			order += now.getMinutes();
			order += now.getSeconds();
			order += now.getMilliseconds();

			return order;
		}
    },
    computed: {
		totalPrice() {
			let totalPrice = 0;
			this.tableData.forEach(item => {
				totalPrice += item.price * item.buynumber;
			});
			return totalPrice.toFixed(2);
		},
		totalJifen() {
			let totalJifen = 0;
			this.tableData.forEach(item => {
				totalJifen += parseInt(item.jf * this.buynumber);
			});

			return totalJifen;
		}
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .section {
    width: 900px;
    margin: 0 auto;
  }

  .shangpin {
    display: flex;
  }
  .buy {
    text-align: right;
    padding-right: 82px;
  }
</style>
