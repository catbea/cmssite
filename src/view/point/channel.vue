<template>
	<div>
		<div class="Tab">
			<el-form ref="form" size="small" label-position="left" label-width="100px">
				<div>
					<div>
						<el-form-item label="业务类型" >
							<el-select v-model="queryParams.service_type" @change="rankChange">
								<el-option label="全部" value=""></el-option>
								<el-option label="转账" value="1"></el-option>
								<el-option label="核心代理商开户" value="12"></el-option>
								<el-option label="代理商开户" value="13"></el-option>
								<el-option label="异地开户服务费" value="16"></el-option>
								<el-option label="异地续费服务费" value="17"></el-option>
								<el-option label="代理商推荐奖励" value="14"></el-option>
								<el-option label="消耗推点奖励" value="15"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="交易日期">
							<GetTime :showDay='false'  :isclearable="false"  @changeTime="onChangeTimeRangeLine"></GetTime>
						</el-form-item>
					</div>
					<div>
						<el-form-item label="支出主体">
							<el-autocomplete class="inline-input" v-model="twoArgent" :fetch-suggestions="queryTwoArgent" placeholder="请输入支出主体" clearable @select="twoArgentHandleSelect"></el-autocomplete>
						</el-form-item>
						<!-- <el-form-item label="输入主体">
							<el-autocomplete class="inline-input" v-model="companyName" :fetch-suggestions="queryCompanyName" placeholder="请输入输入主体" clearable @select="CompanyNameHandleSelect"></el-autocomplete>
						</el-form-item> -->
						<el-form-item>
							<el-button type="primary" @click.native="search">查询</el-button>
						</el-form-item>
					</div>
				</div>
			</el-form>
			<div class="tab">
				 <div class="data-table-func text-right">
					<el-button type="button" class="dcsh" @click="exportExcel">导出</el-button>
				</div> 
				<div class="data-table">
					<el-table :data="pointTransferList.list" max-height="630" border>
						<el-table-column prop="exp_name" label="支出主体"></el-table-column>
						<el-table-column prop="inc_name" label="收入主体"></el-table-column>
						<el-table-column prop="service_type" label="业务类型"></el-table-column>
							<el-table-column prop="recharge_point" label="推点数"></el-table-column>
						<el-table-column prop="trade_date" label="交易日期"></el-table-column>
					</el-table>
				</div>
				<div class="pager">
					<el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="10" :total="pointTransferList.total">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	import GetTime from '../../components/getTime'
	import Utils from '../../utils/index';
	import { pointTransferRecordExport } from '@/api/api';	
	const {
		start_time,
		end_time
	} = Utils.getTime(14,true);

	export default {
		components: {
			GetTime
		},
		data() {
			return {
				currentPage: 1,
				firstArgent: '',
				twoArgent: '',
				companyName: '',
				timeout: null,
				queryParams: {
					page_size: 10,
					page: 1,
					trade_start_date:start_time,
					trade_end_date:end_time,
					service_type:"",
					agent_id:"",
					// company_input_id:"",
				}
			}
		},
		created() {
			// this.getSearchAgentList({
			// 	type: 1
			// }); //总代理
			this.getSearchAgentList({
				type: 0
			}); //所属代理
			// this.getSearchCompanyList();
			this.getData();
		},
		methods: {
			...mapActions([ 'getSearchAgentList','getSearchCompanyList','getPointTransferList']),
			...mapMutations(['setSearchAgentList','setSearchCompanyList']),
			resetPage() {
				this.currentPage = 1;
				this.queryParams.page = 1;
			},
			queryFistAgent(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.searchAgentList)
			},
			queryTwoArgent(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.allAgentList)
			},
			queryCompanyName(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.searchCompanyList)
			},
			//联动
			querySearchAsync(queryString, cb, restaurants) {

				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 1000 * Math.random());
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
				};
			},
			search() {
				this.resetPage();
				this.getData();
			},
			 getData(){
				 console.log(this.queryParams);
            	this.getPointTransferList(this.queryParams)
      		 },
			fistAgentHandleSelect(item) { 
				 this.queryParams.top_agent_uid=item.uid||"";
				//  this.resetPage();
				//  this.getData()  
			},
			twoArgentHandleSelect(item) {
				 this.queryParams.agent_id=item.uid||"";
				//  this.resetPage();
				//  this.getData()  
			},
			CompanyNameHandleSelect(item){
				this.queryParams.company_input_id=item.company_id||"";
				//  this.resetPage();
				//  this.getData()  
			},
			rankChange(val){
				 this.queryParams.rank=val;
				//  this.resetPage();
				//  this.getData()  
			},
			onChangeTimeRangeLine(timeRange) {
				//   this.resetPage();
		          this.queryParams.trade_start_date = timeRange.start_time;
		          this.queryParams.trade_end_date = timeRange.end_time;
		        //   this.getData()     
			},
			exportExcel() {
				// this.getConsumeList( { ...this.queryParams, page: '', page_size: '' ,cellpack:res =>{
		        //       Utils.getExcel(
		        //         ['总代名称', '区域', '所属代理','所属总代理','异地服务','业务类型','消耗推点','交易日期'],
		        //         ['company_name', 'company_city', 'agent_name', 'top_agent_name','is_remote','rank','point','c_time'],
		        //          res,
		        //         '推点消耗记录'
		        //       )
				//  }})
				location.href = pointTransferRecordExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
			},
			 handleSizeChange(val){
		          this.resetPage();
		          this.queryParams.page_size = val;
		          this.getData()  
		       },
		       handleCurrentChange(page){
		             this.currentPage = page;
		            this.queryParams.page = page;
		            this.getData() 
		     }
		},
		computed: {
			...mapGetters(['allAgentList','searchCompanyList','pointTransferList'])
		},
     watch:{
  	//bug清空数据
		firstArgent(val){
			!val?this.fistAgentHandleSelect(''):''
		},
	  twoArgent(val){
			!val?this.twoArgentHandleSelect(''):''
		},
		companyName(val){
			!val?this.CompanyNameHandleSelect(''):''  
		}
  	 }
	};
</script>

<style scoped>
	.tabWarp span {
		width: 120px;
	}
	
	.Tab {
		padding-top:20px;
	}
	.el-form-item {
		display: inline-block;
		margin-right: 30px;
	}
</style>