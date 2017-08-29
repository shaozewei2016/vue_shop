<template>
	<div class="list">
		<div class="nav">
			<span class="nav-title">购物车</span>
		</div>
		<ul class="table-title">
			<li>商品信息</li>
			<li>商品金额</li>
			<li>商品数量</li>
			<li>总金额</li>
			<li>编辑</li>
		</ul>
		<ul class="table-list">
			<li v-for="item in goodLists">
				<div>
					<a class="select" :class="{'active':item.checked}" @click="selectedProduct(item)"></a>
					<img v-bind:src="item.productImage"></img>
					<p>{{item.productName}}</p>
					<p>赠送：{{item.parts[0].partsName}}</p>
				</div>
				<div>{{item.productPrice|formatMoney}}</div>
				<div>
					<a href="javascript:;" @click="changeMoney(item,-1)">-</a><input type="text" v-model="item.productQuantity" readonly="readonly" />
					<a href="javascript:;" @click="changeMoney(item,1)">+</a>
				</div>
				<div>{{item.productPrice*item.productQuantity | Money('元')}}</div>
				<div @click="delconfirm(item)"><img src="../assets/del.png" /></div>
			</li>
		</ul>
		<ul class="table-all">
			<li>
				<a class="select" :class="{'active':checkAllflag}" @click="checkAll()"></a><span>全选</span></li>
			<li>总金额：{{totalPrice}}</li>
			<li><span>结账</span></li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'list',
		data() {
			return {
				goodLists: [],
				checkAllflag: false,
				totalPrice:0,
				currentitem:''
			};
		},
		mounted: function() {
			this.$nextTick(function() {
				this.cartView();
			})
		},
		methods: {
			cartView: function() {
				this.$http.get('/api/').then(res => {
					this.goodLists = res.data.data.result.list;
					console.log(this.goodLists);
				})
			},
			changeMoney: function(product, way) {
				if(way > 0) {
					product.productQuantity++
				} else {
					product.productQuantity--;
					if(product.productQuantity < 1) {
						product.productQuantity = 1;
					}
				}
				this.calPrice();
			},
			selectedProduct: function(item) {
				if(typeof item.checked == 'undefined') {
					this.$set(item, 'checked', true)
				} else {
					item.checked = !item.checked;
				}
				this.calPrice();
			},
			checkAll: function() {
				this.checkAllflag = !this.checkAllflag;
					this.goodLists.forEach((item, index) => {
						if(typeof item.checked == 'undefined') {
							this.$set(item, 'checked', this.checkAllflag)
						} else {
							item.checked =  this.checkAllflag;
						}
					})
				this.calPrice();
			},
			calPrice:function(){
				this.totalPrice=0;
				this.goodLists.forEach((item, index) => {
					if(item.checked){
						this.totalPrice+=item.productPrice*item.productQuantity
					}
				})
			},
			delconfirm:function(item){
				this.currentitem=item;
				var index=this.goodLists.indexOf(this.currentitem);
				this.goodLists.splice(index,1);
				this.calPrice();
			}
		},
		filters: {
			formatMoney: function(value) {
				return "￥" + value.toFixed(2);
			},
			Money: function(value, text) {
				return "￥" + value.toFixed(2) + text;
			}
		}
	}
</script>

<style>
	.list {
		width: 100%;
	}
	
	.nav {
		position: relative;
		text-align: center;
		margin: 40px 0;
	}
	
	.nav-title {
		position: relative;
		z-index: 2;
		background-color: #fff;
		padding: 0 0.2rem;
		font-size: 0.18rem;
	}
	
	.nav:before {
		position: absolute;
		top: 50%;
		left: 0;
		content: "";
		width: 100%;
		height: 1px;
		background: #ccc;
		z-index: 0;
	}
	
	.table-title {
		width: 100%;
		height: 0.5rem;
		line-height: 0.5rem;
		background-color: #696363;
		color: #fff;
	}
	
	.table-title li {
		display: table-cell;
		float: left;
		text-align: center;
	}
	
	.table-title li:nth-child(2),
	li:nth-child(3),
	li:nth-child(4),
	li:nth-child(5) {
		width: 12%;
	}
	
	.table-title li:first-child {
		width: 52%;
	}
	
	.table-list {
		background-color: #fff;
	}
	
	.table-list li {
		height: 0.8rem;
		padding: 0.2rem 0;
		border: 1px solid #ddd;
		border-top: none;
	}
	
	.select {
		display: inline-block;
		width: 0.15rem;
		height: 0.15rem;
		background: #FFFFFF;
		border-radius: 100%;
		border: 1px solid #ddd;
		float: left;
		margin: 0.31rem 0.4rem
	}
	
	.select.active {
		background-color: #42B983;
	}
	
	.table-list li div:first-child img {
		width: 0.79rem;
		height: 0.79rem;
		float: left;
	}
	
	.table-list li div:first-child p {
		color: #2C3E50;
		text-align: left;
		padding-left: 2.3rem;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	
	.table-list li div:first-child {
		float: left;
		width: 52%;
	}
	
	.table-list li div:nth-child(2),
	.table-list li div:nth-child(3),
	.table-list li div:nth-child(4),
	.table-list li div:nth-child(5) {
		float: left;
		width: 12%;
		text-align: center;
		padding: 0.3rem 0;
	}
	
	.table-list li div input {
		width: 0.3rem;
	}
	
	.table-list li div:nth-child(3) a {
		width: 0.3rem;
		display: inline-block;
		cursor: pointer;
	}
	
	.table-all li {
		float: left;
	}
	
	.table-all li:first-child span {
		margin: 0.28rem 0;
		display: inline-block;
	}
	
	.table-all li:nth-child(2) {
		width: 63%;
		text-align: right;
		padding: 0.28rem 0.4rem 0.28rem 0;
	}
	
	.table-all li:nth-child(3) {
		padding: 0.15rem 0;
	}
	
	.table-all li:nth-child(3) span {
		display: inline-block;
		width: 1.4rem;
		height: 0.4rem;
		background-color: #e35656;
		color: #fff;
		text-align: center;
		line-height: 0.4rem;
	}
</style>