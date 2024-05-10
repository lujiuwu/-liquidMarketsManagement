<template>
	<view>
		<u-notify message="登录成功" :show="show"></u-notify>
		<!-- 设置背景图片 -->
		<view class="bg-image">
			<image src="../../static/login-bg.png" class="image"></image>
		</view>
		<!-- <text>模拟登录页面</text> -->
		<!-- 直接上输入框 -->
		<view class="inputs">
			<view class="username">
				 <u--input
				    placeholder="请输入内容"
				    border="surround"
				    clearable
					:value="username"
					style="width: 400rpx;height: 66rpx;"
					 prefixIcon="account"
					 fontSize="16"

				  ></u--input>
			</view>
			<view class="password">
				 <u--input
				    placeholder="请输入内容"
				    border="surround"
				    clearable
					prefixIcon="lock"
					:value="password"
					style="width: 400rpx;height: 66rpx;"
					 fontSize="16"
				  ></u--input>
			</view>
		</view>
		<view class="button" @click="SupLogin">
			<u-button type="primary" text="登录" ></u-button>
		</view>
		
<!-- 	<button @click="SupLogin">监察者登录</button>
		<button @click="TraLogin">营业者登录</button>
		<button @click="CusLogin">消费者登录</button> -->
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				// 用户身份
				myRole:'',
				// 输入
				username:'admin',
				password:'123456',
				// 显示信息提示
				show: false
			};
		},
		methods:{
				...mapMutations('tabBar',['updateList']),
			// 测试用 -- 监察者身份 -- 渲染对应页面
			SupLogin(){
				this.myRole = 'superviser'
				// 本地存储用户类型
				uni.setStorageSync('userType',this.myRole)
			    this.updateList()
					// 跳转到监察者所显示的页面
					uni.switchTab({
						url:'/pages/home/home',
				})
				// 信息提示
				this.show = true
				
			},
			// 测试用 -- 营业者身份 -- 渲染对应页面
			TraLogin(){
				this.myRole = 'trader'
				// 本地存储用户类型
				uni.setStorageSync('userType',this.myRole)
				    this.updateList()
					// 跳转到营业者所显示的页面
					uni.switchTab({
						url:'/pages/trader/tra-business/tra-business',
					})
					
				
				console.log(uni.getStorageSync('userType'))
			},
			// 测试用 -- 监察者身份 -- 渲染对应页面
			CusLogin(){
				this.myRole = 'customer'
				// 本地存储用户类型
				uni.setStorageSync('userType',this.myRole)
				     this.updateList()
					// 跳转到消费者所显示的页面
					uni.switchTab({
						url:'/pages/home/home',
					})
					
				
				// console.log(uni.getStorageSync('userType'))
			}
		}
	}
</script>

<style lang="scss">
.bg-image{
	width: 100%;
	.image{
		width: 100%;
	}
}
.main-title{
	text-align: center;
	font-weight: bold;
	font-size: 42rpx;
	color: #1296db;
}
	
.inputs{
	padding: 50rpx;
	display: felx;
	.username,.password{
		flex: 1;
		display: flex;
		margin-bottom: 40rpx;
		font-size: 40rpx;
		
	}
}
.button{
	padding: 0 50rpx;
}

</style>
