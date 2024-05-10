<template>
	<view class="tabbar-container">
		<u-tabbar
			:value="Value"
			:fixed="true"
			@change="changeTab"
		>
			<u-tabbar-item v-for="(item,index) in tabbarArr" :key="index"  :text="item.text" >
				<image class="bar_img" slot='active-icon' :src="item.selectedIconPath"></image>
				<image class="bar_img" slot='inactive-icon' :src="item.iconPath"></image>
			</u-tabbar-item>
			
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		name:"my-tabbar",
		data() {
			return {
				value:this.Value
			};
		},
		props:{
			// 通过传入的数组渲染tabbar栏
			tabbarArr:{
				required:true,
				type:Array
			},
			// 恍然大悟了 -- 由于切换后页面改变 -- value值会刷新为0 -- 所以需要一个props值接收外界传入的 value
			Value:{
				type:Number,
				required:true,
				default:0
			}
		},
		methods:{
			changeTab(val){
				this.value = val
				// console.log(this.value)
				// 一加上切换就有问题 我要死了 -- 2023.10.26 - 19:40
				uni.switchTab({
					url:this.tabbarArr[this.value].pagePath
				})
			}
		},
		watch:{
			Value(){
				this.value = Value
			}
		}
	}
</script>

<style lang="scss">
.bar_img{
		width: 45rpx;
		height: 45rpx;
	}

</style>