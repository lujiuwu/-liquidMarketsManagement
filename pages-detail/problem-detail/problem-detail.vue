<template>
	<view class="problem-detail">
		<!-- 第一部分 -- 店铺背景图 -->
		<view class="bg-image">
			<image :src="problem.problem_image" class="problem_image"></image>
			<!-- 第二部分 -- 问题标题 -->
			<view class="problem_title">
				{{problem.problem_title}}
			</view>
		</view>
		
		<!-- 第三部分 -- 详细介绍 -->
		<view class="detail_des">
			<!-- 设置tab栏 问题信息分层展示 -->
			<view class="show_tabs">
				<u-tabs :list="list" overlay="false" :is-scroll="false" :current="current" @click="Detailchange"
						itemStyle="width:50%;padding:20rpx 0;color:#fff;" :activeStyle="{
					color: '#000', 
					fontSize:'32rpx',
					fontWeight:'bold'
				}" lineWidth="0" :inactiveStyle="{
					color:'#242424',
					fontSize:'32rpx'
				}" :scrollable="false">
				</u-tabs>
			</view>
			<!-- 界面 -->
			<!-- 详情界面 -->
			<view class="detail_massage" v-show="current==0">
				<view class="problem_submit single_message">
					<text class="message_name">提交人员：</text>
					<my-submit :submit_info="submit_info"></my-submit>
				</view>
				<view class="problem_shop single_message">
					<text class="message_name">店铺名称：</text>
					<text class="message_content">{{problem.problem_shop}}</text> 
				</view>
				<view class="probelem_time single_message">
					<text class="message_name">提交时间：</text>
					<text class="message_content">{{problem.problem_time}}</text> 
				</view>
				<view class="problem_code single_message">
					<text class="message_name">问题编号：</text>
					<text class="message_content">{{problem.problem_code}}</text>
					
				</view>
				<view class="probelem_status single_message">
					<text class="message_name">问题状态：</text>
					<text class="message_content">{{problem.problem_status}}</text>				
				</view>
				<view class="probelem_tags single_message">
					<text class="message_name">问题内容：</text>
					<view v-for="(tag,index) in problem.problem_tags" :key="index" class="single-tag">
						{{tag}}
					</view>
				</view>
				<view class="probelem_proof single_message">
					<text class="message_name">佐证材料：</text>
					<view class="proof" v-show="problem.problem_proof">
						<view class="single_proof" v-for="(proof,index) in problem.problem_proof" >
							<image :src="proof" class="proof_image" @click="previewPhoto(index)"></image>
						</view>
						
					</view>
					<text v-show="!problem.problem_proof">暂无</text>
				</view>
			</view>
			<!-- 地址页面 -->
			<view class="map" v-show="current==1">
				<map class="page-section"  :layer-style='5' :style="{'height': '1000rpx'}"  :show-location='true'  :latitude="map_info.latitude" :longitude="map_info.longitude" :markers="map_info.marker" :scale="scale"  @markertap="markertap"   @callouttap='callouttap'>
				   
				</map>
			</view>
			
		</view>
		<!-- 第四部分 -- 底部解决栏 -->
		<view class="solve-problem">
			<my-solve-problem :status="problem.problem_status"></my-solve-problem>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				problem:{},
				// tab栏数据
				list:[
					{name:"详情"},
					{name:"地址"}
				],
				current:0,
				// 传输给提交者详情的数据
				submit_info:{
					submit_avatar:"../../pages-detail/static/avatar.png",
					submit_name:"张三",
					submit_identity:"监察者"
				},
				// 店铺定位
				map_info:{
					latitude:30.826461, //纬度
					longitude:104.184441,//经度s
					marker: [
					    {
					        id:0,
					        latitude: 30.826461,//纬度
					        longitude: 104.184441,//经度
					        iconPath: '',    //显示的图标        
					        rotate:0,   // 旋转度数
					        width:20,   //宽
					        height:30,   //高
					        //   title:'我在这里',//标注点名
					        alpha:0.5,   //透明度
					        callout:{//自定义标记点上方的气泡窗口 点击有效
					            content:'天天烤鸭',//文本
					            color:'#ffffff',//文字颜色
					            fontSize:13,//文本大小
					            // borderRadius:15,//边框圆角
					            borderWidth:'10',
					            bgColor:'#e51860',//背景颜色
					            display:'ALWAYS',//常显
					                },
					    }
					                   
					]
							
				}
			};
		},
		onLoad(options) {
			this.problem = JSON.parse(options.problem_detail)
			console.log(this.problem)
		},
		methods:{
			// 切换tab栏
				Detailchange(index) {
				// 根据tabs的切换改变下方渲染的内容
				this.current = index.index;
			},
			previewPhoto(index){
				const proof = this.problem.problem_proof
				console.log(proof)
				uni.previewImage({
					urls:proof,
					current:index,
					loop:true   // 是否可循环预览
				})
			}
		}
	}
</script>

<style lang="scss">
.problem-detail{
	padding-bottom: 200rpx;
	margin-bottom: 100rpx;
	.preview-box{
		height: 100px;
		width: 100px;
		background-color: #fff;
	}
	.bg-image{
		position: relative;
		height: 350rpx;
		overflow: hidden;
		.problem_image{
			width: 100%;
			// 调暗 -- 适合背景
			filter: brightness(65%);
		}
		.problem_title{
			position: absolute;
			bottom: 20rpx;
			left: 20rpx;
			color:#fff;
			font-size: 40rpx;
		}
		.probelem_proof{
			.proof{
				display: flex;
				.single_proof{
					width: 200rpx;
					height: 200rpx;
				}
			}
			.preview-box{
				background-color: pink;
			}
			
		}
	}
	
	.detail_des{
		.show_tabs{
			border-bottom: 1px solid #ccc;
		}
	}
	.detail_massage{
		padding: 40rpx 20rpx;
		.single_message{
			margin-bottom: 20rpx;
			font-size: 32rpx;
			.message_name{
				font-weight: bold;
				
			}
			.message_content{
				padding-left: 6rpx;
			}
		}
		.probelem_time,
		.probelem_tags{
			border-bottom: 1px solid #ccc;
			padding-bottom: 20rpx;
			margin-bottom: 50rpx;
		}
		
		.probelem_tags{
			display: flex;
			.single-tag{
				color: #1d58c6;
				margin-right: 10rpx;
				background-color: #9bcef4;
				font-size: 30rpx;
			}
		}
		.probelem_proof{
				
			.proof{
				margin-top: 20rpx;
				display: flex;
				.single_proof{
					width: 200rpx;
					height: 200rpx;
					margin-right: 20rpx;
					.proof_image{
						width: 100%;
						height: 100%;
					}
				}
			}
			
		}
	}
	.map{
		.page-section{
			width: 100%;
		}
	
	}
	.solve-problem{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
	}
}
</style>
