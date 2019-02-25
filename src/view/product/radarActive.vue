<template>
    <div id="radar">
        <h2 class="page-title">
        雷达活跃分析
        <el-popover trigger="hover" placement="right">
            <div>
			  	<p><strong>已启用雷达数：</strong>当天处于启用状态的AI雷达（/Boss雷达）总数</p>
				<p><strong>日活用户数：</strong>当天登录过AI雷达（/Boss雷达）的用户数</p>
            </div>
            <i slot="reference" class="el-icon-question"></i>
        </el-popover>
        </h2>
        <div class="searchBoxHint bottomBorder">
			<el-form ref="form" size="small" label-position="left" label-width="100px">
				<!-- <div>
					<Industry style="display: inline-block; " @getCategory='getCategory'></Industry>
					 <el-form-item label="所属运营商">
						<el-autocomplete class="inline-input" v-model="firstArgent" :fetch-suggestions="queryFistAgent" placeholder="请输入所属运营商" clearable @select="fistAgentHandleSelect"></el-autocomplete>
					</el-form-item>
					<openVersion style="display: inline-block; " @getVersion='getVersion'></openVersion>
				</div> -->

				<!-- <div>
					<el-form-item label="小程序首次上线日期">
						<GetTime :showDay='false' @changeTime="onChangeTimeRangeLine"></GetTime>
					</el-form-item>
					<el-form-item label="企业名称">
						<el-autocomplete class="inline-input" v-model="queryParams.company_name" :fetch-suggestions="queryCompanyName" placeholder="请输入企业名称" clearable @select="CompanyNameHandleSelect"></el-autocomplete>
					</el-form-item>
				</div> -->
				 <div>
					<el-form-item label="对象类型">
						   <el-radio-group  v-model="queryParams.product_id"   @change='onChangeType' >
						      <el-radio-button label='102'>AI雷达</el-radio-button>
						      <el-radio-button label='103'>Boss雷达</el-radio-button>
						 </el-radio-group>
					</el-form-item>
				</div>
				<el-form-item label="时间筛选">
					<GetTime @getTime="onChangeDateRange" :isIncludeToday="false" :spanIndex="3" @changeTime="onChangeTimeRange"></GetTime>
				</el-form-item>	
                 <div>
                    <el-form-item>
                        <el-button type="primary" @click.native="search">查询</el-button>
                    </el-form-item>	  					   
				</div>			
			</el-form>
		</div>
        <div class="caver marginTop" style="height: 400px;" v-loading="dlTjDataChartLoading">
            <div ref="chart" style="width:100%;height:400px;"></div>
        </div>        
        <div class="tab">
            <div class="data-table-func">
                <el-button type="button" class="dcsh" @click="exportExcel"  >导出</el-button>
            </div> 
            <div class="data-table">
                <el-table :data="radarActiveList.list" max-height="630" border>
                    <el-table-column prop="date" label="日期"></el-table-column>
                    <el-table-column prop="sum_ai_radar_opened_num" label="已启用雷达总数"></el-table-column>
                    <el-table-column prop="sum_active_ai_radar_num" label="日活用户数"></el-table-column>
                </el-table>
            </div>
            <div class="pager">
                <el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="10" :total="radarActiveList.total">
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

    import GetRegion from '../../components/getRegion'

    import { interfaceKey } from '@/utils/authCtrl';
    import {get } from '@/api';
    import { radarActiveList,radarActiveExport} from '@/api/api';
    const {
		start_time,
		end_time
	} = Utils.getTime(7);
    export default {
        name:"radarActive",
        data(){
            const timeRange = Utils.getTime(14);
            return {
				input10:"",
				openVersion:"",
				currentPage: 1,
				firstArgent: '',
                timeout: null,
                dlTjDataChartLoading: false,

				queryParams: {
                    dataType:2,
                    level:1,
                    levelTxt:"日活",
                    company_name:"",
					industry_id: '',
					operator_id: '',
					software_version:'',
					small_starttime: "",
					small_endtime: "",
					company_id: '',
					product_id:"102",
					logdate_start: start_time,
					logdate_end: end_time,
					page: 1,
                    page_size:10,
                    is_page:true,
                    
                    type: 1,
                    name: ''

                },                
                status:1,
                dlsBaseData: {},
                dlsBaseDataLoading: false,
                dlTjData: {},
                dlTjDataLoading: false,
                dlTjDataChart: {},
                dlTjDataChartLoading: false,
                dlTjDataExcel: []
			}
        },
        components: {			
			Industry,
			openVersion,
			GetTime,
            GetRegion
		},
		mounted() {
			this.getSearchAgentList({
				type: 1
			}); //总代理

			this.getSearchCompanyList();
            this.getData();

            // this.getDlsBaseData();
            this.getDataDL();
		},
        methods:{
            ...mapActions(['getSearchAgentList', 'getSearchCompanyList', 'getRadarActiveList']),
			...mapMutations(['setSearchAgentList', 'setSearchCompanyList']),
            resetPage() {
				this.currentPage = 1;
				this.queryParams.page = 1;
            },
            getData() {
				this.getRadarActiveList(this.queryParams)
            },
            getDlsBaseData() {
                this.dlsBaseDataLoading = true;
                get(radarActiveList,this.queryParams).then(res => {
                    this.dlsBaseDataLoading = false;
                    this.dlsBaseData = res.data;
                }).catch(err => {
                    this.dlsBaseDataLoading = false;
                });
            },
            getDataDL() {
                const queryParams = this.queryParams;
                this.getDlTjData({
                    ...queryParams,
                    is_page:false   
                });
            },
            renderChart() {
                if (this.queryParams.type == 1) {
                    const chart = this.$echarts.init(this.$refs.chart);
                    chart.setOption(this.dlTjDataChart);
                }
            },
            //搜索
			search(){				
				this.resetPage();
                this.getData();
                this.getDataDL();
			},
            //开通版本
			getVersion(val){
				this.queryParams.software_version = val;
				// this.resetPage();
				// this.getData()			
			},
            onChangeType(index) {
				this.queryParams.product_id = index;
				this.resetPage();
                this.getData()
                this.getDataDL();
            },
            //切换tab时用
            changeStatisticType(val) {
                this.queryParams.type=val;
                // this.resetPage();
                // this.getData();
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
            
            fistAgentHandleSelect(item) {
				this.queryParams.operator_id = item.uid;
				// this.resetPage();
				// this.getData()
            },
            CompanyNameHandleSelect(item) {
				this.queryParams.company_id = item.company_id;
				this.queryParams.company_name = item.company_name;
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
				// this.resetPage();
				this.queryParams.small_starttime = timeRange.start_time;
				this.queryParams.small_endtime = timeRange.end_time;
				// this.getData()
            },
            handleSizeChange(val) {
                this.queryParams.page_size = val;
                this.getData()
            },
            handleCurrentChange(page) {
                this.currentPage = page;
                this.queryParams.page = page;
                this.getData()
            },
            getDlTjData(params) {
                if (params.dataType== 1) {
                    this.dlTjDataLoading = true;
                    this.dlTjData = {}
                }
                if (params.dataType== 2){
                    this.dlTjData = {}
                    this.dlTjDataChartLoading = true;
                } 

                get(radarActiveList, params).then(res => {
                    const data = res.data;
                    this.dlTjDataChartLoading = false
                    this.setDlTjDataChart((data.list || []).reverse())

                }).catch(err => {
                    if (params.dataType== 1) this.dlTjDataLoading = true;
                    if (params.dataType== 2) this.dlTjDataChartLoading = true;
                })
            },
            setDlTjDataChart(data) {
                let datatxt = this.queryParams.levelTxt
                const opt = {
                    tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    },
                    legend: {
                    data: [`${datatxt}用户数`],
                    },
                    xAxis: [{
                        boundaryGap: false,
                        type: 'category',
                        data: [],
                        axisLabel: {
                            rotate: 30,
                            interval: 'auto'
                        },
                        }],
                        yAxis: [{
                        type: 'value',
                    }],
                    series: [{
                        smooth:true,
                        name: `${datatxt}用户数`,
                        type: 'line',
                        data: [],
                        itemStyle : {  
                                normal : {  
                                    color:'#409EFF',  
                                    lineStyle:{  
                                        color:'#409EFF'  
                                    }  
                                }  
                            },
                        }
                    ]
                };

                for (let i in data) {
                    opt.xAxis[0].data[i] = data[i].date;
                    opt.series[0].data[i] = data[i].sum_active_ai_radar_num
                    // opt.series[1].data[i] = data[i].newagent;
                    // opt.series[2].data[i] = data[i].newyunying;
                }

                this.dlTjDataChart = opt;
            },
            exportExcel() {
                // const type = this.queryParams.type;
                // this.getDlTjData({
                //     ...this.queryParams,
                //     dataType: 3,
                //     page: null,
                //     page_size: null,
                //     cellpack: (res) => { 
                //         Utils.getExcel(
                //         ['日期', '已激活雷达数', '日活用户数', '日活跃率', '周活用户数', '周活跃率', '月活用户数', '月活跃率'],
                //         ['date', 'newyunying', 'newagent', 'newcompany', 'zongadd', 'agentadd', 'usepoint', 'addpoint'],
                //         res,
                //         '整体统计'
                //         );
                //     }
                // });
                location.href = radarActiveExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
            }
        },
        computed: {
            ...mapGetters(['operatorList', 'searchCompanyList', 'radarActiveList'])            
        },
        watch: {
            dlTjDataChart(val, oldval) {
            this.renderChart();
            }
        }
    }
