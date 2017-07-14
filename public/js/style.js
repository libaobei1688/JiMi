// JavaScript Document
$(function(){
	//阻止默认事件-----------------------------------
	$('.search .sub').click(function(){
		return false;
	});
	//左上方地点----------------------------------------------------
	//鼠标经过时改变自身样式，显示下方内容
	$('.head_top .send').hover(function(){
		$(this).siblings('.sendTo').show();
		$(this).css({'background':'#fff','border-bottom':'1px solid #fff'});
	},function(){
		$(this).siblings('.sendTo').hide();
		$(this).css({'background':'#f1f1f1','border-bottom':'1px solid #f1f1f1'});
	});
	//鼠标经过时显示自身，改变send样式
	$('.head_top .sendTo').hover(function(){
		$(this).show();
		$(this).siblings('.send').css({'background':'#fff','border-bottom':'1px solid #fff'});
		$(this).siblings('.send').find('b').css('top',2);//箭头向上
	},function(){
		$(this).hide();
		$(this).siblings('.send').css({'background':'#f1f1f1','border-bottom':'1px solid #f1f1f1'});
		$(this).siblings('.send').find('b').css('top',-7);//箭头向下
	});
	//点击时添加ac，并改变send中的内容
	$('.head_top .sendTo li').click(function(){
		$(this).addClass('ac').siblings().removeClass('ac');
		$('.head_top .send').html( '送至：'+$(this).text()+'<i><b>◇</b></i>'  );
		$('.send').find('b').css('top',2);
	})


	//右侧图标------------------------------------------------------------
	$('.right_icon a').hover(function(){
		$(this).css('background-color','#c81623');
		var wid=$(this).siblings('span').outerWidth();//span的长度，也是位移量
		$(this).siblings('span').addClass('ac').stop().animate({'left':-wid},300);	
	},function(){
		$(this).css('background-color','#7a6e6e')
		$(this).siblings('span').removeClass('ac').stop().animate({'left':0},300)	;
	})
	
	//返回顶部----------------------------------------------------
	$('.right_icon .icon_last').click(function(){
		$('body,html').animate({scrollTop:0}, 500)	
	});
})