<template>
	<view>

			<text>public my page</text>
			<my-tabbar :tabbarArr="getTabBar" :Value="3"></my-tabbar>
            <button @click="gotoLogin">退出登录</button>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('tabBar',['getTabBar'])
		},
		methods:{
			gotoLogin(){
				uni.switchTab({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
