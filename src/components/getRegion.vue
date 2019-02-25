<template>
	<div>
	<el-form ref="form" size="small" label-position="left" :label-width="labelWidth">
		<el-form-item :label=label >
			<el-cascader v-model="model" :options="provinceData" :value="provinces.value" :props="provinces" @active-item-change="handleItemChange" @change="change"></el-cascader>
		</el-form-item>
	</el-form>
	</div>
</template>

<script>
	import {mapGetters, mapActions, mapMutations} from 'vuex';
	import  Utils from '../utils/index';

	export default {
		props:{
			provincesCity:{
				default:false,
			},
			label:{
				type: String,
				default:'地区筛选'
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
			this.getProvinceData({ id: "" });
		},
		methods: {
			...mapActions(['getProvinceData']),
			handleItemChange(val) {
					this.getProvinceData({
					id: val[0]
				});				
			},
			change(val){
				console.log("val2===",val);
				let provinceData = this.provinceData
				console.log(provinceData);
				// let value = val[0]==-1?'':val[1]==-1?`${val[0]}`:`${val[0]},${val[1]}`;

				let province = val[0]==-1?'':val[0];
				let city = val[1]==-1||val[1]==undefined?"":val[1];

				let p = {
					province,
					city
				}
				if(!this.provincesCity){
					this.$emit('region', p);
					return ;
				}


				if(province!=""){
					let obj=provinceData.find(function (obj) {
						return obj.id == province
					})
					console.log(obj);
					province = obj.title;

					if(city!=""){
						let citys = obj.citys;
						let obj2=citys.find(function (o) {
							return o.id == city
						})
						city = obj2.title;
					}
				}	
				p = {
					province,
					city
				}
				console.log("province="+province,"city"+city, p);				
				this.$emit('region', p);			
			}
		},
		computed:{
			...mapGetters(['provinceData'])
		}
	};
</script>

<style scoped>

</style>
