<template>
	<view>
		<text>message</text>
		<my-tabbar :tabbarArr="getTabBar" :Value="1"></my-tabbar>
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
		}
	}
</script>

<style lang="scss">

</style>
