  <template>
  <div>
		      <div class="Tab">
		      <el-form ref="form" size="small" label-position="left" label-width="100px">
							<div style="width: 400px;">
		           <el-form-item label="交易日期">
		                <GetTime  :showDay='false' :isclearable="false" @changeTime="onChangeTimeRangeLine"></GetTime>
		           </el-form-item>
              <el-form-item label="业务类型" >
                <el-select v-model="queryParams.service_type" @change="rankChange">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="充值" value="0"></el-option>
                  <el-option label="系统发放" value="2"></el-option>
                  <el-option label="企业注销返还" value="7"></el-option>
                  <el-option label="授信" value="11"></el-option>
                  <el-option label="代理商推荐奖励" value="14"></el-option>
                  <el-option label="消费推点奖励" value="15"></el-option>
                </el-select>
						</el-form-item>
								<el-form-item label="代理名称" v-if="false">
                   <el-autocomplete
                  class="inline-input"
                  v-model="firstArgent"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入运营商或代理商名称"
                  clearable
                  @select="handleSelect"
                ></el-autocomplete>
								</el-form-item>
                <el-form-item>
                  <el-button type="primary" @click.native="search">查询</el-button>
                </el-form-item>
							</div>
					</el-form>
					<div class="tab">
						  <div class="data-table-func">
					       <el-button type="button" class="dcsh" @click="exportExcel"  >导出</el-button>
					    </div> 
					    <div class="data-table"  >
					      <el-table  :data="recharge.list" max-height="630" border>
					        <el-table-column prop="obj_name"  label="投放对象"></el-table-column>
					        <el-table-column prop="recharge_point"  label="投放推点"></el-table-column>
                  <el-table-column prop="service_type" label="业务类型"></el-table-column>
					        <el-table-column prop="trade_date"  label="交易日期"></el-table-column>
					      </el-table>
					    </div>
					    <div class="pager">
					      <el-pagination layout="prev, pager, next, total, sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50,100]" :page-size="10" :total="recharge.total">
					      </el-pagination>
					    </div>
					</div>
		      </div>
      </div>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import GetTime from '../../components/getTime'
  import  Utils from '../../utils/index';
  import { pointPutRecordExport } from '@/api/api';
  const {
		start_time,
		end_time
	} = Utils.getTime(14,true);
  export default {
    components: {
       GetTime
    },
    data () {
      return {
      	tableData:[],
        currentPage:1,
      	queryParams:{
          page_size: 10,
          page: 1,
          trade_start_date:start_time,
          trade_end_date:end_time,
          service_type:"",
          agent_id:"",
      	},
        firstArgent: '',
        timeout:  null
      }
    },
    created () {
      this.getData()  
    },
    methods: {
      ...mapActions(['getRecharge','getSearchAgentList']),
       ...mapMutations(['setSearchAgentList']),
        resetPage() {
            this.currentPage = 1;
            this.queryParams.page = 1;
          },
       querySearchAsync(queryString, cb) {
        var restaurants = this.searchAgentList;    
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        },1000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      search() {
        this.resetPage();
        this.getData();
      },
      handleSelect(item) {        
        this.queryParams.agent_id=item.uid;
        // this.resetPage();
        // this.getData()  
      },
       onChangeTimeRangeLine(timeRange){
          // this.resetPage();
          this.queryParams.trade_start_date = timeRange.start_time;
          this.queryParams.trade_end_date = timeRange.end_time;
          // this. getData()     
       },
        getData(){
          this.getRecharge(this.queryParams)
        },
       exportExcel(){
        //  this.getRecharge( { ...this.queryParams, page: '', page_size: '' ,cellpack:res =>{
        //       Utils.getExcel(
        //         ['总代名称', '充值推点', '交易日期'],
        //         ['name', 'point','c_time'],
        //          res,
        //         '推点充值记录'
        //       )
        //  }})
        location.href = pointPutRecordExport+'?'+Utils.jsonToUrlFmt(this.queryParams);
       },
       //业务类型
      rankChange(val){
        this.queryParams.service_type=val;
        // this.resetPage();
        // this.getData()  
      },
       handleSizeChange(val){
          this.resetPage();
          this.queryParams.page_size = val;
          this.getData()  
       },
       handleCurrentChange(page){
             this.currentPage = page;
            this.queryParams.page = page;
            this.getData() 
       }
    },
   computed:{
      ...mapGetters(['searchAgentList','recharge'])
   },
  watch:{
  	//bug清空数据
		firstArgent(val){
			  !val?this.handleSelect(''):''
		},
 
  }
  };
</script>

<style scoped>
  .tabWarp span{
  	width: 120px;
  }
  .Tab{
  	 padding-top:20px;
  }
  .data-table-func{
		overflow: hidden;
	}
	.data-table-func .dcsh{
		padding: 8px 0;
		float: right;
	}
</style>
