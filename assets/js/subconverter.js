$("#show-config").click(function() {
	var select_config = $('#config option:selected').val();
	if (select_config == "custom") {
		$("#show-config").hide();
		$("#hide-custom").show();
	}
	console.log("config click")
})
$("#create-sub").click(function() {
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
		var return_url = sub_api + "?target=" + target + "&ver=" + ver + "&url=" + sub_link +
			"&emoji=" + emoji +
			"&insert=false&config=" + config_url + "&include=" +
			encodeURIComponent($('#include').val()) + "&exclude=" + encodeURIComponent($('#exclude')
				.val());
	} else {
		if (config !== "default") {
			var return_url = sub_api + "?target=" + target + "&url=" + sub_link + "&emoji=" + emoji +
				"&insert=false&config=" + config_url + "&include=" +
				encodeURIComponent($('#include').val()) + "&exclude=" + encodeURIComponent($('#exclude')
					.val());
		} else {
			var return_url = sub_api + "?target=" + target + "&url=" + sub_link + "&emoji=" + emoji +
				"&insert=false&include=" +
				encodeURIComponent($('#include').val()) + "&exclude=" + encodeURIComponent($('#exclude')
					.val());
		}
	}
	console.log("return_url: " + return_url);
	$("#return_url").val(return_url);
	$("#return_sub").show();
})