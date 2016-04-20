var bRoot = document.getElementById("root");
var btnPre = document.getElementById("pre-order");
var btnIn = document.getElementById("in-order");
var btnPost = document.getElementById("post-order");
var timer = null;
var orderShot = [];

//先序遍历
function preOrder(root){
	if(root != null){
		orderShot.push(root);
		preOrder(root.firstElementChild);
		preOrder(root.lastElementChild);
	}
}

//中序遍历
function inOrder(root){
	if(root != null){
		inOrder(root.firstElementChild);
		orderShot.push(root);
		inOrder(root.lastElementChild);
	}
}

//后续遍历
function postOrder(root){
	if(root != null){
		postOrder(root.firstElementChild);
		postOrder(root.lastElementChild);
		orderShot.push(root);
	}
}

//定时器渲染
function render(){
	var button = document.getElementsByTagName("button");
	for(key in button){
		button[key].disabled = true;
	}
	var node = orderShot.shift();
	if(node != null){
		var preNode = document.getElementsByClassName("now-node")[0];
		node.className = "now-node";
		if(preNode != null)
			preNode.className = "";
	}else{
		document.getElementsByClassName("now-node")[0].className = "";
		clearInterval(timer);
		for(key in button){
			button[key].disabled = false;
		}
	}
}

//为btn绑定事件
	addEvent(btnPre, "click", function(){
		preOrder(bRoot);
		timer = setInterval(render,"500");
	});
	addEvent(btnIn, "click", function(){
		inOrder(bRoot);
		timer = setInterval(render,"500");
	});
	addEvent(btnPost, "click", function(){
		postOrder(bRoot);
		timer = setInterval(render,"500");
	});

//绑定事件函数
function addEvent(element, event, listener){
	if(element.addEventListener){
		element.addEventListener(event,listener,false);
	}else if(element.attachEvent){
		event = "on" + event;
		element.attachEvent(event,listener);
	}else{
		element["on" + event] = listener;
	}
}
