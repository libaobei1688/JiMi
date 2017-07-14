
$(function(){
    var socket=io();

    // 事件委托方式给问题列表添加绑定事件
    $("#inner").on("click","a.question",function () {
        var txt=$(this).text();
        send(txt);  //调用send函数发送txt
    });
    //按钮的点击事件
    $('#btn').click(function(){
        var txt=$('#text').val();
        send(txt);
        $('#text').val('');//清空文本域
    });
    // 键盘事件
    $('#text').keydown(function (ev) {
        if (ev.keyCode == 13) {  // 判断按下的是否为Enter键
            //触发按钮的 click 事件
            $("#btn").click();
        }
    });

    //创建一个send函数，向服务器发送内容并向添加对话框
    function send(data){
        //发送消息
        socket.send({
            type:'ask',
            content:data
        })
        $('#inner').append('<div class="clearfix"><span>'+data+'</span></div>');//添加对话
        $('#inner').scrollTop( $('#inner').prop("scrollHeight") );//滚动在最下面显示
    }

    //监听并接收消息
    socket.on('message',function(data){
        var type=data.type;
        switch (type){
            case 'question':           //服务器返回的类型为question时，显示问题
                showQuestion(data)
                break;
            case 'answer':              //服务器返回的类型为answer时，显示答案
                showAnswer(data)
                break;
        }
    });
    //显示问题
    function showQuestion(data){
        var oUl=$('<ul>');
        var question=data.content;
        for(var i=0;i<question.length;i++){
            $('<li>').append('<a href="##" class="question">'+question[i]+'</a>').appendTo(oUl);
        }

        $('#inner').append('<div class="clearfix"><span class="left"><p>请选择您要咨询的业务</p></span></div>');
        oUl.appendTo($('span'));
    };
    //显示答案
    function showAnswer(data){
        $('#inner').append('<div class="clearfix"><span class="left">'+data.content+'</span></div>');

        $('#inner').scrollTop( $('#inner').prop("scrollHeight") );
    }

})