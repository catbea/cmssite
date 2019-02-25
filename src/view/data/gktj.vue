<template>
  <div id="trend">
    <div class="page-title">
      <h2>
        趋势分析
        <el-popover trigger="hover" placement="right" width="700">
          <div>
            <p><strong>企业数：</strong>开通账号的企业中，状态为正常的企业数（状态为正常的企业，不包含审核中，审核失败，停用，注销）。</p>
            <p><strong>已上线小程序企业数：</strong>状态为正常的企业中，已上线小程序的企业数量。</p>
            <p><strong>开通门店数：</strong>门店版企业购买开通的门店总数（状态为正常的企业）。</p>
            <p><strong>启用门店数：</strong>门店版企业购买门店后，启用的门店总数（状态为正常的企业）。</p>
            <p><strong>开通AI雷达数：</strong>企业购买开通的AI雷达总数（状态为正常的企业）。</p>
            <p><strong>启用AI雷达数：</strong>企业购买AI雷达账号后，实际为员工启用的雷达总数。</p>
            <p><strong>小程序用户数：</strong>名片小程序累计用户总数。</p>
            <p><strong>AI雷达活跃用户数：</strong>统计时段内，访问过AI雷达页面的用户数。</p>
            <p><strong>小程序活跃用户数：</strong>统计时段内，访问过小程序页面的用户数。</p>
            <p><strong>今日新增：</strong>今日当前总数-昨日总数。</p>
            <p><strong>昨日新增：</strong>昨日总数-前日总数。</p>
          </div>
          <i slot="reference" class="el-icon-question"></i>
        </el-popover>
      </h2>
    </div>
     <div style="margin-bottom:30px">
        <el-form ref="form" label-position="left" label-width="70px" size="small">
          <el-form-item label="统计对象">
            <el-select v-model="queryParams.software_version"  @change='selectChange'>
                <el-option  label="全部"  value=""></el-option>
                <el-option  label="企业版"  value="0"></el-option>
                <el-option  label="门店版"  value="2"></el-option>
            </el-select>
          </el-form-item>
          
        </el-form>
   </div>
    <div class="data-stat" v-loading="baseDataLoading">
      <div class="top-item">
      	 <p class="kt">企业数</p>
        <p class="num">{{baseData.company_num | numberWithCommas}}</p>
        <p class="xz">昨日新增 <span>{{baseData.company_num_add | numberWithCommas}} 家</span></p>
      </div>
     <div class="top-item">
      	 <p class="kt">已上线小程序企业数</p>
        <p class="num">{{baseData.online_small_program_num | numberWithCommas}}</p>
        <p class="xz">昨日新增  <span>{{baseData.online_small_program_num_add | numberWithCommas}}个</span></p>
      </div>
      <div class="top-item" v-show="queryParams.software_version==2">
      	 <p class="kt">启用门店总数</p>
        <p class="num">{{baseData.store_used_num | numberWithCommas}}</p>
        <p class="xz">昨日新增 <span>{{baseData.store_used_num_add | numberWithCommas}}个</span></p>
      </div>
      <div class="top-item">
      	<p class="kt">开通AI雷达数</p>
        <p class="num">{{baseData.ai_radar_purchased_num | numberWithCommas}}</p>
        <p class="xz">昨日新增<span>{{baseData.ai_radar_purchased_num_add | numberWithCommas}}个</span></p>
      </div>
       <div class="top-item">
       	 <p class="kt">启用AI雷达数</p>
        <p class="num">{{baseData.ai_radar_opened_num | numberWithCommas}}</p>
        <p class="xz">昨日新增<span>{{baseData.ai_radar_opened_num_add | numberWithCommas}}个</span></p>
      </div>
      <div class="top-item">
      	 <p class="kt">小程序用户总数</p>
        <p class="num">{{baseData.small_program_user_num | numberWithCommas}}</p>
        <p class="xz">昨日新增<span>{{baseData.small_program_user_num_add | numberWithCommas}}个</span></p>
      </div> 
    </div>
    <div class="filter-bar">
     <div style="margin-bottom: 20px;">
     	    <el-radio-group v-model="queryParams.type_id" @change="switchType">
			      <el-radio-button label="1">企业数趋势</el-radio-button>
			      <el-radio-button label="2">AI雷达数趋势</el-radio-button>
			      <el-radio-button label="3">小程序用户数趋势</el-radio-button>
    </el-radio-group>
     </div>
  
      <div class="time-j-wrap">
        <GetTime @getTime="onChangeDayRange" :isIncludeToday="false" @changeTime="onChangeTimeRange"></GetTime>
      </div>
      <div class="time-z clearfix" v-if="false">
        <span @click="switchRange(1)" :class="queryParams.level == 1 ? 'activeTime' : ''">按日</span>
        <span @click="switchRange(2)" :class="queryParams.level == 2 ? 'activeTime' : ''">按周</span>
        <span @click="switchRange(3)" :class="queryParams.level == 3 ? 'activeTime' : ''">按月</span>
      </div>
    </div>
    <div class="total-ts">
      <template v-if="queryParams.type_id == 2">统计时段内AI雷达新增开通：</template>
      <template v-else>统计时段内共新增：</template>
      <span>{{tableData.total_add_company||tableData.total_add_radar||tableData.total_add_user | numberWithCommas}}</span>      
      <template v-if="queryParams.type_id == 1">家</template>
      <template v-else>个 </template>
      <template v-if="queryParams.type_id == 2">&nbsp;&nbsp;新增启用：<span>{{tableData.total_add_radar_open | numberWithCommas}}</span>个</template>
    </div>
    <div class="caver" v-loading="chartDataLoading">
      <div class="chart" ref="chart"></div>
    </div>
    <div class="data-table-func text-right">
      <el-button type="button" class="dcsh" @click="exportExcel" :loading="exportLoading">导出</el-button>
    </div>
    <div class="data-table" v-show="queryParams.type_id==1" v-loading="tableDataLoading">
      <el-table :data="tableData.list" border max-height="630">
        <el-table-column prop="date" :label="labelNames[0][0]"></el-table-column>
        <el-table-column prop="company_num" :label="labelNames[0][1]"></el-table-column>
        <el-table-column prop="new_company_num" :label="labelNames[0][2]"></el-table-column>
        <el-table-column prop="add_percentage" :label="labelNames[0][3]"></el-table-column>
        <el-table-column prop="online_small_program_num" :label="labelNames[0][4]"></el-table-column>
        <el-table-column  v-if="status==102" prop="store_purchased_num" :label="labelNames[0][5]"></el-table-column>
        <el-table-column  v-if="status==102" prop="store_used_num" :label="labelNames[0][6]"></el-table-column>
      </el-table>
    </div>
    <div class="data-table" v-show="queryParams.type_id==2" v-loading="tableDataLoading2">
      <el-table :data="tableData.list" border max-height="630">
        <el-table-column prop="date" :label="labelNames[1][0]"></el-table-column>
        <el-table-column prop="ai_radar_purchased_num" :label="labelNames[1][1]"></el-table-column>
        <el-table-column prop="new_ai_radar_purchased_num" :label="labelNames[1][2]"></el-table-column>
        <el-table-column prop="add_percentage" :label="labelNames[1][3]"></el-table-column>
        <el-table-column prop="ai_radar_opened_num" :label="labelNames[1][4]"></el-table-column>
        <el-table-column prop="add_ai_radar_opened_num" :label="labelNames[1][5]"></el-table-column>
        <el-table-column prop="active_ai_radar_num" :label="labelNames[1][6]"></el-table-column>
      </el-table>
    </div>
    <div class="data-table" v-show="queryParams.type_id==3" v-loading="tableDataLoading3">
      <el-table :data="tableData.list" border max-height="630">
        <el-table-column prop="date" :label="labelNames[2][0]"></el-table-column>
        <el-table-column prop="small_program_user_num" :label="labelNames[2][1]"></el-table-column>
        <el-table-column prop="new_small_program_user_num" :label="labelNames[2][2]"></el-table-column>
        <el-table-column prop="add_percentage" :label="labelNames[2][3]"></el-table-column>
        <el-table-column prop="active_small_program_user_num" :label="labelNames[2][4]"></el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="10" :total="tableData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import GetTime from '@/components/getTime'
