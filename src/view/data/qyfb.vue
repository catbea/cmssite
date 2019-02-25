<template>
  <div id="overallArea">
    <div class="page-title">
      <h2>
				<span>区域分布 </span>
				<el-popover trigger="hover" placement="right">
				<div>
          <p><strong>开通企业数：</strong>省份/城市下开户的企业总数。（数据截至昨日，每日更新一次，以下同）</p>
          <p><strong>占总企业数：</strong>省份/城市下开户的企业总数占总开户企业数百分比</p>
          <p><strong>启用AI雷达数：</strong>省份/城市下启用的AI雷达总数</p>
          <p><strong>占总启用AI雷达数：</strong>省份/城市下启用的AI雷达数占总销售AI雷达数百分比</p>
				</div>
				<i slot="reference" class="el-icon-question"></i>
			</el-popover>
			</h2>
    </div>
    <div class="filter-bar">
      <el-form ref="form" size="small" label-position="left" label-width="80px">
        <el-form-item label="统计指标">
          <el-select v-model="queryParams.type_id" placeholder="状态" @change="getChartDataType">
            <el-option label="按开通企业数" value="1"></el-option>
            <el-option label="按启用AI雷达数" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="caver" v-loading="chartDataLoading">
      <div class="chart" ref="chart"></div>
    </div>
    <div class="data-table-func clearfix">
      <el-button class="dcsh pull-right" @click="exportExcel(queryParams)" :loading="exportLoading">导出</el-button>
     <div>
     	    <el-radio-group size="medium" v-model="queryParams.statistics_id"   @change='onChangeStatRange' >
				      <el-radio-button label='1'>按省份统计</el-radio-button>
				      <el-radio-button label='2'>按地级市统计</el-radio-button>
					 </el-radio-group>
     </div>
    </div>
    <div class="data-table" v-loading="tableDataLoading">
      <div v-show="queryParams.statistics_id == 1">
        <el-table :data="tableData.list" border sortable="custom" @sort-change="sortChange" :default-sort="{prop: '', order: 'descending'}" max-height="630" style="width: 100%">
          <el-table-column prop="province" label="省份" ></el-table-column>
          <el-table-column prop="company_num"  label="企业数" ></el-table-column>
          <el-table-column prop="company_num_ratio" label="占总企业数" ></el-table-column>
          <el-table-column prop="ai_radar_opened_num" label="启用AI雷达数" ></el-table-column>
          <el-table-column prop="ai_radar_opened_ratio" label="占总启用AI雷达数"></el-table-column>
        </el-table>
      </div>
      <div v-show="queryParams.statistics_id == 2">
        <el-table :data="tableData.list" border sortable="custom" @sort-change="sortChange" :default-sort="{prop: '', order: 'descending'}" max-height="630" style="width: 100%">
          <el-table-column prop="city" label="地级市"></el-table-column>
          <el-table-column prop="province" label="所属省份"></el-table-column>
          <el-table-column prop="company_num" label="企业数" ></el-table-column>
          <el-table-column prop="company_num_ratio" label="占总企业数"></el-table-column>
            <el-table-column prop="ai_radar_opened_num" label="启用AI雷达数"></el-table-column>
          <el-table-column prop="ai_radar_opened_ratio" label="占总启用AI雷达数"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pager">
      <el-pagination layout="prev,pager,next,total,sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="10" :total="tableData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Utils from '../../utils/index';
import { post, get } from '@/api';
import { AreaDataUrl,regionalExport } from '@/api/api';

