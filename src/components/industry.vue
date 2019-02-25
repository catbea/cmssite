<template>
	<div>
	<el-form ref="form" size="small" label-position="left"  :label-width="labelWidth">
		<el-form-item :label=label >
			<el-cascader v-model="model" :options="categoryList" :props="provinces" @active-item-change="handleItemChange" @change="change"></el-cascader>
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
				default:'行业'
			},
			labelWidth:{
				type: String,
				default:'100px'
			}
		},
		data () {
			return {
				provinces: {
					value: 'id',
					label: 'title',
					children: 'citys'
				},
				model: [-1]
			}
		},
		mounted(){
			this.getCategoryList({ id: '' });
		},
		methods: {
			...mapActions(['getCategoryList']),
			handleItemChange(val) {
				this.getCategoryList({
					id: val[0]
				});
			},
			change(val){
				let value = val[0]==-1?`${val[0]}`:`${val[0]},${val[1]}`;
				this.$emit('getCategory', value);
			}
		},
		computed:{
			...mapGetters(['categoryList'])
		}
	};
</script>

<style scoped>

</style>
