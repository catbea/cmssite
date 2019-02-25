<template>
  <div id="dlstj">
    <h2 class="page-title">
      代理商统计
      <el-popover trigger="hover" placement="right">
        <div>               
          <p><strong>整体统计</strong><p>
          <p><strong>运营商数量：</strong>当前有效运营商的总数（状态为正常的运营商，不包含审核中，冻结，审核不通过）。数据截止至昨日</p>
          <p><strong>核心代理商数量：</strong>当前有效核心代理商的总数（状态为正常的核心代理商，不包含审核中，冻结，审核不通过）。数据截止至昨日</p>
          <p><strong>代理商数量：</strong>当前有效代理商的数量（状态为正常的代理商，不包含审核中，冻结，审核不通过）。数据截止至昨日</p>
          <p><strong>新增运营商：</strong>统计在所选时间段内累计，新开户并审核通过的运营商数量</p>
          <p><strong>新增核心代理商：</strong>统计在所选时间段内累计，新开户并审核通过的核心代理商数量</p>
          <p><strong>新增代理商：</strong>统计在所选时间段内累计，新开户并审核通过的代理商数量</p>

          <p><strong>按运营商统计</strong><p>
          <p><strong>新增核心代理商：</strong>统计运营商在所选时间段内累计，新开户并审核通过的核心代理商数量</p>
          <p><strong>新增代理商：</strong>统计运营商在所选时间段内累计，新开户并审核通过的代理商数量</p>
          <p><strong>新增服务企业数：</strong>统计运营商在所选时间段内累计，新增并审核通过的服务企业数量（包含正常状态，及停用等非正常状态企业）</p>
          <p><strong>新增开户企业数：</strong>统计运营商在所选时间段内累计，新增并审核通过的开户企业数量（包含正常状态，及停用等非正常状态企业）</p>
          <p><strong>新增自身消耗推点数：</strong>统计运营商在所选时间段内累计，新增的推点实际消耗数量（不包含渠道间的转账）</p>
          <p><strong>新增下级消耗推点数：</strong>统计运营商在所选时间段内累计，运营商的下级新增的推点实际消耗数量（不包含渠道间的转账）</p>
          <p><strong>返还与发放推点数：</strong>为该运营商通过系统发放和企业注销 返还，两种类型获得推点之和（由加推总部发放）</p>
        </div>
        <i slot="reference" class="el-icon-question"></i>
      </el-popover>
    </h2>
    <div class="tdsj-top" v-loading="dlsBaseDataLoading" :class="{'no-b-bottom': !mapInterface('Point_getAgentList')}" v-show="mapInterface('Point_getAgent')">
      <div class="item-td">
          <div class="text">
            <p class="name">运营商数量<img v-lazy="td1"></p>
            <p class="num"><span>{{dlsBaseData.sum_operator_num | numberWithCommas}}</span> 家</p>
          </div>
        </div>
        <div class="item-td">
            <div class="text">
              <p class="name">核心代理数量<img v-lazy="td2"></p>
              <p class="num"><span>{{dlsBaseData.sum_core_agent_num | numberWithCommas}}</span>家</p>
            </div>
          </div>
        <div class="item-td">
            <div class="text">
              <p class="name">代理数量<img v-lazy="td3"></p>
              <p class="num"><span>{{dlsBaseData.sum_agent_num | numberWithCommas}}</span>家</p>
            </div>
          </div>
        </div>
        <div v-show="mapInterface('Point_getAgentList')">
          <div class="tj">
            <div class="title">拓展统计</div>
            <el-form ref="form" label-position="left" size="small" label-width="100px">
              <el-form-item label="统计类型">
                	 <el-radio-group size="medium" v-model="status"   @change='changeStatisticType' >
								      <el-radio-button label='1' >整体统计</el-radio-button>
								      <el-radio-button label='2'  >按运营商统计</el-radio-button>
							    </el-radio-group>
              </el-form-item>
              <el-form-item label="时间筛选">
                <GetTime @getTime="onChangeDateRange" :isIncludeToday="false" @changeTime="onChangeTimeRange"></GetTime>
                
              </el-form-item>
              <div style="width:550px">
                <div v-show="queryParams.type == 1">
                  <el-form-item >                    
                    <el-button type="primary" @click.native='search'>搜索</el-button>
                  </el-form-item>
                </div>
                <div v-show="queryParams.type == 2">
                  <el-form-item label="运营商名称">
                    <el-autocomplete class="inline-input" v-model="firstArgent" :fetch-suggestions="queryFistAgent" placeholder="请输入运营商名称" clearable @select="fistAgentHandleSelect"  ></el-autocomplete>
                    <!-- <el-input clearable v-model="queryParams.name" placeholder="请输入运营商名称" style="width:300px;margin-right:30px;"></el-input> -->
                    <el-button type="primary" @click.native='search'>搜索</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
          <div v-if="queryParams.type == 1" class="caver" style="height: 400px;" v-loading="dlTjDataChartLoading">
            <div ref="chart" style="width:100%;height:400px;"></div>
          </div>
          <div class="data-table-func">
            <button type="button" class="dcsh" @click="exportExcel">导出</button>
          </div>
          <div class="data-table" v-loading="dlTjDataLoading">
            <div v-if="queryParams.type == 1 && dlTjData.list">
              <el-table :data="dlTjData.list" border max-height="630" style="width: 100%">
                <el-table-column prop="snapshot_date" label="时间" width="100"></el-table-column>
                <el-table-column prop="sum_operator_num" label="新增运营商">
                  <template slot-scope="scope">
                    <span style="margin-right:10px;">{{scope.row.sum_operator_num}}</span>                    
                  </template>
                </el-table-column>
                <el-table-column prop="sum_core_agent_num" label="新增核心代理商">
                  <template slot-scope="scope">
                    <span style="margin-right:10px;">{{scope.row.sum_core_agent_num}}</span>                   
                  </template>
                </el-table-column>
                <el-table-column prop="sum_operator_agent_num" label="新增代理商">
                  <template slot-scope="scope">
                    <span style="margin-right:10px;">{{scope.row.sum_operator_agent_num}}</span>                   
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="queryParams.type == 2 && dlTjData.list">
              <el-table :data="dlTjData.list" border max-height="630" style="width: 100%">
                <el-table-column prop="org_id" label="运营商名称" width="180">
                </el-table-column>
                <el-table-column prop="sum_new_core_agent_num" label="新增核心代理" width="180">
                </el-table-column>
                <el-table-column prop="sum_new_agent_num" label="新增代理">
                </el-table-column>
                <el-table-column prop="new_company_servered_num" label="新增服务企业数"></el-table-column>
                <el-table-column prop="new_operator_company_num" label="新增开户企业"></el-table-column>
                <el-table-column prop="new_td_consumed" label="新增自身消耗推点"></el-table-column>
                <el-table-column prop="new_td_consumed_by_lower_level" label="新增下级消耗推点"></el-table-column>
                <el-table-column prop="td_returned_granted" label="返还与发放"></el-table-column>
                <!--<el-table-column prop="usepoint" label="操作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看交易记录</el-button>
                  </template>
                </el-table-column>-->
              </el-table>
            </div>
          </div>
          <div class="pager">
            <el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="10" :total="dlTjData.total">
            </el-pagination>
          </div>
        </div>
      </div>
