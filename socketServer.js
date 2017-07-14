
//引入modular模块，并获取其中的数据
var modular=require('./modular.js')
var question=modular.question();
var answers=modular.answers();

//引入模块
var socketIo=require('socket.io');
//将函数暴露出去，在其他模块调用
module.exports=function(httpServer){
    //创建socket来监听http服务器
    var socketServer=socketIo.listen(httpServer);

    //socket服务器被连接时，执行函数
    socketServer.on('connect',function(socket){
        console.log('有客户端链接：'+socket.id);
        sendQuestion(socket);  //向客户端发送问题
        //接收客户端发送的数据
        socket.on('message',function(data){
            switch (data.type){
                case "ask":
                    sendAnswer(socket,data)
                    break;
            };
        });
        socket.on('disconnect',function(){
            console.log('客户端断开连接:'+socket.id)
        });
    });
    //发送问题
    function sendQuestion(socket){
        var message={
            type :'question',
            content:question
        };
        setTimeout(function(){      //延迟发送
            socket.send(message);
        },500)
    };
    //发送答案
    function sendAnswer(socket,data){
        var message={
            type:"answer",
            content:answers[data.content] || '你这个问题太难了，让我想一下'  //没有匹配的答案时将其发送
        };
        setTimeout(function(){
            socket.send(message);
        },500)
    };
}
