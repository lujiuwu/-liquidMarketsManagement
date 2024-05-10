<template>
	<!-- 搜索栏 -->
	<view class="search-input">
		<u-search placeholder="开始搜索" v-model="keyword" :show-action="false" :height="38"></u-search>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:""
			};
		}
	}
</script>

<style lang="scss">

</style>
