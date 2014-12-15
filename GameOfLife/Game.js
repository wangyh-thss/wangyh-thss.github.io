var size = 16;
var life = {};
var buffer = {};
var runningFlag = false;
var timer;
var gridSize;
var speed = 100;
var leftEdge, topEdge;
var body = document.getElementById("GameWindow");
var bg = document.getElementById("MainWindow");
var doc = document.documentElement;
var $block = document.createElement.bind(document,"div");
var addNode = body.appendChild.bind(body);
var removeNode=body.removeChild.bind(body);

/**
 *调用初始化棋盘函数
 */
init();
randomState();

/**
 * 修改/获取细胞生死状态
 */
function toLive(x, y){
	if(life[x][y]){
		life[x][y].setAttribute("class", "alive");
		//$(life[x][y]).fadeIn(speed*0.6);
	}	
}

function toDie(x, y){
	if(life[x][y]){
		life[x][y].setAttribute("class", "dead");
		//$(life[x][y]).fadeOut(speed*0.6);
	}
		
}

function getLifeState(x, y){
	if(life[x][y])
		return life[x][y].getAttribute("class");
}

function changeLifeState(x, y){
	if(life[x][y]){
		if(getLifeState(x, y) === "alive")
			toDie(x, y);
		
		else
			toLive(x, y);
	}
}

/**
 *游戏规则算法函数
 */
function nextGeneration(){
	var liveList = [];
	var deathList = [];
	//判定某一细胞周围活细胞数量
	function judge(x, y){
		var count = 0;

		var left = x == 0 ? size - 1 : x - 1;
		var right = x == size - 1 ? 0 : x + 1;
		var up = y == 0 ? size - 1 : y - 1;
		var down = y == size - 1 ? 0 : y + 1;

		if(getLifeState(left, up) === "alive")
			count++;
		if(getLifeState(left, y) === "alive")
			count++;
		if(getLifeState(left, down) === "alive")
			count++;
		if(getLifeState(x, up) === "alive")
			count++;
		if(getLifeState(x, down) === "alive")
			count++;
		if(getLifeState(right, up) === "alive")
			count++;
		if(getLifeState(right, y) === "alive")
			count++;
		if(getLifeState(right, down) === "alive")
			count++;
		return count;
	}
	//得到需要改变状态（生→死 / 死→生）的细胞列表
	function getChangeList(){
		for(var y = 0; y < size; y++)
			for(var x = 0; x < size; x ++){
				switch(judge(x, y)){
					case 2:
						break;
					case 3:
						if(getLifeState(x, y) == "dead")
							liveList.push([x, y]);
						break;
					default:
						if(getLifeState(x, y) == "alive")
							deathList.push([x, y]);
				}
			}
	}

	//根据列表改变细胞状态
	function updateState(){
		getChangeList();

		var coordinate;
		for(var liveIndex in liveList){
			coordinate = liveList[liveIndex];
			toLive(coordinate[0], coordinate[1]);
		}
		for(var deathIndex in deathList){
			coordinate = deathList[deathIndex];
			toDie(coordinate[0], coordinate[1])
		}
	}

	updateState();
}

/**
 *功能模块-游戏开始前的准备
 */
function init(){
	//初始化棋盘
	function initWindow(){
		bg.style.width = "40%";  bg.style.height = "80%";
		bg.style.left = "11%";  bg.style.top = "15%"
		var width = $("#MainWindow").width();
		var height = $("#MainWindow").height();
		var winWidth = window.innerWidth;
		var winHeight = window.innerHeight;
		var min = width < height ? width : height;
		var max = width > height ? width : height;
		gridSize = min * 0.98 / size;
		leftEdge = width > height ? (width - height) / 2 : gridSize * 0.1;
		topEdge = height > width ? (height - width) / 2 : gridSize * 0.1;
		//调整各个块的位置和大小
		body.style.fontSize = gridSize + "px";
		body.style.left = gridSize * 0.1 + "px";
		body.style.top = gridSize * 0.08 + "px";
		bg.style.left = winWidth * 0.11 + leftEdge + "px";
		bg.style.top = winHeight * 0.15 + topEdge + "px";
		if(width > height)
			bg.style.width = height + gridSize * 0.1  + "px";
		else
			bg.style.height = width + gridSize * 0.1 + "px";
		if(gridSize < 12){
			var scale = gridSize / 12;
			body.style.webkitTransform = "scale(" + scale + ")";
		}else{
			body.style.webkitTransform = "scale(1)";
		}
	}
	//初始化数据结构
	//使用二维数组，每个元素为相应位置DIV的DOM对象
	function initArray(){
		for(var i = 0; i < size; i++){
			for(var j = 0; j < size; j++){
				if(!life[i]){
					life[i] = {};
				}
				if(!life[i][j]){
					life[i][j] = $block();
					life[i][j].style.cssText = "left:" + i + ".1em; top: " + j + ".1em;"
					addNode(life[i][j]);
					toDie(i, j);
				}
			}
		}
		//当减少格子数量时，删除不显示的数据
		var overflow = size;
		while(life[overflow]){
			for(var i = 0; i < size; i++){
				if(life[i][overflow]){
					removeNode(life[i][overflow]);
					delete life[i][overflow]
				}
				if(life[overflow][i])
					removeNode(life[overflow][i]);	
			}
			if(life[overflow][overflow])
					removeNode(life[overflow][overflow]);
			delete life[overflow];
		}
	}

	initWindow();
	initArray();
}

