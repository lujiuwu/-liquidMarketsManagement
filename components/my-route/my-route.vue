<template>
	<view class="my-route">
		<view class="transportations">
			<view v-for="(transportation,index) in route_datas_obj.transportations" :key="index" class="single-transportation">
				<view class="transportation-icon">
					<image :src="transportation.icon" class="transportation-image"></image>
				</view>
				<view class="transportation-font">
					<text class="transportation-text">
						{{transportation.text}}：{{transportation.distance?transportation.distance+'m':transportation.price+'元'}}
					</text>
				</view>
					
			</view>
		</view>
		<view class="ways">
			<!-- 先写死 -->
			<view class="ways-title">
				路线
			</view>
			<view class="ways-body">
				<view v-for="(way,index) in ways_list" :key="index" class="single-way">
					<view class="ways-points">
						<text class="ways-text">
							{{way.start}} -> {{way.end}} 
						</text>
					</view>
					<view class="ways-distance">
						<text class="ways-text">
							车程：{{way.distance}} m
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-route",
		data() {
			return {
				ways_list:[
					{
						start:"途径点一",
						end:"途径点二",
						distance:16.8
					},
					{
						start:"途径点二",
						end:"途径点三",
						distance:4.5
					}
				]
			};
		},
		props:{
			// 路线渲染数据
			route_datas_obj:{
				required:true,
				type:Object
			},
			// tab栏切换
			current:{
				required:true,
				type:Number,
				default:0
			}
		}
	}
</script>

<style lang="scss">
.my-route{
	display: flex;
	flex-direction: column;
	padding-top: 30rpx;
	.transportations{
		flex: 1;
		// background-color: #ccc;
		padding: 0 20rpx;
		.single-transportation{
			display: flex;
			margin-top: 10rpx;
			.transportation-icon{
				flex: 1;
				// background-color: pink;
				.transportation-image{
					width:40rpx;
					height: 40rpx;
				}
			}
			.transportation-font{
				flex: 12;
				display: flex;
				.transportation-text{
					align-self: center;
				}
			}
		}
	}
	.ways{
		flex: 3;
		display: flex;
		flex-direction: column;
		padding: 0 20rpx;
		margin-top: 40rpx;
		.ways-title{
			color: #b8b8b8;
			flex: 1;
			// background-color: #666;
		}
		.ways-body{
			flex: 9;
		
			.single-way{
				margin-top: 20rpx;
				border: 1px solid #eee;
				box-shadow: 6rpx 10rpx 6rpx #ccc;
				border-radius: 20rpx;
				height: 100rpx;
				display: flex;
				.ways-points{
					font-size: 32rpx;
					flex: 2;
					display: flex;
					padding-left: 30rpx;
					.ways-text{
						align-self: center;
					}
				}
				.ways-distance{
					font-size: 28rpx;
					flex: 1;
					color: #b8b8b8;
					display: flex;
					.ways-text{
						align-self: center;
					}
				}
			}
		}
	}
}
</style>