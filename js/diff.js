function diff(list1, list2){
	if(arguments.length != 2)
		return false;
	 var result = new Array();
	 var resultNum = 0;
	 nextStu:
	 for(var i = 0; i < list2.length; i++){
	 	for(var j = 0; j < list1.length; j++){
	 		if(list2[i].name == list1[j].name)
	 			continue nextStu;
	 	}
	 	result[resultNum++] = list2[i];
	 }
	 return result;
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
	name:"Jerry",
	age:20,
	hometown:'America'
}

student4 = {
	name:"Tom",
	age:22,
	hometown:'Japan'
}

list1 = [student1, student2];
list2 = [student2, student3, student4];

var result = diff(list1, list2);

console.log('students list 1:', list1);
console.log('students list 2:', list2);
console.log('result:', result);