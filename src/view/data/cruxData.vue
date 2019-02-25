<template>
  <div class="crux">
    <h2 class="page-title">
             关键指标  <em>（数据截至昨天）</em>
      <el-popover trigger="hover" placement="right">
        <div>
           <p><strong>运营商数量：</strong>当前有效运营商的总数（状态为正常的运营商，不包含审核中，冻结，审核不通过）。</p>
           <p><strong>核心代理商数量：</strong>当前有效核心代理商的总数（状态为正常的核心代理商，不包含审核中，冻结，审核不通过）。</p>
           <p><strong>代理商数量：</strong>当前有效代理商的数量（状态为正常的代理商，不包含审核中，冻结，审核不通过）。</p>
           <p><strong>企业数：</strong>开通账号的企业中，状态为正常的企业数（状态为正常的企业，不包含审核中，审核失败，停用，注销）。</p>
           <p><strong>开通AI雷达数：</strong>企业购买开通的AI雷达总数（状态为正常的企业）。</p>
           <p><strong>启用AI雷达数：</strong>企业购买AI雷达账号后，实际为员工启用的雷达总数。</p>
           <p><strong>开通门店数：</strong>门店版企业购买开通的门店总数（状态为正常的企业）。</p>
           <p><strong>启用门店数</strong>：门店版企业购买门店后，启用的门店总数（状态为正常的企业）。</p>
           <p><strong>启用商城企业数：</strong>状态为正常的企业中，启用了商城功能的企业总数。</p>
           <p><strong>较上周：</strong>（昨日数据-7天前数据）/7天前数据*100%  如：（10月10日数据-10月3日数据）/10月3日数据*100%。</p>
           <p><strong>较上月：</strong>（昨日数据-30天前数据）/30天前数据*100%  如：（10月10日数据-9月10日数据）/9月10日数据*100%。</p>
           <p><strong>启用商城占比：</strong>启用商城企业数/企业数*100%。其它占比同。</p>
        </div>
        <i slot="reference" class="el-icon-question"></i>
      </el-popover>
    </h2>     
      <el-row>
        <!-- <el-select v-model="queryParams.software_version" @change='statusChange' v-if="false">
          <el-option label="全部企业" value=""></el-option>
          <el-option label="企业版" value="0"></el-option>
          <el-option label="门店版" value="1"></el-option>
        </el-select> -->
        <el-button style="float:right" @click="exportBtn">历史数据导出</el-button>
      </el-row>

    <div class="cardWarp" v-if="countIndex">
      <div class="item">
        <div class="name">运营商数量</div>
        <div class="num">{{countIndex.sum_operator_num}}</div>
        <div class="zb1 clearfix">
        	<span class="left">较上周 </span>
          <span class="right"><i class="el-icon-back iconUp"></i> {{countIndex.operator_last_week}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left ">较上月 </span>
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndex.operator_last_month}}</span>
        </div>
      </div>
      <div class="item">
        <div class="name">核心代理商数量</div>
        <div class="num">{{countIndex.sum_core_agent_num}}</div>
        <div class="zb1 clearfix">
        	<span class="left">较上周</span> 
          <span class="right"><i class="el-icon-back iconUp"></i> {{countIndex.core_agent_last_week}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月</span> 
          <span class="right"><i class="el-icon-back iconUp"></i> {{countIndex.operator_last_month}}</span>
        </div>
      </div>
      <div class="item">
        <div class="name">代理商数量</div>
        <div class="num">{{countIndex.sum_agent_num}}</div>
        <div class="zb1 clearfix">
        	<span class="left">较上周 </span> 
          <span class="right"><i class="el-icon-back iconUp"></i> {{countIndex.agent_last_week}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月 </span>
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndex.agent_last_month}}</span>
        </div>
      </div>
      <!-- <div class="item">
        <div class="name">客服人员数量</div>
        <div class="num">{{countIndex.ayer_agent[3].total}}</div>
        <div class="zb1 clearfix">
        	<span class="left">较上周</span> 
          <span class="right"><i class="el-icon-back iconUp"></i> {{ratio(countIndex.ayer_agent[3].total,countIndex.last_week_agent[3].total)}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月 </span>
          <span class="right"><i class="el-icon-back iconUp"></i>{{ratio(countIndex.ayer_agent[3].total,countIndex.last_month_agent[3].total)}}</span>
        </div>
      </div> -->
    </div>
     <br>
    <el-row>
        <el-select v-model="queryParams.software_version" @change='statusChange'>
          <el-option label="全部企业" value=""></el-option>
          <el-option label="企业版" value="0"></el-option>
          <el-option label="门店版" value="2"></el-option>
        </el-select>
    </el-row>
    <div class="cardWarp">
      <div class="item">
        <div class="name">企业数</div>
        <div class="num">{{countIndexMain.sum_company_num||0 | numberWithCommas}}</div>
        <div class="zb1 clearfix">
        	<span class="left">较上周</span> 
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.company_last_week}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月 </span>
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.company_last_month}}</span>
        </div>
      </div>
      <div class="item" v-show="queryParams.software_version==2">
        <div class="name">开通门店数</div>
        <div class="num">{{countIndexMain.sum_store_purchased_num||0 | numberWithCommas}}</div>
        <div class="zb1 clearfix">
        	<span class="left">较上周</span> 
          <span class="right"><i class="el-icon-back iconUp"></i> {{countIndexMain.store_purchased_num_last_week}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月</span> 
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.store_purchased_num_last_month}}</span>
        </div>
      </div>
      <div class="item" v-show="queryParams.software_version==2">
        <div class="name">启用门店数</div>
        <div class="num">{{countIndexMain.sum_store_used_num||0 | numberWithCommas}}</div>
        <div class="zb1 clearfix">
        	<span class="left">较上周</span> 
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.sum_enable_mall_last_week}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月</span> 
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.sum_enable_mall_last_month}}</span>
        </div>
      </div>
      <div class="item" v-show="queryParams.software_version!=2">
        <div class="name">开通雷达数</div>
        <div class="num">{{countIndexMain.sum_ai_radar_purchased_num||0 | numberWithCommas}}</div>
        <div class="zb1 clearfix">
        	<span class="left">较上周 </span>
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.ai_radar_purchased_num_last_week}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月</span> 
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.ai_radar_purchased_num_last_month}}</span>
        </div>
      </div>
      <div class="item">
        <div class="name">启用AI雷达数</div>
        <div class="num">{{countIndexMain.sum_ai_radar_opened_num||0 | numberWithCommas}}</div>
        <div class="zb1 clearfix">
        	<span class="left">较上周 </span>
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.ai_radar_opened_num_last_week}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月</span> 
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.ai_radar_opened_num_last_month}}</span>
        </div>
      </div>
    </div>
    <div class="cardWarp">
      <div class="item">
        <div class="name">启用商城企业数</div>
        <div class="num">{{countIndexMain.sum_enable_mall||0 | numberWithCommas}}</div>
        <div class="zb clearfix">
        	<span class="left">占比</span>
        	<span class="right"> {{countIndexMain.sum_enable_mall_proportion}}</span>
        </div>
        <div class="zb1 clearfix">
        	<span class="left">较上周</span> 
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.sum_enable_mall_last_week}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月</span> 
          <span class="right"><i class="el-icon-back iconUp"></i>{{countIndexMain.sum_enable_mall_last_month}}</span>
        </div>
      </div>
      <el-dialog
        title="历史数据导出"
        :visible.sync="centerDialogVisible"
        width="40%"
        left>
        <el-form ref="form" size="small" label-position="left" label-width="100px">
            <el-form-item label="选择日期">
              <GetTime @changeTime="onChangeOpenTime" :showDay="false"></GetTime>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </span>
      </el-dialog>
      <!-- <div class="item">
        <div class="name">启用商城企业数</div>
        <div class="num">{{countIndex.store_ayer_server[1].total}}</div>
        <div class="zb clearfix">
        	<span class="left">占比</span>
        	<span class="right">{{p2int(countIndex.store_ayer_server[1].total,countIndex.ayer_company[2].company_total)}}</span>
        </div>
        <div class="zb1 clearfix">
        	<span class="left">较上周 </span>
          <span class="right"><i class="el-icon-back iconUp"></i>{{ratio(countIndex.store_ayer_server[1].total,countIndex.store_last_week_server[1].total)}}</span>
        </div>
        <div class="zb2 clearfix">
        	<span class="left">较上月 </span>
          <span class="right"><i class="el-icon-back iconUp"></i>{{ratio(countIndex.store_ayer_server[1].total,countIndex.store_last_month_server[1].total)}}</span>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import GetTime from '@/components/getTime'
