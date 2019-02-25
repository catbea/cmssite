<template>
	<div>
		 <h2 class="page-title">任务列表 </h2>
		 <el-button type="button" size="small" class="pull-right" style="margin-bottom: 15px;"  @click="handleToDown" >新增下载任务</el-button>
		 <div class="tab">
		    <div class="data-table"  >
		      <el-table  :data="taskLis.data" border max-height="630">
		        <el-table-column prop="job_name"  label="任务名称"></el-table-column>
		        <el-table-column prop="main_filed"  label="主要数据字段"></el-table-column>
		        <el-table-column prop="time_size"  label="时间粒度"></el-table-column>
		        <el-table-column label="时间范围">
		        		<template slot-scope="scope">
							 {{scope.row.start_time}}~{{scope.row.end_time}}
						</template>
		        </el-table-column>
		         <el-table-column prop="created_at"  label="创建时间"></el-table-column>
		         <el-table-column prop="down_status"  label="下载状态"></el-table-column>
		         <el-table-column prop="username"  label="操作人"></el-table-column>
		         <el-table-column prop="status" label="操作">
		         	   <template slot-scope="scope">
							  <span :class="scope.row.status!='1'?'haved':'tabel-but'"  @click="down(scope.row)">下载</span>
							  <span class="tabel-but" @click="del(scope.row)">删除</span>
						</template>
		         </el-table-column>
		      </el-table>
		    </div>
		    <div class="pager" >
		      <el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="10" :total="taskLis.total">
		      </el-pagination>
		    </div>
		 </div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	import Utils from '../../utils/index';
	export default {
		components: {

		},
		data() {
			return {
				currentPage:1,
				tableData:[],
				params:{
					page:1,
					page_size:10,
				}
			}
		},
		created() {},
		mounted() {
           this.getTaskLis(this.params); 
		},
		methods: {
			...mapActions(['getTaskLis','delTask','taskData']),
			down(row){
				console.log(row);
				if(row.status!=1)  return;
				this.taskData({project_name:row.job_name,cellpack: res =>{
						Utils.msg('下载成功！');
						this.getTaskLis(this.params); 
				}})
			},
			del(row){
               this.delTask({project_name:row.job_name,cellpack: res =>{
               	    Utils.msg('删除成功！');
               	    this.getTaskLis(this.params); 
               }})
			},
		    handleSizeChange(val){
                this.params.page_size=val;
                this.currentPage = 1;
                this.getTaskLis(this.params)
		    },
       		handleCurrentChange(val){
                 this.params.page=val;
                this.currentPage =val;
                this.getTaskLis(this.params)
       		},
       		handleToDown(){
       			this.$router.push('/downTask')
       		}
		},
		computed: {
			...mapGetters(['taskLis']),
		}
	};
</script>


<style lang='less' scope>
   .haved{
   	  color:#999 !important;
   	  margin:0 10px;
   }
</style>
