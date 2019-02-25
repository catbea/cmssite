<template>
  <div id='dlsList'>
    <h2 class="page-title">
      代理商列表
      <el-popover trigger="hover" placement="right">
        <div>         
        <p><strong>运营商</strong></p>
        <p><strong>核心代理商数量：</strong>归属该运营商下核心代理商的总数（状态为正常）</p>
        <p><strong>代理商数量：</strong>归属该运营商下核心代理商的总数（状态为正常）</p>
        <p><strong>服务企业数：</strong>归属该运营商服务的企业总数（包含正常状态，及停用等非正常状态企业）</p>
        <p><strong>开户企业数：</strong>由该运营商开户的企业总数（包含正常状态，及停用等非正常状态企业）</p>
        <p><strong>自身消耗推点：</strong>自身推点实际消耗总数（不包含渠道间的转账）
        <p><strong>下级消耗推点：</strong>该运营商的下级（下级核代，下级代理）实际消耗推点总数（不包含渠道间的转账）</p>
        <p><strong>推点余额：</strong>该运营商推点账号中剩余推点数</p>

        <p><strong>核心代理商</strong></p>
        <p><strong>归属运营商：</strong>该核心代理商所归属的运营商</p>
        <p><strong>下级代理商数量：</strong>归属该核心代理商下的代理商总数（状态为正常）</p>
        <p><strong>开户企业数：</strong>由该代理商开户的企业总数（包含正常状态，及停用等非正常状态企业）</p>
        <p><strong>自身消耗推点：</strong>自身推点实际消耗总数（不包含渠道间的转账）</p>
        <p><strong>下级消耗推点：</strong>下级代理商实际消耗推点总数（不包含渠道间的转账）</p>
        <p><strong>推点余额：</strong>该核心代理商推点账号中剩余推点数</p>


        <p><strong>代理商</strong></p>
        <p><strong>归属核代：</strong>该代理商所归属的核心代理商，如果直属运营商，此处为空</p>
        <p><strong>归属运营商：</strong>该代理商所归属的运营商</p>
        <p><strong>开户企业数：</strong>由该代理商开户的企业总数（包含正常状态，及停用等非正常状态企业）</p>
        <p><strong>消耗推点：</strong>自身推点实际消耗总数（不包含渠道间的转账）</p>
        <p><strong>推点余额：</strong>该代理商推点账号中剩余推点数</p>  
        </div>
        <i slot="reference" class="el-icon-question"></i>
      </el-popover>
    </h2>
    <div class="sxTab">
      <el-form ref="form" size="small" label-position="left" label-width="100px">
        <el-form-item label="对象类型">
        	 <el-radio-group size="medium" v-model="grade"   @change='onChangeType' >
								      <el-radio-button label='1'>运营商</el-radio-button>
								      <el-radio-button label='2'>核心代理商</el-radio-button>
								      <el-radio-button label='3'>代理商</el-radio-button>
					 </el-radio-group>
        </el-form-item>
        <div style="width:550px">
          <!-- <GetRegion @region="region"></GetRegion> -->
          <!-- <el-form-item label="使用状态">
            <el-select v-model="queryParams.usege_status" placeholder="状态" @change="statusChange">
              <el-option label="全部" value=""></el-option>
              <el-option label="正常" :value="1"></el-option>
              <el-option label="审核中" :value="0"></el-option>
              <el-option label="不通过" :value="2"></el-option>
              <el-option label="停用" :value="3"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="lable">
            <el-autocomplete class="inline-input" v-model="firstArgent" :fetch-suggestions="queryFistAgent" placeholder="请输入所属运营商" clearable @select="fistAgentHandleSelect"  ></el-autocomplete>
            <!-- <el-input v-model="queryParams.agent_id" :fetch-suggestions="queryFistAgent" :placeholder="placeholderText"   clearable style="width:300px;margin-right:30px;"></el-input> -->
            <el-button type="primary" @click.native="search">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="data-table-func">
      <button type="button" class="dcsh" @click="exportExcel">导出</button>
    </div>
    <div class="data-table" v-loading="dlsListDataLoading">
      <div v-show="queryParams.type== 1">
        <el-table :data="dlsListData.list" border sortable="custom" @sort-change='sortChange' :default-sort="{prop: '', order: 'descending'}" max-height="630" style="width: 100%">
          <el-table-column prop="org_id" label="运营商名称"></el-table-column>
          <el-table-column prop="org_area" label="服务区域">
             <template slot-scope="scope">
              <!-- <template v-if="scope.row.org_area">--</template> -->
              <template>
                <span style="margin-right: 10px; display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{scope.row.org_area}}</span>
                <el-popover v-if="scope.row.org_area" width="500" trigger="hover" placement="right">
                  <div class="city-popover">
                    {{scope.row.org_area}}
                  </div>
                  <i slot="reference" style="position: absolute;top: 0%;width: 100%; left: 0; height: 100%;" class="el-icon-info"></i>
                </el-popover>
                <!-- <i v-else class="el-icon-info disabled"></i> -->
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="core_agent_num" sortable="core_agent_num" label="核心代理商数量" width="120">
          </el-table-column>
          <el-table-column prop="agent_num" label="代理商数量" width="120"></el-table-column>
          <el-table-column prop="company_servered_num" sortable="company_servered_num" label="服务企业数" width="150">
          </el-table-column>
          <el-table-column prop="operator_company_num" sortable="operator_company_num" label="开户企业数" width="120">
          </el-table-column>
          <el-table-column prop="td_consumed" sortable="td_consumed" label="自身消耗推点"></el-table-column>
          <el-table-column prop="td_consumed_by_lower_level" sortable="td_consumed_by_lower_level" label="下级推点消耗"></el-table-column>
          <el-table-column prop="td_balance" sortable="td_balance" label="推点余额"></el-table-column>
          <el-table-column prop="org_opened_date" sortable="org_opened_date"  label="开户日期" width="120"></el-table-column>
        </el-table>
      </div>
      <div v-show="queryParams.type== 2">
        <el-table :data="dlsListData.list" border sortable="custom" @sort-change='sortChange' :default-sort="{prop: '', order: 'descending'}" max-height="630" style="width: 100%">
          <el-table-column prop="org_id" label="核代名称"></el-table-column>
          <el-table-column prop="ascription_operator" label="归属运营商"></el-table-column>
          <el-table-column prop="core_agent_agent_num" sortable="core_agent_agent_num" label="下级代理商数量"  width="180">
          </el-table-column>
          <el-table-column prop="core_agent_company_num" sortable="core_agent_company_num" label="开户企业数"></el-table-column>
          <el-table-column prop="td_consumed" sortable="td_consumed" label="自身消耗推点"></el-table-column>
          <el-table-column prop="td_consumed_by_lower_level" sortable="td_consumed_by_lower_level" label="下级消耗推点"></el-table-column>
          <el-table-column prop="td_balance" sortable="td_balance" label="推点余额"></el-table-column>
          <el-table-column prop="org_opened_date" sortable="org_opened_date" label="开户日期"></el-table-column>
        </el-table>
      </div>
      <div v-show="queryParams.type== 3">
        <el-table :data="dlsListData.list" border sortable="custom" @sort-change='sortChange' :default-sort="{prop: '', order: 'descending'}" max-height="630" style="width: 100%">
          <el-table-column prop="org_id" label="代理商名称"></el-table-column>
          <el-table-column prop="ascription_core_agent" label="归属核代"></el-table-column>
          <el-table-column prop="ascription_operator" label="归属运营商"></el-table-column>
          <el-table-column prop="agent_company_num" sortable="agent_company_num" label="开户企业数"></el-table-column>
          <el-table-column prop="td_consumed" sortable="td_consumed" label="消耗推点"></el-table-column>
          <el-table-column prop="td_balance" sortable="td_balance" label="推点余额"></el-table-column>
          <el-table-column prop="org_opened_date" sortable="org_opened_date"  label="开户日期"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pager">
      <el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="10" :total="dlsListData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { get } from '@/api';
