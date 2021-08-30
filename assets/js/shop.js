function subscribePlan(plan) {
	$('#main-page').hide();
	$('#buy-page').show();
	selectItem('plan', plan);
}
function selectItem(class_name, plan_name) {
	;$('#' + class_name + '-selection .active').removeClass('active');
	$('#' + plan_name).addClass('active');
	if (class_name == 'plan') {
		$.ajax({
			'type': 'GET',
			'url': 'shop/getplantime',
			'dataType': 'json',
			'data': {
				'num': plan_name
			},
			'success': function (data) {
				if (data.ret) {
					plan_time = data.plan_time;
					if (!plan_time.includes('1month')) {
						$('#1month').hide();
					} else {
						$('#1month').show();
					}
					if (!plan_time.includes('3month')) {
						$('#3month').hide();
					} else {
						$('#3month').show();
					}
					if (!plan_time.includes('6month')) {
						$('#6month').hide();
					} else {
						$('#6month').show();
					}
					if (!plan_time.includes('12month')) {
						$('#12month').hide();
					} else {
						$('#12month').show();
					}
				}
			}
		});
	}
	updateCheckoutInfo();
}
function updateCheckoutInfo() {
	console.log('############## 更新商品信息  ##############');
	var plan = $('#plan-selection .active').attr('id');
	var time = $('#time-selection .active').attr('id');
	var payment = $('#payment-selection .active').attr('id');
	$.ajax({
		'type': 'GET',
		'url': 'shop/getplaninfo',
		'dataType': 'json',
		'data': {
			'num': plan, 
			'time': time
		},
		'success': function (data) {
			if (data['ret']) {
				shop = {};
				shop.id = data.id;
				shop.name = data.name;
				shop.price = data.price;
				var aging = ['1month', '3month', '6month', '12month'];
				if (data['id'] == 0 || data['id'] == '0') {
					console.log('id=0, active next plan time', aging['indexOf'](time));
					selectItem('time', aging[aging['indexOf'](time) + 1]);
					updateCheckoutInfo();
					return 0;
				}
				console.log('商品信息', data);
				var _0x5df88f = (coupon.credit / 0x64 * shop.price).toFixed(0x2);
				var _0xca583a = (data['price'] - _0x5df88f).toFixed(0x2);
				console.log('打折的金额：', _0x5df88f);
				console.log('打折后的总价', _0xca583a);
				if (coupon.code != '') {
					if (coupon.shop.indexOf(data['id'].toString()) == -1 && coupon.shop[0] != '') {
						_0xca583a = data['price'];
						console.log('优惠码不适用：', coupon.code);
					}
				}
				console.log('用户余额：', userMoney);
				var _0x26ebd4 = 0;
				if (_0xca583a - userMoney > 0) {
					_0x26ebd4 = (_0xca583a - userMoney).toFixed(0x2);
					$('#account-money').text('¥ -' + userMoney);
				} else {
					$('#account-money').text('¥ -' + _0xca583a);
				}
				console.log('还需要支付的金额：', _0x26ebd4);
				if (coupon.code != '') {
					$('#coupon-row').show();
					$('#coupon-money').text('¥ -' + _0x5df88f);
					shop.price = _0xca583a;
					if (coupon.shop.indexOf(data['id'].toString()) == -1 && coupon.shop[0] != '') {
						$('#coupon-money').text('不适用于此商品');
					}
				}
				$('#shop-name').text(shop.name);
				$('#total').text('¥\x20' + data['price']);
				$('#pay-amount').text('¥\x20' + _0x26ebd4);
			}
			console.log('############## 更新商品信息 END  ##############');
		}
	});
}
function buyConfirm(shopid) {
	console.log(confirmShop);
	$.ajax({
		'type': 'POST',
		'url': 'buy',
		'dataType': 'json',
		'data': {
			'coupon': coupon.code,
			'shop': shopid,
			'autorenew': confirmShop.autorenew,
			'disableothers': 1
		},
		'success': function (data) {
			if (data['ret']) {
				Swal.fire('购买成功', data.msg, 'success');
				window.setTimeout("location.href='/user'", 1200);
			} else {
				Swal.fire('发生错误', data['msg'], 'error');
			}
		},
		'error': function (jqXHR) {
			Swal.fire('发生错误', '请联系客服', 'error');
		}
	});
}
var pid = 0;
function payBalance(price, type) {
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
				  window.open(data.url);
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
				  window.open(data.url);
			  }
		  }
	  });
  }
}
function topUp(price, type) {
	payBalance(price,type);
	tid = setTimeout(getmoney, 1000);

	function getmoney() {
		$.ajax({
			'type': 'GET',
			'url': '/user/money',
			'dataType': 'json',
			'async': false,
			'success': function (data) {
				if (data['ret']) {
					console.log(confirmShop);
					if (parseFloat(data['money']) >= parseFloat(confirmShop.price)) {
						clearTimeout(tid);
						buyConfirm(confirmShop.id);
					}
				}
			},
			'error': function (_0x4d4556) {
				console.log(_0x4d4556);
			}
		});
		tid = setTimeout(getmoney, 1000);
	}
}
function payConfirm(type){
	if(!document.getElementById('cofirm-tos').checked)
	{
		Swal.fire('购买提示', '请先同意用户协议及确认已读购买须知', 'info');
		return;
	}
	$.ajax({
		'type': 'GET',
		'url': 'shop/getplaninfo',
		'dataType': 'json',
		'data': {
			'num': $('#plan-selection .active').attr('id'),
			'time': $('#time-selection .active').attr('id')
		},
		'success': function (res) {
			if (res.ret) {
				console.log('当前coupon为：', coupon);
				if (coupon.code != '' && coupon.shop[0] != '' && coupon.shop.indexOf(res.id.toString()) == -1) {
					Swal.fire('发生错误', '此优惠码不适用于此商品', 'error');
					return false;
				}
				console.log('planinfo：', res);
				confirmShop.id = res.id;
				confirmShop.price = res.price;
				if (coupon.code != '') {
					var _0xefecf3 = (coupon.credit / 0x64 * res.price).toFixed(0x2);
					console.log('打折的金额为：', _0xefecf3);
					var _0x4a5f16 = (res.price - _0xefecf3).toFixed(0x2);
					console.log('折后总价为：', _0x4a5f16);
					confirmShop.price = _0x4a5f16;
				}
				if(document.getElementById('auto-renew').checked)
				{
					confirmShop.autorenew = 1;
				}
				else
				{
					confirmShop.autorenew = 0;
				}
				;shop = {};
				shop.id = res.id;
				shop.name = res.name;
				shop.price = res.price;
				var need_to_pay_price = (confirmShop.price - userMoney).toFixed(0x2);
				console.log('confirShop的值为：', confirmShop);
				console.log('用户余额为：', userMoney);
				console.log('need_to_pay_price的值为：', need_to_pay_price);
				if (type != 'balance') {
					if (need_to_pay_price <= 0 ) {
						Swal.fire('购买提示', '余额充足，请直接点击余额支付', 'info');
						return;
					} else {
						topUp(need_to_pay_price, type);
					}
				}else{
					if (need_to_pay_price <= 0 ) {
						buyConfirm(confirmShop.id);
					} else {
						Swal.fire('购买提示', '余额不足，请先充值或在线付款', 'info');
						return;
					}
				}
				console.log('############## 按下立即支付按钮 END  ##############');
			} else {
				return;
			}
		}
	});
}
function updateCouponR() {
	if ($('#coupon-code').val() == '') {
		$('#coupon-feedback').text('请输入优惠码');
		$('#coupon-feedback').show();
		return false;
	}
	$.ajax({
		'type': 'POST',
		'url': 'coupon_check',
		'dataType': 'json',
		'data': {
			'coupon': $('#coupon-code').val(), 
			'shop': shop.id
		},
		'success': data => {
			if (data.ret) {
				coupon = {};
				coupon.code = $('#coupon-code').val();
				coupon.onetime = data.onetime;
				coupon.shop = data.shop.split(',');
				coupon.credit = data.credit;
				$('#coupon-selection').html('<button class="btn btn-outline-success">当前优惠码: ' + coupon.code + '</button>');
				updateCheckoutInfo();
			} else {
				$('#coupon-feedback').text(data.msg);
				$('#coupon-feedback').show();
			}
		}
	});
};

function cancelCouponR() {
	coupon = {};
	coupon.code = '';
	coupon.onetime = 1;
	coupon.shop = [''];
	coupon.credit = 0;
	$('#coupon-code').val('');
	$('#coupon-btn').html('<i class="fas fa-tag"></i> 使用优惠码');
	$('#coupon-feedback').hide();
}
function backToShop() {
	$('#buy-page').hide();
	$('#main-page').show();
}