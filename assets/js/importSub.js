switch(BrowserDetect.OS){
	case 'Windows':
		$("#software-shadowrocket").hide();
		$("#software-surge").hide();
		$("#software-quantumultx").hide();
		$("#software-surfboard").hide();
		$("#software-loon").hide();
		$("#software-quantumult").hide();
		break;
	case 'iPhone/iPad':
		$("#software-clash").hide();
		$("#software-loon").hide();
		break;
	case 'Mac':
		$("#software-quantumultx").hide();
		$("#software-surfboard").hide();
		$("#software-loon").hide();
		$("#software-quantumult").hide();
		break;
	case 'Android':
		$("#software-shadowrocket").hide();
		$("#software-surge").hide();
		$("#software-quantumultx").hide();
		$("#software-loon").hide();
		$("#software-quantumult").hide();
		break;
	default:
		$("#import-sub").hide();
}
function isDownload(url, urlscheme, softname = "Unknown"){
	Swal.fire({ 
		title: "提示", 
		text: "请确认您是否下载了"+ softname +"软件，导入失败请手动复制订阅进行导入。", 
		icon: "warning",
		showCancelButton: true, 
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: "继续导入", 
		cancelButtonText: "取消",
	}).then((result) => {
		if (result.value) {
			window.location.href = urlscheme + url;
		}
	})
}
function importSub(type){
	switch(type){
		case 'clash':
			isDownload(encodeURIComponent(sub_link), 'clash://install-config?url=', 'Clash');
			break;
		case 'shadowrocket':
			isDownload(btoa(sub_link), 'shadowrocket://add/sub://', 'Shadowrocket');
			break;
		case 'surge':
			isDownload(encodeURIComponent(sub_link + '?t=' + (new Date()).valueOf()), 'surge:///install-config?url=', 'Surge');
			break;
		case 'quantumultx':
			Swal.fire('导入失败', '暂不支持导入，请等待站长更新代码', 'error');
			//isDownload(encodeURIComponent(sub_link), 'quantumult-x:///update-configuration?remote-resource=', 'Quantumultx');
			break;
		case 'surfboard':
			isDownload(encodeURIComponent(sub_link), 'surfboard://add?url=', 'Surfboard');
			break;
		case 'loon':
			isDownload(encodeURIComponent(sub_link), 'loon://import?sub=', 'Loon');
			break;
		case 'quantumult':
			isDownload(btoa(sub_link).replace(/=/g, '') + '&filter=YUhSMGNITTZMeTl0ZVM1dmMyOWxZMjh1ZUhsNkwzSjFiR1Z6TDNGMVlXNTBkVzExYkhRdVkyOXVaZw', 'quantumult://configuration?server=', 'Quantumult');
			break;
		default:
			Swal.fire('导入失败', '导入类型错误', 'error');
	} 
}