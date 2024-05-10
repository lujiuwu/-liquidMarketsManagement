
import Vue, { vModelCheckbox } from 'vue'
import Vuex from 'vuex'
// 导入存储tabBar数组的仓库
import moduleTabBar from './tabBar.js'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules:{
		// 挂载
		'tabBar':moduleTabBar
	}
})
export default store