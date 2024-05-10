// 此文件用于根据用户类型传出渲染所需的tabBar数组
// 1.首先导入三者的数组
import tabBar from '../utils/tabBar.js'
// 2.根据本地存储的 userType 判断当前登入的角色类型
let user_type = uni.getStorageSync('userType')
// 3.初始化数组
let tabBarType = user_type === 'superviser'?'superviserTabBar':user_type==='trader'?'traderTabBar':'customerTabBar'
// 导出仓库文件
export default {
	namespaced:true,
	state:()=>({
		list:tabBar[tabBarType]
	}),
	// 获取tabBar数组
	getters:{
		getTabBar(state){
			// console.log(state.list)
			return state.list
		}
	},
	mutations:{
		updateList(state){
			user_type = uni.getStorageSync('userType')
			tabBarType = user_type === 'superviser'?'superviserTabBar':user_type==='trader'?'traderTabBar':'customerTabBar'
			// console.log(tabBarType)
			state.list = tabBar[tabBarType]
		}
	}
	
}

