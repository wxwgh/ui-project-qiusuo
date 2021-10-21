<template>
	<div id="app">
		<!-- 地图模块 -->
		<mymap></mymap>
		<!-- 左侧图层控制模块 -->
		<leftlayercontrol></leftlayercontrol>
		<!-- 右侧图层样式控制模块 -->
		<rightlayercontrol></rightlayercontrol>
		<!-- 右侧工具栏模块 -->
		<righttool></righttool>
	</div>
</template>
<script>
	import mymap from '@/components/mymap.vue';
	import leftlayercontrol from '@/components/leftlayercontrol.vue';
	import rightlayercontrol from '@/components/rightlayercontrol.vue';
	import righttool from '@/components/righttool.vue';
	export default {
		components: {
			mymap,
			leftlayercontrol,
			rightlayercontrol,
			righttool,
		},
		data() {
			return {
				//顶部选项卡标识
				// activeName: 'first',
			};
		},
		mounted: function() {
		},
		// 页面创建时
		created: function() {
		},
		computed: {
			// get_loading: function() {
			// 	return this.$store.state.loading;
			// }
		},
		methods: {
		}
	};
</script>
<style lang="less">
	/* 初始化环境 */
	html,
	body {
		height: 100%;
		width: 100%;
		overflow: hidden;
		-webkit-user-select: none;
		font-size: 16px;
		color: #2c3e50;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-family:'PingFang';
		white-space:nowrap;
	}
	@font-face{font-family:'PingFang';src:url('./assets/fonts/PingFang.ttf') format('truetype');font-weight:normal;font-style:normal;}
	@font-face{font-family:'DS-Digital';src:url('./assets/fonts/DS-DIGIB.ttf') format('truetype');font-weight:normal;font-style:normal;}
	body {
		margin: 0;
		padding: 0;
		background: #fff;
	}

	body img {
		border: none;
		margin: 0;
		padding: 0;
	}

	div,
	h1,
	h2,
	h3,
	h4,
	p,
	form,
	label,
	input,
	textarea,
	img,
	span {
		margin: 0;
		padding: 0;
		word-break: break-all;
		word-wrap: break-word;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
		word-break: break-all;
		word-wrap: break-word;
	}

	dl,
	dt,
	dd {
		margin: 0;
		padding: 0;
		border: 0;
	}

	a {
		color: #5f6477;
		text-decoration: none;
	}

	a:hover {
		color: #5f6477;
		text-decoration: none;
	}

	:focus {
		outline: 0;
	}

	input,
	select {
		font-family: "微软雅黑";
	}

	/* 设置滚动条的样式 */
	::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}

	/* 滚动槽 */
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
		border-radius: 10px;
		background-color: #ddd;

	}

	/* 滚动条滑块 */
	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		height: 5px;
		background: #777;
	}
	#app {
		height: 100%;
		width: 100%;
		position:relative;
	}
</style>
