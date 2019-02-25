<template>
  <div id="overallArea">
    <div class="page-title">
      <h2>
				<span>行业分布 </span>
				<el-popover trigger="hover" placement="right">
				<div>
					<p><strong>企业数：</strong>所属行业（一级/二级）分类下开户的企业总数。数据截至昨日，每日更新一次</p>
					<p><strong>占总企业数：</strong>所属行业（一级/二级）分类下企业数占总开户企业数百分比</p>
					<p><strong>占一级分类企业数：</strong>所属二级分类下的企业数占所属一级分类下企业数的百分比</p>
					<p><strong>AI雷达数：</strong>所属行业（一级/二级）分类下销售的AI雷达总数。数据截至昨日，每日更新一次</p>
					<p><strong>占总雷达数：</strong>所属行业（一级/二级）分类下销售的AI雷达数占总销售AI雷达数百分比</p>
					<p><strong>占一级分类雷达数：</strong>所属二级（一级/二级）分类下销售的AI雷达数占所属一级分类销售AI雷达数的百分比</p>
				</div>
				<i slot="reference" class="el-icon-question"></i>
			</el-popover>
			</h2>
    </div>
    <div class="filter-bar">
      <el-form ref="form" size="small" label-position="left" label-width="80px">
        <el-form-item label="统计指标">
          <el-select v-model="queryParams.lx" placeholder="状态" @change="getChartData(queryParams.lx)">
            <el-option label="按开通企业数" :value="1"></el-option>
            <el-option label="按AI雷达数" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="caver" v-loading="chartDataLoading">
      <div class="chart" ref="chart1"></div>
      <div class="chart" ref="chart2"></div>
    </div>
    <div class="data-table-func clearfix">
      <el-button class="dcsh pull-right" @click="exportExcel(queryParams)" :loading="exportLoading">导出</el-button>
      <div class="btn-group">
        <a href="javascript:void(0);" :class="queryParams.type == 1 ? 'active' : ''" @click="onChangeStatRange(1)">一级统计</a>
        <a href="javascript:void(0);" :class="queryParams.type == 2 ? 'active' : ''" @click="onChangeStatRange(2)">二级统计</a>
      </div>
    </div>
    <div class="data-table" v-loading="tableDataLoading">
      <div v-show="queryParams.type === 1">
        <el-table :data="tableData.list" border sortable="custom" @sort-change="sortChange" style="width: 100%">
          <el-table-column prop="title" label="省份">
          </el-table-column>
          <el-table-column prop="company" label="企业数" sortable="custom"></el-table-column>
          <el-table-column prop="qxzb" label="占总企业数" sortable="custom"></el-table-column>
          <el-table-column prop="radar" label="AI雷达数" sortable="custom"></el-table-column>
          <el-table-column prop="ldzb" label="占总AI雷达数" sortable="custom"></el-table-column>
        </el-table>
      </div>
      <div v-show="queryParams.type === 2">
        <el-table :data="tableData.list" sortable="custom" @sort-change="sortChange" border style="width: 100%">
          <el-table-column prop="title" label="地级市"></el-table-column>
          <el-table-column prop="province" label="所属省份"></el-table-column>
          <el-table-column prop="company" label="企业数" sortable="custom"></el-table-column>
          <el-table-column prop="qxzb" label="占总企业数" sortable="custom"></el-table-column>
          <el-table-column prop="p_company" label="占所属省份企业数" sortable="custom"></el-table-column>
          <el-table-column prop="radar" label="AI雷达数" sortable="custom"></el-table-column>
          <el-table-column prop="ldzb" label="占总AI雷达数" sortable="custom"></el-table-column>
          <el-table-column prop="p_radar" label="占省份AI雷达数" sortable="custom"></el-table-column>
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
import { post } from '@/api';
import { AreaDataUrl } from '@/api/api';

export default {
  components: {},
  data() {
    return {
      currentPage: 1,
      queryParams: {
        page: 1,
        page_size: 10,
        type: 1,
        lx: 1,
        sort: '',
        sortord: ''
      },
      tableData: {},
      tableDataLoading: false,
      chartDataLoading: false,
      exportLoading: false
    }
  },
  mounted() {
    this.getTableData(this.queryParams);
    this.getChartData(this.queryParams.lx);
  },
  methods: {
    getChartData(lx) {
      this.chartDataLoading = true;
      post({ url: AreaDataUrl, data: { lx, type: 1, page: null, page_size: null, sort: null, sortord: null } }).then(res => {
        this.chartDataLoading = false;

        const list = res.data.list;
        const names = ['企业数', 'AI雷达数'];
        const titles = ['开通企业数区域分布图', '启用AI雷达数区域分布图'];
        const valueKeys = ['company', 'radar']; // 需要展示的字段（区分按企业与按雷达）
        const colorLevel = 8; // 颜色层级
        const levelSize = 1 / colorLevel; // 层级大小
        let maxValue = 1; // 以最大值为1展示 企业数最多的省份颜色最亮，其他依次递减

        // 获取需要展示在图表中的数据
        const data = list.map(item => {
          const name = item.title.replace(/省|市/g, '');
          const value = item[valueKeys[lx - 1]];
          maxValue = Math.max(maxValue, value);
          return { name, value };
        });

        // 颜色层级
        const splitList = Array(colorLevel).fill().map((item, index) => ({
          start: Math.ceil(maxValue * (index * levelSize)),
          end: Math.ceil(maxValue * ((index + 1) * levelSize))
        })).reverse();

        const options = {
        	title : {
			        text: '同名数量统计',
			        subtext: '纯属虚构',
			        x:'left'
			    },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            // orient: 'vertical',
            // x: 'left',
            // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }]
        };

        this.$echarts.init(this.$refs.chart1).setOption(options);
        this.$echarts.init(this.$refs.chart2).setOption(options);
      }, error => {});
    },
    getTableData(formData) {
      this.tableDataLoading = true;
      post({ url: AreaDataUrl, data: { ...formData, lx: 1 } }).then(res => {
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
      this.queryParams.type = index;
      this.currentPage = 1;
      this.queryParams.page = 1;
      this.getTableData(this.queryParams);
    },
    sortChange(val) {
      this.currentPage = 1;
      this.queryParams.page = 1;
      this.queryParams.sortord = val.order === 'descending' ? 'desc' : 'asc';
      this.queryParams.sort = val.prop;
      this.getTableData(this.queryParams);
    },
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      this.getTableData(this.queryParams);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryParams.page = page;
      this.getTableData(this.queryParams);
    },
    exportExcel(formData) {
      this.exportLoading = true;
      const type = formData.type;
      post({ url: AreaDataUrl, data: { ...formData, page: null, page_size: null } }).then(res => {
        this.exportLoading = false;

        if (type === 1) {
          Utils.getExcel(
            ['省份', '企业数', '占总企业数', 'AI雷达数', '占总AI雷达数'],
            ['title', 'company', 'qxzb', 'radar', 'ldzb'],
            res.data.list, '省级企业统计'
          );
        }

        if (type === 2) {
          Utils.getExcel(
            ['地级市', '所属省份', '企业数', '占总企业数', '占所属省份企业数', 'AI雷达数', '占总AI雷达数', '占省份AI雷达数'],
            ['title', 'province', 'company', 'qxzb', 'p_company', 'radar', 'ldzb', 'p_radar'],
            res.data.list, '市级企业统计'
          );
        }
      }, error => {});
    }
  }
};

</script>
<style scoped lang="less">
.filter-bar {}

.caver {
  // height: 700px;
  margin: 20px auto;

  .chart {
    width: 50%;
    // min-width: 800px;
    float: left;
    height: 300px;
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
