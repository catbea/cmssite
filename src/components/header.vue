<template>
	<div id="header">
		<el-header>
			<h1 class="logo">
				<a href="/">
					<img v-lazy="logo">
					<span>运营数据后台</span>
				</a>
			</h1>
			<div class="user-setting">
				<el-dropdown>
					<i class="el-icon-setting"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="onLogout">退出系统</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-header>
 
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Utils from '../utils/index'
import { keys } from '../api'
import logo from '../../static/img/logo.png'
import config from '../config/config'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      logo,
 
    }
  },
  created() {
    this.isLogin()
    // this.doInitInterface();
  },
  methods: {
    ...mapActions([  'logout', 'getUserInfo', 'getUserPermission']),
    doInitInterface () { // 初始化接口查询
      let _this = this
      this.getUserInfo({})
      this.getUserPermission({
        cellpack: res => {
          let { msg, errcode, data } = res
          if (errcode !== 0) {
            _this.$message({
              message: msg,
              type: 'error'
            })
          } else {
            sessionStorage.setItem('permList', JSON.stringify(data.permList))
            _this.$store.dispatch('updatedPermList', data.permList).then((res) => {
              //console.log('_this.$store.dispatch updatedPermList', res)
            })
						_this.$store.dispatch('updatedMenuList', data.layoutData)
						let rootUrl = data.layoutData[0].child[0].module_name
						Utils.toUrl(this, `/${rootUrl}`);
          }
        }
      })
    },
    isLogin () {
      if (!Cookies.get('UCOA_TICKET')) {
        Utils.toUrl(this, '/login')
      } else {
        this.doInitInterface()
      }
    },
    unifiedLogin () { // 去统一登陆页面
      let clientId = config.global[config.env]['client_id']
      let loginUrl = config.global[config.env]['login_url']
      let currentUrl = window.location.href.split('?')[0]
      window.location.href = loginUrl + '?url=' + currentUrl + '&clientId=' + clientId
    },
    onLogout () {
         Cookies.remove('UCOA_TICKET')
         Utils.toUrl(this, '/login')
    },
    
  }
}
</script>

<style scoped>
	.el-header{
		overflow: hidden;
		height: auto!important;
		padding: 20px 24px;
		background-color: #31373B;
		color: #fff;
		font-size: 18px;
	}
	.el-header .logo{
		float: left;
	}
	.el-header .logo a{
		color: #fff;
		font-size: 28px;
	}
	.el-header .logo a img{
		height: 54px;
		margin: 0 32px 0 0;
		vertical-align: middle;
	}
	.el-header .logo a span{
		display: inline-block;
		vertical-align: middle;
	}
	.user-setting{
		float: right;
		margin: 20px 0 0;
	}
	.el-icon-setting{
		font-size: 18px;
		color: #fff;
		margin-right: 15px;
		cursor: pointer;
	}
</style>
