import $store from '@/store/index.js';
import {Message} from 'element-ui'

export default{
	UUID(){
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
		}
		return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
	},
	get_message(message){
		Message({
		    message: message,
			center:true,
			//显示时间,单位毫秒,0为永久显示 
			duration:1000,
			offset:parseInt(window.innerHeight/2),
			customClass:"message_class"
		});
	},
	//构建marker
	get_markers(post,latlng){
		let icon=""
		if(post.icon_radio == "矢量"){
			icon = L.divIcon({
				iconSize: [post.icon_size+16, post.icon_size+16],
				iconAnchor:[(post.icon_size+16)/2, post.icon_size+16],
				className: post.icon_class+" "+post.id,
			});
		}else if(post.icon_radio == "图片"){
			icon = L.icon({
				iconUrl:post.icon_image,
				iconSize: [post.icon_size+16, post.icon_size+16],
				iconAnchor:[(post.icon_size+16)/2, post.icon_size+16]
			});
		}
		let marker = L.marker(latlng,{icon:icon});
		// marker.setZIndexOffset(post.layer_index)
		return marker;
	},
	//根据图标大小 初始化样式
	init_marker_style(post){
		//初始化颜色
		if(post.icon_radio=="矢量"){
			let icon = L.divIcon({
				iconSize: [post.icon_size+16, post.icon_size+16],
				iconAnchor:[(post.icon_size+16)/2, post.icon_size+16],
				className: post.icon_class+" "+post.id,
			});
			let markers = post.layer.getLayers();
			for(let i=0;i<markers.length;i++){
				markers[i].setIcon(icon);
			}
			$("."+post.id).css({
				"color":post.icon_color,
				"fontSize":post.icon_size+16+"px",
				"lineHeight":post.icon_size+16+"px",
				"textAlign":"center",
				"zIndex":post.layer_index
			})
		}else if(post.icon_radio=="图片"){
			let icon = L.icon({
				iconUrl:post.icon_image,
				iconSize: [post.icon_size+16, post.icon_size+16],
				iconAnchor:[(post.icon_size+16)/2,post.icon_size+16],
				className:post.id
			})
			let markers = post.layer.getLayers();
			for(let i=0;i<markers.length;i++){
				markers[i].setIcon(icon);
			}
			$("."+post.id).css({
				"zIndex":post.layer_index
			})
		}
	}
}