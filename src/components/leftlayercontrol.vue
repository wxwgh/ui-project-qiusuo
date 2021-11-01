<template>
	<div class="leftlayer_parent" >
		<!-- 图层控制器头部 -->
		<div class="leftlayer_header">
			<div class="leftlayer_header_title">
				<span class="iconfont icon-zhuanti"></span>
				<span>图层控制器</span>
			</div>
		</div>
		<!-- 图层控制内容主体 -->
		<div class="leftlayer_main">
			<div>
				<el-tree :data="get_configs" :props="default_props" >
					<span class="custom-tree-node" slot-scope="{node,data}" >
						<!-- <el-tooltip :content="data.node_name" placement="right-end" effect="light" >
							<span class="layer_label">
								<span>{{data.node_name}}</span>
							</span>
						</el-tooltip>
						<span v-else>
							<span>{{data.node_name}}</span>
						</span> -->
						<span>
							<span>{{data.node_name}}</span>
						</span>
						<el-switch v-model="data.show_flag" v-if="data.is_leaf" @change="layer_offon(data)">
						</el-switch>
					</span>
				</el-tree>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'leftlayercontrol',
		data() {
			return {
				default_props:{
					children: 'children',
				    label: 'node_name'
				}
			}
		},
		//计算属性
		computed: {
			get_configs: function(){
				return this.$store.getters.get_leftlayer_tree_config;
			},
		},
		methods: {
			layer_offon(post) {
				let layer_group = this.$store.getters.get_layer_group;
				let map = this.$store.getters.map;
				if(post.show_flag){
					//添加图层
					this.$store.commit("update_layer_index");
					let layer_index = this.$store.getters.get_layer_index;
					let layer = L.supermap.tiledMapLayer(post.url,{ transparent: true, zIndex: layer_index,opacity:0.7}).addTo(map);
					post.layer = layer;
					post.layer_index=layer_index;
					//添加至右侧图层样式控制器
					this.$store.commit("add_rightlayer_config",post);
				}else{
					//删除图层
					this.$store.commit("delete_rightlayer_config",post);
					//删除左侧图层(关闭开关,删除图层)
					this.$store.commit("delete_leftlayer_config",post);
				}
			},
		},
	}
</script>

<style lang="less">
	//引入全局样式
	@import "../assets/less/style.less";
	
	.leftlayer_parent{
		height:80%;
		width:300px;
		position: absolute;
		left:1%;
		top:10%;
		z-index:2;
		@display_column_start();
		@common_background();
		&>div.leftlayer_header{
			line-height: 45px;
			font-weight:bold;
			text-align: center;
			background:@common_color;
			@display_column_start();
			align-items: center;
			&>div{
				width: 90%;
				@display_row_start();
				color:#fff;
				&>span:nth-child(1){
					font-size: 21px;
				}
				&>span:nth-child(2){
					font-size: 16px;
					margin-left: 2%;
				}
			}
		}
		&>div.leftlayer_main{
			overflow-y:auto;
			overflow-x: hidden;
			&>div{
			}
		}
	}
	// 图层树样式
	.el-tree-node__content{
		height: 45px!important;
	}
	.custom-tree-node{
		flex: 1;
		font-size: 15px;
		padding-right: 3%;
		@display_row_between();
	}
	.layer_label{
		flex:1;
	}
</style>
