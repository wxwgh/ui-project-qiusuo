//引入自定义通用方法脚本
import myCommon from '../../assets/plugins/common.js'
const rightlayer_store = {
	state: {
		layers_config:[],
	},
	actions: {},
	mutations: {
		//更新图层透明度
		update_rightlayer_opacity(state){
			for(let i=0;i<state.layers_config.length;i++){
				if(state.layers_config[i].url_type=="vector"){
					let layers = state.layers_config[i].layer.getLayers();
					for(let j =0;j<layers.length;j++){
						layers[j].setOpacity((state.layers_config[i].opacity/100).toFixed(1));
					}
				}else if(state.layers_config[i].url_type=="supermap-rest"){
					state.layers_config[i].layer.setOpacity((state.layers_config[i].opacity/100).toFixed(1));
				}
			}
		},
		//重新排列图层
		index_rightlayer_config(state){
			for(let i=0;i<state.layers_config.length;i++){
				state.layers_config[i].layer_index = state.layers_config.length-i;
				if(state.layers_config[i].url_type=="vector"){
					$("."+state.layers_config[i].id).css({
						zIndex:state.layers_config[i].layer_index
					})
				}else if(state.layers_config[i].url_type=="supermap-rest"){
					state.layers_config[i].layer.setZIndex(state.layers_config[i].layer_index);
				}
			}
		},
		//添加图层
		add_rightlayer_config:function(state, post){
			state.layers_config.unshift(post);
		},
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
					//交换layer_index
					let temp_index = post.layer_index;
					post.layer_index=state.layers_config[i-1].layer_index;
					state.layers_config[i-1].layer_index=temp_index;
					state.layers_config.splice(i-1,0,state.layers_config[i]);
					state.layers_config.splice(i+1,1);
					for(let i=0;i<state.layers_config.length;i++){
						if(state.layers_config[i].url_type=="vector"){
							$("."+state.layers_config[i].id).css({
								zIndex:state.layers_config[i].layer_index
							})
						}else{
							state.layers_config[i].layer.setZIndex(state.layers_config[i].layer_index);
						}
					}
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
					//交换layer_index
					let temp_index = post.layer_index;
					post.layer_index=state.layers_config[i+1].layer_index;
					state.layers_config[i+1].layer_index=temp_index;
					state.layers_config.splice(i,0,state.layers_config[i+1]);
					state.layers_config.splice(i+2,1);
					for(let i=0;i<state.layers_config.length;i++){
						if(state.layers_config[i].url_type=="vector"){
							$("."+state.layers_config[i].id).css({
								zIndex:state.layers_config[i].layer_index
							})
						}else{
							state.layers_config[i].layer.setZIndex(state.layers_config[i].layer_index);
						}
					}
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
