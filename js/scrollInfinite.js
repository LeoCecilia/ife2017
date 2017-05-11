(function(){
  var list = document.querySelector('#list');
  const num = 30;//每次从后端获取数据的数量
  var current = 0;
  var isAddItem = false;//是否正在添加列表
  function render() {
    if(!isAddItem) {
      isAddItem = true;

      getData(num,current).then(function (data) {
        //文档碎片，存在于内存，不存在于DOM当中，而每次的appendChild(block)都只是会把其子孙节点qppend进去
        //故是一个良好的占位符
        var block = document.createDocumentFragment();
        data.forEach(function (item) {
          var li = document.createElement('li');
          li.innerText = item;
          block.appendChild(li);
        });
        list.appendChild(block);
        current+=num;
        isAddItem = false;
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
  function getData(num,current) {
    return new Promise(function (resolve,reject) {
      setTimeout(function () {
        var data = [];
        for(var i = current;i<current+num;i++) {
          data.push('item '+(i+1));
        }
        resolve(data);//此处是已经获取完数据
      },1000);
    });
  }
  function init() {
    render();
    window.addEventListener('scroll',function () {
      //即便body里的元素是绝对定位，也是可以的，因为其主要涉足的元素是Body,html还是css
      var totalHeight = document.body.scrollHeight,
          scrollTop = document.documentElement.scrollTop||document.body.scrollTop,//已经滚动了多少像素
          clientHeight = document.documentElement.clientHeight;
     var arrived = totalHeight - scrollTop - clientHeight;
     if(arrived<100){
       render();
     }
   });
  }
  init();
})();
