<template>
  <div id="aside">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)" class="sidebar">
      <el-menu :default-active="$route.path" :router="true" unique-opened>
        <template v-for="(item, index) in menuList">
          <el-submenu :index="index+''" v-if="item.type == 2" :key="index">
            <template slot="title">
            	 <img  v-lazy="titleIconMap[item.module_name]" />
            	 <span slot="title">{{item.name}}</span></template>
            <el-menu-item v-for="(child ,ids) in item.children" :index="child.path" :key="ids">{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item :keys="index" v-if="item.type == 1" :index="item.path"><i  :class="titleIconMap[item.module_name]"></i><span slot="title">{{item.name}}</span></el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
import Utils from '../utils/index'
import { mapGetters } from 'vuex'
export default {
  components: {
       
  },
  data() {
    return {
      titleIconMap: {
        'survey': require('../assets/img/home.png'),
        'users': require('../assets/img/qudao.png'),
        'product':require('../assets/img/shiyongqingkuang.png'),
        'downCenter':require('../assets/img/xiazai-3.png'),
        'point':require('../assets/img/qian.png')
      },
    }
  },
  computed: {
    ...mapGetters(['menuList'])
  },
  watch: {
  	
  },
  created() {},
  mounted() {
     
  },
  methods: {
     
  }
}

</script>
<style lang="less" scoped>
@color : #409EFF;   
.el-menu-item-group__title {
  padding: 0 !important;
	 
}
.el-submenu__title{
	 img{
	  	width: 25px;
	  	height:25px;
	  	margin-right: 10px;
	  }
}
.el-submenu .el-menu-item{
	padding-left: 55px !important;
}
.el-menu-item.is-active{
	  background: @color;
	  color:#fff;
}
.sidebar {
  background-color: rgb(238, 241, 246);
  width: 200px;

  >.el-menu {
    border-right: none !important;
    width: 200px;
    min-height: calc(100vh - 80px);
    height: 100%;
  }
}

</style>

