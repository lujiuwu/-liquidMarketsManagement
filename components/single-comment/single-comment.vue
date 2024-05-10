<template>
	<view class="single-comment">
		<view class="user-info">
			<view class="user-avatar">
				<image :src="avatar" class="avatar-img"></image>
			</view>
			<view class="other-info">
				<view class="user-name">
					{{name}}
				</view>
				<view class="time">
					{{time}}
				</view>
			</view>
			
		</view>
		<view class="user-rate">
			<u-rate :count="5" :value="rate"  :readonly="true" :size="20" :active-color="'#fae357'"></u-rate>
		</view>
		<view class="user-tag">
			#{{tag}}
		</view>
		<view class="comment-content">
			{{content}}
		</view>
	</view>
</template>

<script>
	export default {
		name:"single-comment",
		data() {
			return {
				
			};
		},
		props:{
			// 头像可选 / 默认头像
			avatar:{
				type:String
			},
			name:{
				type:String,
				required:true
			},
			time:{
				type:String,
				required:true
			},
			rate:{
				type:Number,
				required:true
			},
			content:{
				type:String,
				required:true
			},
			tag:{
				type:String,
				required:true
			},
			// 图片可选
			image:{
				type:String
			}
			
		}
	}
</script>

<style lang="scss">
.single-comment{
	padding: 30rpx;
	.user-info{
		display: flex;
		height: 80rpx;
		.user-avatar{
			flex: 1;
			.avatar-img{
				width: 80rpx;
				height: 80rpx;
				border-radius: 100px;
			}
		}
		.other-info{
			flex:6;
			display: flex;
			flex-direction: column;
			.user-name{
				flex: 1;
				font-size: 36rpx;
				font-weight: bold;
			}
			.time{
				flex: 1;
				color: #666;
			}
		}
	}
	.user-rate{
		margin-top: 20rpx;
	}
	.user-tag{
		margin-top: 24rpx;
		font-size: 34rpx;
		color: #00aaff;
	}
	.comment-content{
		margin-top: 24rpx;
	}
}
</style>