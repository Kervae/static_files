/*
=========================================
|                                       |
|           Scroll To Top               |
|                                       |
=========================================
*/ 
$('.scrollTop').click(function() {
    $("html, body").animate({scrollTop: 0});
});


$('.navbar .dropdown.notification-dropdown > .dropdown-menu, .navbar .dropdown.message-dropdown > .dropdown-menu ').click(function(e) {
    e.stopPropagation();
});

/*
=========================================
|                                       |
|       Multi-Check checkbox            |
|                                       |
=========================================
*/

function checkall(clickchk, relChkbox) {

    var checker = $('#' + clickchk);
    var multichk = $('.' + relChkbox);


    checker.click(function () {
        multichk.prop('checked', $(this).prop('checked'));
    });    
}


/*
=========================================
|                                       |
|           MultiCheck                  |
|                                       |
=========================================
*/

/*
    This MultiCheck Function is recommanded for datatable
*/

function multiCheck(tb_var) {
    tb_var.on("change", ".chk-parent", function() {
        var e=$(this).closest("table").find("td:first-child .child-chk"), a=$(this).is(":checked");
        $(e).each(function() {
            a?($(this).prop("checked", !0), $(this).closest("tr").addClass("active")): ($(this).prop("checked", !1), $(this).closest("tr").removeClass("active"))
        })
    }),
    tb_var.on("change", "tbody tr .new-control", function() {
        $(this).parents("tr").toggleClass("active")
    })
}

/*
=========================================
|                                       |
|           MultiCheck                  |
|                                       |
=========================================
*/

function checkall(clickchk, relChkbox) {

    var checker = $('#' + clickchk);
    var multichk = $('.' + relChkbox);


    checker.click(function () {
        multichk.prop('checked', $(this).prop('checked'));
    });    
}

/*
=========================================
|                                       |
|               Tooltips                |
|                                       |
=========================================
*/

$('.bs-tooltip').tooltip();

/*
=========================================
|                                       |
|               Popovers                |
|                                       |
=========================================
*/

$('.bs-popover').popover();


/*
================================================
|                                              |
|               Rounded Tooltip                |
|                                              |
================================================
*/

$('.t-dot').tooltip({
    template: '<div class="tooltip status rounded-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
})


/*
================================================
|            IE VERSION Dector                 |
================================================
*/

function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0) 
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return 11;

  else
    return 0; //It is not IE
}

/*
================================================
|            SSPANEL THEME SCRISP              |
================================================
*/

//签到
function checkin(){
    $.ajax({
        type: "POST",
        url: "/user/checkin",
        dataType: "json",
        success: function (data) {
            if (data.ret) {
                Swal.fire('签到成功', data.msg, 'success');
                $('#checkin').attr("disabled","disabled");
                $('#checkin').text("已签到");
            }else{
                Swal.fire('签到失败', data.msg, 'error');
            }
        },
        error: function (jqXHR) {
            Swal.fire({
                icon: 'error',
                title: '签到失败',
                text: "发生错误：" + jqXHR.status
            })
        }
    })
}

//复制拷贝
$(function(){
    new ClipboardJS('.copy-text');
});

