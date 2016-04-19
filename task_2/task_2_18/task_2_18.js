var queue = [];

//渲染队列
function renderQueue(){
	var queueWraper = document.getElementById("queue-wraper");
	var html = "";
	for(key in queue){
		html += "<span id=\""+key+"\">"+queue[key]+"</span>";
	}
	queueWraper.innerHTML = html;
}

//左入
function leftIn(){
	var queueInput = document.getElementById("queue-input");
	if(queueInput.value != ""){
		if(!isNaN(queueInput.value)){
			queue.unshift(queueInput.value);
			renderQueue();
		}else{
			alert("您输入的不是数字！");
		}
	}else{
		alert("您的输入为空！");
	}
	queueInput.value = "";
}

//右入
function rightIn(){
	var queueInput = document.getElementById("queue-input");
	if(queueInput.value != ""){
		if(!isNaN(queueInput.value)){
			queue.push(queueInput.value);
			renderQueue();
		}else{
			alert("您输入的不是数字！");
		}
	}else{
		alert("您的输入为空！");
	}
	queueInput.value = "";
}

//左出
function leftOut(){
	if(queue.length != 0){
		queue.shift();
		renderQueue();
	}else{
		alert("队列为空没有元素可以被删除！");
	}
}

//右出
function rightOut(){
	if(queue.length != 0){
		queue.pop();
		renderQueue();
	}else{
		alert("队列为空没有元素可以被删除！");
	}
}

//点击删除
function clickDelete(){
	var event = arguments[0];
	queue.splice(event.target.id,1);
	renderQueue();
}

//绑定btn
addEvent(document.getElementById("btn-left-in"), "click", leftIn);
addEvent(document.getElementById("btn-right-in"), "click", rightIn);
addEvent(document.getElementById("btn-left-out"), "click", leftOut);
addEvent(document.getElementById("btn-right-out"), "click", rightOut);
 addEvent(document.getElementById("queue-wraper"), "click",  function(event){
    var target = event.target || event.srcElement;
    if(target.tagName.toLowerCase() == "span"){
      clickDelete.call(target,event);
    }
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