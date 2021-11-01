<template>
	<transition tag="div" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
		<div class="rightlayer_parent" v-if="get_flag">
			<!-- 图层样式控制器 头部 -->
			<div class="rightlayer_header">
				<div>
					<span class="iconfont icon-ic_satellite_px"></span>
					<span>图层样式控制器</span>
				</div>
			</div>
			<!-- 图层样式控制器 内容主体 -->
			<div class="rightlayer_main">
				<draggable tag="div" v-model="get_layers" v-bind="dragOptions" @end="leftlayer_end()">
					<transition-group name="rightlayer-list" tag="div" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
						<div v-for="post in get_layers" 
							:key="post.id"
							aria-hidden="true">
							<div class="main_header">
								<div class="main_header_title">
									<span class="iconfont icon-ic_satellite_px"></span>
									<span>{{post.node_name}}</span>
								</div>
								<div class="main_header_button">
									<div v-if="post.opacity_flag">
										<span class="el-icon-close" @click="index_close(post)"></span>
									</div>
									<div v-else>
										<span class="el-icon-check" @click="index_check(post)"></span>
									</div>
									<div>
										<span class="el-icon-top" @click="index_up(post)"></span>
									</div>
									<div>
										<span class="el-icon-bottom" @click="index_down(post)"></span>
									</div>
									<div>
										<span class="el-icon-delete" @click="index_delete(post)"></span>
									</div>
								</div>
								
							</div>
							<div class="main_main" >
								<div>
									<span class="el-icon-document"></span>
									<span>透明度：</span>
									<el-slider v-model="post.opacity" input-size="mini" @input="rightlayer_input()"></el-slider>
								</div>
							</div>
						</div>
					</transition-group>
				</draggable>
			</div>
		</div>
	</transition>
</template>

<script>
	//引入vue 组件拖拽组件
	import draggable from 'vuedraggable';
	export default {
		name: 'rightlayercontrol',
		data() {
			return {
			}
		},
		components: {
			draggable,
		},
		//计算属性
		computed: {
			get_flag: function() {
				return this.$store.getters.get_rightlayer_flag;
			},
			get_layers: {
				get() {
					return this.$store.getters.get_rightlayer_config
				},
				set(value) {
					this.$store.commit('set_rightlayer_config', value);
				}
			},
			dragOptions() {
				return {
					animation: 0,
					group: "description",
					disabled: false,
					ghostClass: "ghost"
				};
			},
		},
		methods: {
			//滑块移动事件
			rightlayer_input(value){
				//更新图层透明度
				this.$store.commit("update_rightlayer_opacity");
				
			},
			//图层上移
			index_up(post){
				//调用图层上移方法
				this.$store.commit("up_rightlayer_config",post);
			},
			//图层下移
			index_down(post){
				//调用图层下移方法
				this.$store.commit("down_rightlayer_config",post);
			},
			//图层删除(实际是隐藏图层,并将左侧图层树 控制显隐开关 置为 关闭)
			index_delete(post){
				var $this = this;
				this.$confirm('图层删除后需重新添加, 是否继续?', '删除图层', {
				    confirmButtonText: '确定',
				    cancelButtonText: '取消',
				    type: 'warning'
				}).then(() => {
					//删除右侧图层
					$this.$store.commit("delete_rightlayer_config",post);
					//删除左侧图层(关闭开关,删除图层)
					$this.$store.commit("delete_leftlayer_config",post);
					
				}).catch(() => {
				});
			},
			//拖拽完成事件
			leftlayer_end(){
				//重新排列图层
				this.$store.commit("index_rightlayer_config");
			},
			//右侧图层选中
			index_check(post){
				post.opacity=100;
				post.opacity_flag=true;
			},
			//右侧图层取消选中
			index_close(post){
				post.opacity=0;
				post.opacity_flag=false;
			}
		},
	}
</script>

<style lang="less">
	//引入全局样式
	@import "../assets/less/style.less";
	
	.rightlayer_parent{
		position: absolute;
		right:4%;
		top:10%;
		width:350px;
		height: 80%;
		max-height:80%;
		@common_background();
		@display_column_start();
		z-index:2;
		&>div.rightlayer_header{
			color:#fff;
			line-height: 45px;
			font-weight: bold;
			background:@common_color;
			@display_column_start();
			align-items: center;
			&>div{
				width:90%;
				@display_row_between();
				&>span:nth-child(1){
					font-size: 21px;
				}
				&>span:nth-child(2){
					font-size: 16px;
					margin-left: 2%;
					flex:1;
				}
			}
		}
		&>div.rightlayer_main{
			overflow-y: auto;
			overflow-x: hidden;
			&>div>div{
				@display_column_start();
				align-items:center;
				&>div{
					z-index:3;
					width: 90%;
					margin-top: 5%;
					@display_column_start();
					@common_background();
					align-items:center;
					&>div.main_header{
						width: 90%;
						line-height: 42px;
						border-bottom:@common_border;
						@display_row_between();
						&>div.main_header_title{
							font-weight: bold;
							font-size: 15px;
							@display_row_start();
							&>span:nth-child(2){
								margin-left: 5px;
							}
						}
						&>div.main_header_button{
							@display_row_between();
							text-align: center;
							&>div{
								width:21px;
								height:21px;
								line-height: 21px;
								cursor:pointer;
								color:@common_color;
							}
							&>div:nth-child(1){
								border: @common_border;
							}
							&>div:nth-child(2){
								border-top: @common_border;
								border-bottom:  @common_border;
							}
							&>div:nth-child(3){
								border:  @common_border;
							}
						}
					}
					&>div.main_main{
						width: 90%;
						line-height: 40px;
						font-size: 14px;
						@display_column_start();
						&>div{
							@display_row_start();
							&>span:nth-child(2){
								margin-left: 5px;
							}
							&>div:nth-child(3){
								flex:1;
							}
						}
					}
					
				}
				&>div:last-child{
					margin-bottom: 5%;
				}
			}
		}
	}
	.rightlayer-list-move{
		transition: transform 0.5s;
	}
	.ghost {
	    opacity: 0.5;
	    background: #c8ebfb;
	}
</style>