export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      queryParams: {        
        page: 1,
        page_size: 10,
        type_id: "1",
        statistics_id: 1,
        sort: '',
        order: '',
        is_page:true
      },
      tableData: {},
      tableDataLoading: false,
      chartDataLoading: false,
      exportLoading: false
    }
  },
  created(){
    this.getTableData();
    this.getChartData();
  },
  methods: {
    getChartDataType(val){
      this.queryParams.type_id = val;
      this.getTableData();
      this.getChartData();
    },
    getChartData() {
      this.queryParams.is_page = false;
      let queryParams = this.queryParams;
      this.chartDataLoading = true;
      get(AreaDataUrl, queryParams).then(res => {
        this.chartDataLoading = false;
        const list = res.data.list;
        const names = ['企业数', 'AI雷达数'];
        const titles = ['开通企业数区域分布图', '启用AI雷达数区域分布图'];
        const valueKeys = ['company_num', 'ai_radar_opened_num']; // 需要展示的字段（区分按企业与按雷达）
        const colorLevel = 8; // 颜色层级
        const levelSize = 1 / colorLevel; // 层级大小
        let maxValue = 1; // 以最大值为1展示 企业数最多的省份颜色最亮，其他依次递减

        // 获取需要展示在图表中的数据
        const data = list.map(item => {
          const name = item.province.replace(/省|市|自治区|壮族自治区|维吾尔自治区|回族自治区/g, '');
          const company_num = item.company_num;
          const ai_radar_opened_num = item.ai_radar_opened_num;
          const value = item[valueKeys[queryParams.type_id - 1]];
          maxValue = Math.max(maxValue, value);
          return { name,company_num,ai_radar_opened_num, value };
        });

        
        // 颜色层级
        const splitList = Array(colorLevel).fill().map((item, index) => ({
          start: Math.ceil(maxValue * (index * levelSize)),
          end: Math.ceil(maxValue * ((index + 1) * levelSize))
        })).reverse();

        const options = {
          title: {
            text: titles[queryParams.type_id - 1],
            subtext: 'Data from ' + Utils.getToday(),
            x: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            x: 'left',
            y: 'center',
            splitList: splitList,
            text: ['高', '低'],
            color: ['#d94e5d', '#eac736', '#50a3ba']
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            x: 'right',
            y: 'center',
            feature: {
              mark: { show: true },
              saveAsImage: { show: false }
            }
          },
          series: [{
            name: names[queryParams.type_id - 1],
            type: 'map',
            map: 'china',
            roam: false,
            itemStyle: {
              normal: {
                label: { show: true }
              },
              emphasis: {
                label: { show: true }
              }
            },
            data: data
          }]
        };

        this.$echarts.init(this.$refs.chart).setOption(options);
      }, error => {});
    },
    getTableData() {
      this.tableDataLoading = true;
      this.queryParams.is_page = true;
      let formData = this.queryParams ;
      get( AreaDataUrl, { ...formData} ).then(res => {
        this.tableDataLoading = false;
        const data = res.data;
        const list = res.data.list;
        list.forEach(item => {
          item.qxzb = Utils.p2int(item.company, data.company);
          item.p_company = Utils.p2int(item.company, item.p_company);
          item.p_radar = Utils.p2int(item.radar, item.p_radar);
          item.ldzb = Utils.p2int(item.radar, data.radar);
        });

        this.tableData = data;
      }, error => {});
    },
    onChangeStatRange(index) { 
      this.queryParams.statistics_id = index;
      this.currentPage = 1;
      this.queryParams.page = 1;
      this.queryParams.order = '';
      this.queryParams.sort = '';
      this.getTableData();
    },
    sortChange(val) {
      this.currentPage = 1;
      this.queryParams.page = 1;
      if(val.order){
        this.queryParams.order = val.order== 'descending' ? 'desc' : 'asc';
        this.queryParams.sort = val.prop;
      }else{
        this.queryParams.order = '';
        this.queryParams.sort = '';
      }
        
      this.getTableData();
    },
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      this.getTableData();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryParams.page = page;
      this.getTableData();
    },
    exportExcel(formData) {
      // this.exportLoading = true;
      // const type = formData.type;
      // post( AreaDataUrl,  { ...formData, page: null, page_size: null } ).then(res => {
      //   this.exportLoading = false;
      //   let data = res.data;
      //   let list= res.data.list
      //   list.forEach(item => {
      //     item.qxzb = Utils.p2int(item.company, data.company);
      //     item.p_company = Utils.p2int(item.company, item.p_company);
      //     item.p_radar = Utils.p2int(item.radar, item.p_radar);
      //     item.ldzb = Utils.p2int(item.radar, data.radar);
      //   }); 
      //   if (type == 1) {
      //     Utils.getExcel(
      //       ['省份', '企业数', '占总企业数', 'AI雷达数', '占总AI雷达数'],
      //       ['title', 'company', 'qxzb', 'radar', 'ldzb'],
      //      list, '省级企业统计'
      //     );
      //   }

      //   if (type == 2) {
      //     Utils.getExcel(
      //       ['地级市', '所属省份', '企业数', '占总企业数', '占所属省份企业数', 'AI雷达数', '占总AI雷达数', '占省份AI雷达数'],
      //       ['title', 'province', 'company', 'qxzb', 'p_company', 'radar', 'ldzb', 'p_radar'],
      //       res.data.list, '市级企业统计'
      //     );
      //   }
      // }, error => {});
      this.queryParams.is_page = false;      
      location.href = regionalExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
    }
  }
};

</script>
<style scoped lang="less">
.filter-bar {}

.caver {
  height: 700px;
  margin: 20px auto;

  .chart {
    width: 90%;
    min-width: 800px;
    height: 700px;
    margin: 0 auto;
  }
}

.data-table {
  padding: 20px 0;

  table {
    th {
      padding: 2px 0;
    }
  }
}

</style>
