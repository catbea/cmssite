<template>
	<div id="staff" class="staff clearfix" >
		<h3 class="d-title" style="font-size:16px">
                    指定企业 <el-button type="text" class="ml15" @click="choseClick">点击选择</el-button> 
                  </h3>
		<div class="m15">
			<el-tag v-for="(item, index) in selectedMembers" :key="index" closable @close='remove(index)'>
				{{item.company_name}}
			</el-tag>
		</div>
		<div   >

			<el-dialog title="选择企业" :visible.sync="dialogVisible"   @close='close'  width='617px'>
				<div class="staff-wrap">
					<div class="staff-search">
						<el-input class="search" size="medium" placeholder="搜索" clearable maxlength=15 v-model="searchKeyword">
							<i slot="suffix" class="el-icon-search" style="margin-top:10px"></i>
						</el-input>
					</div>
					<div class="staff-top">
					<div class="yx">已选{{selectedMembers.length}}家</div>
				</div>
					<div class="staff-mid clearfix">
						<div class="staff-left">
							 <el-checkbox-group v-model="selectedMembers"  >
								    <el-checkbox v-for="(company,index) in treeData" :label="company" :key="index">{{company.company_name}}</el-checkbox>
							 </el-checkbox-group>
						</div>
						<div class="staff-right">
							<div>
								<ul class="staff-right-ul">
									<li v-for="(item, index) in selectedMembers" :key="index">
										<span>{{item.company_name}}</span>
										<i class="el-icon-error" @click="remove(index)"></i>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button size="medium" type="primary" @click="submit">关闭</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	 import Utils from '@/utils/index'
	 import { Loading } from 'element-ui'
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	export default {
		components: {},
		data() {
			return {
				dialogVisible:false,
				loading:false,
				searchKeyword: '',
				treeData:[],
				selectedMembers: [],
			}
		},
		created() {
			this.getSearchCompanyList({cellpack: res =>{ 
				 this.treeData=res
			}});
		},
		mounted() {
			
		},
		methods: {
			...mapActions(['getSearchCompanyList']),
			close(){
				 this.$emit('onChooseMember', this.selectedMembers);
			},
			choseClick(){
				if(!this.selectedMembers.length){
					let loadingService=Utils.openLoading(true);
					setTimeout(() => loadingService.close(),6000)
				}
				
 				this.dialogVisible=true;
			},
			remove(index) {
				this.selectedMembers.splice(index, 1);
			},
			submit() {
                  this.dialogVisible=false
			}
		},
		computed: {
			...mapGetters(['searchCompanyList']),
		},
		watch: {
			searchKeyword(val) {  
			    this.treeData=this.searchCompanyList.filter(item => item.company_name.indexOf(val) !== -1);
			},
		}
	};
</script>

<style scoped>
	.el-checkbox {
		margin-bottom: 5px;
		display: block;
	}
	.clearfix::after {
		content: '';
		display: block;
		clear: both;
		height: 0;
	}
	
	.staff {
		float: left;
	}
	
	.staff-total {
		margin: 0 0 0 12px;
	}
	
	.staff-mid {
		display: -webkit-flex;
		display: flex;
	}
	
	.staff-top {
		display: -webkit-flex;
		display: flex;
	}
	
	.staff-top .name {
		font-size: 16px;
		color: #6D6D6D;
		height: 30px;
		line-height: 30px;
		padding-left: 10px;
		width: 50%;
	}
	
	.staff-top .yx {
		width: 50%;
		font-size: 14px;
		color: #BBBBBB;
		height: 32px;
		line-height: 32px;
	}
	
	.staff-mid {
		/*height: 400px;
		overflow-y: scroll;*/
	}
	
	.staff-left {
		width: 50%;
		height: 400px;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	
	.staff-right {
		width: 50%;
		height: 400px;
		overflow-y: scroll;
	}
	
	.staff-right .el-checkbox {
		display: block;
	}
	
	.el-checkbox+.el-checkbox {
		margin-left: 0;
	}
	
	.staff .search {
		width: 256px;
	}
	
	.staff-search {
		padding-left: 10px;
		width: 70%;
		margin-bottom: 15px;
	}
	
	.staff-right-ul li {
		margin-bottom: 10px;
		width: 240px;
		height: 20px;
		line-height: 20px;
		overflow: hidden;
		padding:0 15px 0 4px;
		position: relative;
	}
	
	.staff-right-ul li img {
		height: 20px;
		width: 20px;
		vertical-align: bottom;
	}
	
	.staff-right-ul li span {
		font-size: 14px;
		color: #6D6D6D;
		margin-left: 10px;
	}
	
	.staff-right-ul li i {
		 position: absolute;
		 top:5px;
		 right:0px;
		font-size: 14px;
		color: #999
	}
 
	.dialog-footer {}
	
	.dialog-footer .el-button--default {
		margin: 0 24px 0 0;
	}
</style>