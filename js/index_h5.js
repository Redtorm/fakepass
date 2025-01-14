'use strict';
window.onload = function() {
	//测试数据
	G_VAR.sTest = SysUtils.getUrlParams("sTest");
	if(G_VAR.sTest != undefined) {
		G_VAR.getMright = "http://127.0.0.1/door/base/private/web/getMright"; // 获取H5二级菜单的地址 
		G_VAR.getDictList = "http://127.0.0.1/door/base/public/web/getDictList?sFiledEName=sMenuTypeCode"; // 获取H5菜单的地址
		G_VAR.getarrNoticeList = "http://127.0.0.1/door/notice/h5/getList"; // 获取消息列表
	}
 G_FN.render();
}
function convertURL(url){
    var timstamp = (new Date()).valueOf();
    if (url.indexOf("?")>=0){
       url = url + "&t=" + timstamp; 
    }else {
       url = url + "?t=" + timstamp;
    };
    return url;
}
//全局变量
var G_VAR = {
	getMright: SysUtils.getHttpRoot() + "/base/private/web/getMright", // 获取H5二级菜单的地址 
	getDictList: SysUtils.getHttpRoot() + "/base/public/web/getDictList?sFiledEName=sMenuTypeCode", // 获取H5菜单的地址
	getarrNoticeList: SysUtils.getHttpRoot() + "/notice/h5/getList", // 获取消息列表 
	arrMenuList: [], 	   // 菜单数组
	arrNoticeList: [],    // 消息数组
	iNoticeIndex: 0,    // 消息标识码
	dNowDate: SysUtils.getNowDate(),  // 获取当前日期
	isFirst: true,  // 是否首次进入
}
var G_FN = {
	render () {
		// 获取当前 年月日 时分秒
		G_VAR.dNowDate = G_VAR.dNowDate.substring(0, G_VAR.dNowDate.length - 4);
		
		G_FN.getDictListFn();
		// G_FN.getarrNoticeListFn();
		
		let isFirst = window.localStorage.getItem("isFirst") || "";
		if (isFirst || isFirst != "") {
			G_VAR.isFirst =	false;
		} else {
			$(".tips").show();
			 window.localStorage.setItem("isFirst", "false");
		}
	},
	// 获取菜单
	getDictListFn () {
		$.ajax({
			url: G_VAR.getDictList,
			type: "post",
			data: {},
			success: function(res) {
				if(res.code == 1) {
		
                    
                    var res = {"code":1,"data":{"sMenuTypeCode":[{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"采集","sCode":"1","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"在校","sCode":"2","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"离校·返校","sCode":"3","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"报到","sCode":"4","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"健康信息","sCode":"6","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"其他","sCode":"5","iSelected":0}]}};
                    var list = res.data.sMenuTypeCode;
					
					$.each(list, (index, item) => {
						let obj = {};
						obj.title = item.sName;
						obj.sCode = item.sCode;
						obj.items = [];
						G_VAR.arrMenuList.push(obj);
					})
					
					G_FN.getMrightFn();
				} else {
					WeuiUtils.oneBtnAlert(res.msg || "亲，请尝试从右上角三点找到刷新功能刷新界面。");	
					G_FN.isShowLoading(false);
				}
			},
			error: function (res) { 
				var res = {"code":1,"data":{"sMenuTypeCode":[{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"采集","sCode":"1","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"在校","sCode":"2","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"离校·返校","sCode":"3","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"报到","sCode":"4","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"健康信息","sCode":"6","iSelected":0},{"id":null,"sPersonName":null,"sPersonCode":null,"sAuthTypeName":null,"sAuthTypeCode":"sMenuTypeCode","sName":"其他","sCode":"5","iSelected":0}]}};
                    var list = res.data.sMenuTypeCode;
					
					$.each(list, (index, item) => {
						let obj = {};
						obj.title = item.sName;
						obj.sCode = item.sCode;
						obj.items = [];
						G_VAR.arrMenuList.push(obj);
					})
					
				G_FN.getMrightFn();
			}
		})
	},
	// 获取菜单二级
	getMrightFn () {
		$.ajax({
			url: G_VAR.getMright,
			type: "post",
			data: {},
			success: function(res) {
				if(res.code == 1) {
		
					// var res = {"code":1,"data":[{"id":"e041c39864b947a1a14d778244ed7075","sMenuName":"健康填报","sMenuCode":"856151","sMenuTypeName":"在校","sMenuTypeCode":"2","sMenuUrl":"/health/h5/health.html","sMenuIcon":"856151","iSort":6},{"id":"6f46588e32c447e78da0a49a4ed86841","sMenuName":"发热登记","sMenuCode":"874776","sMenuTypeName":"在校","sMenuTypeCode":"2","sMenuUrl":"/health/h5/fever.html","sMenuIcon":"874776","iSort":9},{"id":"ccb89f6747aa4143ba18a60b5bab44ea","sMenuName":"开学报到","sMenuCode":"572323","sMenuTypeName":"报到","sMenuTypeCode":"4","sMenuUrl":"/register/h5/register.html","sMenuIcon":"572323","iSort":7},{"id":"e9f1e99b9c8f4c1b8f77f1c9b7862da6","sMenuName":"接站申请","sMenuCode":"770056","sMenuTypeName":"报到","sMenuTypeCode":"4","sMenuUrl":"/site/h5/apply.html","sMenuIcon":"770056","iSort":8},{"id":"9c965f528c7347c897c906e378caa1d4","sMenuName":"离校登记","sMenuCode":"98100","sMenuTypeName":"离校·返校","sMenuTypeCode":"3","sMenuUrl":"/leave/h5/leave.html","sMenuIcon":"98100","iSort":5},{"id":"9050701ee1b4478d9a141ba09c4f6a25","sMenuName":"特征照采集","sMenuCode":"900113","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/feature/h5/feature.html","sMenuIcon":"900113","iSort":1},{"id":"b83fbd271ef04210bd818bc4b7afa2cc","sMenuName":"特征照管理","sMenuCode":"588373","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/feature/h5/featuremgr.html","sMenuIcon":"588373","iSort":2},{"id":"55e12938dc9b4d059bd546176c4d2e72","sMenuName":"证件照上传","sMenuCode":"294779","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/idphoto/h5/idphoto.html","sMenuIcon":"294779","iSort":3},{"id":"3f71f6c46271482c99f2c9af7e04eaee","sMenuName":"证件照审核","sMenuCode":"801933","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/idphoto/h5/idphotomgr.html","sMenuIcon":"801933","iSort":4}]};
					var list = res.data;
					
					for (let i=0; i < G_VAR.arrMenuList.length; i++) {
						for (let j=0; j < list.length; j++) {
							if (list[j].sMenuTypeCode == G_VAR.arrMenuList[i].sCode) {
								let obj = {};
								obj.name = list[j].sMenuName || "";
								obj.url = convertURL(list[j].sMenuUrl)   || "" ; 
								obj.icon = "img/"+ list[j].sMenuCode +".png" || "";
								obj.code = list[j].sMenuCode || "";
								G_VAR.arrMenuList[i].items.push(obj);
							}
						}
					}
					G_FN.initarrMenuList();
		
				} else {
					WeuiUtils.oneBtnAlert(res.msg || "亲，请尝试从右上角三点找到刷新功能刷新界面。");
					G_FN.isShowLoading(false);
				}
			},
			error: function (res) {
				// WeuiUtils.oneBtnAlert(res.msg || "亲，请尝试从右上角三点找到刷新功能刷新界面。");
                // G_FN.isShowLoading(false);
                
                var res = {"code":1,"data":[{"id":"538d74e892e04dbd9f73867ee225d4fe","sMenuName":"人脸采集","sMenuCode":"900113","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/feature/h5/feature.html","sMenuIcon":"900113","iSort":1,"iMenuViewWay":1},{"id":"fffd75a9cb674db4baaa93654e878800","sMenuName":"使用授权","sMenuCode":"869860","sMenuTypeName":"采集","sMenuTypeCode":"1","sMenuUrl":"/safe/h5/safe.html","sMenuIcon":"869860","iSort":22,"iMenuViewWay":1},{"id":"81b9ec0226d44924949f16ab245c993e","sMenuName":"健康填报","sMenuCode":"856151","sMenuTypeName":"健康信息","sMenuTypeCode":"6","sMenuUrl":"/health/h5/health.html","sMenuIcon":"856151","iSort":6,"iMenuViewWay":1},{"id":"c2fb6d4ca60c412bb82b6aae5a454df7","sMenuName":"外出申请","sMenuCode":"826119","sMenuTypeName":"在校","sMenuTypeCode":"2","sMenuUrl":"/apply.html","sMenuIcon":"826119","iSort":16,"iMenuViewWay":1},{"id":"ccb89f6747aa4143ba18a60b5bab44ea","sMenuName":"开学报到","sMenuCode":"572323","sMenuTypeName":"报到","sMenuTypeCode":"4","sMenuUrl":"/register/h5/register.html","sMenuIcon":"572323","iSort":7,"iMenuViewWay":1},{"id":"c63d01c7c34b487abbc3a02ed8760963","sMenuName":"排查登记","sMenuCode":"874776","sMenuTypeName":"健康信息","sMenuTypeCode":"6","sMenuUrl":"/health/h5/fever.html","sMenuIcon":"874776","iSort":9,"iMenuViewWay":1},{"id":"311aeea43c51480aaf82e8ecc8252aef","sMenuName":"离校登记","sMenuCode":"98100","sMenuTypeName":"离校·返校","sMenuTypeCode":"3","sMenuUrl":"/leave/h5/leave.html","sMenuIcon":"98100","iSort":5,"iMenuViewWay":1},{"id":"6328ea3ca9f34b10a06307888f4fa739","sMenuName":"返校申请","sMenuCode":"990622","sMenuTypeName":"离校·返校","sMenuTypeCode":"3","sMenuUrl":"/rtn/h5/apply.html","sMenuIcon":"990622","iSort":10,"iMenuViewWay":1},{"id":"7fb72c80b54940bf90404ce72f524bac","sMenuName":"返程填报","sMenuCode":"537993","sMenuTypeName":"离校·返校","sMenuTypeCode":"3","sMenuUrl":"/rtn/h5/passsite.html","sMenuIcon":"537993","iSort":11,"iMenuViewWay":1}]}
					var list = res.data;
					
					for (let i=0; i < G_VAR.arrMenuList.length; i++) {
						for (let j=0; j < list.length; j++) {
							if (list[j].sMenuTypeCode == G_VAR.arrMenuList[i].sCode) {
								let obj = {};
								obj.name = list[j].sMenuName || "";
								obj.url =  convertURL(list[j].sMenuUrl) || "" ; 
								obj.icon = "img/"+ list[j].sMenuCode +".png" || "";
								obj.code = list[j].sMenuCode || "";
								G_VAR.arrMenuList[i].items.push(obj);
							}
						}
					}
					G_FN.initarrMenuList();
			}
		})
	},
	// 获取消息列表
	getarrNoticeListFn () {
		G_FN.isShowLoading(false);
		$.ajax({
			url: G_VAR.getarrNoticeList,
			type: "post",
			data: {},
			success: function(res) {
				if(res.code == 1) {
					console.log(res);
		
						if (res.data.rows.length > 0) {
							$.each(res.data.rows, (index, item) => {
								if (index <= 2) {
									G_VAR.arrNoticeList.push(item);
								}
							});
							G_FN.showNotice();
						}
				} else {
					G_FN.isShowLoading(false);
					WeuiUtils.oneBtnAlert(res.msg);	
				}
			},
			error: function (res) {
				G_FN.isShowLoading(false);
				WeuiUtils.oneBtnAlert(res.msg);	
			}
		})
	},
	// 显示消息
	showNotice () {
		// 默认显示第一个
		$(".notice_text").text(G_VAR.arrNoticeList[0].sNoticeTitle);
		G_FN.showNew(G_VAR.arrNoticeList[0].dCreateTime);
		// 定时器切换
		setInterval(() => {
			if (G_VAR.iNoticeIndex == 0) {
				$(".notice_text").text(G_VAR.arrNoticeList[1].sNoticeTitle);
				G_FN.showNew(G_VAR.arrNoticeList[1].dCreateTime);
				G_VAR.iNoticeIndex = 1;
			} else {
				if (G_VAR.arrNoticeList.length == 2) { // 2条数据
					if (G_VAR.iNoticeIndex == 1) {
						$(".notice_text").text(G_VAR.arrNoticeList[0].sNoticeTitle);
						G_FN.showNew(G_VAR.arrNoticeList[0].dCreateTime);
						G_VAR.iNoticeIndex = 0;
					}
				} else { // 3条数据
					if (G_VAR.iNoticeIndex == 1) {
						$(".notice_text").text(G_VAR.arrNoticeList[2].sNoticeTitle);
						G_FN.showNew(G_VAR.arrNoticeList[2].dCreateTime);
						G_VAR.iNoticeIndex = 2;
					}
					if (G_VAR.iNoticeIndex == 2) {
						$(".notice_text").text(G_VAR.arrNoticeList[0].sNoticeTitle);
						G_FN.showNew(G_VAR.arrNoticeList[0].dCreateTime);
						G_VAR.iNoticeIndex = 0;
					}
				}
			}

		}, 10000);
	},
	// 显示新消息图片
	showNew (time) {
		var dNowDate = G_VAR.dNowDate.replace(new RegExp("-","gm"),"/"),
		dNowDateM = (new Date(dNowDate)).getTime(), //得到毫秒数
		dCreateTime = time.replace(new RegExp("-","gm"),"/"),
		dCreateTimeM = (new Date(dCreateTime)).getTime(); //得到毫秒数

		// 判断创建时间是否超过3日
		if (dNowDateM - dCreateTimeM < 259200000) { 
			$(".new").show();
		}	else {
			$(".new").hide();
		}
	},
	// 初始化菜单
	initarrMenuList () {
		if (G_VAR.arrMenuList.length != 0) {
			let str = "";
			$(".main").empty();
			$.each(G_VAR.arrMenuList, (index, item) => {
				if (item.items.length != 0) {
					str += '<div class="main_box">' + 
							'<div class="main_title"><img src="img/title_left.png">'+ item.title +'<img src="img/title_right.png"></div>' + 
							'<div class="main_section">' 
							
							$.each(item.items, (index2, item2) => {
								str +='<div class="item" url="'+ item2.url +'" onclick="G_FN.jumpUrl()">' +
												'<img class="item_icon" src="'+ item2.icon +'" alt="">' +
												'<div class="text">'+ item2.name +'</div>' +
											'</div>' 
							});

						str += '</div>' +
						'</div>'
				}
			});
			// str += '<div class="main_box"><div class="main_title"><img src="img/title_left.png">其它<img src="img/title_right.png"></div><div class="main_section"><div class="item" onclick="G_FN.jumpMyPass()"><img class="item_icon" src="img/home_mrtb_icon.png" alt=""><div class="text">旧版Mypass</div></div></div></div>';
			
			$(".main").append(str);
			$(".main").append('<div class="back_btn" onclick="G_FN.logOutFn()">退出登录</div>');
			G_FN.isShowLoading(false);
		} else {
			let str = "";
			$(".main").empty().append('<div class="back_btn" onclick="G_FN.logOutFn()">退出登录</div>');
			G_FN.isShowLoading(false);
		}
	},
	// 跳转至 
	jumpNotice () {
		window.location.href = "notice/h5/notice.html";
    }, 
	// 跳转url
	jumpUrl () {
        let sUrl = $(event.currentTarget).attr("url") + "?";
        sUrl = convertURL(sUrl);
		sUrl ? window.location.href = SysUtils.getHttpRoot() + sUrl : "";
	},
	// 退出登录
	logOutFn () {
		weui.dialog({
			title: '温馨提示',
			content: '请确认是否退出登录？',
			className: 'custom-classname',
			buttons: [{
					label: '取消',
					type: 'default',
					onClick: function () {}
			}, {
					label: '确定',
					type: 'primary',
					onClick: function () {
						window.location.href = SysUtils.getHttpRoot() + "/logout?iFrom=h5";
					}
			}]
		});
	},
	// 跳到旧版mypass
	jumpMyPass () {
		window.location.href = "https://mypass.scut.edu.cn/hsmobile/index.html";
	},
	// 关闭弹窗
	closeTips () {
		$(".tips").hide();
	},
	// 关闭页面
	closePage () {
		let ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") { 
			WeixinJSBridge.call('closeWindow');
		} else if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1 || navigator.userAgent.indexOf("Mozilla") !=-1) {
			window.location.href="about:blank";
			window.close();
		} else {
			window.opener = null;
			window.open("", "_self");
			window.close();
		}
	},
	// 显示or隐藏 加载效果
	isShowLoading(status) {
		if(status) {
			$(".loading_mask").show();
			$(".loading_tip").show();
		} else {
			$(".loading_mask").hide();
			$(".loading_tip").hide();
		}
	},
}	