$(".copy-text").click(function () {
    Swal.fire('拷贝成功', '已拷贝，请您继续接下来的操作。', 'success');
});
//重置订阅
$(".reset-link").click(function () {
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
//小火箭导入
var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
function AddSub(url,jumpurl="") {
    if (!isMobile) {
        Swal.fire({ 
            title: "提示", 
            text: "导入配置到 Shadowrocket 需要在手机浏览器操作，无法在电脑端导入。", 
            icon: "warning",
            showCancelButton: true, 
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "继续导入", 
            cancelButtonText: "取消",
        }).then((result) => {
            if (result.value) {
            let tmp = window.btoa(url);
            window.location.href = jumpurl + tmp;
            }
        }) 
    }else{
        Swal.fire({ 
            title: "提示", 
            text: "请确认您是否下载了Shadowrocket软件，导入失败请使用Safari导入。", 
            icon: "warning",
            showCancelButton: true, 
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "继续导入", 
            cancelButtonText: "取消",
        }).then((result) => {
            if (result.value) {
            let tmp = window.btoa(url);
            window.location.href = jumpurl + tmp;
            }
        })
    }
}

//余额充值
var pid = 0;
$("#code-update").click(function () {
  var price = parseFloat($("#amount").val());
  var type = $('input:radio:checked').val();
  console.log("将要使用 "+ type + " 充值" + price + "元");
  if (isNaN(price)) {
      Swal.fire('充值失败', "非法的金额!", 'error');
      return;
  }
  Swal.fire('充值中...', "充值中...", 'success');
  if (type == "paypal") {
    $.ajax({
          'url': "/user/payment/paypal_purchase",
          'data': {
              'price': price
          },
          'dataType': 'json',
          'type': "POST",
          success: function (data) {
              console.log(data);
              if(data.errcode==-1){
                Swal.fire('充值失败', data.errmsg, 'error');
              }
              if (data.errcode == 0) {
                  pid = data.pid;
                  window.location.href = data.url;
                  setTimeout(f, 1000);
              }
          }
      });
  }else{
    $.ajax({
          'url': "/user/payment/purchase",
          'data': {
              'price': price,
              'type': type,
          },
          'dataType': 'json',
          'type': "POST",
          success: function (data) {
              console.log(data);
              if(data.errcode==-1){
                Swal.fire('充值失败', data.errmsg, 'error');
              }
              if (data.errcode == 0) {
                  pid = data.pid;
                  window.location.href = data.url;
                  setTimeout(f, 1000);
              }
          }
      });
  }
})

function f(){
    $.ajax({
        type: "POST",
        url: "/payment/status",
        dataType: "json",
        data: {
            pid:pid
        },
        success: function (data) {
            if (data.result) {
                console.log(data);
                Swal.fire('充值成功', "充值成功", 'success');
                window.setTimeout("location.href=window.location.href", 1200);
            }
        },
        error: function (jqXHR) {
            console.log(jqXHR);
        }
    });
    tid = setTimeout(f, 1000); //循环调用触发setTimeout
}

//卡密充值
function cardCZ(){
    var cardcode = $('#card-code').val();
    if (cardcode == ""){
        Swal.fire('充值失败', "卡密不能为空!", 'error');
        return;
    }
    $.ajax({
        type: "POST",
        url: "code",
        dataType: "json",
        data: {
            code: $("#code").val()
        },
        success: function (data) {
            if (data.ret) {
                Swal.fire('充值成功', data.msg, 'success');
                window.setTimeout("location.href='/user'", 3000);
            } else {
                Swal.fire('充值失败', data.msg, 'error');
            }
        },
        error: function (jqXHR) {
            Swal.fire('充值失败', "发生错误：" + jqXHR.status, 'error');
        }
    })
}

//CDKEY兑换
function useCdkey(){
    var cdkey = $('#cdkey-code').val();
    if (cdkey == ""){
        Swal.fire('兑换失败', "cdkey不能为空!", 'error');
        return;
    }
    $.ajax({
        type: "POST",
        url: "/user/cdkey_use",   
        dataType: "json",
        data: {
            cdkey: cdkey
        },
        success: function (data) {
        if (data.ret) {
            Swal.fire('兑换成功', data.msg, 'success');
            window.setTimeout("location.href='/user'", 3000);
        } else {
            Swal.fire('兑换失败', data.msg, 'error');
        }
        },
        error: function (jqXHR) {
            Swal.fire({
            icon: 'error',
            title: '出现错误',
            showCloseButton: true,
            text: data.msg
        })
        }
    })
}

//商店界面
function ConfirmBuy(shopid){
    $('#main-page').hide();
    $('#buy-page').show();
    $.ajax({
        type: "POST",
        url: "/user/shop/getshopinfo",
        dataType: "json",
        data: {
            shopid: shopid
        },
        success: function (data) {
          if (data.ret) {
            shop.id = data.id;
            $("#shop_name").html(data.name);
            $("#class").html(data.class);
            $("#class_expire").html(data.class_expire);
            $("#bandwidth").html(data.bandwidth);
            $("#connector").html(data.connector);
            $("#speedlimit").html(data.speedlimit);
            $("#price").html("￥" + data.price);
            balance = (money - data.price).toFixed(2);
            $("#balance").html("￥" + balance);
            if (balance < 0 ){
                $("#pay-confirm").attr("disabled", "disabled");
            }
          } else {
            Swal.fire('错误', '参数获取错误', 'error');
          }
        },
        error: function (jqXHR) {
            Swal.fire('错误', '系统错误', 'error');
        }
    })
}

function hideFeedback(e_id) {
    $('#' + e_id).hide()
}
var shop = {
    'id': '1'
};

function backToShop() {
    $('#buy-page').hide();
    $("#pay-confirm").removeAttr("disabled");
    $("#coupon-code").val("");
    $('#coupon-btn').html('<i class="fas fa-tag"></i> 使用优惠码');
    $('#coupon-feedback').hide();
    $('#main-page').show();
}
function updateCoupon() {
    if ($("#coupon-code").val() == '') {
        $('#coupon-feedback').text('请输入优惠码');
        $('#coupon-feedback').show();
        return false
    }
    $.ajax({
        type: "POST",
        url: "coupon_check",
        dataType: "json",
        data: {
            coupon: $("#coupon-code").val(),
            shop: shop.id
        },
        success: (data) => {
        if (data.ret) {
            $("#price").html("￥" + data.total);
            balance = (money - data.total).toFixed(2);
            if (balance >= 0 ){
                $("#pay-confirm").removeAttr("disabled");
            }
            $("#balance").html("￥" + balance);
            $('#coupon-btn').html('<i class="fas fa-tag"></i> 当前优惠码: ' + $("#coupon-code").val());
            $('#coupon-modal-new').modal('hide');
        } else {
            $('#coupon-feedback').text(data.msg);
            $('#coupon-feedback').show();
        }
        }
    })
};

function cancelCoupon() {
    $("#coupon-code").val("");
    $('#coupon-btn').html('<i class="fas fa-tag"></i> 使用优惠码');
    $('#coupon-feedback').hide();
}

$('#pay-confirm').click(function () {
	if(!document.getElementById('cofirm-tos').checked)
	{
		Swal.fire('购买提示', '请先同意用户协议及确认已读购买须知', 'info');
		return;
	}
    if(document.getElementById('auto-renew').checked)
	{
		var autorenew=1;
	}
	else
	{
		var autorenew=0;
	}
    $.ajax({
        type: "POST",
        url: "buy",
        dataType: "json",
        data: {
          coupon: $("#coupon-code").val(),
          shop: shop,
          autorenew: autorenew,
          disableothers: 1
        },
        success: function (data) {
          if (data.ret) {
            Swal.fire('购买成功', data.msg, 'success');
            window.setTimeout("location.href='/user'", 1200);
          } else {
            Swal.fire('购买失败', data.msg, 'error');
          }
        },
        error: function (jqXHR) {
            Swal.fire('购买失败',data.msg+"  发生了错误。", 'error');
        }
    })
})

//流量包
function buyTrafficPackage(){
    $.ajax({
      type: "POST",
      url: "buytrafficpackage",
      dataType: "json",
      data: {
          check: 'true'
      },
      success: function (data) {
        if (data.ret) {
            Swal.fire('购买成功', data.msg, 'success');
            window.setTimeout("location.href='/user/shop'", 1000);
        } else {
            Swal.fire('购买失败', data.msg, 'error');
        }
      },
      error: function (jqXHR) {
        Swal.fire({
          icon: 'error',
          title: '出现错误',
          showCloseButton: true,
          text: data.msg
        })
      }
    })
}

//节点信息
var ssrNode = {
    ret: 0
};

function goTop(){
window.location.href="/user/subscribe_set"; 
}


$().ready(function () {
$('.ssr-link,.ssr-qr,.ssr-config').click(function () {
    if(!ssrNode.hasOwnProperty('link') || !ssrNode.link){
        Swal.fire('错误', '节点信息正在加载中，请关闭对话框后重试', 'info');
        return false;
    }

    //var index = Math.floor($('.ssr-link,.ssr-qr,.ssr-config').index(this) / 3);
    var name = $($(this).parents(".widget")[0]).find("h6").attr('nodeid');
    var index = -1;
    ssrNode.config.forEach(function (val, id) {
        if (val['nodeid'] == name) {
            index = id;
            return false;
        }
    })

    if (index < 0) {
        Swal.fire('查看失败', '抱歉，您的等级无法使用该节点', 'error');
        return;
    }
    var _this = this;

    Swal.fire({
        title: '使用订阅链接来获取节点',
        text: "使用订阅链接可以自动更新节点配置，无需手动更新",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '好的, 我试试!',
        cancelButtonText: '不，我就是要一个一个添加!',
        reverseButtons: true,
        allowEscapeKey:false,
        allowOutsideClick:false
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            goTop()
        } else {
            Swal.fire({
                title: '注意事项',
                html: "节点IP可能会更换，更换后，您需要到官网再添加一次<br>新节点不会自动添加到你的设备上<br>",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '我已知晓',
                cancelButtonText: '使用订阅链接添加',
                reverseButtons: true,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    if ($(_this).hasClass('ssr-link')) {
						$('#ssrInfo').css('text-align','center'); // text in center
                        $('#ssrInfo').html(ssrNode.link[index]);
                        $('#ssrinfomoal').modal();
                    } else if ($(_this).hasClass('ssr-qr')) {
                        $('#ssrInfo').text('');
						$('#ssrInfo').css('text-align','center'); // text in center
                        $('#ssrInfo').qrcode({
                            "text": ssrNode.link[index]
                        });
                        $('#ssrinfomoal').modal();
                    } else {
						$('#ssrInfo').css('text-align','left'); // text in left
						$('#ssrInfo').jsonViewer(ssrNode['config'][index],{rootCollapsable: false,withLinks: false});
                        $('#ssrinfomoal').modal();
                    }
                }else{
                    goTop()
                }
            })
        }
    })
})
})

