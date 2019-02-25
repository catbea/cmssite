<template>
	<div id="logo">
		<header >
			 <img  v-lazy="companyLogo"  class="topLogo"/>
			<span class="appName">运营数据后台</span>
		</header>
		<section>
			<div class="login_content">
				<div class="logo">
					<img v-lazy="logos">
				</div>
			 
				<div class="ulogin">
					<div class="ulogin-iframe">
						<iframe :src="loginUrl" name="loginFrame" frameborder="0" class="ulogin-iframe"></iframe>
					</div>
				</div>
			</div>
		</section>
 
	</div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import  Utils from '../../utils/index';
import {keys,config} from '../../api';
import companyLogo  from '../../../static/img/logo.png';
import logos from '../../../static/img/wenan.png';
import gConfig from "@/config/config";
import Cookies from "js-cookie";
export default {
	components: {
	},
	data() {
		return {
			loginUrl: '',
			logos,
			companyLogo,
		}
	},
	created() {
		this.$nextTick(() => {
			this.addFrameListener();
		});
		if(Utils.loadLocal(keys.LONGIN)){
			Utils.toUrl(this, '/index');
		}
	},
	mounted(){
		this.initLoginUrl();
	},
	methods: {
		...mapActions([ ]),
		initLoginUrl() {      
			let clientId = gConfig.global[gConfig.env]['client_id'];
			let loginUrl = gConfig.global[gConfig.env]['login_url'];
			let currentUrl = window.location.href.split('?')[0];
      this.loginUrl = loginUrl + '?redirect_url=' + currentUrl +'&clientId=' + clientId;
      
		},
 
		doLogin(data) {   
      // console.log(this.menuList)   
			if (typeof data === 'string') {
				let params = JSON.parse(data);
        if (params && params.ticket) { console.log( params)

          Cookies.set('UCOA_TICKET', params.ticket, { expires: 7 });
          // let rootUrl = this.menuList[0].child[0].module_name
					Utils.toUrl(this, `/`);
				}
			}
		},
		myMessage(obj) {
      var data = obj.data;
    	this.doLogin(data);
		},
		addFrameListener() {
			let _this = this;
			window.addEventListener("message", _this.myMessage);
    }
	},
	computed: {
		...mapGetters([''])
	},
	destroyed() {
    let _this = this;
    window.removeEventListener("message", _this.myMessage, false);
  }
};
</script>

<style scoped lang="less">
header{
	.topLogo{
		height: 53px !important;
		width: 100px !important;
		margin-left: 12px !important;
	}
}
.loginIframe {
	width: 100%;
	height: 100%;
	position: fixed;
}
.ulogin-iframe {
  width: 390px;
  height: 290px;
}

#logo {
  html {
    height: 100%;
  }

  body {
    height: 100%;
    background-size: 100% 100%;
  }

  header {
    width: 100%;
    height: 65px;
    line-height: 65px;
    background: #373d41;
  }

  header img {
    display: inline-block;
    width: 410px;
    height: 360px;
    vertical-align: middle;
    margin-left: 9%;
    margin-top: -7px;
  }

  header .jtName {
    margin-left: 15px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #fff;
    letter-spacing: 1.17px;
  }


  header .appName {
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #FFFFFF;
    margin-left: 15px;
  }

  section {
    overflow: hidden;
  }

  section .login_content .logo {
    position: absolute;
    top: 260px;
    left: 15%;
  }

  section .login {
    position: absolute;
    top: 260px;
    right: 20%;
    width: 410px;
    height: 420px;
    background: #FFFFFF;
    box-shadow: 0 6px 40px 0 rgba(0, 0, 0, 0.10);
  }

  section .ulogin {
    position: absolute;
    top: 260px;
    right: 20%;
    width: 390px;
    height: 420px;
    line-height: 420px;
    background: #FFFFFF;
    box-shadow: 0 6px 40px 0 rgba(0, 0, 0, 0.10);

    .ulogin-iframe {
      // display: inline-block;
      vertical-align: middle;
    }
  }


  .login input {
    display: inline-block;
    border: 1px solid #E7E7EB;
    margin-bottom: 21px;
  }

  .login .title {
    margin-top: 40px;
    font-weight: 500;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #222222;
    letter-spacing: 0;
    text-align: center;
  }

  .login form {
    margin-top: 25px;
    text-align: center;
  }

  .login .btn {
    width: 300px;
    height: 38px;
    background: #3798E8;
    color: #fff;
    cursor: pointer;
    margin-top: 26px;
  }

  .zh,
  .pwd {
    width: 286px;
    height: 35px;
    padding-left: 12px;
  }

  .codewrap .codeInput {
    width: 160px;
    height: 35px;
    padding-left: 12px;
    margin-right: 128px;
  }


  .codewrap {
    position: relative;
  }

  .code {
    width: auto;
    height: 40px;
    cursor: pointer;
    position: absolute;
    right: 56px;
    top: 0px;
    text-align: center;
    line-height: 33px;
    background-color: #34495e;
    color: #fff;
  }

  .logo-input {
    margin-top: 25px;
    text-align: center;
  }

  #errorTips {
    position: absolute;
    bottom: 135px;
    left: 55px;
    color: red;
  }

  nav {
    height: 46px;
    line-height: 46px;
    overflow: hidden;
    background: #fff;
  }

  nav .nav-text {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #777777;
    letter-spacing: 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #3798E8;
    margin-left: 73px;
  }

  @media screen and (max-width: 1440px) {
    section .login_content .logo {
      left: 10%;
    }

    section .login {
      right: 15%;
    }
  }

  @media screen and (max-width: 1080px) {
    section .login_content .logo {
      left: 3%;
    }

    section .login {
      right: 6%;
    }
  }
}

</style>