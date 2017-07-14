
$(function(){
	//send弹出层选项卡---------------------------------
	$('#send').hover(function(){//鼠标经过时改变自身样式，并将box显示
		$(this).siblings('.box').show();
		$(this).css('border-bottom','1px solid #fff')
	},function(){
		$(this).siblings('.box').hide();
		$(this).css('border-bottom','1px solid #ccc')
	});
	$('#send').siblings('.box').hover(function(){//box的鼠标事件
		$(this).show();
		$('#send').css('border-bottom','1px solid #fff');
		$('#send').find('b').css('top',2);//箭头向上	
		//选项卡
		$(this).children('.list').children('li').click(function(){
			$(this).addClass('ac').siblings().removeClass('ac');
			$(this).parent().siblings('.box_cont').children('ul').eq($(this).index()).removeClass('hide').siblings().addClass('hide')
		});
	},function(){
		$(this).hide();//移除时隐藏
		$('#send').css('border-bottom','1px solid #ccc');
		$('#send').find('b').css('top',-7);//箭头向下
	});
	
	//左侧图片切换----------------------------------------------
	
	(function(){
		var n=0;
		$('.pic .sma_pic li').click(function(){
			showPic($(this).index());
			n=$(this).index();
		});
		$('.pic .sma_pic .left').click(function(){
			n--;
			if(n==-1)n=4;
			showPic(n);
		});
		$('.pic .sma_pic .right').click(function(){
			n++;
			if(n==5)n=0;
			showPic(n);
		});
		function showPic(n){
			$('.pic .sma_pic li').eq(n).addClass('ac').siblings().removeClass('ac');
			$('.pic .big_pic a').eq(n).removeClass('hide').siblings().addClass('hide');
			$('.pic .enlarge a').eq(n).removeClass('hide').siblings().addClass('hide');
		};
	})();
	//放大镜---------------------------------------------------
	(function(){
		var span=$('.pic .big_pic span');
		var box1=$('.pic .big_pic');
		var box2=$('.pic .enlarge');
		box1.hover(function(){
			span.show();
			box2.show();	
		},function(){
			span.hide();
			box2.hide();
		})
		box1.mousemove(function(ev){
			//获取span偏移量
			var l=ev.pageX-$(this).offset().left-span.width()/2;
			var t=ev.pageY-$(this).offset().top-span.height()/2;
			//限制span范围
			if(l<0)l=0;
			if(t<0)t=0;
			var l_max=$(this).width()-span.width();
			var t_max=$(this).height()-span.height();
			if(l>l_max)l=l_max;
			if(t>t_max)t=t_max;
			//移动span和img的位置
			span.css({'left':l,'top':t});
			//放大倍率
			var rate=box2.width()/span.width();	
			$('.pic .enlarge img').css({'left':-l*rate,'top':-t*rate})
		});
	})();

	//选择样式切换---------------------------------------------------
	$.fn.choice=function(){//创建choice方法
		var _this=$(this)
		return this.each(function(){
			var n=null;
			_this.find('li').click(function(){//点击时添加ac，并记录索引值
				$(this).addClass('ac').siblings().removeClass('ac');
				n=$(this).index();	
			});
			_this.find('li').hover(function(){//鼠标经过时，经过的li和选中的li添加ac
				$(this).addClass('ac').siblings().removeClass('ac');
				_this.find('li').eq(n).addClass('ac');
			},function(){
				_this.find('li').eq(n).addClass('ac').siblings().removeClass('ac');
			});
		});
	};
	$('#ch_color').choice();//分别调用choice方法
	$('#ch_suit').choice();
	$('#ch_stages').choice();
	//改变价格----------------------------------------
	(function(){
		//数组内容为12种价格，对应12个li
		var arr=[ 149.00 , 150.00 , 139.00 , 128.00 , 118.00 , 188.00 , 238.00 , 199.00 , 218.00 , 88.00 , 98.00 , 328.00 ];
		var price=arr[0];	//初始价格为数组第一个
		var color=0;	//记录所选样式的索引值
		var suit=0;		//记录套餐的索引值
		//点击时记录索引值，并改变对应的价格
		$('#ch_color li').click(function(){
			color=$(this).index();
			price=arr[color]+10*suit;	//价格=数组中对应的价格+套餐增加的价格(从左往右依次+10)
			$('#price').text(price.toFixed(2));
		});
		$('#ch_suit li').click(function(){
			suit=$(this).index();;
			var num=arr[color]+10*suit;
			$('#price').text(num.toFixed(2))
		});
	})();
	//数量加减---------------------------------------------------------
	(function(){
		var num=1;
		$('#add').click(function(){//点击+号时，内容数量+1
			num++;
			$('#num_inner').text(num);
			$('#sub').prop('disabled',false);//减号按钮变为可点击，鼠标变为手型
			$('#sub').css('cursor','pointer');
		})
		$('#sub').css('cursor','default');
		$('#sub').click(function(){
			num--;
			if(num==1){
				$(this).prop('disabled',true);//数量变回1时，减号按钮不可点击，鼠标变回默认样式
				$('#sub').css('cursor','default');
			}
			$('#num_inner').text(num);
		})
		$('#num_inner').text(num);
	})();
	
	
	//选项卡--------------------------------------------------------------
	$('#tab .tabList li').click(function(){
		$(this).addClass('ac').siblings().removeClass('ac');
		$('#tab .tabCont ul').eq($(this).index()).removeClass('hide').siblings().addClass('hide');
	});

	//标题跳动------------------------------------------------------------------
	(function(){
		var n=2;
		setInterval(function(){
			n*=-1;
			$('#jump').css('top',n)
		},400);
	})();
	

})