//订阅自定义是否开启
function subset(){
    var set = $("#subset").val();
    if (set == 'true') {
      var checksub = false;
    }else{
      var checksub = true;
    }
    $.ajax({
        type: "POST",
        url: "/user/checksub",
        dataType: "json",
        data: {
            checksub: checksub
        },
        success: function (data) {
            Swal.fire({
              icon: 'success',
              title: '设置成功',
              text: data.msg
            })
            window.setTimeout("location.href='/user/subscribe_set'", 1200);
        },
        error: function (jqXHR) {
            Swal.fire({
              icon: 'error',
              title: '设置失败',
              text: "发生错误：" + jqXHR.status
            })
        }
    })
  }
  //订阅自定义
  function Checkset(){
    var nodeList = $('input[name="node"]');//选择框列表
    var id = [];
    for(k in nodeList){
        if(nodeList[k].checked)
            id.push(nodeList[k].value);
    }
    console.log(id);
    $.ajax({
        type: "POST",
        url: "sub_set",
        dataType: "json",
        data: {
             "nodeid": id
        },
        success: function (data) {
            if (data.ret) {
                Swal.fire('设置成功', '设置成功', 'success');
                window.setTimeout("location.href='/user/subscribe_set'", 1200);
            } else {
                Swal.fire('设置失败', data.msg, 'error');
            }
        },
        error: function (jqXHR) {
            Swal.fire('设置失败', data.msg+"出现了一些错误。", 'error');
        }
    })
  }

  //自助升级
