$("#show-config").click(function() {
	var select_config = $('#config option:selected').val();
	if (select_config == "custom") {
		$("#show-config").hide();
		$("#hide-custom").show();
	}
	console.log("config click")
})
$("#create-sub").click(function() {
	var sub_site = "https://sub.000890.xyz/sub";
	var client = $("#client option:selected").val();
	if (client.indexOf("surge") != -1) {
		var ver = client.substr(5, 1);
		console.log("ver: " + ver)
		var target = "surge";
	} else {
		var ver = "";
		console.log("ver: " + ver)
		var target = client;
	}
	var config = $("#config option:selected").val();
	switch (config) {
		case "default":
			config_url = "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR.ini";
			break;
		case "nourl":
			config_url = "https://subconverter.oss-ap-southeast-1.aliyuncs.com/Rules/RemoteConfig/universal/no-urltest.ini";
			break;
		case "haveurl":
			config_url = "https://subconverter.oss-ap-southeast-1.aliyuncs.com/Rules/RemoteConfig/universal/urltest.ini";
			break;
		case "netease":
			config_url = "https://subconverter.oss-ap-southeast-1.aliyuncs.com/Rules/RemoteConfig/special/netease.ini";
			break;
		case "basic":
			config_url = "https://subconverter.oss-ap-southeast-1.aliyuncs.com/Rules/RemoteConfig/special/basic.ini";
			break;
		case "custom":
			config_url = $("#custom-url").val();
			if (config_url == "") {
				Swal.fire('生成失败', "请先设置远程配置链接", 'error');
				return;
			}
			break;
	}
	console.log("config_url: " + config_url)
	config_url = encodeURIComponent(config_url);
	var emoji = $('#emoji').prop('checked') ? "true" : "false";
	console.log("emoji: " + emoji);
	if ($("#client option:selected").val().indexOf("surge") != -1) {
		var return_url = sub_site + "?target=" + target + "&ver=" + ver + "&url=" + sub_link +
			"&emoji=" + emoji +
			"&insert=false&config=" + config_url + "&include=" +
			encodeURIComponent($('#include').val()) + "&exclude=" + encodeURIComponent($('#exclude')
				.val());
	} else {
		if (config !== "default") {
			var return_url = sub_site + "?target=" + target + "&url=" + sub_link + "&emoji=" + emoji +
				"&insert=false&config=" + config_url + "&include=" +
				encodeURIComponent($('#include').val()) + "&exclude=" + encodeURIComponent($('#exclude')
					.val());
		} else {
			var return_url = sub_site + "?target=" + target + "&url=" + sub_link + "&emoji=" + emoji +
				"&insert=false&include=" +
				encodeURIComponent($('#include').val()) + "&exclude=" + encodeURIComponent($('#exclude')
					.val());
		}
	}
	console.log("return_url: " + return_url);
	$("#return_url").val(return_url);
	$("#return_sub").show();
})

//选择器
var wizard = $("#sub-steps").steps({
	  headerTag: "h3",
	  bodyTag: "section",
	  transitionEffect: "slideLeft",
	  autoFocus: true,
	  enablePagination: false,
	  enableFinishButton: false,
	  cssClass: 'circle wizard'
  });
  //windows 0 android 1 iphone 2 macos 3
  //clash 4 ssr 5 shadowrocket 6 surfboard 7 quanx 8 surge 9
  $("#windows").click(function(){
	equipment = 0;
	wizard.steps("next");
	$("#clash").show();
	$("#ssr").show();
	$("#shadowrocket").hide();
	$("#surfboard").hide();
	$("#quanx").hide();
	$("#surge").hide();
  }); 
  $("#android").click(function(){
	equipment = 1;
	wizard.steps("next");
	$("#clash").show();
	$("#ssr").show();
	$("#surfboard").show();
	$("#shadowrocket").hide();
	$("#quanx").hide();
	$("#surge").hide();
  }); 
  $("#iphone").click(function(){
	equipment = 2;
	wizard.steps("next");
	$("#shadowrocket").show();
	$("#quanx").show();
	$("#surge").show();
	$("#clash").hide();
	$("#ssr").hide();
	$("#surfboard").hide();
  }); 
  $("#macos").click(function(){
	equipment = 3;
	wizard.steps("next");
	$("#clash").show();
	$("#surge").show();
	$("#shadowrocket").hide();
	$("#ssr").hide();
	$("#quanx").hide();
	$("#surfboard").hide();
  }); 
  //选择软件后区分
  $("#clash").click(function(){
	$("#sub-text").val(sublink + "?type=newclash");
	$("#copy-sub").attr("data-clipboard-text",sublink + "?type=newclash");
	$("#ipmort-sub").attr("onclick","window.location.href='clash://install-config?url=" + sublink + "?type=newclash'");
	wizard.steps("next");
  });
  $("#ssr").click(function(){
	$("#sub-text").val(sublink);
	$("#copy-sub").attr("data-clipboard-text",sublink);
	$("#ipmort-sub").hide();
	wizard.steps("next");
  });
  $("#shadowrocket").click(function(){
	$("#sub-text").val(sublink + "?type=shadowrocket");
	$("#copy-sub").attr("data-clipboard-text",sublink + "?type=shadowrocket");
	$("#ipmort-sub").attr("onclick","AddSub('"+ sublink +"?type=shadowrocket','sub://')");
	wizard.steps("next");
  });
  $("#surfboard").click(function(){
	$("#sub-text").val(sublink + "?type=newclash");
	$("#copy-sub").attr("data-clipboard-text",sublink + "?type=newclash");
	$("#ipmort-sub").hide();
	wizard.steps("next");
  });
  $("#quanx").click(function(){
	$("#sub-text").val(sublink + "?type=quanx");
	$("#copy-sub").attr("data-clipboard-text",sublink + "?type=quanx");
	$("#ipmort-sub").hide();
	wizard.steps("next");
  });
  $("#surge").click(function(){
	$("#sub-text").val(sublink + "?type=surge");
	$("#copy-sub").attr("data-clipboard-text",sublink + "?type=surge");
	$("#ipmort-sub").hide();
	wizard.steps("next");
  });
  //console.log(value);
  //复制拷贝
  $(function(){
	  new ClipboardJS('#copy-sub');
  });

  $("#copy-sub").click(function () {
	  Swal.fire('拷贝成功', '已拷贝，请您继续接下来的操作。', 'success');
  });
  //重置订阅
  $("#reset-link").click(function () {
	  Swal.fire({ 
		  title: "确定重置订阅吗？", 
		  text: "重置后需要重新添加订阅！", 
		  icon: "warning",
		  showCancelButton: true, 
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: "确定", 
		  cancelButtonText: "取消",
		  }).then((result) => {
		  if (result.value) {
			  Swal.fire('重置成功', '已重置您的订阅链接，请变更或添加您的订阅链接！', 'success');
			  window.setTimeout("location.href='/user/url_reset'", 1200);
		  }
	  }) 
  });