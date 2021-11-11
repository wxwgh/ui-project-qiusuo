const map_store = {

	state: {
		// 地图模块 全局map,底图layer,底图地址
		map:"",
		layer:"",
		url:"GaoDe.Normal.road",
		marker_group:""
	},
	actions: {},
	mutations: {
		set_map: (state, data) => {
			state.map = data;
		},
		set_layer: (state,data) => {
			state.layer = data;
		},
		set_marker_group: (state,marker_group) => {
			state.marker_group = marker_group;
		},
	},
	getters: {
		map: (state) => {
			return state.map;
		},
		map_url: (state) => {
			return state.url;
		},
		get_marker_group: (state,data) => {
			return state.marker_group;
		},
	}
}
export default map_store
