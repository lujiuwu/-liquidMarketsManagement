// 此文件用于自定义tabBar数组
// 第一个是监察者 -- superviser
const superviserTabBar = [
	{
		pagePath:"/pages/home/home",
		iconPath: "/static/tabbar/home.png",
		selectedIconPath: "/static/tabbar/home-active.png",
		text: '首页'
	},
	{
		pagePath: "/pages/map/map",
		iconPath: "/static/tabbar/search.png",
		selectedIconPath: "/static/tabbar/search-active.png",
		text: "监察"
	},
	{
		pagePath:"/pages/superviser/sup-problem/sup-problem",
		iconPath: "/static/tabbar/message.png",
		selectedIconPath: "/static/tabbar/message-active.png",
		text:"问题"
	},
	{
		pagePath:"/pages/my/my",
		iconPath: "/static/tabbar/my.png",
		selectedIconPath: "/static/tabbar/my-active.png",
		text: "我的"
	}
]
// 第二个是营业者 -- trader
const traderTabBar = [
	{
		pagePath:"/pages/trader/tra-business/tra-business",
		iconPath: "/static/tabbar/home.png",
		selectedIconPath: "/static/tabbar/home-active.png",
		text:"营业"
	},
	{
		pagePath:"/pages/map/map",
		iconPath: "/static/tabbar/place.png",
		selectedIconPath: "/static/tabbar/place-active.png",
		text:"摊位"
	},
	{
		pagePath:"/pages/trader/tra-message/tra-message",
		iconPath: "/static/tabbar/message.png",
		selectedIconPath: "/static/tabbar/message-active.png",
		text:"消息"
	},
	
	{
		pagePath:"/pages/my/my",
		iconPath: "/static/tabbar/my.png",
		selectedIconPath: "/static/tabbar/my-active.png",
		text:"我的"
	}
]

// 第三个是消费者 -- customer
const customerTabBar = [
	{
		pagePath:"/pages/home/home",
		iconPath: "/static/tabbar/home.png",
		selectedIconPath: "/static/tabbar/home-active.png",
		text:"首页"
	},
	{
		pagePath: "/pages/map/map",
		iconPath: "/static/tabbar/map.png",
		selectedIconPath: "/static/tabbar/map-active.png",
		text:"地图"
	},
	{
		pagePath:"/pages/customer/cus-message/cus-message",
		iconPath: "/static/tabbar/message.png",
		selectedIconPath: "/static/tabbar/message-active.png",
		text:"消息"
	},
	{
		pagePath:"/pages/my/my",
		iconPath: "/static/tabbar/my.png",
		selectedIconPath: "/static/tabbar/my-active.png",
		text:"我的"
	}
]

// 导出
export default {
	superviserTabBar,
	traderTabBar,
	customerTabBar
}