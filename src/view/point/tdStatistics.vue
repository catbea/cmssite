<template>
  <div id="pointStat">
    <div class="page-title">
       <h2>
                推点统计
      <el-popover trigger="hover" placement="right" width="700">
        <div>
            <p><strong>投放总推点：</strong>统计加推总部给运营商/代理商/分公司/KA账号等投放的推点数量。包含推点充值，系统发放等（类型包含：充值，系统发放，企业注销返还，授信，和由总部支出的代理商推荐奖励,消耗推点奖励）</p>
           <p><strong>非总部消耗总推点：</strong>运营商/核心代理商/代理商/分公司/KA账号为企业开户，续费等产生的实际推点消耗（不包含代理商间的转账）（类型包含：企业开户，续费，系统回收，增加人员, 开通增值服务, 增加门店数, 增加人数和门店数）</p>
           <p><strong>非总部推点余额：</strong>统计运营商，核心代理商，代理商推点账号中所有推点数量总和</p>
           <p><strong>充值总推点：</strong>统计加推总部给运营商/代理商/分公司/KA账号等充值推点数量。（只包含充值类型，不包含系统发放，奖励等）</p>
           <p><strong>总部消耗总推点：</strong>总部给企业开户，续费等产生的推点消耗。（不包含向代理商充值）（类型包含：企业开户，续费，系统回收，增加人员, 开通增值服务, 增加门店数, 增加人数和门店数）</p>
           <p><strong>其它：</strong>历史原因未走系统推点投放流程的，直接注入的推点数量。（其它=非总部消耗总推点+非总部推点余额-投放总推点）</p>            
        </div>
        <i slot="reference" class="el-icon-question"></i>
      </el-popover>
      </h2>
    </div>
    <div class="data-stat" v-loading="basedataLoading">
      <div class="item-td">
          <div class="text">
            <p class="name">投放总推点（含充值） <img src="../../../static/img/tou.png"></p>
            <p class="num">{{baseData.td_put_in_num | numberWithCommas}}</p>
            <p class="xz">其它 <span>{{baseData.else | numberWithCommas}}</span></p>
          </div>
        </div>
      <div class="item-td">
          <div class="text">
            <p class="name">非总部消耗总推点 <img src="../../../static/img/haocai.png"></p>
            <p class="num">{{baseData.un_head_td_balance | numberWithCommas}}</p>
            <p class="xz">昨日消耗 <span>{{baseData.un_head_last_day_td_balance | numberWithCommas}}</span></p>
          </div>
        </div>
      <div class="item-td">
          <div class="text">
            <p class="name">非总部推点余额 <img src="../../../static/img/yu.png"></p>
            <p class="num">{{baseData.un_head_td_consumed | numberWithCommas}}</p>
          </div>
        </div>
        <div class="item-td">
            <div class="text">
              <p class="name">充值总推点<img src="../../../static/img/chong-2.png"></p>
              <p class="num">{{baseData.td_recharged_num | numberWithCommas}}</p>
               <p class="xz">昨日充值 <span>{{baseData.last_day_td_recharged_num | numberWithCommas}}</span></p>
            </div>
          </div>
          <div class="item-td">
              <div class="text">
                <p class="name">总部消耗总推点<img src="../../../static/img/haocai3.png"></p>
                <p class="num">{{baseData.td_balance | numberWithCommas}}</p>
                 <p class="xz">昨日消耗 <span>{{baseData.last_day_td_balance | numberWithCommas}}</span></p>
              </div>
            </div>
         
          </div>
          <div class="filter-bar">
            <el-form ref="form" label-position="left" label-width="100px" size="small">
              <el-form-item label="时间筛选">
                <GetTime @getTime="onChangeDayRange" :isIncludeToday="false" @changeTime="onChangeTimeRange"></GetTime>
              </el-form-item>
            </el-form>
          </div>
          <div class="tdtotal">
            		非总部消耗推点总数量: <span>{{(chartData.total_un_header_new_td_consumed || 0) | numberWithCommas}}</span>
          </div>
          <div class="caver" v-loading="chartDataLoading">
            <div class="chart" ref="chart"></div>
          </div>
          <div class="data-table-func text-right">
            <el-button type="button" class="dcsh" @click="exportExcel" :loading="exportLoading">导出</el-button>
          </div>
          <div class="data-table" v-loading="tableDataLoading">
            <el-table :data="tableData.list" border max-height="630">
              <el-table-column prop="snapshot_date" label="日期"></el-table-column>
              <el-table-column prop="new_td_recharged_num" label="新增充值推点"></el-table-column>
              <el-table-column prop="un_header_new_td_consumed" label="新增非总部消耗推点"></el-table-column>
              <el-table-column prop="new_td_consumed" label="新增总部消耗推点"></el-table-column>
            </el-table>
          </div>
          <div class="pager">
            <el-pagination layout="prev, pager, next,total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="10" :total="tableData.total">
            </el-pagination>
          </div>
        </div>
