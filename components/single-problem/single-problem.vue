<template>
	<view class="single-problem">
		<!-- 第一行 -- 名称+状态 -->
		<view class="first-line">
			<view class="problem-shop">
				{{problem_obj.problem_shop}}
			</view>
			<view class="problem-status">
				{{problem_obj.problem_status}}
			</view>
		</view>
		<!-- 第二行 -->
		<view class="second-line">
			<view class="problem-image">
				<image :src="problem_obj.problem_image" class="plm-image"></image>
			</view>
			<view class="other-info">
				<view class="problem-title">
					<text>{{problem_obj.problem_title}}</text>
				</view>
				<view class="problem-code">
					<text>{{problem_obj.problem_code}}</text>
				</view>
				<view class="problem-address">
					<view class="address-icon">
						<u-icon name="map-fill" color="#ff2b2e" size="18"></u-icon>
					</view>
					<view class="address-text">
						<text>{{problem_obj.problem_address}}</text>
					</view>
					
				</view>
				<view class="problem-tags">
					<view v-for="(tag,index) in problem_obj.problem_tags" :key="index" class="single-tag">
						{{tag}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"single-problem",
		data() {
			return {
				
			};
		},
		props:{
			problem_obj:{
				type:Object,
				required:true
			}
		}
	}
</script>

<style lang="scss">
.single-problem{
	border-radius: 10px;
	border-bottom: 1px solid #ccc;
	border-top: 1px solid #ccc;
	padding: 20rpx;
	margin-top: 30rpx;
	.first-line{
		height: 50rpx;
		display: flex;
		margin-bottom: 10rpx;
		.problem-shop{
			flex: 1;
			font-weight: bold;
			font-size: 36rpx;
		}
		.problem-status{
			flex: 1;
			text-align: right;
			line-height: 50rpx;
			color: #1296db;
		}
	}
	.second-line{
		display: flex;
		.problem-image{
			flex: 1;
			// background-color: pink;
			margin-right: 20rpx;
			.plm-image{
				width: 200rpx;
				height: 200rpx;
			}
		}
		.other-info{
			flex: 3;
			// background-color: #ccc;
			display: flex;
			flex-direction: column;
			.problem-title{
				font-weight: bold;
				font-size: 32rpx;
			}
			.problem-code{
				margin-top: 36rpx;
				margin-bottom: 4rpx;
				font-size: 28rpx;
			}
			.problem-address{
				display: flex;
				.address-icon{
					flex: 1;
					display: flex;
					.icon{
						align-self: center;
					}
				}
				.address-text{
					flex: 10;
					font-size: 26rpx;
				}
			}
			.problem-tags{
				margin-top: 14rpx;
				display: flex;
				.single-tag{
					color: #1d58c6;
					margin-right: 10rpx;
					background-color: #9bcef4;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>