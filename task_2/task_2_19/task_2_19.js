var queue = [];
var queueShot = [];
var timer = null;

//渲染队列
function renderQueue(){
	var queueWraper = document.getElementById("queue-wraper");
	var html = "";
	for(key in queue){
		html += "<div style=\"height:"+5*queue[key]+"px\">"+queue[key]+"</div>";
	}
	queueWraper.innerHTML = html;
}
//定时渲染
function interRender(){
	var button = document.getElementsByTagName("button");
	for(key in button){
		button[key].disabled = true;
	}
	var arr = queueShot.shift() || [];
	if(arr.length != 0){
		queue = arr;
		renderQueue();
	}else{
		clearInterval(timer);
		for(key in button){
			button[key].disabled = false;
		}
	}
}

//左入
function leftIn(){
	var queueInput = document.getElementById("queue-input");
	if(queue.length < 60){
		if(queueInput.value != ""){
			if(!isNaN(queueInput.value)){
				if(Number(queueInput.value) >= 10 && Number(queueInput.value) <= 100){
					queue.unshift(Number(queueInput.value));
					renderQueue();
				}else{
					alert("输入越界，请输入10-100的数字！")
				}
			}else{
				alert("您输入的不是数字！");
			}
		}else{
			alert("您的输入为空！");
		}
	}else{
		alert("队列元素已达60，无法插入！");
	}
	queueInput.value = "";
}

//右入
function rightIn(){
	var queueInput = document.getElementById("queue-input");
	if(queue.length < 60){
		if(queueInput.value != ""){
			if(!isNaN(queueInput.value)){
				if(Number(queueInput.value) >= 10 && Number(queueInput.value) <= 100){
					queue.push(Number(queueInput.value));
					renderQueue();
				}else{
					alert("输入越界，请输入10-100的数字！")
				}
			}else{
				alert("您输入的不是数字！");
			}
		}else{
			alert("您的输入为空！");
		}
	}else{
		alert("队列元素已达60，无法插入！");
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

//快排
function partition(left,right)  
{  
    var x = queue[right];  
    var i = left-1, j = right;
    var swaper = 0;  
    for (;;)  
    {  
        while(queue[++i] < x) { }  
        while(queue[--j] > x) { if(j==left) break;}  
        if(i < j){
        	swaper = queue[j];
    		queue[j] = queue[i];
    		queue[i] = swaper;
        } 
        else break;  
    }
    swaper = queue[right];
    queue[right] = queue[i];
    queue[i] = swaper;
    queueShot.push(queue.slice(0));
    return i;  
}


function quickSort2()  
{  
    var left = 0;
    var right = queue.length - 1;
    var t = [];  
    if(left<right)  
    {  
        var p = partition(left, right); 
  
        if (p-1>left)  
        {  
            t.push(left);  
            t.push(p-1);  
        }  
        if (p+1<right)  
        {  
            t.push(p+1);  
            t.push(right);  
        }  
  
        while(t.length != 0)  
        {  
            var r =  t.pop();               
            var l =  t.pop();    
            p = partition(l, r);   
  
            if (p-1>l)  
            {  
                t.push(l);  
                t.push(p-1);  
            }  
            if (p+1<r)  
            {  
                t.push(p+1);  
                t.push(r);  
            }  
  
        }  
    }  
}  

//随机生成数组
function randomQueue(){
	for(var i = 0; i < 60; i++){
		queue[i] = Math.floor(Math.random()*90) + 10;
	}
	renderQueue();
}

//绑定btn
addEvent(document.getElementById("btn-left-in"), "click", leftIn);
addEvent(document.getElementById("btn-right-in"), "click", rightIn);
addEvent(document.getElementById("btn-left-out"), "click", leftOut);
addEvent(document.getElementById("btn-right-out"), "click", rightOut);
addEvent(document.getElementById("btn-random-queue"), "click", randomQueue);
addEvent(document.getElementById("btn-quick-sort"), "click", function(){
	quickSort2();
	timer = setInterval(interRender, "300");
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
