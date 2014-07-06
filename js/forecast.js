function forecast(value){
	//没有参数返回false
	if(arguments.length < 1){
		return false;
	}
	//定义对战表，每个成员代表此分支获胜概率
	var A1 = {A1: 1}; var A2 = {A2: 1}; var B1 = {B1: 1}; var B2 = {B2: 1};
	var C1 = {C1: 1}; var C2 = {C2: 1}; var D1 = {D1: 1}; var D2 = {D2: 1};
	var E1 = {E1: 1}; var E2 = {E2: 1}; var F1 = {F1: 1}; var F2 = {F2: 1};
	var G1 = {G1: 1}; var G2 = {G2: 1}; var H1 = {H1: 1}; var H2 = {H2: 1};
	var W49 = {A1: A1, B2: B2}
	var W50 = {C1: C1, D2: D2}
	var W51 = {A2: A2, B1: B1}
	var W52 = {D1: D1, C2: C2}
	var W53 = {E1: E1, F2: F2}
	var W54 = {G1: G1, H2: H2}
	var W55 = {F1: F1, E2: E2}
	var W56 = {H1: H1, G2: G2}
	var W57 = {W49: W49, W50: W50}
	var W58 = {W53: W53, W54: W54}
	var W59 = {W51: W51, W52: W52}
	var W60 = {W55: W55, W56: W56}
	var W61 = {W57: W57, W58: W58}
	var W62 = {W59: W59, W60: W60}
	var Champin = {W61: W61, W62: W62}
	//初始化结果对象，temp记录某一轮所有球队晋级的概率
	var result = new Object();
	var temp = new Object();
	for(var team in value){
		result[team] = 1;
		temp[team] = 1;
	}
	//开始比赛，得到每一队夺冠的概率
	startGame(Champin);
	//返回结果，如果指定某队，则返回该队夺冠概率，否则返回包含所有国家夺冠概率的对象
	if(arguments.length > 1)
		return result[arguments[1]];
	return result;


	//计算对象属性数目
	function objLength(obj){
		var n = 0;
		if(typeof obj == 'object'){
			for(var item in obj)
				n++;
			return n;
		}
		return false;
	}
	//进行比赛，修改各队获胜概率
	function startGame(game){
		var branch = new Array();
		var i = 0;
		var addPro;
		if(objLength(game) == 2){
			for(var item in game){
				startGame(game[item]);
				branch[i++] = game[item];
			}
			//对于某一轮比赛，计算一个队伍和所有可能交战对手的获胜概率，再乘以和该对手交战的概率，即为这一轮的晋级概率
			//上一轮晋级的概率乘以可以到达上一轮的概率，即为能到本轮的概率，每一轮后记录此概率
			for(var item1 in branch[0]){
				addPro = 0;
				for(var item2 in branch[1]){
					if(typeof branch[0][item1] === 'number' && typeof branch[1][item2] === 'number'){
						if(value[item1] === 0 && value[item2] === 0)
							addPro += result[item2] * 0.5;
						else
							addPro += result[item2] * (value[item1] / (value[item1] + value[item2]));
					}
				}
				if(typeof branch[0][item1] === 'number'){
					temp[item1] = result[item1] * addPro;
					game[item1] = result[item1];
				}
			}
			for(var item1 in branch[1]){
				addPro = 0;
				for(var item2 in branch[0]){
					if(typeof branch[1][item1] === 'number' && typeof branch[0][item2] === 'number'){
						if(value[item1] === 0 && value[item2] === 0)
							addPro += result[item2] * 0.5;
						else
							addPro += result[item2] * (value[item1] / (value[item1] + value[item2]));
					}
				}
				if(typeof branch[1][item1] === 'number'){
					temp[item1] = result[item1] * addPro;
					game[item1] = result[item1];
				}
			}

			for(var team in temp)
				result[team] = temp[team];
			return true;
		}
		else{
			for(num in game)
				game[num] = 1;
		}
	}
}
var teamValue = {
	A1: 0,  A2: 0,
	B1: 0,  B2: 0,
	C1: 0,  C2: 0,
	D1: 0,  D2: 0,
	E1: 0,  E2: 0,
	F1: 0,  F2: 0,
	G1: 0,  G2: 0,
	H1: 0,  H2: 0
}

var result = forecast(teamValue);

console.log('value:');
console.log(teamValue);
console.log('all result:', result);
console.log('singal search forecast(teamValue, "A1"):', forecast(teamValue, 'A1'));