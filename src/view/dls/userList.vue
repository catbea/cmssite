<template>
  <div class="qyList">
    <h2 class="page-title">
      用户列表 
      <el-popover trigger="hover" placement="right" width="760">
        <div>
          <p><strong>AI雷达登录次数：</strong>所选时间段内，该用户登录AI雷达的次数</p>
          <p><strong>名片转发次数：</strong>所选时间段内，该用户名片被转发的次数</p>
          <p><strong>浏览量（PV）：</strong>所选时间段内，该用户名片浏览量（pv）</p>
          <p><strong>获客数：</strong>所选时间段内，该用户获客数量</p>
          <p><strong>跟进人数：</strong>所选时间段内，该用户跟进的客户人数</p>
          <p><strong>有效互动人数：</strong>所选时间段内，与该用户有信息发送与回复的客户人数  </p>  
        </div>
        <i slot="reference" class="el-icon-question"></i>
      </el-popover>     
    </h2>
    <div class="sxTab">
      <el-form ref="form" size="small" label-position="left" label-width="120px">
        <div>
          <el-row :gutter="20">
             <el-col :span="8">
              <el-form-item label="企业名称"  :rules="[{ required: true, message: '请先输入企业名称', trigger: 'blur' }]">
                <el-autocomplete class="inline-input" v-model="queryParams.companyName" :fetch-suggestions="queryCompanyName" placeholder="请先输入企业名称" clearable @select="CompanyNameHandleSelect"></el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-show="showMoreSelect">   
            <el-row :gutter="20">                
             <el-col :span="8">
								<el-form-item label="数据时间范围">
									<GetTime @changeTime="onChangeEndTime" :isIncludeToday="false" :showDay="false"></GetTime>
								</el-form-item>
              </el-col>
              <el-button type="primary" class="dcsh" @click.native="search">查询</el-button>
              <el-button type="primary" class="dcsh pull-right" @click="exportExcel">导出</el-button>
            </el-row>
          </div>
        </div>
      </el-form>
    </div>

    <div class="data-table" v-if="userListData">
      <el-table :data="userListData.list" border sortable="custom" @sort-change="sortChange" :default-sort="{prop: '', order: 'descending'}" max-height="630" style="width: 100%">
        <el-table-column prop="companyName" width="200" label="企业名称"  key='1'></el-table-column>
        <el-table-column prop="cardName" label="姓名" width="130" key='2'></el-table-column>
        <el-table-column prop="cardPosition" label="职务" width="130" key='a1'></el-table-column>
        <el-table-column prop="departmentName" width="130" label="部门" key='3'>
          <template slot-scope="scope">
              <span style="margin-right: 10px; display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{scope.row.departmentName}}</span>
              <el-popover v-if="scope.row.departmentName" width="500" trigger="hover" placement="right">
                <div class="city-popover">
                  {{scope.row.departmentName}}
                </div>
                <i slot="reference" style="position: absolute;top: 0%;width: 100%; left: 0; height: 100%;" class="el-icon-info"></i>
              </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="radarStatus" width="130"  label="账号状态" key='4'></el-table-column>
        <el-table-column prop="ai_radar_log_on_num" sortable="ai_radar_log_on_num" width="130" label="AI雷达登录次数" key='6'></el-table-column>
        <el-table-column prop="card_tranfered_num" sortable="card_tranfered_num" label="名片转发次数" width="150" key='7'></el-table-column>
        <el-table-column prop="PV" width="130" sortable="PV" label="浏览量（PV）" key='8'></el-table-column>
        <!-- <el-table-column prop="UV" width="130" sortable="PV" label="访客数（PV）" key='81'></el-table-column> -->
        <el-table-column prop="customer_num" sortable="customer_num" width="130" label="获客数" key='9'></el-table-column>
        <el-table-column prop="follow_up_num" sortable="follow_up_num" width="130" label="跟进人数" key='10'></el-table-column>      
        <el-table-column prop="effective_interaction_num" sortable="effective_interaction_num"  width="130" label="有效互动人数" key='11'></el-table-column>
        <el-table-column  prop="row" label="操作" width="120">
        	  <template slot-scope="{row}">
							<span @click="lookCode(row)"  class="text-code">二维码 </span>
						</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pager" v-if="userListData.exts">
      <el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="10" :total="userListData.exts.total">
      </el-pagination>
    </div>
    <!-- 二维码弹窗 -->
    <el-dialog :title="codeDialogData.codeTitle" :visible.sync="codeDialogData.visible" width="30%" :before-close="handleClose">
        <div class="codePc"> 
        	<img class="code-img"  v-lazy='codeDialogData.codeImg' :key="codeDialogData.codeImg">
       </div>
    </el-dialog>
  </div>
</template>
<script>
import GetRegion from '../../components/getRegion'
import GetTime from '@/components/getTime'
  import Industry from '../../components/industry'
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Utils from '../../utils/index';
import { userExport } from '@/api/api';

