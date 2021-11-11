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
									<div v-if="post.url_type=='vector'">
										<el-popover placement="bottom" width="300" trigger="click">
											<div class="vector_style_parent">
												<div class="vector_style_header">
													<el-radio-group v-model="post.icon_radio" size="small"  @change="image_icon_check($event,post)">
													    <el-radio-button label="矢量"></el-radio-button>
													    <el-radio-button label="图片"></el-radio-button>
													</el-radio-group>
												</div>
												<div class="vector_style_main">
													<div class="vector_first" v-if="post.icon_radio=='矢量'">
														<span v-for="p in vector_font" :key="p.id" :class="[{'active':p.icon_class==post.icon_class},p.icon_class]" @click="set_icon_class(post,p)"></span>
													</div>
													<div class="vector_first" v-else>
														<span v-for="p in vector_images" :class="[{'active':p.icon_image==post.icon_image},p.image_class,'vector_image_class']" @click="set_icon_class(post,p)"></span>
													</div>
													<div class="vector_second" v-if="post.icon_radio=='矢量'">
													  <span>点颜色：</span>
													  <el-color-picker v-model="post.icon_color" @change="set_icon_color($event,post)"></el-color-picker>
													</div>
													<div class="vector_three">
														<span>点大小：</span>
														<el-slider v-model="post.icon_size" input-size="mini" :min="1" :max="20" @change="set_icon_size($event,post)"></el-slider>
														<span>Px</span>
													</div>
												</div>
												<!-- <div class="vector_style_main" v-else>
													<div class="vector_first">
														<span v-for="p in vector_images" :class="[{'active':p.icon_image==post.icon_image},p.image_class,'vector_image_class']" @click="set_icon_class(post,p)"></span>
													</div>
													<div class="vector_three">
														<span>点大小：</span>
														<el-slider v-model="post.icon_size" input-size="mini" :min="1" :max="20" @input="set_icon_size($event,post)"></el-slider>
														<span>Px</span>
													</div>
												</div> -->
											</div>
											<span class="el-icon-edit-outline" slot="reference"></span>
										</el-popover>
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
				vector_font:[
					{
						id:this.myCommon.UUID(),
						icon_class:"supermapol-icons supermapol-icons-Oval",
					},
					{
						id:this.myCommon.UUID(),
						icon_class:"supermapol-icons supermapol-icons-Triangle",
					},
					{
						id:this.myCommon.UUID(),
						icon_class:"supermapol-icons supermapol-icons-Rectangle",
					},
					{
						id:this.myCommon.UUID(),
						icon_class:"supermapol-icons supermapol-icons-Star",
					}
				],
				vector_images:[
					{
						id:this.myCommon.UUID(),
						image_class:"purple_image_class",
						icon_image:"./supermap/purple.png"
					},
					{
						id:this.myCommon.UUID(),
						image_class:"blue_image_class",
						icon_image:"./supermap/blue.png"
					},
					{
						id:this.myCommon.UUID(),
						image_class:"green_image_class",
						icon_image:"./supermap/green.png"
					},
					{
						id:this.myCommon.UUID(),
						image_class:"red_image_class",
						icon_image:"./supermap/red.png"
					}
				]
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
			image_icon_check(value,post){
				console.log("进入了切换类型函数")
				this.myCommon.init_marker_style(post);
			},
			//修改图标颜色
			set_icon_color(value,post){
				console.log("进入了修改颜色函数")
				if(post.icon_radio == "矢量"){
					$("."+post.id).css({
						"color":value
					})
				}
				
			},
			// 修改图标大小
			set_icon_size(value,post){
				console.log("进入了修改图标大小函数")
				this.myCommon.init_marker_style(post);
				
			},
			//修改图标样式
			set_icon_class(post,p){
				console.log("进入了修改样式函数")
				if(post.icon_radio == "矢量"){
					$("."+post.id).removeClass(post.icon_class);
					$("."+post.id).addClass(p.icon_class);
					post.icon_class=p.icon_class;
				}else if(post.icon_radio == "图片"){
					post.icon_image=p.icon_image;
					this.myCommon.init_marker_style(post);
				}
				
			},
			//修改图层透明度
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
							&>div:not(:first-child){
								border-top: @common_border;
								border-bottom:  @common_border;
								border-right:  @common_border;
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
	
	//图标修改面板
	.vector_style_parent{
		@display_column_start();
		&>.vector_style_header{
			@display_row_start();
			align-items: center;
		}
		&>.vector_style_main{
			margin-top: 2%;
			
			&>.vector_first{
				@display_row_start();
				text-align: center;
				&>span{
					line-height: 40px;
					width: 40px;
					height: 40px;
					font-size: 25px;
					cursor:pointer;
				}
				&>span:hover{
					background-color: rgba(0, 170, 255,0.1);
				}
				&>span.active{
					background-color: rgba(0, 170, 255,0.1);
				}
				&>span.vector_image_class{
					background-position: center center;
					background-size: 25px 25px;
					background-repeat: no-repeat;
				}
			}
			&>.vector_second{
				@display_row_between();
				align-items: center;
				&>div{
					flex:1;
					&>.el-color-picker__trigger{
						width: 100%;
					}
				}
			}
			&>.vector_three{
				@display_row_between();
				align-items: center;
				&>div{
					flex:1;
					&>.el-color-picker__trigger{
						width: 100%;
					}
				}
				&>span:last-child{
					margin-left: 5%;
					text-align: center;
					width: 10%;
					border: @common_border;
				}
			}
		}
		
	}
	//图标地址
	.purple_image_class{
		background-image: url(../assets/images/supermap/purple.png);
	}
	.blue_image_class{
		background-image: url(../assets/images/supermap/blue.png);
	}
	.green_image_class{
		background-image: url(../assets/images/supermap/green.png);
	}
	.red_image_class{
		background-image: url(../assets/images/supermap/red.png);
	}
</style>
