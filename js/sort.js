//插入排序
function insterSort(array){
	var i, j, temp, key;
	for(i = 1; i < array.length; i++){  
		temp = j = i;  
		key = array[j];  
		while(--j > -1){  
			if(array[j] > key){  
		    	array[j+1] = array[j];  
		  	}
			else
		      break;
		}
		array[j+1] = key;
	}
  return array;  
}

//选择排序
function selectSort(array){
	var i, j, temp, min;
	var len = array.length;
	for(i = 0; i < len; i++){
		for(j = temp = i, min = array[i]; j < len; j++){
			if(array[j] < min){
				min = array[j];
				temp = j;
			}
		}
		array[temp] = array[i];
		array[i] = min;
	}
	return array;
}

//冒泡排序
function bubbleSort(array){
	var i, j, temp;
	var len = array.length;
	for(i = len-1; i > 0; i--)
		for(j = 0; j < i; j++){
			if(array[j] > array[j+1]){
				temp = array[j];
				array[j] = array[j+1];
				array[j+1] = temp;
			}
		}
	return array;
}


array = [37,2,6,34,83,34,42,23,4];
console.log("array:", array);
console.log("insterSort:", insterSort(array));
array = [37,2,6,34,83,34,42,23,4];
console.log("selectSort:", selectSort(array));
array = [37,2,6,34,83,34,42,23,4];
console.log("bubbleSort:", bubbleSort(array));

