<template>
	<div class="righttool_parent" >
		<!-- 测距 -->
		<el-tooltip content="测距" placement="left" effect="light">
			<span class="iconfont icon-ceju" @click="ceju_click()"></span>
		</el-tooltip>
		<!-- 测面 -->
		<el-tooltip content="测面" placement="left" effect="light">
			<span class="iconfont icon-xiankuang" @click="cemian_click()"></span>
		</el-tooltip>
		<!-- 清除 -->
		<el-tooltip content="清除" placement="left" effect="light">
			<span class="iconfont icon-clear" @click="clear_click()"></span>
		</el-tooltip>
		<!-- 控制 图层样式调整面板显隐 -->
		<el-tooltip content="图层控制器显隐" placement="left" effect="light">
			<span class="iconfont icon-ic_satellite_px" @click="rightlayer_panel_flag()"></span>
		</el-tooltip>
		<!-- 地图放大 -->
		<el-tooltip content="放大" placement="left" effect="light">
			<span class="iconfont icon-jiahao" @click="zoomin_click()"></span>
		</el-tooltip>
		<!-- 地图缩小 -->
		<el-tooltip content="缩小" placement="left" effect="light">
			<span class="iconfont icon-jianhaocu" @click="zoomout_click()"></span>
		</el-tooltip>
	</div>
</template>

