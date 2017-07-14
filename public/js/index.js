// JavaScript Document

$(function(){
	
	//-轮播图-----------------------------------------
	$('#pic_roll .pic').cycle({ 
		fx:'fade',
		speed:1000,
		pause:true,
		timeout:1000,
		prev:"#pic_roll .prevBtn",
		next:"#pic_roll .nextBtn",
		pager:"#pic_roll .sliderBtn",
		showSlideNum:true, 
	});
	//鼠标移入显示左右切换按钮
	$('#pic_roll').hover(function(){
		$(this).children('.prevBtn').show();
		$(this).children('.nextBtn').show();	
	},function(){
		$(this).children('.prevBtn').hide();
		$(this).children('.nextBtn').hide();
	});
	//鼠标经过时变色
	$('#pic_roll .nextBtn').hover(function(){
		$(this).css('opacity',.8);
	},function(){
		$(this).css('opacity',.4);
	});
	$('#pic_roll .prevBtn').hover(function(){
		$(this).css('opacity',.8);
	},function(){
		$(this).css('opacity',.4);
	});
	//选项卡---------------------------------------------------
	$.fn.run=function(){
		var _this=$(this)
		return this.each(function(){
			_this.children('.top').find('li').click(function(){
				$(this).addClass('red').siblings().removeClass('red');
				_this.children('.bot').eq($(this).index()).removeClass('bot_none').siblings().not('.top').not('.cov_bot').addClass('bot_none');
			});
		});
	};//创建run方法，循环调用
	for(var i=0;i<$('.cont').length;i++){
		$('.cont').eq(i).run()
	}

	//屏幕滚动动画/左侧图标---------------------------------------------------
	
	(function(){
		var cont=$('.cont');
		$(window).scroll(function(){//屏幕滚动时显示
		
			//窗口高度的一半
			var h=$(this).height()/2;	
			//计算屏幕滚动距离，屏幕中心线位于哪个区域，对应的图标变色
			var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
			var scr_top=scrollTop+h;
			//左侧图标的显示范围
			var scr_min=cont.eq(0).offset().top;
			var scr_max=$('.footer').offset().top;
			
			if(scr_top>scr_min && scr_top<scr_max){
					//得到索引值，为对应的添加类
					for(var i=0;i<cont.length;i++){
						if(cont.eq(i).offset().top<scr_top)	{
							n=i;	
						};
					};
				
				$('.elevator').show();
				$('.elevator li').eq(n).addClass('ac').siblings().removeClass('ac');
			}else{//超出范围时隐藏，移除所有类
				$('.elevator').hide();
				$('.elevator li').removeClass('ac');
					
			}	
		});
		
		$('.elevator li').hover(function(){//左侧图标的hover事件
			$(this).addClass('ac').siblings().removeClass('ac');
			$('.elevator li').eq(n).addClass('ac');	
		},function(){
			$(this).removeClass('ac');
			$('.elevator li').eq(n).addClass('ac');	
		});
		var n;
		
		for(var i=0;i<cont.length;i++){//循环绑定动画
			$('.elevator li').eq(i).click(function(){
				n=$(this).index();
				var top=cont.eq($(this).index()).offset().top;
				$('body,html').animate({scrollTop:top}, 500)	
			});	
		};
	})();

	//二级菜单------------------------------------------------------
	
	(function(){
		var aLi=$('#nav .left_nav li');
		var level=$('#nav .sec_level .level_nav');
		aLi.hover(function(){//鼠标移入时改变自身样式，显示二级菜单
			level.eq($(this).index()).show().siblings().hide();
			$(this).addClass('ac').siblings().removeClass('ac');
		},function(){
			level.eq($(this).index()).hide();
			$(this).removeClass('ac');	
		});
		level.hover(function(){//移入二级菜单时显示自身，保持对应的一级菜单的样式
			aLi.eq($(this).index()).addClass('ac');
			$(this).show();	
		},function(){
			aLi.eq($(this).index()).removeClass('ac');
			$(this).hide();		
		});
	})()

	//线条动画--------------------------------------------------------------
	$('#box_like').mouseenter(function(){
		//将线条所在的span重置于最左侧，触发事件时，使用动画移动到右侧
		$('#box_like .line span').css('left',0);
		$('#box_like .line span').stop().animate({'left':845},300);
	});
	
	//右侧图标功能区---------------------------------------------------------
	$('#cont_box').mouseenter(function(){
		//点击叉号解除绑定事件，进入父级时再次绑定
		$('#cont_box .slide').mouseover(function(){

			//功能区从底部划出
			$('.icon_cont').animate({'top':0},200);
			//标题，内容与鼠标触发的对应
			$('#cont_box .icon_cont .title li').eq($(this).index()).addClass('ac').siblings().removeClass('ac');
			$('#cont_box .icon_cont .icon_cont_inner').eq($(this).index()).show().siblings().not('ul').hide();	
			
		});
	});
	
	//标题
	$('#chioce li').mouseover(function(){
		$(this).addClass('ac').siblings().removeClass('ac');
		$(this).parent().siblings('.inner_box').eq($(this).index()).show().siblings('.inner_box').hide();	
	});
	//小标题
	$('#cont_box .icon_cont .title li').mouseover(function(){
		$(this).addClass('ac').siblings().removeClass('ac');
		$('#cont_box .icon_cont .icon_cont_inner').eq($(this).index()).show().siblings().not('ul').hide();	
	});
	//叉号，关闭功能区
	$('#cont_box .close').click(function(){
		$('.icon_cont').animate({'top':209},200);
		$('#cont_box .slide').unbind('mouseover');//解除mouseover事件的绑定
	})
	
	
	
	
	
	
})