function Difference(){
    $.ajax({
        type: "POST",
        url: "difference",
        dataType: "json",
        data: {
            passwd: $("#password").val()
        },
        success: function (data) {
            if (data.ret) {
                Swal.fire('升级成功', data.msg, 'success');
            } else {
                Swal.fire('升级失败', data.msg, 'error');
            }
        },
        error: function (jqXHR) {
            Swal.fire('升级失败', data.msg+"出现了一些错误。", 'error');
        }
    })
}
//自助重置
function Resettraffic(){
    $.ajax({
        type: "POST",
        url: "resettraffic",
        dataType: "json",
        data: {
            passwd: $("#passwd").val()
        },
        success: function (data) {
            if (data.ret) {
                Swal.fire('重置成功', data.msg, 'success');
            } else {
                Swal.fire('重置失败', data.msg, 'error');
            }
        },
        error: function (jqXHR) {
            Swal.fire('重置失败', data.msg+"出现了一些错误。", 'error');
        }
    })
}
//注销账号
function Kill(){
  $.ajax({
      type: "POST",
      url: "kill",
      dataType: "json",
      data: {
          passwd: $("#passwd").val(),
      },
      success: function (data) {
          if (data.ret) {
            Swal.fire('注销成功', data.msg, 'success');
            window.setTimeout("location.href='/'", 1200);
          } else {
            Swal.fire('注销失败', data.msg, 'error');
          }
      },
      error: function (jqXHR) {
        Swal.fire('注销成功', "发生错误：" + jqXHR.status + data.msg, 'success');
      }
  })
}
//随机连接密码
var pasArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
function Randomsspwd(){
  var password = '';
  var pasArrLen = pasArr.length;
  for (var i=0; i<10; i++){
  var x = Math.floor(Math.random()*pasArrLen);
  password += pasArr[x];
  }
  $('#ss-password').val(password);
}
//账号密码修改
$("#pwd-update").click(function () {
    $.ajax({
        type: "POST",
        url: "password",
        dataType: "json",
        data: {
            oldpwd: $("#oldpwd").val(),
            pwd: $("#pwd").val(),
            repwd: $("#repwd").val()
        },
        success: function (data) {
            if (data.ret) {
                Swal.fire('设置成功', data.msg, 'success');
                window.setTimeout("location.href='/user/edit'", 1200);
            } else {
                Swal.fire('设置失败', data.msg, 'error');
            }
        },
        error: function (jqXHR) {
            Swal.fire('设置失败', data.msg+"出现了一些错误。", 'error');
        }
    })
})
//ss密码修改
$("#ss-pwd-update").click(function () {
    $.ajax({
        type: "POST",
        url: "sspwd",
        dataType: "json",
        data: {
            sspwd: $("#ss-password").val()
        },
        success: function (data) {
            if (data.ret) {
                Swal.fire('设置成功', "密码修改成功", 'success');
                window.setTimeout("location.href='/user/edit'", 1200);
            } else {
                Swal.fire('设置失败', data.msg, 'error');
            }
        },
        error: function (jqXHR) {
            Swal.fire('设置失败', data.msg+"出现了一些错误。", 'error');
        }
    })
})
//端口重置
function Portreset(){
  $.ajax({
      type: "POST",
      url: "resetport",
      dataType: "json",
      success: function (data) {
          if (data.ret) {
            Swal.fire('重置成功', "重置成功，新端口是"+data.msg, 'success');  
            window.setTimeout("location.href='/user/edit'", 1200);
          } else {
            Swal.fire('重置失败', data.msg, 'error');
          }
      },
      error: function (jqXHR) {
        Swal.fire('重置失败', data.msg+"出现了一些错误。", 'error');
      }
  })
}
//TG解绑
function TGreset(){
  window.setTimeout("location.href='/user/telegram_reset'", 100);
}
//创建工单
function createTicket(){
    $.ajax({
        type: "POST",
        url: "/user/ticket",
        dataType: "json",
        data: {
            content: $("#ticket-content").val(),
            title: $("#title").val(),
            time: new Date().getTime()
        },
        success: function (data) {
            if (data.ret) {
                Swal.fire('提交成功', data.msg, 'success');
                window.setTimeout("location.href='/user/ticket'", 1200);
            } else {
                Swal.fire('提交失败', data.msg, 'error');
            }
        },
        error: function (jqXHR) {
            Swal.fire('提交失败', "发生错误：" + jqXHR.status, 'error');
        }
    });
}
//邀请返利
$(".reset-invite").click(function () {
    Swal.fire('重置成功', "已重置您的邀请链接，复制您的邀请链接发送给其他人！", 'success');
    window.setTimeout("location.href='/user/inviteurl_reset'", 1200);
});
$("#custom-invite-confirm").click(function () {
  $.ajax({
      type: "POST",
      url: "/user/custom_invite",
      dataType: "json",
      data: {
          customcode: $("#custom-invite-link").val(),
      },
      success: (data) => {
          if (data.ret) {
            Swal.fire('设置成功', data.msg, 'success');
            window.setTimeout("location.href='/user/invite'", 1200);
          } else {
            Swal.fire('设置失败', data.msg, 'error');
          }
      },
      error: function (jqXHR) {
        Swal.fire('设置失败', "发生错误：" + jqXHR.status, 'error');
      }
  })
});