<script>
	export default {
		name: 'righttool',
		data() {
			return {
				layers:[],
			}
		},
		methods: {
			// 控制 图层样式调整面板 显隐
			rightlayer_panel_flag(){
				var flag = this.$store.getters.get_rightlayer_flag;
				if(flag){
					this.$store.commit("set_rightlayer_flag",false);
				}else{
					this.$store.commit("set_rightlayer_flag",true);
				}
			},
			// 地图放大
			zoomin_click() {
				let map = this.$store.state.map_store.map;
				map.zoomIn();
			},
			//地图缩小
			zoomout_click(){
				let map = this.$store.state.map_store.map;
				map.zoomOut();
			},
			//测距
			ceju_click(){
				var $this = this;
				let map = this.$store.state.map_store.map;
				this.unbindMapEvent();
				this.switchMouseStyle(true);
				var point_first=null;
				var line = null;
				var total_distance=0;
				//绑定事件
				map.on("mousedown",function(e){
					//判断是否是左键
					if(e.originalEvent.button===0){
						if(point_first===null){
							point_first=e.latlng;
							var marker = $this.create_marker(point_first,"起点","起点","测距");
						}
						if(point_first&&point_first!==e.latlng){
							//计算两点距离
							var first = point_first;
							var end = e.latlng;
							var temp_distance = first.distanceTo(end);
							total_distance+=temp_distance;
							var distance = (temp_distance/1000).toFixed(2)+"千米";
							var marker = $this.create_marker(e.latlng,distance,"中间","测距");
							var tempLine=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
							$this.layers.push(tempLine);
							
							point_first=e.latlng;
						}
					}
					
				});
				map.on("mousemove",function(e){
					if(line!=null){
						line.remove();
					}
					if(point_first){
						line=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
					}
				});
				map.on("contextmenu",function(e){
					if(line!=null){
						line.remove();
						
					}
					if(point_first){
						var tempLine=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
						$this.layers.push(tempLine);
						var first = point_first;
						var end = e.latlng;
						var temp_distance = first.distanceTo(end);
						total_distance+=temp_distance;
						total_distance = (total_distance/1000).toFixed(2)+"千米";
						var marker = $this.create_marker(e.latlng,total_distance,"终点","测距");
					}
					$this.switchMouseStyle(false);
					$this.unbindMapEvent();
				});
			},
			//测面
			cemian_click(){
				var $this = this;
				let map = this.$store.state.map_store.map;
				this.unbindMapEvent();
				this.switchMouseStyle(true);
				var point_first=null;
				var point_end = null;
				var line = null;
				var line2 = null;
				var lines=[];
				var points = [];
				map.on("mousedown",function(e){
					//判断是否是左键
					if(e.originalEvent.button===0){
						if(point_first===null&&point_end===null){
							point_first=e.latlng;
							point_end=e.latlng
							points.push(point_first);
						}
						if(point_first&&point_first!==e.latlng){
							
							var tempLine=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
							lines.push(tempLine);
							points.push(e.latlng);
							point_first=e.latlng;
						}
					}
				})
				map.on("mousemove",function(e){
					if(line!=null){
						line.remove();
						
					}
					if(line2!=null){
						line2.remove();
					}
					if(point_first&&point_end===null){
						line=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
					}else if(point_first&&point_end){
						line=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
						line2=L.polyline([[point_end.lat,point_end.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
					}
				})
				map.on("contextmenu",function(e){
					if(line!=null){
						line.remove();
						
					}
					if(line2!=null){
						line2.remove();
					}
					if(point_first&&point_end){
						var temp=L.polyline([[point_first.lat,point_first.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
						var temp2=L.polyline([[point_end.lat,point_end.lng],[e.latlng.lat,e.latlng.lng]], {color: "blue",weight:1}).addTo(map);
						lines.push(temp);
						lines.push(temp2);
						points.push(e.latlng);
						for(let i=0;i<lines.length;i++){
							lines[i].remove();
						}
						//获取面积
						var coordinates=[];
						for(let i=0;i<points.length;i++){
							var coordinate =[points[i].lng,points[i].lat];
							coordinates.push(coordinate);
							if(i===points.length-1){
								var temp = [points[0].lng,points[0].lat];
								coordinates.push(temp);
							}
						}
						var turfPolygon = $this.turf.polygon([coordinates]);
						var temp_area = $this.turf.area(turfPolygon);
						var area = (temp_area/1000000).toFixed(2)+"平方千米";
						var polygon  = L.polygon(points,{color: 'blue',weight:1}).addTo(map);
						var popup = L.popup({autoClose:false,closeOnClick:false}).setLatLng(polygon.getCenter()).setContent(area).openOn(map);
						polygon.bindPopup(popup);
						$this.layers.push(polygon);
					}
					$this.switchMouseStyle(false);
					$this.unbindMapEvent();
				})
			},
			//删除
			clear_click(){
				for(let i=0;i<this.layers.length;i++){
					this.layers[i].remove();
				}
				this.layers.splice(0,this.layers.length);
			},
			unbindMapEvent(){
				let map = this.$store.state.map_store.map;
				map.off("mousedown");
				map.off("mousemove");
				map.off("contextmenu");
			},
			switchMouseStyle(flag){
				let map = this.$store.state.map_store.map;
				if(flag){
					L.DomUtil.setClass(map._container,'mapCursor');
				}else{
					L.DomUtil.setClass(map._container,'mapUnCursor');
				}
			},
			create_marker(latlng,content,type,button_type){
				var $this=this;
				let map = this.$store.state.map_store.map;
				var myIcon="";
				if(button_type=="测距"){
					var icon_url="";
					if(type=="起点"){
						icon_url=require('../assets/images/ceju/ceju_start.png')
					}else if(type=="终点"){
						icon_url=require('../assets/images/ceju/ceju_end.png')
					}else{
						icon_url=require('../assets/images/ceju/ceju_mid.png')
					}
					myIcon = L.icon({
					    iconUrl: icon_url,
						iconSize: [30, 50],
						iconAnchor: [15, 50],
						popupAnchor: [1, -34],
					});
				}
				var marker = L.marker(latlng, {icon: myIcon}).addTo(map);
				var popup = L.popup({autoClose:true,closeOnClick:true}).setLatLng(latlng).setContent(content);
				marker.bindPopup(popup);
				$this.layers.push(marker);
				return marker;
			},
		},
	}
</script>

<style lang="less">
	//引入全局样式
	@import "../assets/less/style.less";
	
	//通用宽度
	@common_width:30px;
	//通用高度 用于字体图标按钮 高度及行高
	@common_height:32px;
	
	.righttool_parent{
		width:@common_width;
		@common_background();
		position:absolute;
		right:1%;
		bottom:10%;
		z-index:2;
		@display_column_start();
		text-align: center;
		&>span{
			width:@common_width;
			height:@common_height;
			line-height: @common_height;
			color:@common_color;
			cursor:pointer;
		}
		&>span:not(:nth-child(6)){
			border-bottom: @common_border;
		}
	}
</style>
