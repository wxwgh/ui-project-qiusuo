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
						<el-tooltip :content="data.label" placement="right-end" effect="light">
							<span class="layer_label">
								<span>{{node.label}}</span>
							</span>
						</el-tooltip>
						<el-switch v-model="get_switch_value" v-if="data.is_leaf">
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
				    label: 'label'
				}
			}
		},
		//计算属性
		computed: {
			get_configs: function(){
				return this.$store.getters.get_leftlayer_tree_config;
			},
			get_switch_value: function(){
				return this.$store.getters.get_switch_value;
			},
		},
		methods: {
			downLoadClick(post) {
				var map = this.myCommon.getMap();
				this.myCommon.unbindMapEvent(map);
				this.myCommon.switchMouseStyle(false, map);
				this.myCommon.clearOperation();
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
		@display_row_between();
	}
	.layer_label{
		flex:1;
	}
</style>
