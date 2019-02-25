<template>
	<div id="radar">
		<h2 class="page-title">
      		页面分析
      		<span>{{queryParams.urladdress}}</span>
	    </h2>
	 	<div class="searchBoxHint">
			<el-form ref="form" size="small" label-position="left" label-width="100px">
					<!-- <div>
						<Industry style="display: inline-block; " @getCategory='getCategory'></Industry>
						 <el-form-item label="所属运营商">
							<el-autocomplete class="inline-input" v-model="firstArgent" :fetch-suggestions="queryFistAgent" placeholder="请输入所属运营商" clearable @select="fistAgentHandleSelect"></el-autocomplete>
						</el-form-item>
						<openVersion style="display: inline-block; " @getVersion='getVersion'></openVersion>
					</div>

					<div>
						<el-form-item label="小程序首次上线日期">
			                <GetTime  :showDay='false' :defalutTime="true" @changeTime="onChangeTimeRangeLine"></GetTime>
			           	</el-form-item>
						<el-form-item label="企业名称">
							<el-autocomplete class="inline-input" v-model="queryParams.company_name" :fetch-suggestions="queryCompanyName" placeholder="请输入企业名称" clearable @select="CompanyNameHandleSelect"></el-autocomplete>
						</el-form-item>
					</div> -->
					<el-form-item label="时间筛选">
		                <GetTime @getTime="onChangeDateRange" :defalutTime="true" @changeTime="onChangeTimeRange"></GetTime>
		           </el-form-item>
				   <div>
						<el-form-item>
							<el-button type="primary" @click.native="search">查询</el-button>
						</el-form-item>	  
					   
					</div>	
			</el-form>
		</div>
	   <div class="tab">
			 <div class="data-table-func text-right">
		      	<el-button type="button" class="dcsh" @click="exportExcel">导出</el-button>
		    </div> 
	   	  <div class="data-table"  >
            <el-table :data="radarDetail.list" border max-height="630">
              <el-table-column prop="event_date" label="日期"></el-table-column>
              <el-table-column prop="PV" label="访问量（PV）"   ></el-table-column>
              <el-table-column prop="UV" label="访问人数（UV）"   ></el-table-column>
              <el-table-column prop="avg_staytime" label="平均停留时长(s)"  ></el-table-column>
            </el-table>
          </div>
		  <div class="pager">
				<el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" 
				:current-page.sync="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="10" :total="radarDetail.total">
				</el-pagination>
          </div>
	   </div>
	</div>
</template>

<script>
	import { mapGetters, mapActions, mapMutations } from 'vuex';
	import Industry from '../../components/industry'
	import openVersion from '../../components/openVersion'
	import GetTime from '../../components/getTime'
	 import  Utils from '../../utils/index';
	 const { start_time, end_time } = Utils.getTime(7);
	 import { radarDetailExport } from '@/api/api';
	export default {
		components: {
			Industry,GetTime,
			openVersion,
		},
		data() {
			return {
				openVersion:"",
				currentPage:1,
				firstArgent: '',
				timeout: null,
				queryParams: {			
					company_name:this.$route.query.company_name,
					industry_id: this.$route.query.industry_id,
					operator_id: this.$route.query.operator_id,
					software_version:this.$route.query.software_version,
					small_starttime: this.$route.query.small_starttime,
					small_endtime: this.$route.query.small_endtime,
					company_id: this.$route.query.company_id,
					product_id:this.$route.query.product_id,
					logdate_start: this.$route.query.logdate_start,
					logdate_end: this.$route.query.logdate_end,								
					rank:"2",
					order:"2",
					page: 1,
					page_size:10,	
					urladdress:this.$route.query.url
				},
			}
		},
		created() {
            this.getSearchAgentList({
				type: 1
			}); //总代理
			 
			this.getSearchCompanyList();
			this.getData();
		},
		methods: {
			...mapActions(['getSearchAgentList','getSearchCompanyList','getRadarDetail']),
			...mapMutations(['setSearchAgentList','setSearchCompanyList']),
			resetPage() {
				this.currentPage = 1;
				this.queryParams.page = 1;
			},
			 getData(){
				this.getRadarDetail(this.queryParams)
			},
			//开通版本
			getVersion(val){
				this.queryParams.software_version = val;
				// this.resetPage();
				// this.getData()			
			},
			//行业切换
			getCategory(val){
                this.queryParams.industry_id=val==-1?"":val;
				//  this.resetPage();
				//  this.getData()  
			},
			//搜索
			search(){				
				this.resetPage();
				this.getData();
			},
		 //联动--------------------------
			queryFistAgent(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.operatorList,1)
			},
			queryCompanyName(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.searchCompanyList,2)
			},
			querySearchAsync(queryString, cb, restaurants,type) {
				if(queryString!=""){
					queryString = "";
				}
				if(type === 1){
					this.queryParams.operator_id = "";
				}
				if(type === 2){
					this.queryParams.company_id = "";
					this.queryParams.company_name = "";
				}
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
			fistAgentHandleSelect(item) { 
				 this.queryParams.operator_id=item.uid||"";
				//  this.resetPage();
				//  this.getData()  
			},
			CompanyNameHandleSelect(item){				 
				 this.queryParams.company_id=item.company_id||"";
				 this.queryParams.company_name=item.company_name||"";
				//  this.resetPage();
				//  this.getData()  
			},
			handleSizeChange(val) {
				this.queryParams.page_size = val;
				this.resetPage();
				this.getData();
			},
			handleCurrentChange(page) {
				this.currentPage = page;
				this.queryParams.page = page;								
				this.getData();
			},	
			//时间------------------------
			 onChangeDateRange(range) {
			       const time = Utils.getTime(range);
			       this.onChangeTimeRange(time);
			 },
			 onChangeTimeRange(timeRange){
				this.queryParams.logdate_start = timeRange.start_time;
				this.queryParams.logdate_end = timeRange.end_time;
				// this.resetPage();
		        // this. getData()  
			 },
			 //小程序上线时间--------------------
			onChangeTimeRangeLine(timeRange) {
				this.queryParams.small_starttime = timeRange.start_time;
				this.queryParams.small_endtime = timeRange.end_time;
				// this.resetPage();
				// this.getData()
			},
			 exportExcel() {
				// let title=null;
				// title='雷达页面分析';
				// if(!this.radarDetail.length){
				// 	Utils.toast('数据不能为空！');
				// 	return
				// }
			   	//  Utils.getExcel(
		        //     ['日期', '访问量（PV）', '访问人数（UV）', '平均停留时长' ],
		        //     ['logdate', 'pv', 'uv', 'avg_staytime'],
		        //     this.radarDetail,
		        //     title
				//   );
				
				location.href = radarDetailExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
			},
			goRadarDetail(url){
				Utils.toUrl(this,'/radarDetail',url)
			}
		},
		computed: {
			...mapGetters(['operatorList','searchCompanyList','radarDetail' ])
		},
		 beforeDestroy(){
	       this.setSearchAgentList('');
	       this.setSearchCompanyList('')
	   }
	};
</script>

<style  lang="less">
	#radar{
	 .el-form-item{
		 	display: inline-block !important;
		 	margin-right: 30px;
	 }
  .cell{
	 	text-align: center!important;
	 }
	 .go{
	 	  cursor: pointer;
	 }
	}	
	.data-table-func{
		overflow: hidden;
	}
</style>