//删除登录记录
function DelLoginLog(){
    $.ajax({
        type:"POST",
        url:"/user/delloginlog",
        dataType:"json",
        success:function(data){
        if(data.ret){
            Swal.fire('删除成功', data.msg, 'success');
            window.setTimeout("location.href=window.location.href", 1200);
        }else{
            Swal.fire('删除失败', data.msg, 'error');
        }
        },
        error:function(jqXHR){
            Swal.fire('删除失败', data.msg, 'error');
        }
    });  
}
//购买记录
function Closerew(id) {
    deleteid=id;
    $("#closerew_modal").modal();
}

function Deleterew_input(){
    $.ajax({
        type:"DELETE",
        url:"/user/bought",
        dataType:"json",
        data:{
        id: deleteid
        },
        success:function(data){
        if(data.ret){
            Swal.fire('关闭成功', data.msg, 'success');
            window.setTimeout("location.href=window.location.href", 1200);
        }else{
            Swal.fire('关闭成功', data.msg, 'error');
        }
        },
        error:function(jqXHR){
            Swal.fire('关闭成功', data.msg, 'error');
        }
    });
}

//上传头像
function UploadAvatar(){
    var formData = new FormData(); 
    formData.append('file', $('#user_avatar')[0].files[0]); //添加图片信息的参数
    if(!$('#user_avatar')[0].files[0]){
        $("#message").text("请先选择图片");
        return;
    }
    var fileSize = $("#user_avatar")[0].files[0].size/(1024*1024);
    if(fileSize>3){
        $("#message").text("上传单个文件大小不能超过3MB!");
        return false;
    }
    $('#upload_avatar').html('<button type="button" class="btn disabled btn-primary btn-progress">上传中</button>');
    $.ajax({
        url: "/user/upload/avatar",
        type: 'POST',
        cache: false, //上传文件不需要缓存
        data: formData,
        dataType:"json",
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        success: function (data) {
            if (data.ret) {
                $("#message").text("上传成功,未改变请清空浏览器缓存");
                Swal.fire('设置成功', '设置成功', 'success');
                $("#user_avatar_default").attr("src", data.src);
                $('#upload_avatar').html('<button type="button" class="btn disabled btn-primary">设置成功</button>');
            } else {
                Swal.fire('设置失败', data.msg, 'error');
            }
        },
            error: function (jqXHR) {
                Swal.fire('设置失败', data.msg, 'error');
        }
    });
}

