$(function(){
	//注意因为是动态生成的元素，故使用on('click')方式的事件委托是不起作用的，
	//此时应当使用delegate的事件委托形式
	initTable();

	$('table').on('click','i',function(){
		var $this = $(this);
		var label = $this.siblings('label').html();
		if($this.hasClass('sortedUp')){
			data = upSort(label);
		}else{
			data = downSort(label);
		}
		initTable();
	});
});


function initTable(){
	var html = createTableHead()+createTableData();
	$('table').eq(0).html(html);
}

function upSort(val){
	return data.sort(function(a,b){
		return a[val] - b[val];
	});
}

function downSort(val) {
	return data.sort(function(a,b){
		return b[val] - a[val];
	});
}
var dataHead = [
	{name:'姓名',isSortable:false},
	{name:'语文',isSortable:true},
	{name:'数学',isSortable:true},
	{name:'英文',isSortable:true}],

	data = [{name:'张三',Chinese:99,Math:98,English:97},
	{name:'李四',Chinese:95,Math:92,English:89},
	{name:'王五',Chinese:60,Math:87,English:88},
	{name:'小红',Chinese:99,Math:94,English:99},
	{name:'小兰',Chinese:79,Math:99,English:93}];


function createTableHead(){
	var html = '';
	html += '<thead>'+'<tr>';
	for(var i = 0;i<dataHead.length;i++) {
		 html += '<th><label>'+dataHead[i].name+'</label>';
		 if(dataHead[i].isSortable){
			 html+='<i class="fa fa-chevron-up sortedUp" aria-hidden="true"></i>'+
			 			 '<i class="fa fa-chevron-down sortedDown" aria-hidden="true"></i>';
		 }
		 html+='</th>';
	}
	html += '</tr>'+'</thead>';
	return html;
}

function createTableData() {
	var html = '';
	html += '<tbody>';
	for(var i = 0;i<data.length;i++) {
		html += '<tr>'+
							'<td>'+ data[i].name+'</td>'+
							'<td>'+ data[i].Chinese+'</td>'+
							'<td>'+ data[i].Math+'</td>'+
							'<td>'+ data[i].English+'</td>'+
						'</tr>';

	}
	html+='</tbody>';
	return html;
}