import Utils from '@/utils/index';
import { post,get } from '@/api';
import { userTrendsTop, userTrendsMain,userTrendsExport } from '@/api/api';
const {
  start_time,
  end_time
} = Utils.getTime(14,false);
export default {
  components: {
    GetTime
  },
  data() {
    const { start_time, end_time } = Utils.getTime(14);
    const labelNames = [
      ['日期', '企业总数', '新增企业数', '总数较前一天','已上线小程序企业数','开通门店数','启用门店数'],
      ['日期', '开通AI雷达总数', '新增开通', '较前一天','启用AI雷达总数','新增启用','活跃用户数'],
      ['日期', '小程序用户总数', '小程序新增用户数', '总数较前一天','活跃用户数']
    ];

    return {
      status:'',
      labelNames,
      exportTitle: ['企业数趋势', 'AI雷达数趋势', '小程序用户数趋势'],
      chartNames: [['新增企业数'], ['新增开通','新增启用','活跃用户数'], ['新增客户数','活跃用户数']],
      currentPage: 1,
      queryParams: {
        type_id:1, // 1-企业数趋势 2-AI雷达数趋势 3-小程序用户数趋势
        logdate_start:start_time,
        logdate_end:end_time,
        software_version:"",
        page:1,
        page_size:10,
        is_page:true,
        level: 1,
      },
      baseData: {},
      baseDataLoading: false,
      chartDataLoading: false,
      tableData: [],
      tableDataLoading: false,
      tableDataLoading2: false,
      tableDataLoading3: false,
      exportLoading: false,
 
      value: '',
      myChart:null
    }
  },
  created() {
    this.getBaseData('');
    this.getTrendDataForChart();
    this.getTrendDataForTable();
  },
  mounted(){
     this.myChart = this.$echarts.init(this.$refs.chart);
  },
  methods: {
    getBaseData() {
      this.baseDataLoading = true;
      get(userTrendsTop,this.queryParams).then(res => {
        this.baseDataLoading = false;
        this.baseData = res.data;
      }, error => {});
    },
    selectChange(val){
        this.currentPage = 1;
        this.queryParams.page = 1;
        this.queryParams.software_version = val;
        this.getBaseData();
        this.getTrendDataForChart();
        this.getTrendDataForTable();
    },
    getTrendDataForTable() {
      this.tableDataLoading = true;
      this.tableDataLoading2 = true;
      this.tableDataLoading3 = true;  
       this.queryParams.is_page = true;   
      get(userTrendsMain, { ...this.queryParams } ).then(res => {
        this.tableDataLoading = false;
        this.tableDataLoading2 = false;
        this.tableDataLoading3 = false;
        this.tableData = res.data;
      }, error => {});
    },
    getTrendDataForChart() {
      this.chartDataLoading = true;
       this.queryParams.is_page = false;
      get(userTrendsMain, { ...this.queryParams}).then(res => {
        this.chartDataLoading = false;
        const data = res.data.list.length ? res.data.list.reverse(): [];
        const type = this.queryParams.type_id;
        const name = this.chartNames[type - 1];
        console.log("name",name,type);
        let series = [];
        let options = {};
        if(type == 1){
            options = {
              tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
              },
              legend: {
                data: name
              },
              xAxis: [{
                boundaryGap: false,
                type: 'category',
                data: data.map(item => item.date),
                axisLabel: {
                  rotate: 30,
                  interval: 'auto'
                }
              }],
              yAxis: [{ type: 'value' }],
              series: [{
              smooth:true,
              name: name,
              type: 'line',
              data: data.map(item => item.new_company_num),
              itemStyle : {  
                  normal : {  
                    color:'#409EFF',  
                      lineStyle:{  
                          color:'#409EFF'  
                      }  
                  }  
              },
            }]
          }           
        }
        else if(type == 2){
          options = {
            tooltip: {
              trigger: 'axis',
              axisPointer: { type: 'shadow' }
            },
            legend: {
              data: name
            },
            xAxis: [{
              boundaryGap: false,
              type: 'category',
              data: data.map(item => item.date),
              axisLabel: {
                rotate: 30,
                interval: 'auto'
              }
            }],
            yAxis: [{ type: 'value' }],
            series: [{
              smooth:true,
              name: name[0],
              type: 'line',
              data: data.map(item => item.new_ai_radar_purchased_num),
              itemStyle : {  
                  normal : {  
                    color:'#409EFF',  
                      lineStyle:{  
                          color:'#409EFF'  
                      }  
                  }  
              }},{
                  smooth:true,
                  name: name[1],
                  type: 'line',
                  data: data.map(item => item.add_ai_radar_opened_num)
                }, {
                  smooth:true,
                  name: name[2],
                  type: 'line',
                  data: data.map(item => item.active_ai_radar_num)
                }
            ]
          }          
        }
        else if(type == 3){
          options = {
            tooltip: {
              trigger: 'axis',
              axisPointer: { type: 'shadow' }
            },
            legend: {
              data: name
            },
            xAxis: [{
              boundaryGap: false,
              type: 'category',
              data: data.map(item => item.date),
              axisLabel: {
                rotate: 30,
                interval: 'auto'
              }
            }],
            yAxis: [{ type: 'value' }],
            series: [{
              smooth:true,
              name: name[0],
              type: 'line',
              data: data.map(item => item.new_small_program_user_num),
              itemStyle : {  
                  normal : {  
                    color:'#409EFF',  
                      lineStyle:{  
                          color:'#409EFF'  
                      }  
                  }  
                },
              },{
                  smooth:true,
                  name: name[1],
                  type: 'line',
                  data: data.map(item => item.active_small_program_user_num)
                }, 
              ]
          }
           
        }
         this.myChart.setOption(options,true);
      }, error => {});
    },
    switchType(type) { 
      this.currentPage = 1;
      this.queryParams.page = 1;
      this.queryParams.type_id = type;
      // this.labelName = this.labelNames[type - 1];  

      this.getTrendDataForChart();
      this.getTrendDataForTable();
    },
    onChangeDayRange(length) {
      this.onChangeTimeRange(Utils.getTime(length));
    },
    onChangeTimeRange({ start_time, end_time }) {
      const day = Utils.getsjc(end_time) - Utils.getsjc(start_time);

      if (day < 32) this.queryParams.level = 1;

      this.queryParams.logdate_start = start_time;
      this.queryParams.logdate_end = end_time;

      this.currentPage = 1;
      this.queryParams.page = 1;

      this.getTrendDataForChart();
      this.getTrendDataForTable();
    },
    switchRange(level) {     

      const { logdate_start, logdate_end } = this.queryParams;
      const day = Utils.getsjc(logdate_end) - Utils.getsjc(logdate_start);

      if ((level == 3 && day < 32) || (level == 2 && day < 8)) return Utils.toast('时间区间太短');

      this.queryParams.level = level;

      this.currentPage = 1;
      this.queryParams.page = 1;

      this.getTrendDataForChart();
      this.getTrendDataForTable();
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
      // post(TrendDataUrl, { ...this.queryParams, page: '', page_size: '' }).then(res => {
      //   this.exportLoading = false;
      //   const data = res.data.lists;
      //   const title = this.exportTitle[this.queryParams.type - 1];
      //    let contType=['time', 'amount', 'added', 'compare'];
      //   Utils.getExcel(this.labelName,  contType, data, title);
      // }, error => {});
      this.queryParams.is_page = false;   
      location.href = userTrendsExport+'?'+Utils.jsonToUrlFmt(this.queryParams);      
    }
  }
};

