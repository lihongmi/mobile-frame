/*TMODJS:{"version":2,"md5":"8ededff56e1187b20f2259170c5b147d"}*/
template('D:/dev/study/mobile-frame/src/page/index',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<!DOCTYPE HTML> <html> <head> <meta charset="utf-8" /> <meta name="viewport" content="initial-scale=1.0,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0,width=device-width"> <title>首页</title> </head> <body> <div class="doc"> <div class="wrapper1"> ';
include('./widget/header/header');
$out+=' </div> <div class="wrapper2"> ';
include('./widget/content/content');
$out+=' ';
include('./widget/footer/footer');
$out+=' </div> </div> </body> </html> ';
return new String($out);
});