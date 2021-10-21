const righttool_store = {
	state: {
		//图层样式控制显隐 全局标识
		is_show_flag: true,
	},
	actions: {},
	mutations: {
		set_rightlayer_flag: (state, flag) => {
			state.is_show_flag = flag;
		},
	},
	getters: {
		get_rightlayer_flag: (state) => {
			return state.is_show_flag;
		},
	}
}
export default righttool_store
