<template>
	<view class="my-solve-problem">
    <view class="solve-duration-time solve">
		<text class="show-title">问题存在：</text>
    	<text class="show-time">2天</text>
    </view>
	<view class="solved solve" v-show="status==='已完成'">
		已经解决
	</view>
	<view class="solve-now solve" v-show="status!=='已完成'">
		确认解决
	</view>
	</view>
</template>

<script>
	export default {
		name:"my-solve-problem",
		data() {
			return {
				
			};
		},
		props:{
			status:{
				required:true,
				type:String
			}
		}
	}
</script>

<style lang="scss">
.my-solve-problem{
	display: flex;
	height: 100%;
	line-height: 100rpx;
	.solve{
		flex: 1;
		text-align: center;
		font-size: 34rpx;
	}
	.solve-duration-time{
		background-color: #fff;
		color: #1296db;
	}
	.solve-now{
		background-color: #1296db;
		color: #fff;
		letter-spacing: 4rpx;
	}
	.solved{
		background-color: #1296db;
		color: #fff;
		letter-spacing: 4rpx;
		opacity: 0.7;
		cursor: not-allowed;
	}
}
</style>