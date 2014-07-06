function search(searchArray, key){
	if(arguments.length != 2)	//参数数量不符要求直接返回undifined
		return true;
	
	var result = new Array();
	var resultNum = 0;
	if(typeof key === 'number')		//第二个参数为数字
	{
		for(var i = 0; i < searchArray.length; i++)
		{
			if (searchArray[i].age === key)
				result[resultNum++] = searchArray[i];
		}
	}
	else if(typeof key === 'string')		//第二个参数为字符串
	{
		for(var i = 0; i < searchArray.length; i++)
		{
			if (searchArray[i].name === key)
				result[resultNum++] = searchArray[i];
		}
	}
	else if(typeof key === 'object'){									//第二个参数为对象
		//设置一个是否匹配的标识
		for(var i = 0, flag = true; i < searchArray.length; i++, flag = true)
		{
			if(key.hasOwnProperty('name'))
				if (searchArray[i].name !== key.name)
					flag = false;
			if(key.hasOwnProperty('age'))
				if (searchArray[i].age !== key.age)
					flag = false;
			if(key.hasOwnProperty('hometown'))
				if (searchArray[i].hometown !== key.hometown)
					flag = false;
			if(flag == true)
				result[resultNum++] = searchArray[i];
		}
	}
	
	if(resultNum > 0)
		return result;
	return false;
	
}

	student1 = {
		name:"David",
		age:22,
		hometown:'BeiJing'
	}

	student2 = {
		name:"Amy",
		age:21,
		hometown:'BeiJing'
	}

	student3 = {
		name:"Amy",
		age:20,
		hometown:'America'
	}

	student4 = {
		name:"Tom",
		age:22,
		hometown:'Japan'
	}

	stuSearch = {
		name:"David",
		hometown:'BeiJing'
	}

	var array = new Array();
	array[0] = student1;
	array[1] = student2;
	array[2] = student3;
	array[3] = student4;

	console.log("student: infomation:")
	for(stu in array)
		console.log(array[stu]);
	console.log("search results:")
	var result = search(array, 'Amy');
	console.log("search(array, 'Amy'):", result);
	result = search(array, 22);
	console.log("search(array, 22):", result);
	result = search(array, stuSearch);
	console.log("search(array, stuSearch):", result);