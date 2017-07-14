
//引入模块
var http=require('http');
var express=require('express');

//创建中间栈
var app=express();
//本地文件
app.use(express.static('public'));

//创建http服务器
var httpServer=http.createServer(app);
//设置链接端口
httpServer.listen(3000,function(){
    console.log('服务器正运行在3000端口')
});
//引入本地的socket模块
require('./socketServer')(httpServer);