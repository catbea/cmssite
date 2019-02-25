<template>
	<div id="radar">
		<h2 class="page-title">
	      		雷达页面分析
	      <el-popover trigger="hover" placement="right">
	        <div>
				<p><strong>访问量（PV）：</strong>所选时间段内，该页面被访问的次数。同一用户多次访问会重复统计。</p>
				<p><strong>访问人数（UV）：</strong>所选时间段内，该页面访问的用户数。</p>
				<p><strong>平均停留时间：</strong>所选时间段内，页面的次均访问时长。即所有用户在该页面的停留时长/页面的访问次数。</p>

	        </div>
	        <i slot="reference" class="el-icon-question"></i>
	      </el-popover>
	  </h2>
		<div class="searchBoxHint">
			<el-form ref="form" size="small" label-position="left" label-width="100px">
				<!-- <div>
					<Industry style="display: inline-block; " @getCategory='getCategory'></Industry>
					 <el-form-item label="所属运营商">
						<el-autocomplete class="inline-input" v-model="firstArgent" :fetch-suggestions="queryFistAgent" placeholder="请输入所属运营商" clearable  @select="fistAgentHandleSelect"></el-autocomplete>
					</el-form-item>
					<openVersion style="display: inline-block; " @getVersion='getVersion'></openVersion>
				</div>

				<div>
					<el-form-item label="小程序首次上线日期">
						<GetTime :showDay='false' clearable :spanIndex="3" @changeTime="onChangeTimeRangeLine"></GetTime>
					</el-form-item>
					<el-form-item label="企业名称">
						<el-autocomplete class="inline-input" v-model="queryParams.company_name" :fetch-suggestions="queryCompanyName" placeholder="请输入企业名称" clearable  @select="CompanyNameHandleSelect"></el-autocomplete>
					</el-form-item>
				</div> -->
				 <div>
					<el-form-item label="对象类型">
						   <el-radio-group  v-model="queryParams.product_id"   @change='onChangeType' >
						      <el-radio-button label='102'>AI雷达</el-radio-button>
						      <el-radio-button disabled label='103'>Boss雷达</el-radio-button>
						 </el-radio-group>
					</el-form-item>
				</div>
				<el-form-item label="时间筛选">
					<GetTime @getTime="onChangeDateRange" :isIncludeToday="false" :spanIndex="3" clearable @changeTime="onChangeTimeRange"></GetTime>
				</el-form-item>
				<!-- <el-button type="primary" @click="search">查询</el-button> -->
			</el-form>
		</div>
		<div class="tab">
			 <div class="data-table-func">            
				<el-input placeholder="请输入页面名称" clearable @change="urladdressChange"  v-model="queryParams.urladdress" style="width:30%;margin-right:10px;">					
				</el-input>
				<el-button type="primary" @click="search">查询</el-button>
		      	<el-button type="button" class="dcsh" @click="exportExcel">导出</el-button>
		    </div> 
			<div class="data-table">
				<el-table :data="radarList.list" border max-height="630">
					<el-table-column prop="urladdress" label="页面"></el-table-column>
					<el-table-column prop="PV" label="访问量（PV）"></el-table-column>
					<el-table-column prop="UV" label="访问人数（UV）"></el-table-column>
					<el-table-column prop="avg_staytime" label="平均停留时长(s)"></el-table-column>
					<el-table-column prop="recharge" label="操作">
						<template slot-scope="scope">
							<span class="go tabel-but" @click='goRadarDetail(scope.row.urladdress)'>查看详情</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="pager">
				<el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" 
				:current-page.sync="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="10" :total="radarList.total">
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
	import Utils from '../../utils/index';
	import logo from '../../store/module/userInf/logo';
	import { radarExport } from '@/api/api';
	const {
		start_time,
		end_time
	} = Utils.getTime(7);

	export default {
		components: {			
			Industry,
			openVersion,
			GetTime
		},
		data() {
			return {
				openVersion:"",
				currentPage: 1,
				firstArgent: '全部',
				timeout: null,
				queryParams: {
					company_name:"全部",
					industry_id: '',
					operator_id: '',
					software_version:'',
					small_starttime: "",
					small_endtime: "",
					company_id: '',
					product_id:"102",
					logdate_start: start_time,
					logdate_end: end_time,
					rank:"2",
					order:"2",
					page: 1,
					page_size:10,	
					urladdress:""
				},

			}
		},
		mounted() {
			this.getSearchAgentList({
				type: 1
			}); //总代理

			this.getSearchCompanyList();
			this.getData();
		},
		methods: {
			...mapActions(['getSearchAgentList', 'getSearchCompanyList', 'getRadarList']),
			...mapMutations(['setSearchAgentList', 'setSearchCompanyList']),
			resetPage() {
				this.currentPage = 1;
				this.queryParams.page = 1;
			},
			getData() {
				this.getRadarList(this.queryParams)
			},
			onChangeType(index) {
				this.queryParams.product_id = index;
				this.resetPage();
				this.getData()
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
			urladdressChange(val){
				this.queryParams.urladdress = val;
				// this.search()
			},
			//搜索
			search(){				
				this.resetPage();
				this.getData();
			},
			//开通版本
			getVersion(val){
				this.queryParams.software_version = val;
				// this.resetPage();
				// this.getData()	
			},
			//行业切换
			getCategory(val) {
				this.queryParams.industry_id = val==-1?"":val;
				// this.resetPage();
				// this.getData()
			},
			//联动--------------------------
			queryFistAgent(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.operatorList,1)
			},
			queryCompanyName(queryString, cb) {
				this.querySearchAsync(queryString, cb, this.searchCompanyList,2)
			},
			//type 区分是企业还是代理商			
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
				this.queryParams.operator_id = item.uid||"";
				// this.resetPage();
				// this.getData()
			},
			CompanyNameHandleSelect(item) {
				this.queryParams.company_id = item.company_id||"";
				this.queryParams.company_name = item.company_name||"";
				// this.resetPage();
				// this.getData()
			},
			//时间------------------------
			onChangeDateRange(range) {
				const time = Utils.getTime(range);
				this.onChangeTimeRange(time);
			},
			onChangeTimeRange(timeRange) {
				// this.resetPage();
				this.queryParams.logdate_start = timeRange.start_time;
				this.queryParams.logdate_end = timeRange.end_time;
				// this.getData()
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
				// title=this.queryParams.productid==102?'AI雷达页面分析':'Boss雷达页面分析';
				// if(!this.radarList.length){
				// 	Utils.toast('数据不能为空！');
				// 	return
				// }
			   	//  Utils.getExcel(
			    //         ['页面', '访问量（PV）', '访问人数（UV）', '平均停留时长'],
			    //         ['urladdress', 'PV', 'UV', 'avg_staytime'],
			    //         this.radarList,
			    //         title
				//       );

				location.href = radarExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
				// get(radarExport).then((res)=>{
				// 	console.log(res);
				// });
			},
			goRadarDetail(url) {
				Utils.toUrl(this, '/radarDetail', {
					url: url,
					...this.queryParams
				})
			}
		},
		computed: {
			...mapGetters(['operatorList', 'searchCompanyList', 'radarList'])
		},
		beforeDestroy() {
			this.setSearchAgentList('');
			this.setSearchCompanyList('')
		}
	};
</script>

<style lang="less">
	#radar {
		.el-form-item {
			display: inline-block !important;
			margin-right: 30px;
		}
		.cell {
			text-align: center!important;
		}
		.go {
			cursor: pointer;
		}
	}
	.el-input-group{
		width: 30%;
	}
	.data-table-func .dcsh{
		padding: 8px 0;
		float: right;
	}
</style>