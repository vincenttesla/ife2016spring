/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityInput = document.getElementById("aqi-city-input");
	var valueInput = document.getElementById("aqi-value-input");
	var sityExp = /^\D+$/;
	var valueExp = /^\d+$/;
	if(sityExp.test(cityInput.value) && valueExp.test(valueInput.value)){
		aqiData[cityInput.value] = valueInput.value;
	}else{
		alert("输入不符合规定!");
	}
	cityInput.value = "";
	valueInput.value = "";
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqiTable = document.getElementById("aqi-table");
	var html = "";
	var objIsNull = true;
	for(key in aqiData){
		objIsNull = false;
		break;
	}
	if(!objIsNull){
		html += "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
		for(key in aqiData){
			html += "<tr><td>"+key+"</td><td>"+aqiData[key]+"</td><td><button>删除</button></td></tr>";
		}
	}
	aqiTable.innerHTML = html;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var event = arguments[0];
  delete aqiData[event.target.parentNode.parentNode.firstChild.innerHTML];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById("add-btn");
  addEvent(addBtn, "click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var aqiTable = document.getElementById("aqi-table");
  addEvent(aqiTable, "click",  function(event){
		var target = event.target || event.srcElement;
		if(target.tagName.toLowerCase() == "button"){
			delBtnHandle.call(target,event);
		}
	});
}

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

init();
