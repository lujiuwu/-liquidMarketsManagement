<template>
	<view>
		<text>business</text>
		<my-tabbar :tabbarArr="getTabBar" :Value="0"></my-tabbar>
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
