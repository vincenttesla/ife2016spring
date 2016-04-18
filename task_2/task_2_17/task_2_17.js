/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var wraper = document.getElementsByClassName("aqi-chart-wrap")[0];
  var html = "";
  for(key in chartData){
    color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    html += "<div class=\"aqi-chart-bar\" style=\"height:"+chartData[key]+"px;background-color:"+color+"\" title="+key+"></div>";
  }
  wraper.innerHTML = html;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
  var event = arguments[0]; 
  if(event.target.value != pageState.nowGraTime){
  // 设置对应数据
  pageState.nowGraTime = event.target.value;
  // 调用图表渲染函数
  initAqiChartData()
  renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(value) {
  // 设置对应数据
  pageState.nowSelectCity = value;
  // 调用图表渲染函数
  initAqiChartData()
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTimeForm = document.getElementById("form-gra-time");
  addEvent(graTimeForm, "click",  function(event){
    var target = event.target || event.srcElement;
    if(target.tagName.toLowerCase() == "input"){
      graTimeChange.call(target,event);
    }
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selectedCity = document.getElementById("city-select");
  var html = "";
  for(key in aqiSourceData){
    html += "<option>"+key+"</option>";
  }
  selectedCity.innerHTML = html;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEvent(selectedCity, "click",  function(event){
   if(selectedCity.value != pageState.nowSelectCity){
    citySelectChange(selectedCity.value);
   }
  });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var originData = aqiSourceData[pageState.nowSelectCity];
  var processedData = {};
  if(pageState.nowGraTime == "day"){
    processedData = originData;
  }else if(pageState.nowGraTime == "week"){
    var sum = 0;
    var index = 0;
    var weekDay = 5;
    var week = 1;
    for(key in originData){
        sum += originData[key];
        index++;
        if(weekDay+index == 7){
          processedData["第"+week+"周"] = Math.ceil(sum/index);
          week++;
          weekDay = 0;
          sum = 0;
          index = 0;
        }
    }
    if(sum != 0){
      processedData["第"+week+"周"] = Math.ceil(sum/index);
    }
  }else if(pageState.nowGraTime == "month"){
    var sum = 0;
    var index = 0;
    var month = "";
    for(key in originData){
      if(sum == 0){
        month = key.slice(0,7);
      }
      if(key.slice(0,7) == month){
        sum += originData[key];
        index++;
      }else{
        processedData[month] = Math.ceil(sum/index);
        sum = 0;
        index = 0;
      }
    }
    processedData[month] = Math.ceil(sum/index);
  }
  // 处理好的数据存到 chartData 中
  chartData = processedData;
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

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();