/*随机产生alive状态的细胞*/
function randomState(){
	//随机数函数
	function randomNumber(min, max){
		var range = max - min;
		var rand = Math.random();
		return (min + Math.round(range * rand)
			);
	}
	//随机产生1/4~1/2的活细胞数量，再通过随机交换实现细胞状态的随机生成
	for(var i = 0; i < size; i++)
		for(var j = 0; j < size; j++)
			toDie(i, j);
	aliveNumber = randomNumber(size * size / 4, size * size / 2);
	for(var i = 0; i < aliveNumber / size; i++){
		if(i < aliveNumber / size - 1)
			for(var j = 0; j < size; j++)
				toLive(i, j);
		else
			for(var j = 0; j < aliveNumber % size; j++)
				toLive(i, j);
	}
	for(var x = 0; x < size; x++){
		for(var y = 0; y < size; y++){
			var index_x = randomNumber(0,size - 1);
			var index_y = randomNumber(0,size - 1);
			if(index_x !== x && index_y !== y){
				var temp = getLifeState(x, y);
				if(getLifeState(index_x, index_y) === "alive")
					toLive(x, y);
				else
					toDie(x, y);
				if(temp === "alive")
					toLive(index_x, index_y);
				else
					toDie(index_x, index_y);
			}
		}
	}
}

/**
 *功能模块-游戏过程的控制函数
 */
function changeRunningState(){
	if(runningFlag === false)
		start();
	else
		end();
	updateButtonText();
	
	function start(){
		runningFlag = true;
		timer = setInterval(nextGeneration, speed);
	}

	function end(){
		runningFlag = false;
		clearInterval(timer);
	}

	function updateButtonText(){
		if(runningFlag === true)
			$("#startOrStop").text("Stop");
		else
			$("#startOrStop").text("Start");
	}
}

/* 参数控制函数 */
function biggerThanBigger(){
	//当单元格的长度小于12px时，阻止size的增加
	var width = $("#MainWindow").width();
	var height = $("#MainWindow").height();
	var min = width < height ? width : height;
	if(12 * (size+1) > min * 0.95)
		return;
	size++;
	init();
}

function smallerThanSmaller(){
	if(size <= 4)
		return;
	size--;
	init();
}

function speedUp(){
	speed = speed * 1.2;
	if(runningFlag){
		clearInterval(timer);
		timer = setInterval(nextGeneration, speed);
	}
}

function slowDown(){
	speed = speed * 0.8;
	if(runningFlag){
		clearInterval(timer);
		timer = setInterval(nextGeneration, speed);	
	}
}

/**
 * 添加事件监听
 * 鼠标事件&键盘事件
 */
//绑定键盘事件
onkeydown = function(evt){	
	var key;
	if(window.event)
		key = window.event.keyCode;
	else
		key = e.keyCode;
	//alert(key);
	
	switch(key){
		case 189:    // +
			biggerThanBigger();
			break;
		case 187:    // -
			smallerThanSmaller();
			break;
		case 188:    // >
			speedUp();
			break; 
		case 190:    // <
			slowDown();
			break;
		case 32:     // space
			changeRunningState();
			break;
		case 13:     //enter
			nextGeneration();
			break;
		case 82:     //R
			randomState();
			break;
	}
}

//绑定鼠标事件
onmousedown = function(evt){
	var x, y;
	var width = window.innerWidth;
	var height = window.innerHeight;
	if(evt.button === 0 && !runningFlag){
		onmousemove = function(e){
			doc.onmouseenter=doc.onmouseleave=null;			
			var _x = Math.floor((e.clientX - leftEdge - (width * 0.115) - (gridSize * 0.1)) / gridSize);
			var _y = Math.floor((e.clientY - topEdge - (height * 0.165) - (gridSize * 0.1)) / gridSize);

			if(x !== _x || y !== _y){
				x = _x;  y = _y;
				changeLifeState(x, y);
			}
		}
		onmousemove(evt);
	}else if(runningFlag){
		x = Math.floor((evt.clientX - leftEdge - (width * 0.115) - (gridSize * 0.1)) / gridSize);
		y = Math.floor((evt.clientY - topEdge - (height * 0.165) - (gridSize * 0.1)) / gridSize);
		changeLifeState(x, y);
	}
	return false;
}

onmouseup = function(){
	onmousemove = null;
}

window.onresize = function(){
	init();
}
