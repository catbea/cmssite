/**
* Created by Administrator on 2017/6/22 0022.
*/
import {config} from '../api'
import {Loading, MessageBox, Notification,Message} from 'element-ui';
export default {
	/** 路由跳转
	*  @param {object} ctx 上下文
	*  @param {string} url 路由地址
	*  @param {object} ps 传递参数
	*/
	toUrl(ctx, url, ps) {
		ctx.$router.push({path: url, query: ps})
	},
 

	/** 新增&&修改本地缓存
	*  @param {string} id 唯一id
	*  @param {string} key 标示
	*  @param {string} value 新增&修改的值
	*/
	saveLocal (key, value){
		key = config.signKey + key;
		value = this.filterNull(value);
		let expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + 1)
		if (!value) {
			expireDate.setDate(expireDate.getDate() - 2)
		}
		if (typeof value == 'object') {
			document.cookie = key + "=" + JSON.stringify(value) + (";expires=" + expireDate)
		} else {
			document.cookie = key + "=" + value + (";expires=" + expireDate)
		}
	},

	/** 查询本地缓存
	*  @param {string} id 唯一id
	*  @param {string} key 标示
	*  @param {string} def 如果查询不到显示的值
	*/
	loadLocal (key, def) {
		key = config.signKey + key;
		if (document.cookie.length > 0) {
			let c_start = document.cookie.indexOf(key + "=")
			if (c_start != -1) {
				c_start = c_start + key.length + 1
				let c_end = document.cookie.indexOf(";", c_start)
				if (c_end == -1) c_end = document.cookie.length
				if (typeof (document.cookie.substring(c_start, c_end)) == 'object')
					return JSON.parse(document.cookie.substring(c_start, c_end))
				if (typeof (document.cookie.substring(c_start, c_end)) == 'string')
					return document.cookie.substring(c_start, c_end)
			}
		}
		return def
	},

	/** 格式化时间
	*  @param {string} date 需要格式化的时间
	*  @param {string} fmt 想要格式化的格式
	*/
	formatDate(date, fmt) {
		if (!date) {
			date = new Date();
		} else {
			date = new Date(date);
		}
		function padLeftZero(str) {
			return ('00' + str).substr(str.length)
		}

		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}

		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + '';
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
			}
		}
		return fmt;
	},

	/** 格式化时间，返回年，月，日
	*  @param {string } date 需要格式化的时间
	*/
	objectDate(date) {
		if (date && typeof date === 'string') {
			date = new Date(date);
			let o = {
				'Y': date.getFullYear(),
				'M': date.getMonth() + 1,
				'D': date.getDate()
			};
			return o;
		}
		return date;
	},
	/** 格式化unix时间，返回年，月，日
	*  @param {string } date 需要格式化的时间
	*/
	unixToTime(date){
        let unixtime = date
        let unixTimestamp = new Date(unixtime * 1000)
        let Y = unixTimestamp.getFullYear()
        let M = ((unixTimestamp.getMonth() + 1) > 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
        let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
        let toDay = Y + '-' + M + '-' + D
        return toDay
	},

	/** 格式化时间，返回时间差，年，月，日
	* @param {string} date 需要格式化的时间
	* */
	timeDiff (date){
		// 开始时间
		let startTime = date;
		// 结束时间
		let endTime = new Date();
		// 时间差的毫秒数
		let timeDifferent = endTime.getTime() - new Date(startTime).getTime();

		function filter(value, index) {
			return compare(value, index) ? filter(compare(value, index), (index + 1)) : describe(value, index);
		}

		function compare(value, index) {
			switch (index) {
				case 0:
					return parseInt(value / 60);
				case 1:
					return parseInt(value / 60);
				case 2:
					return parseInt(value / 24);
				case 3:
					return parseInt(value / 30);
				case 4:
					return parseInt(value / 12);
			}
		}

		function describe(value, index) {
			switch (index) {
				case 0:
					return (value + '秒前');
				case 1:
					return (value + '分钟前');
				case 2:
					return (value + '小时前');
				case 3:
					return (value + '天前');
				case 4:
					return (value + '月前');
				case 5:
					return (value + '年前');
			}
		}

		return filter(timeDifferent / 1000, 0);
	},

	//今天时间
	getToday(isShowToday){
		let now = new Date(),str = '', y, m, d, w;
		y = now.getFullYear();
		m = ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1);
		d = (now.getDate() < 10 ? "0" : "") + now.getDate();
		if(isShowToday){
			str = y + "-" + m + "-" + d;
		}else{
			str = y + "-" + m + "-" + (d - 1);			
		}
		str=this.formatDate(str,'yyyy-MM-dd')
		return str
	},

	//今天，昨天，近7天，近14天，近30天 isShowToday true 返回今天，false，返回昨天
	getTime(type,isShowToday=false) {
		let now = new Date(), str = '', y, m, d, w;
		let num=null;
		if(type==0) num=0;
		if(type==-1) num=1;
		if(type==7) num=6;
		if(type==14) num=13;
		if(type==30) num=29;
		if(!isShowToday&&type!=-1){
			num = num + 1;
		}
		w = now.getDay();
		y = now.getFullYear();
		m = ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1);
		d = ((now.getDate() - num) < 10 ? "0" : "") + Math.abs(now.getDate() - num);
		if ((now.getDate() - num) <= 0) {
			let max = new Date(y, m - 1, 0).getDate();
			if (m - 1 == 0) {
				m = 12;
				y = y - 1;
			} else {
				m = m - 1
			}
			d = max + (now.getDate()-num);
		}
		str = y + "-" + m + "-" + d;
		str=this.formatDate(str,'yyyy-MM-dd')
		console.log("time",str);
		if(type==-1){
			return {'start_time':str,'end_time':str};
		}

		return {'start_time':str,'end_time':this.getToday(isShowToday)};
	},

	/** 检查(对象|数组)对应(键|下标)内容为空提示
	*  @param {object,Array} obj 对象|数组
	*  @param {object} key 键|下标
	*  @param {string} msg 提示内容
	*/
	validateNull(obj, key, msg){
		if (key.indexOf(Object.keys(obj)) != -1) {
			this.toast(null, msg ? msg : key + '为空');
			return false;
		} else {
			if (!obj[key]) {
				this.toast(null, msg ? msg : key + '为空');
				return false;
			}
		}
		return true;
	},

	/** 去除(对象|数组)中为空(null、'null'、undefined，空字符串除外)的字段和下标
	*  @param {object,Array} value 对象|数组
	*/
	filterNull(value){
		if (typeof value == 'object') {
			for (let k in value) {
				if (value[k] == null || value[k] == 'null' || value[k] == undefined) {
					if (value.length > 0) {
						value.splice(k, 1)
					} else {
						delete value[k]
					}
				}
			}
		}
		return value
	},

	/** 去除字符串的左右空格
	*  @param {string} value 字符串
	*/
	trim(value){
		if (typeof(value) === 'string')
			return value.replace(/(^\s*)|(\s*$)/g, '');
		return value
	},

	/** 数组内容过滤
	*  @param {string} text 过滤包含内容
	*  @param {Array} array 待过滤数组
	*  @param {function} filter 过滤方法
	*/
	nativeSearch(text, array, filter){
		let matches = {};
		let promise = new Promise((resolve) => {
			if (!filter) {
				matches = array.filter(function (datas) {
					if (datas.BRXM.indexOf(text) !== -1) return true;
				})
			} else {
				matches = array.filter(filter);
			}
			resolve(matches);
		}).catch((err) => {

		});

		return promise;
	},



	/** 提示
	*  @param {object} ctx 上下文
	*  @param {string} title 提示标题
	*  @param {string} msg 提示内容
	*  @param {Number} dur 提示时间,0为不自动关闭
	*/
	toast(title, msg, dur){
		Notification.info({
			title: title ? title : '提示',
			message: msg,
			duration: dur != undefined ? dur : 2000
		});
	},
	warningToast(title, msg, dur){
		Notification({
			title: title ? title : '警告',
			message: msg,
			duration: dur != undefined ? dur : 2000,
			type: 'warning'
		});
	},
   msg(title){
         Message({
            type: 'success',
            message: title
        });
	},
	successToast(title, msg, dur){
		Notification({
			title: title ? title : '成功',
			message: msg,
			duration: dur != undefined ? dur : 2000,
			type: 'success'
		});
	},
	errorToast(title, msg, dur){
		Notification.error({
			title: title ? title : '错误',
			message: msg,
			duration: dur != undefined ? dur : 2000
		});
	},
	//电话验证
	phoneTest(phone) {
		if((/^1[34578]\d{9}$/.test(phone)) && phone.length == 11) {
			return true
		} else {
			return false
		}
	},
	//判断是否为空
	isEmpty(str) {
		if (str.split(" ").join("").length==0) {
			return false;
		}
		return true;
	},
	//	时间转时间戳
	getsjc(date){
		var str =date.replace(/-/g,'/');
		str=new Date(str);
		str=str.getTime();
		return str/86400000
	},
	/** 确认提示
	*  @param {object} ctx 上下文
	*  @param {string} title 提示标题
	*  @param {string} msg 提示内容
	*  @param {string} type 类型  success/info/warning/error
	*/
	alert(title, msg, type){
		let p = MessageBox.confirm(msg, title ? title : '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: type ? type : 'info'
		});

		p.catch((err) => {
			return err
		});

		return p
	},
	openLoading(targetId){
		let target = document.querySelector(targetId)
		return Loading.service({fullscreen: target ? false : true, target})
	},
	//数据占比
	p2int (num1,num2) {
		return (num1*100 / num2).toFixed(2) +'%';
	},
	//增长比
	 ratio(num1,num2) {
	 	if(num2==0||num1-num2==0) return (0.00+'%');
		return ((num1-num2)*100 / num2).toFixed(2) +'%';
	},
	//占比
	 ratio1(num1,num2) {
		return (num1*100 / (num1+num2)).toFixed(2) +'%';
	},
	toPercent(point){
	    var str=Number(point*100).toFixed(2);
	    str+="%";
	    return str;
	},
	toFixed(num,s){
                return num.toFixed(s)
	},
	/** exle表格导出
	*  @param {arr} tHeader 表头
	*  @param {arr} filterVal 字段
	*  @param {obj} list 内容
	*  @param {string} xlsxName 表名字
	*/
	formatJson(filterVal, jsonData) {
		return jsonData.map(v => filterVal.map(j => v[j]));
	},
	getExcel(tHeader,filterVal,list,xlsxName) {
		require.ensure([], () => {
			const { export_json_to_excel } = require('../vendor/Export2Excel');
			const data =this.formatJson(filterVal, list);
			export_json_to_excel(tHeader, data,xlsxName);
		});
	},
	setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	},
	getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++)
		{
			var c = ca[i].trim();
			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return "";
	},
	/**
	 * 把json格式的参数转化成url参数
	 * let a = {a:1,b:1} 
	 * jsonToUrlFmt(a)    a=1&b=1
	 * 
	 * @param {*} obj 
	 */
	jsonToUrlFmt(obj){
		if(typeof obj !== 'object'){
			throw console.error("只支持object类型");
			return ;						
		}
		let temp = []
		for(let key in obj){
			temp.push(key+'='+obj[key])
		}	
		return temp.join('&')			
	}
}