</script>
<style scoped lang="less">
@color : #409EFF;
.data-stat {
  display: -webkit-flex;
  display: flex;
  -moz-box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.10);
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.10);
  padding-bottom: 20px;

  .top-item {
	    width:200px;
	    padding: 0 10px 20px;
	    text-align:center;
	    box-shadow:#999 0px 0px 2px;
	    border:1px solid transparent;
	    margin-right:20px;
	    transition: all  0.3s;
    .kt{
	    	 color: inherit;
		    height: 48px;
		    line-height: 48px;
		    border-bottom: 1px solid #e7eaec;
		    text-align: left;
		    font-size: 14px;
    }
    .xz {
      line-height: 1.5;
      font-size: 14px;
      color: #888;
      text-align: left;
      span{
      	float:right
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

    @media screen and (max-width: 1500px) {
      .num {
        font-size: 24px;
      }
    }

    span {
      color: red;
    }
  }
   .top-item:hover{
  	  border: 1px solid #999;
  	  transform: scale(1.05);
  }
}

.filter-bar {
  padding-top: 48px;

  span {
    width: 90px;
    cursor: pointer;
    float: left;
    text-align: center;
    line-height: 34px;
    height: 34px;
    font-size: 12px;
   
  }
  span:nth-child(1){
  	 border-radius: 4px 0 0 4px;
  }
  span:nth-child(3){
  	 border-radius: 0px 4px  4px  0;
  } 
  .time-j-wrap {
    display: inline-block;
    margin: 0 12px 12px 0;
    vertical-align: middle;
  }

  .time-z {
    display: inline-block;
    margin: 0 0 12px;
    vertical-align: middle;

    span {
      width: 70px;
      font-size: 12px;
      border: 1px solid #dcdfe6;
      height: 32px;

      &.activeTime {
        background: @color;
        color: #fff;
        border-color: #3798E8;
      }
    }
  }

  .yhlx {
    margin: 0 0 20px 0;

    span {
      width: 150px;
      font-size: 12px;
      border: 1px solid #dcdfe6;
      
      &.activeTime {
        background: @color;
        color: #fff;
        border-color: @color;
      }
    }
  }
}

.total-ts {
  margin: 8px 0 20px;

  span {
    margin-right: 3px;
    color: red;
  }
}

.caver {
  height: 400px;
  width: 90%;

  .chart {
    height: 100%;
  }
}

.el-table {
  width: 100%;
}

</style>
