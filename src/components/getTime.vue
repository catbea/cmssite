<template>
  <div id="getTime">
    <div class='time-j'>
      <div class="timesx clearfix">
        <template v-if="showDay">
 
          <!-- <span style="border-left-color:#dcdfe6;" @click="togellTime(1,0)" :class="paramsSpanIndex==1?'activeTime':''">今天</span> -->
          <span style="border-left-color:#dcdfe6;" @click="togellTime(2,-1)" :class="paramsSpanIndex==2?'activeTime':''">昨天</span>
          <span @click="togellTime(3,7)" :class="paramsSpanIndex==3?'activeTime':''">近7天</span>
          <span @click="togellTime(4,14)" :class="paramsSpanIndex==4?'activeTime':''">近14天</span>
          <span @click="togellTime(5,30)" :class="paramsSpanIndex==5?'activeTime':''">近30天</span>
        </template>
        <template>
          <el-date-picker ref="timer" size="small" :style="{marginLeft: showDay?'10px':0}"
            v-model="sxtime"
            type="daterange"
            @change=changeTime
            format="yyyy-MM-dd"
            :unlink-panels=true
            :clearable=isclearable
            range-separator="至"
            :picker-options="pickerOptions0"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import  Utils from '../utils/index';
  export default {
    props: {
      //是否可以选择未来日期
      isSelectFuture:{
        default:false
      },
      //是否包含今天 true 包含 false 不包含
      isIncludeToday:{
        default:true
      },
      //是否可以删除时间
      isclearable:{
        default:true
      },
      //企业列表固定时间
      fixedTime:{
        default:false
      },
      defalutTime:{
        default:false
      },
      showDay:{
        default:true
      },
      spanIndex:{
        default:4
      }
    },
    components: {
      
    },
    data () {
     let isSelectFuture = this.isSelectFuture;
      return {
        paramsSpanIndex:this.spanIndex,
        pickerOptions0: {
          firstDayOfWeek:7,
          disabledDate(time) {
            if(isSelectFuture){
              return ;
            }else{
              return time.getTime() > Date.now() - 8.64e6
            }
          }
        },
        sxtime:[]
      }
    },
    created () {
      if(!this.defalutTime){
        let day = this.spanIndex==3?7:this.spanIndex==4?14:1;
        const end = new Date();
        const end2 = new Date();
        const start = new Date();
        // true 包含 false 不包含
        if(!this.isIncludeToday){
          end.setTime(end.getTime() - 3600 * 1000 * 24 );  
          start.setTime(start.getTime() - 3600 * 1000 * 24 *day);        
        }else{
          start.setTime(start.getTime() - 3600 * 1000 * 24 * (day-1));
        }
        end2.setTime(end2.getTime() - 3600 * 1000 * 24);
        if(this.fixedTime){
          this.sxtime = ['2018-01-01', end2];          
        }else{
          this.sxtime = [start, end];
        }
      }
    },
    methods: {
      togellTime(index,num){
        this.paramsSpanIndex = index;
        this.sxtime = [];
        this.$emit('getTime', num);
      },
      changeTime(value){
        this.paramsSpanIndex = 0;
        if(value == null){
            this.$emit('changeTime', {
              'start_time':"",
              'end_time':""
            });
        }else{
          this.$emit('changeTime', {
            'start_time': Utils.formatDate(value[0],'yyyy-MM-dd'),
            'end_time':Utils.formatDate(value[1],'yyyy-MM-dd')
          });
        }
      }

    },
    computed:{}
  };
</script>
<style scoped lang="less">
@color : #409EFF;
  #getTime{
	  .el-date-editor .el-range-input{
	    	color:#3798E8 !important;
	  }
	  .el-range-editor--small.el-input__inner{
	  	line-height: 34px;
	  	height: 34px;
	  }
	 
    .timesx {
      span{
        float: left;
        width: 70px;
        padding: 0;
        line-height: 32px;
        height: 32px;
        border: 1px solid #dcdfe6;
        border-left-color: #fff;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        &.activeTime {
          background: @color;
          color: #fff;
          border-color: @color;
        }
      }
     span:nth-child(1){
		  	 border-radius: 4px 0 0 4px;
		  }
	  span:nth-child(5){
	  	 border-radius: 0px 4px  4px  0;
	  } 
    }
  }
</style>
