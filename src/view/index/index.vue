<template>
	<div>
		<Header></Header>
		<el-container style=" border: 1px solid #eee">
			<Aside></Aside>
			<el-main>
				<div id="warp-main">
					<keep-alive>
				    <router-view v-if="$route.meta.keepalive"></router-view>
					</keep-alive>
					<router-view v-if="!$route.meta.keepalive"></router-view>
				</div>
			</el-main>
		</el-container>
	</div>
</template>
<script>
	import Aside from '../../components/aside';
	import Header from '../../components/header';
	export default {
		components: {
			Aside,
			Header
		},
		data() {
			return {
				 
			}
		},
		mounted(){
		}
	};
</script>
<style type="text/css">
</style>