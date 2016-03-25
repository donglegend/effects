var $ = require("./jquery.min.js");
var Loading = require("./ui-loading.js");


$(".box").loading("spinner");
setTimeout(function (){
	$(".box").unloading();
}, 5000)