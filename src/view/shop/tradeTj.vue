<template>
	<div id="tdtj">
		<h2 class="page-title">
			商城交易统计
			<el-popover trigger="hover" placement="right">
				<div>
					<p><strong>小程序UV：</strong>访问小程序的总用户数</p>
					<p><strong>商品咨询人数：</strong>统计时间内，使用商城的商家，小程序用户在商品详情页进入咨询聊天页并发消息咨询的人数</p>
					<p><strong>加购人数：</strong>统计时间内，将商品加入购物车的人数</p>
					<p><strong>下单人数：</strong>统计时间内，成功下单的客户数，一人多次下单记为一人（不剔除退款订单）</p>
					<p><strong>下单笔数：</strong>统计时间内，成功下单的订单笔数（不剔除退款订单）</p>
					<p><strong>付款人数：</strong>统计时间内，下单并且付款成功的客户数，一人多次付款记为一人（不剔除退款订单）</p>
					<p><strong>付款订单数：</strong>统计时间内，成功付款的订单数，一个订单对应唯一一个订单号（拼团在成团时计入付款订单；不剔除退款订）</p>
					<p><strong>成交金额：</strong>统计时段内所有付款订单金额之和（拼团在成团时计入付款订单；不剔除退款金额）</p>
					<p><strong>客单价：</strong>成交金额/付款订单数</p>
					<p><strong>访问-付款转化率：</strong>付款人数/小程序UV*100%。保留两位小数</p>
					<p>以上数据每日凌晨更新，统计0点前数据</p>
				</div>
				<i slot="reference" class="el-icon-question"></i>
			</el-popover>
		</h2>
		<div v-show="mapInterface('profile_record')">
			<div class="sxTab">
				<el-form ref="form" label-position="left" label-width="100px" size="small">
					<el-form-item label="时间筛选">
						<GetTime @getTime="onChangeDayRange" @changeTime="onChangeTimeRange"></GetTime>
					</el-form-item>
					<div style="width:550px;">
						<!-- <GetRegion @region="onChangeRegion"></GetRegion> -->
						<el-form-item label="行业筛选">
							<el-select v-model="queryParams.type" @change="onTypeChange" placeholder="全部">
								<el-option label="全部" :value="3"></el-option>
								<el-option label="总代理" :value="1"></el-option>
								<el-option label="二级代理" :value="2"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="地区筛选">
							<el-input clearable style="width:300px;margin-right:30px;" v-model="queryParams.key" maxlength="20" :placeholder="placeholderText"></el-input>
							<el-button type="primary" @click="search">筛选</el-button>
						</el-form-item>
					</div>
				</el-form>
			</div>
<!-- 			<div class="tdtotal">推点消耗总数量 <span>{{(recordData.expendTotal || 0) | numberWithCommas}}</span></div>
			<div class="caver" style="height: 400px;" v-loading="recordDataLoading">
				<div ref="chart" style="height: 400px;"></div>
			</div> -->
			<div class="data-table-func text-right">
				<button type="button" class="dcsh" @click="exportExcel" :disabled="!recordData.list || !recordData.list.length">导出</button>
			</div>
			<div class="data-table" v-loading="recordChartLoading">
				<el-table :data="recordData.list" border style="width: 100%">
					<el-table-column prop="time" label="日期"></el-table-column>
					<el-table-column prop="total" label="小程序UV"></el-table-column>
					<el-table-column prop="expend" label="商品咨询人数"></el-table-column>
					<el-table-column prop="recharge" label="加购人数"></el-table-column>
          <el-table-column prop="recharge" label="下单人数"></el-table-column>
          <el-table-column prop="recharge" label="下单笔数"></el-table-column>
          <el-table-column prop="recharge" label="付款人数"></el-table-column>
          <el-table-column prop="recharge" label="付款订单数"></el-table-column>
          <el-table-column prop="recharge" label="成交金额"></el-table-column>
          <el-table-column prop="recharge" label="客单价"></el-table-column>
          <el-table-column prop="recharge" label="访问-付款转化率"></el-table-column>
				</el-table>
			</div>
			<div class="pager">
				<el-pagination
					layout="prev, pager, next,total, sizes"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[10, 20, 50, 100]"
					:page-size="10"
					:total="recordData.total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import { interfaceKey } from '@/utils/authCtrl'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Utils from '../../utils/index'
import GetTime from '../../components/getTime'
import GetRegion from '../../components/getRegion'
// import t1 from '../../../static/img/t1.png';
// import t2 from '../../../static/img/t2.png';
// import t3 from '../../../static/img/t3.png';

const placeholderTexts = ['请输入总代理名称', '请输入二级代理名称', '请输入总代理或二级代理名称']

export default {
  components: {
    GetTime,
    GetRegion
  },
  data () {
    const timeRange = Utils.getTime(14)
    return {
      // t1,
      // t2,
      // t3,
      placeholderText: placeholderTexts[2],
      currentPage: 1,
      queryParams: {
        dataType: 2,
        type: 3,
        start_time: timeRange.start_time,
        end_time: timeRange.end_time,
        key: '',
        city: '',
        page: 1,
        page_size: 10
      }
    }
  },
  created () {},
  mounted () {
    this.getTdData()
    this.getData()
    // if(this.mapInterface('profile_point')) this.getTdData();
    // if(this.mapInterface('profile_record')) this.getData();
  },
  methods: {
    ...mapActions(['getTdData', 'getRecordData']),
    mapInterface (val) {
      return interfaceKey(val)
    },
    renderChart () {
      const chart = this.$echarts.init(this.$refs.chart)
      chart.setOption(this.recordChart)
    },
    getData () {
      this.getRecordData({ ...this.queryParams, dataType: 1 })
      this.getRecordData({ ...this.queryParams, page_size: null, page: null, dataType: 2 })
    },
    onChangeTimeRange (timeRange) {
      this.currentPage = 1
      this.queryParams.page = 1
      this.queryParams.start_time = timeRange.start_time
      this.queryParams.end_time = timeRange.end_time
      this.getData()
    },
    onChangeDayRange (range) {
      const time = Utils.getTime(range)
      this.onChangeTimeRange(time)
    },
    // onChangeRegion(id) {
    // 	this.currentPage = 1;
    // 	this.queryParams.page = 1;
    // 	this.queryParams.city = id;
    // 	this.getData();
    // },
    handleSizeChange (size) {
      this.queryParams.page_size = size
      this.getRecordData({ ...this.queryParams, dataType: 1 })
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.queryParams.page = page
      this.getRecordData({ ...this.queryParams, dataType: 1 })
    },
    onTypeChange (val) {
      this.currentPage = 1
      this.queryParams.page = 1
      this.placeholderText = placeholderTexts[ val - 1 ]
      this.queryParams.type = val
      this.getData()
    },
    search () {
      this.currentPage = 1
      this.queryParams.page = 1
      this.getData()
    },
    exportExcel () {
      this.getRecordData({
        ...this.queryParams,
        dataType: 3,
        page: null,
        page_size: null,
        cellpack: () => {
          Utils.getExcel(
            ['日期', '开通企业数', '消耗推点数', '充值推点数'],
            ['time', 'total', 'expend', 'recharge'],
            this.recordDataExcel,
            '推点统计'
          )
        }
      })
    }
  },
  computed: {
    ...mapGetters(['tdData', 'recordData', 'recordDataExcel', 'recordChart', 'tdDataLoading', 'recordDataLoading', 'recordChartLoading'])
  },
  watch: {
    recordChart (val, oldval) {
      // this.renderChart();
    }
  }
}
</script>

<style scoped lang="">

</style>