</template>
<script>
import GetRegion from '@/components/getRegion';
import GetTime from '@/components/getTime';
import Utils from '@/utils/index';
import { post,get } from '@/api';
import { statisticsTop, statisticsMain,statisticsExport} from '@/api/api';
export default {
  components: {
    GetTime,
    GetRegion
  },
  data() {
    const { start_time, end_time } = Utils.getTime(14,false);
    return {
      currentPage: 1,
      queryParams: {
        snapshot_start_date:start_time,
        snapshot_end_date:end_time,
        page: 1,
        page_size: 10,
        is_page:false
      },
      chartData:[],
      basedataLoading: false,
      baseData: {},
      tableDataLoading: false,
      tableData: {},
      chartDataLoading: false,
      exportLoading: false
    }
  },
  mounted() {
    this.getBaseData();
    this.getTrendDataForChart();
    this.getTrendDataForTable();
  },
  methods: {
    getBaseData() {
      this.baseDataLoading = true;
      get(statisticsTop).then(res => {
        this.baseDataLoading = false;
        this.baseData = res.data;
      }, error => {});
    },
    getTrendDataForTable() {
      this.tableDataLoading = true;
      this.queryParams.is_page = true;
      get(statisticsMain, { ...this.queryParams }).then(res => {
        this.tableDataLoading = false;
        this.tableData = res.data;
      }, error => {});
    },
    getTrendDataForChart() {
      this.chartDataLoading = true;      
      this.queryParams.is_page = false;

      get(statisticsMain, { ...this.queryParams}).then(res => {
        this.chartDataLoading = false;
        this.chartData = res.data;
        const data = (res.data.list || []).reverse();
        const options = {
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
          },
          legend: {
            data: ['充值推点', '非总部消耗推点', '总部消耗'],
          },
          xAxis: [{
            boundaryGap: false,
            type: 'category',
            data: data.map(i => i.snapshot_date),
            axisLabel: {
              rotate: 30,
              interval: 'auto'
            },
          }],
          yAxis: [{ type: 'value' }],
          series: [{
            name: '充值推点',
            type: 'line',
            data: data.map(i => i.new_td_recharged_num),
            smooth:true,
            itemStyle : {  
                normal : {  
                	 color:'#409EFF',  
                    lineStyle:{  
                        color:'#409EFF'  
                    }  
                }  
            },
          }, {
            name: '非总部消耗推点',
            type: 'line',
            data: data.map(i => i.un_header_new_td_consumed),
            smooth:true,
          }, {
            name: '总部消耗',
            type: 'line',
            data: data.map(i => i.new_td_consumed),
            smooth:true,
          },
          ]
        };

        this.$echarts.init(this.$refs.chart).setOption(options);
      }, error => {});
    },
    onChangeTimeRange(timeRange) {
      this.currentPage = 1;
      this.queryParams.page = 1;
      this.queryParams.snapshot_start_date = timeRange.start_time;
      this.queryParams.snapshot_end_date = timeRange.end_time;
      this.getTrendDataForChart();
      this.getTrendDataForTable();
    },
    onChangeDayRange(range) {
      const time = Utils.getTime(range);
      this.onChangeTimeRange(time);
    },
    handleSizeChange(size) {
      this.queryParams.page_size = size;
      this.getTrendDataForTable();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryParams.page = page;
      this.getTrendDataForTable();
    },
    exportExcel() {
      // this.exportLoading = true;
      // post(PointStatDataUrl, { ...this.queryParams, page: null, page_size: null }).then(res => {
      //   this.exportLoading = false;

      //   Utils.getExcel(
      //     ['日期', '开通企业数', '消耗推点数', '充值推点数'],
      //     ['time', 'total', 'expend', 'recharge'],
      //     res.data.list, '推点统计'
      //   );
      // }, error => {});
      this.queryParams.is_page = false;
      location.href = statisticsExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
    }
  }
};

</script>
<style scoped lang="less">
.data-stat {
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
		    	width:25px;
		    	height:25px;
		    	vertical-align: middle;
		    	margin-left: 5px;
		    }
      }
      .num {
          height: 40px;
	      line-height:33px;
	      font-size:30px;
	      font-weight: 100;
	      color: inherit;
	      margin-top: 20px; 
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
      @media screen and (max-width: 1500px) {
        .num {
          font-size: 24px;
        }
      }
    }
  }
  .item-td:hover{
  	  border: 1px solid #999;
  	  transform: scale(1.05);
  }
 
}

.filter-bar {
  margin: 48px 0 20px;

  .agent-name {
    .el-input {
      width: 300px;
      margin-right: 30px;
    }
  }
}

.tdtotal {
  height: 50px;
  line-height: 50px;

  span {
    color: red
  }
}

.caver {
  height: 400px;

  .chart {
    height: 400px;
  }
}

.el-table {
  width: 100%;
}
	.data-table-func{
		overflow: hidden;
	}
	.data-table-func .dcsh{
		padding: 8px 0;
		float: right;
	}

</style>
