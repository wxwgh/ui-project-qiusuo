function UUID(){
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
				
	return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
}
//引入自定义通用方法脚本
import myCommon from '../../assets/plugins/common.js'
const rightlayer_store = {
	state: {
		layers_config:[
			{
				//图层唯一标识
				id:UUID(),
				//图层名称
				name:"图层名称1",
				// 图层类型
				index:50,
				//透明度
				opacity:70,
				//来源
				source:"运维管理系统"
			},
			{
				//图层唯一标识
				id:UUID(),
				//图层名称
				name:"图层名称2",
				// 图层类型
				index:50,
				//透明度
				opacity:70,
				//来源
				source:"运维管理系统"
			},
			{
				//图层唯一标识
				id:UUID(),
				//图层名称
				name:"图层名称3",
				// 图层类型
				index:50,
				//透明度
				opacity:70,
				//来源
				source:"运维管理系统"
			},
			{
				//图层唯一标识
				id:UUID(),
				//图层名称
				name:"图层名称4",
				// 图层类型
				index:50,
				//透明度
				opacity:70,
				//来源
				source:"运维管理系统"
			},
			{
				//图层唯一标识
				id:UUID(),
				//图层名称
				name:"图层名称5",
				// 图层类型
				index:50,
				//透明度
				opacity:70,
				//来源
				source:"运维管理系统"
			},
			{
				//图层唯一标识
				id:UUID(),
				//图层名称
				name:"图层名称6",
				// 图层类型
				index:50,
				//透明度
				opacity:70,
				//来源
				source:"运维管理系统"
			},
			{
				//图层唯一标识
				id:UUID(),
				//图层名称
				name:"图层名称7",
				// 图层类型
				index:50,
				//透明度
				opacity:70,
				//来源
				source:"运维管理系统"
			}
		]
	},
	actions: {},
	mutations: {
		//删除图层
		delete_rightlayer_config: function(state, post){
			for(let i=0;i<state.layers_config.length;i++){
				if(post.id===state.layers_config[i].id){
					state.layers_config.splice(i,1);
				}
			}
		},
		//上移图层
		up_rightlayer_config:function(state, post){
			for(let i=0;i<state.layers_config.length;i++){
				//如果是第一个元素 则说明此图层在最上层
				if(post.id===state.layers_config[i].id&&i==0){
					myCommon.get_message("该图层已在最上层");
					break;
				}else if(post.id===state.layers_config[i].id&&i!=0){
					state.layers_config.splice(i-1,0,state.layers_config[i]);
					state.layers_config.splice(i+1,1);
					break;
				}
			}
		},
		//下移图层
		down_rightlayer_config:function(state, post){
			for(let i=0;i<state.layers_config.length;i++){
				//如果是第一个元素 则说明此图层在最上层
				if(post.id===state.layers_config[i].id&&i==state.layers_config.length-1){
					myCommon.get_message("该图层已在最下层");
					break;
				}else if(post.id===state.layers_config[i].id&&i!=state.layers_config.length-1){
					state.layers_config.splice(i,0,state.layers_config[i+1]);
					state.layers_config.splice(i+2,1);
					break;
				}
			}
		},
		set_rightlayer_config:function(state, data){
			state.layers_config = data;
		}
	},
	getters:{
		get_rightlayer_config: (state) => {
			return state.layers_config;
		},
		
	}
}
export default rightlayer_store