</template>
<script>
// import { mapGetters, mapActions, mapMutations } from 'vuex';
import GetRegion from '../../components/getRegion'
import GetTime from '../../components/getTime'
import Utils from '../../utils/index';
import td1 from '../../../static/img/u1369.png';
import td2 from '../../../static/img/u1371.png';
import td3 from '../../../static/img/u1373.png';
import td4 from '../../../static/img/u766.png';
import { interfaceKey } from '@/utils/authCtrl';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { post,get } from '@/api';
import { 
  agentStatisticsTop,
  agentStatisticsOverallMain,
  agentStatisticsOverallMainExport,
  agentStatisticsOperatorMain,
  agentStatisticsOperatorMainExport,
  } from '@/api/api';
export default {
  components: {
    GetTime,
    GetRegion
  },
  data() {
    const timeRange = Utils.getTime(14);
    return {
      td1,
      td2,
      td3,
      td4,
      firstArgent:"",
      currentPage: 1,
      status:1,
      queryParams: {
        url:agentStatisticsOverallMain,
        page: 1,
        page_size: 10,
        type: 1,
        name: '',
        operator_id:"",
        // snapshot_start_date:"",
        // snapshot_end_date:"",
        snapshot_start_date:timeRange.start_time,
        snapshot_end_date:timeRange.end_time,
        is_page:false,//true表示列表，false表示折线图
      },

      dlsBaseData: {},
      dlsBaseDataLoading: false,
      dlTjData: {},
      dlTjDataLoading: false,
      dlTjDataChart: {},
      dlTjDataChartLoading: false,
      dlTjDataExcel: []
    }
  },
  created() {
    this.getDlsBaseData();
    this.getData();
    this.getSearchAgentList({
      type: 1
    }); //运营商
  },
  methods: {
    ...mapActions(['getSearchAgentList']),
    ...mapMutations(['setSearchAgentList']),
    getDlsBaseData() {
      this.dlsBaseDataLoading = true;
      get(agentStatisticsTop).then(res => {
        this.dlsBaseDataLoading = false;
        this.dlsBaseData = res.data;
      }).catch(err => {
        this.dlsBaseDataLoading = false;
      });
    },
    getDlTjData(params) {
      if (params.type== 1) {
        this.dlTjDataLoading = true;
        this.dlTjData = {}
      }
      if (params.type== 2){
        this.dlTjData = {}
        this.dlTjDataChartLoading = true;
      } 

      get(params.url, params).then(res => {
        const data = res.data;

        if (params.is_page) {
          this.dlTjDataLoading = false;
          const list = data.list;
          this.dlTjData = data;
        }

        if (params.is_page== false) {
          this.dlTjDataChartLoading = false
          this.setDlTjDataChart((data.list.reverse() || []))
        }

        // if (params.type== 3) {
        // 	params.cellpack(data.list)
        // }
      }).catch(err => {
        if (params.type== 1) this.dlTjDataLoading = true;
        if (params.type== 2) this.dlTjDataChartLoading = true;
      })
    },
    setDlTjDataChart(data) {
      const opt = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ['新增运营商', '新增核心代理商', '新增代理商'],
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
          name: '新增运营商',
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
        }, {
        	smooth:true,
          name: '新增核心代理商',
          type: 'line',
          data: []
        }, {
        	smooth:true,
          name: '新增代理商',
          type: 'line',
          data: []
        }]
      };
      console.log("data",data);
      for (let i in data) {
        opt.xAxis[0].data[i] = data[i].snapshot_date;
        opt.series[0].data[i] = data[i].sum_operator_num
        opt.series[1].data[i] = data[i].sum_core_agent_num;
        opt.series[2].data[i] = data[i].sum_operator_agent_num;
      }

      this.dlTjDataChart = opt;
    },
    handleClick(row) {
      console.log(row);
    },
    //模糊搜索statar------------
    queryFistAgent(queryString, cb) {      
      this.querySearchAsync(queryString, cb, this.operatorList)
    },
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
    fistAgentHandleSelect(item) {
      this.queryParams.operator_id = item.uid||"";
    },

    mapInterface(val) {
      return interfaceKey(val);
    },
    resetPage() {
      this.currentPage = 1;
      this.queryParams.page = 1;
    },
    renderChart() {
      if (this.queryParams.type == 1) {
        const chart = this.$echarts.init(this.$refs.chart);
        chart.setOption(this.dlTjDataChart);
      }
    },
    getData() {
      const queryParams = this.queryParams;
      this.getDlTjData({
        ...queryParams,
        is_page:true
      });
      if(this.queryParams.type == 1){
        this.getDlTjData({
          ...queryParams,
          is_page:false,
        });

      }

    },
    changeStatisticType(val) {
        if(val==2){
          this.queryParams.url = agentStatisticsOperatorMain;
        }else{
          this.queryParams.url = agentStatisticsOverallMain;          
        }
         this.queryParams.type=val;
         this.queryParams.operator_id="";
         this.firstArgent = "";
         this.resetPage();
         this.getData();
    },
    onChangeDateRange(timeRange) {
      let time = Utils.getTime(timeRange);
      this.onChangeTimeRange(time);
    },
    onChangeTimeRange(timeRange) {
      // this.resetPage();
      this.queryParams.snapshot_start_date = timeRange.start_time;
      this.queryParams.snapshot_end_date = timeRange.end_time;
      // this.getData();
    },
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      this.getData();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryParams.page = page;
      this.getData();
    },
    search() {
      this.resetPage();
      this.getData();
    },
    exportExcel() {
      if(this.queryParams.type==1){
        location.href = agentStatisticsOverallMainExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
      }else{
        location.href = agentStatisticsOperatorMainExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
      }
    }
  },
  computed: {
    ...mapGetters(['operatorList'])
  },
  watch: {
    dlTjDataChart(val, oldval) {
      console.log("===",val, "===",oldval);
      this.renderChart();
    },
    //bug清空数据
    firstArgent(val) {
      !val ? this.fistAgentHandleSelect('') : ''
    }
  }
};

</script>
<style scoped lang="less">
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
  .data-table-func{
		overflow: hidden;
	}
	.data-table-func .dcsh{
		padding: 8px 0;
		float: right;
	}

</style>