</script>
<style lang="less" scoped>
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
    .data-table-popver {
  max-height: 240px;
  overflow: auto;
  padding: 8px;
  .desc {
    margin: 0 0 8px;
    div {
      font-size: 12px;
      line-height: 1.8;
      color: #777;
      span {
        color: #333;
      }
    }
  }
  table {
    min-width: 164px;
    width: 100%;
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;

    th {
      background: #ebeef5;
      font-weight: normal;
    }

    th,
    td {
      border-right: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      padding: 4px 10px;
      line-height: 1.5;
      font-size: 12px;
    }
  }
}

.city-popover {
  max-width: 600px;
  max-height: 360px;
  overflow-y: auto;
}

#dlstj {
  .tdsj-top {
    display: -webkit-flex;
    display: flex;
    -moz-box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.10);
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.10);
    padding-bottom: 20px;
  .item-td {
    width:200px;
    padding: 0 10px 20px;
    text-align:center;
    box-shadow:#999 0px 0px 2px;
    border-radius:3px;
     border: 1px solid  transparent;
    margin-right:20px;
    transition: all  0.3s;
    .text {
      .name{
      	 color: inherit;
		    height: 48px;
		    line-height: 48px;
		    border-bottom: 1px solid #e7eaec;
		    text-align: left;
		    font-size: 14px;
		    position: relative;
		    img{
		    	width:20px;
		    	height:20px;
		    	vertical-align: middle;
		    	margin-left: 5px;
		    }
      }
      .num {
	      	 height: 40px;
		      line-height:40px;
		      font-size:16px;
		      font-weight: 100;
		      color: inherit;
		      margin-top: 20px; 
      	span{
      		 font-size:30px;
		      font-weight: 100;
		      margin-right:5px;
      	}
 
      }
     .xz {
      line-height:30px;
      font-size: 14px;
      color: #888;
      text-align: left;
      span{
      	float:right;
      	color:#333;
      }
    } 
    }
  }
  .item-td:hover{
  	  border: 1px solid #999;
  	  transform: scale(1.05);
  }
  
  }

  .tj {
    .title {
      height: 50px;
      line-height: 50px;
    }

    .el-range-separator {
      border: none !important;
    }

    .tjlx {
      span {
        width: 100px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #dcdfe6;
        border-left-color: #fff;
        padding: 8px 0 7px;
        float: left;
        font-size: 12px;
        line-height: 1.5;
      }

      .activeTime {
        background: #3798E8;
        color: #fff;
        border-color: #3798E8
      }
    }

    .timesx {
      >span {
        width: 70px;
        text-align: center;
        cursor: pointer;
        border: 1px solid #dcdfe6;
        border-left-color: #fff;
        float: left;
        font-size: 12px;
        padding: 6px 0 6px 0;
        line-height: 1.5;
      }

      .activeTime {
        background: #3798E8;
        color: #fff;
        border-color: #3798E8
      }

      .el-date-editor {
        vertical-align: top;
      }
    }
  }

  .data-table {
    .el-icon-info.disabled {
      color: #ccc;
    }
  }
}
.time-z {
    display: inline-block;
    margin: 0 0 5px;
    vertical-align: middle;
    span {
        display: flex;
        cursor: pointer;
        float: left;
        width: 70px;
        font-size: 12px;
        border: 1px solid #dcdfe6;
        height: 32px;
        border-color: #3798E8;
        border: 1px solid #dcdfe6;     
        justify-content: center;
        align-items: center;   
        &:first-child{
            border-radius: 4px 0 0 4px;
        }   
        &:last-child{
            border-radius: 0 4px 4px 0;
        }   
        &.activeTime {
            background: #409EFF;
            color: #fff;
            border-color: #3798E8;
        }
    }
}
.data-table-func{
    overflow: hidden;
}
.data-table-func .dcsh{
    padding: 8px 0;
    float: right;
}

</style>