const {
  start_time,
  end_time
} = Utils.getTime(14);
export default {
  components: {
    GetRegion,
    GetTime,
    Industry
  },
  data() {
    return {
      showMoreSelect: true, //是否显示更多赛选
      defaultTime:'',
      columnForm: {
         type:[]
      },
      codeDialogData:{
        visible:false,
        codeTitle:'',
        codeImg:''
      }, //二维码弹窗

      currentPage: 1,
      queryParams: {
        companyName:"",
        company_id:"",
        snapshot_start_date:start_time,
        snapshot_end_date:end_time,
        sort:"",
        order:"",
        page:1,
        page_size:10
      },
    }
  },
  created() {
    // this.getUserListData(this.queryParams)
    this.getSearchCompanyList();
  },
  methods: {
    ...mapActions(['getUserListData','getUserCode', 'getSearchCompanyList']),
    ...mapMutations(['setSearchCompanyList']),
    rest(){
    	  this.currentPage = 1;
	      this.queryParams.page = 1;
	      this.getUserListData(this.queryParams);
    },
   //模糊搜索statar------------
      queryCompanyName(queryString, cb) {
        this.querySearchAsync(queryString, cb, this.searchCompanyList)
      },
      fistAgentHandleSelect(item) {  
         this.queryParams.first_agent_uid=item.uid|"";
        //  this.rest(); 
      },
      CompanyNameHandleSelect(item){ 
      	  this.queryParams.company_id = item.company_id||"";
      	  this.queryParams.companyName = item.company_name||"";
          // this.rest();
      },
      querySearchAsync(queryString, cb, restaurants) {
        // if(queryString!=""){
				// 	queryString = "";
        // }
        // this.queryParams.company_id = "";
        // this.queryParams.company_name = "";
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
      //到期时间
     onChangeEndTime(value) {        
          this.queryParams.snapshot_start_date=value.start_time 
          this.queryParams.snapshot_end_date=value.end_time
    },
    handleClose() {
      this.codeDialogData = {
        visible: false,
        codeTitle:'',
        codeImg:''
      }
    },
    search() {
      if(!this.queryParams.companyName){
        Utils.errorToast(null, '请先输入企业名称')
        return ;
      }
      this.rest();
    },
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      this.rest();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryParams.page = page;		
      // this.rest();
      this.getUserListData(this.queryParams);
    },
    sortChange(val) {
      if(val.order){
        this.queryParams.order = val.order== 'descending' ? 'desc' : 'asc';
        this.queryParams.sort = val.prop;
      }else{
        this.queryParams.order = '';
        this.queryParams.sort = '';
      }
      this.rest();
    },
    exportExcel() {
      if(!this.queryParams.companyName){
        Utils.errorToast(null, '请先输入企业名称')
        return ;
      }
      location.href = userExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
    },
    //查看二维码
    lookCode(row){
     this.getUserCode({
      //  company_id:"487691313471291392",
      //  card_id:"528998532640669696",
       company_id:row.companyId,
       card_id:row.cardId,
       cellpack : res => {console.log(res)
     	    this.codeDialogData.visible=true;
		      this.codeDialogData.codeTitle=row.companyName||"深圳加推科技";
		      this.codeDialogData.codeImg=res.data;
     }})
    },
    //自定义表头
    columnChange(val){
    	console.log(val)
    },
    changeShowSelect() {
      this.showMoreSelect = !this.showMoreSelect
    }, 
    resetForm(name) {
      this.$refs['form'].resetFields();
    }
  },
  computed: {
    ...mapGetters(['userListData', 'searchCompanyList'])
  },
  watch:{
  // 	//bug清空数据
	// 	firstArgent(val){
	// 		  !val?this.fistAgentHandleSelect(''):''
	// 	},
	//   twoArgent(val){
	// 		 !val?this.twoArgentHandleSelect(''):''
	// 	},
		'queryParams.companyName'(val){
			  !val?this.queryParams.company_id="":''
		}
  }
};

</script>
<style>
    .el-icon-info:before {
    content: "";
  }
</style>
<style lang="less" scope>
  .el-icon-info:before {
    content: "" !important;
  }
.data-table{
  padding-top: 10px;
}
.zdybt{
 color:#409EFF;
  padding-top: 20px;
  font-size: 12px;
  cursor: pointer;
}
.text-code{
	 color:#409EFF;
	  cursor: pointer;
}
.el-checkbox:nth-child(4n) {
  margin-left: 0
}
.codePc{
	padding-bottom: 20px;
}
.code-img{
  width: 200px;
  height: 200px;
  margin: auto ;
  display: block;
}
/* 修复日期在笔记本显示问题 */
.qyList .el-range-editor--small.el-input__inner {
  width: auto;
}
.dialog .el-form-item__content{
  line-height: 30px
}
.el-dialog__body{
  padding-bottom: 0px;
}
.hy .el-form-item__label {
   //width: 140px !important;
}
.dcsh{
    line-height: 2;
    padding: 1px 0px;
    width: 80px;
}
</style>
