<template>
	<div>
		<h2 class="page-title">
      				交易记录 
      	 <el-popover trigger="hover" placement="right" width="700">
	        <div>
				<p><strong>推点投放记录：</strong>加推总部向代理商投放推点的记录。包括充值（支出方总部），系统发放，企业注销 返还, 授信，代理商推荐奖励（支出方总部）,消耗推点奖励（支出方总部）业务类型。</p>
				<p><strong>推点消耗记录：</strong>总部，运营商/核心代理商/代理商推点为企业开户，续费，扩容等实际消耗推点的记录。类型包含系统回收，企业开户,续费，增加人员,开通增值服务,增加门店数,增加人数和门店数。</p>
				<p><strong>渠道间转账记录：</strong>运营商/核心代理商/代理商向其他运营商/核心代理商/代理商转账推点的记录。类型包括转账，充值（支付方非总部），核心代理商开户,代理商开户,代理商推荐奖励（支出方非总部）,消耗推点奖励（支出方非总部）,异地开户服务费,异地续费服务费）</p>
			</div>
	        <i slot="reference" class="el-icon-question"></i>
	      </el-popover>
     	 </h2>
		  <div>
			    <el-radio-group v-model="type" @change='onChangeType'>
			      <el-radio-button label="1">推点投放记录</el-radio-button>
			      <el-radio-button label="2">推点消耗记录</el-radio-button>
			      <el-radio-button label="3">渠道间转账记录</el-radio-button>
			    </el-radio-group>
		 </div>
		<keep-alive>
			<router-view v-if="$route.meta.keepalive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepalive"></router-view>
	</div>
</template>

<script>
	import Utils from '../../utils/index';
	export default {
		components: {

		},
		data() {
			return {
				type: 1
			}
		},
		created() {
			this.onChangeType(1)
		},
		methods: {
			onChangeType(index) {
				this.type = index;
				index==1?Utils.toUrl(this,'/recharge'):index==2?Utils.toUrl(this,'/consume'):Utils.toUrl(this,'/channel')
			},
			 
		},
		computed: {}
	};
</script>

<style scoped>
	.tabWarp span {
		width: 120px;
		padding: 5px 10px;
	}
</style>