import { PointAgentListUrl,agentListAgentExport } from '@/api/api';
import Utils from '../../utils/index';
import GetRegion from '../../components/getRegion'
export default {
  components: {
    GetRegion
  },
  data() {
    return {
      firstArgent:"",
      lable:"运营商名称",
      currentPage: 1,
      grade:1,
      queryParams: {
        city:"",
				province:"",
        usege_status:"",
        agent_id:"",
        type: 1,
        order:"",
        sort:"",
        dataType: 1,
        // city: '',
        page_size: 10,
        page: 1,
      },
      placeholderText: '请输入运营商名称',
      props: {
        value: 'label',
        children: 'cities'
      },

      dlsListData: {},
      dlsListDataLoading: true,
      dlsListDataExcel: {}
    }
  },
  created() {
    this.getDlsListData(this.queryParams);
    this.getSearchAgentList({
      type: 1
    }); //运营商

    this.getSearchAgentList({
      type: 2
    }); //核心代理商
    this.getSearchAgentList({
      type: 3
    }); //代理商
  },
  methods: {
    ...mapActions(['getSearchAgentList']),
    ...mapMutations(['setSearchAgentList']),
    getDlsListData(params = {}) {
      // if (params.dataType== 1) {
        this.dlsListDataLoading = true
        // this.dlsListData = {}
      // }
      get(PointAgentListUrl, params).then(res => {
        const data = res.data;
        // if (params.dataType== 1) {
          this.dlsListDataLoading = false
          // if(data.list.length){
          //   // data.list.forEach(item=>{
          //   //   item.create_time = Utils.unixToTime(item.create_time)
          //   // })
          //   if(this.grade==1){
          //     data.list.forEach(item=>{
          //       item.org_area = item.org_area&&item.org_area.replace(/(^\,+)|(\,+$)/g, "");
          //     })
          //   }
          // }        
          this.dlsListData = data
        // }
        // if (params.dataType== 2) {
        // 	params.cellpack(data.list)
        // }
      }).catch(err => {
        this.dlsListDataLoading = false
      });
    },
    resetPage() {
      this.currentPage = 1;
      this.queryParams.page = 1;
      this.getDlsListData(this.queryParams);
    },
    onChangeType(index) {
      this.firstArgent = "";
      this.grade = index;
      this.queryParams.type = index;
      this.fistAgentHandleSelect('') 
      this.currentPage = 1;
      this.queryParams.page = 1;
      this.queryParams.order = '';
      this.queryParams.sort = '';
      this.placeholderText = index== 1 ? '请输入运营商名称' : index== 2?'请输入核心代理商名称':'请输入代理商名称';
      this.lable = index== 1 ? '运营商名称' : index== 2?'核心代理商':'代理商名称';
      this.getDlsListData(this.queryParams);
    },
    //模糊搜索statar------------
    queryFistAgent(queryString, cb) {      
      if(this.queryParams.type == 1){
        this.querySearchAsync(queryString, cb, this.operatorList)
      }
      else if(this.queryParams.type == 2){
        this.querySearchAsync(queryString, cb, this.towAgentList)
      }
      else if(this.queryParams.type == 3){
        this.querySearchAsync(queryString, cb, this.searchAgentList)
      }
      // this.querySearchAsync(queryString, cb, this.operatorList)
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
      this.queryParams.agent_id = item.uid||"";
      // this.rest();
    },
    region(val) {
      // this.resetPage();
      // this.queryParams.regional = val;
      this.queryParams.city = val.city;
			this.queryParams.province = val.province;
      // this.getDlsListData(this.queryParams);
    },
    statusChange(page) {
      this.currentPage = 1;
      this.queryParams.usege_status = page;
      // this.resetPage();
      // this.getDlsListData(this.queryParams);
    },
    sortChange(val) {
      // console.log("代理商列表",JSON.stringify(val));
      if(val.order){
        this.queryParams.order = val.order== 'descending' ? 'desc' : 'asc';
        this.queryParams.sort = val.prop;
      }else{
        this.queryParams.order = '';
        this.queryParams.sort = '';
      }
      // console.log(this.queryParams);
      this.resetPage();
      // this.getDlsListData(this.queryParams);
    },
    handleSizeChange(val) {
      this.queryParams.page_size = val;
      this.resetPage();
      // this.getDlsListData(this.queryParams);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.queryParams.page = page;
      this.getDlsListData(this.queryParams);
    },
    search() {
      this.resetPage();
      // this.getDlsListData(this.queryParams);
    },
    exportExcel() {
      console.log(this.queryParams)
      location.href = agentListAgentExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
      
    }
  },
  computed: {
    ...mapGetters(['operatorList','towAgentList','searchAgentList'])
  },
  watch: {
    //bug清空数据
			firstArgent(val) {
				!val ? this.fistAgentHandleSelect('') : ''
			}
  }
};

</script>
<style scoped lang="less">
  .el-icon-info:before {
    content: "" !important;
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

#dlsList {
  .dxlx {
    span {
      width: 100px;
      text-align: center;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      float: left;
      margin-right: 20px;
    }

    .activespan {
      background: #3798E8;
      color: #fff;
      border: none !important;
    }
  }

  .data-table {
    padding: 20px 0;

    table {
      th {
        padding: 2px 0;
      }
    }

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
