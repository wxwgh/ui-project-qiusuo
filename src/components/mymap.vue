<template>
	<div class="map_parent">
		<div id="map"></div>
	</div>
</template>

<script>
	export default {
		name: 'mymap',
		data() {
			return {
			}
		},
		mounted: function() {
			this.init_map();
		},
		methods: {
			init_map() {
				var height = parseInt(window.innerHeight);
				$("#map").css("height", height);
				let url = this.$store.getters.map_url;
				let map = L.map("map", {
					center: [39.550339, 100.114129],
					zoom: 3,
					minZoom: 3,
					maxZoom: 30,
					zoomControl: false,
					attributionControl: false,
					keyboard: false,
					preferCanvas: true
				});
				this.$store.commit('set_map',map);
				let layer = L.tileLayer.chinaProvider(url).addTo(this.$store.state.map_store.map);
				this.$store.commit("set_layer",layer);
				window.onresize = function() {
					var height = parseInt(window.innerHeight);
					$("#map").css("height", height);
				}
			},
		},
	}
</script>

<style lang="less">
	.map_parent {
		width: 100%;
		height: 100%;
		z-index:1;
		position: absolute;
		overflow: hidden;
	}
	
	#map {
		width: 100%;
	}

</style>