//积分商城
function exchange(type,value){
    Swal.fire({
    title: '确认兑换吗?',
    text: '一旦确认将直接扣除您的积分,增加相应的服务',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    reverseButtons: true,
    allowEscapeKey:false,
    allowOutsideClick:false
  })
  .then((Confirm) => {
    if (Confirm.value) {
      $.ajax({
        type: "POST",
        url: "/user/redeem",
        dataType: "json",
        data: {
          type: type,
          value: value
        },
        success: function (data) {
          if (data.ret) {
            Swal.fire('兑换成功', data.msg, 'success');
            window.setTimeout("location.href='/user/interal'", 1200);
          } else {
            Swal.fire('兑换失败', data.msg, 'error');
          }
        },
        error: function (jqXHR) {
            Swal.fire('兑换失败',data.msg+"  发生了错误。", 'error');
        }
      })
    }
  });
}

// Global
$(function() {
    //console.log(window.location.href);
    var url = ((document.location.toString()).split("#")[0]).split('?')[0];
    var user_location = ((url.split("//")[1]).split("/"));
    var current = '';
    if (user_location.length == 2) {
      current = $(".menu-categories a[href$='/user']");
    } else if (user_location.length >= 3) {
      if (user_location[2] == 'ticket' || user_location[2] == 'profile' || user_location[2] == 'edit' || user_location[2] == 'invite' || user_location[2] == 'interal' || user_location[2] == 'activity' || user_location[2] == 'leaderboard' || user_location[2] == 'unlock_info') {
        current = $(".menu-categories a[href$='#more']");
        current.addClass('has-dropdown');
      } else if (user_location[2] == 'trafficlog' || user_location[2] == 'bought' || user_location[2] == 'subscribe_log' || user_location[2] == 'maintain_log' || (user_location[2] == 'detect' && user_location[3] == 'log')) {
        current = $(".menu-categories a[href$='#recording']");
        current.addClass('has-dropdown');
      }else {
        var query_str = ".menu-categories a[href$='/user/" + user_location[2] + "']";
        current = $(query_str);
      }
    }
    current.parent().addClass('active');
    //console.log(user_location, current)
})
// tooltip
$("[data-toggle='tooltip']").tooltip();