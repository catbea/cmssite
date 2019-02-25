<template>
	<div>
	<el-form ref="form" size="small" label-position="left"  :label-width="labelWidth">
		<el-form-item :label=label >
			<el-select v-model="value" @change="change" placeholder="请选择">
				<el-option
				v-for="item in versionList"
				:key="item.label"
				:label="item.label"
				:value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
	</el-form>
	</div>
</template>

<script>
	import {mapGetters, mapActions, mapMutations} from 'vuex';
	import  Utils from '../utils/index';

	export default {
		props:{
			label:{
				type: String,
				default:'开通版本'
			},
			labelWidth:{
				type: String,
				default:'100px'
			}
		},
		data () {
			return {
				value: ''
			}
		},
		mounted(){
			this.getVersionList();
			this.value = this.versionList[0].value;
		},
		methods: {
			...mapActions(['getVersionList']),
			change(val){
				this.$emit('getVersion', val);
			}
		},
		computed:{
			...mapGetters(['versionList'])
		}
	};
</script>

<style scoped>

</style>