import Utils from '@/utils/index'
import { mapGetters, mapActions, mapMutations } from 'vuex'
const { start_time, end_time } = Utils.getTime(14);
import { keyIndicatorsExport} from '@/api/api';
export default {
  components: {
    GetTime
  },
  data () {
    return {
      centerDialogVisible:false,
      queryParams: {
        start_time:start_time,
        end_time:end_time,
        software_version: '',
      },
      ayer_agent: [],
      ayer_company: {},
      week_company: {},
      month_company: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    ...mapActions(['getCountIndex','getCountIndexMain']),
    ratio: Utils.ratio,
    ratio1: Utils.ratio1,
    p2int: Utils.p2int,
    getData () {
      if(this.queryParams.software_version==""){
          this.getCountIndex({
            ...this.queryParams,
            cellpack: res => {
              // let index = this.queryParams.software_version
              // this.week_company = res.last_week_company[index]
              // this.ayer_company = res.ayer_company[index]
              // this.month_company = res.last_month_company[index]
            }
          })
      }
      this.getCountIndexMain({
        ...this.queryParams,
        cellpack: res => {
          // let index = this.queryParams.software_version
          // this.week_company = res.last_week_company[index]
          // this.ayer_company = res.ayer_company[index]
          // this.month_company = res.last_month_company[index]
        }
      })
    },
    statusChange (val) {
      this.queryParams.software_version = val
      this.getData()
    },
    exportBtn(){
      this.centerDialogVisible = true;
    },
    //选择日期
    onChangeOpenTime(val) {
      this.queryParams.start_time = val.start_time;
      this.queryParams.end_time = val.end_time;
    },
    exportExcel(){
      this.centerDialogVisible = false;
      location.href = keyIndicatorsExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
    }
  },
  computed: {
    ...mapGetters(['countIndex','countIndexMain'])
  }
}

</script>
<style lang="less" scoped>
@color : #409EFF;
.page-title em{
	font-style: normal;
	position: absolute;
	font-size: 14px;
	top:8px;
	left:110px;
}
.el-select {
  margin-bottom: 20px;

}
.crux{
	.left{
		float: left;
	}
	.right{
		float:right
	}
}
.cardWarp {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;

  .item {
    width: 18%;
    text-align: center;
    margin: 10px;
    padding: 0 10px 20px;
    box-sizing: border-box;
    border: 1px solid  transparent;
    transition: all  0.3s;
   box-shadow: 0 0 4px 0px #999; 
   color: inherit;
    .name {
      color: inherit;
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #e7eaec;
      text-align: left;
      font-size: 14px;
    }

    .num {
      height: 40px;
      line-height:33px;
      font-size:30px;
      font-weight: 100;
      color: inherit;
      margin-top: 20px; 
    }

    .zb1 {
      margin-bottom: 10px;
      font-size: 14px;
    }

    .zb2 {
      font-size: 14px;
      
    }

    i {
      margin-left: 10px;
    }

    .zb {
      margin-bottom: 10px;
    }
  }
    .item:hover{
  	  border: 1px solid #999;
  	  transform: scale(1.05);
  }
}

.cardWarp .item:nth-child(1) {
  margin-left: 0;
}

</style>
