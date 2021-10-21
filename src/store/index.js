import Vue from 'vue'
import Vuex from 'vuex'
//地图主体 模块全局对象
import map_store from './modules/mapstore';
//右侧工具栏 全局对象
import righttool_store from './modules/righttoolstore';
//右侧图层样式控制器 全局对象
import rightlayer_store from './modules/rightlayerstore';
//左侧图层树 全局对象
import leftlayer_store from './modules/leftlayerstore';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {},
	actions: {},
	modules: {
		map_store:map_store,
		righttool_store:righttool_store,
		rightlayer_store:rightlayer_store,
		leftlayer_store:leftlayer_store,
	}
})
