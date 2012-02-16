/**
 * s8功能函数
 * time 2011-12-17
 * create wangjian	wolongxzg@gmail.com
 */
KISSY.ready(function(){
	KISSY.use("suggest", function(S) {
		
		var appslide = new S.Slide('#J_appslide', {
			contentCls :'appslide-panel',
			navCls : "appslide-trigger",
			effect : 'scrolly',
			triggerType : 'click',
			autoplay:false,
			easing : 'easeOutStrong'
		}); 
		
		var tmtabs = new S.Tabs('#J_searchTool',{
			triggerType : 'click'
		});
		
		var tbsuggest = new S.Suggest('#J_tbsearch', 'http://suggest.taobao.com/sug?code=utf-8&extras=1', {
			autoFocus : true,
			resultFormat: '约%result%个宝贝', 
			dataType: 1
		});
		
		var tmsuggest = new S.Suggest('#J_tmsearch', 'http://suggest.taobao.com/sug?area=b2c&code=utf-8&extras=1', {
			resultFormat: '约%result%个宝贝',
			dataType: 1
		});
		
		//京东产品列表
		function JDProduct(){
			var pNum = [],
				listView = S.one('#J_jdproduct'),
				pCount = jdproductArray.length;
			
			for(var i = 0;i < 4;i++){
				var temp = parseInt(Math.random()*pCount);
				
				while(S.inArray(temp,pNum)){
					temp = parseInt(Math.random()*pCount);
				}
				
				pNum.push(temp);
				
			}
			
			for(var j = 0;j < 4;j++){
				var pic = jdproductArray[pNum[j]].pic,
					title = jdproductArray[pNum[j]].title,
					price = jdproductArray[pNum[j]].price,
					url = jdproductArray[pNum[j]].url;
				
				var listItem = '';
				listItem += '<li class="list-item">';
				listItem += '<div class="pic"><a href="' + url + '" target="_blank"><img src="' + pic + '" /></a></div>';
				listItem += '<ul class="attr"><li><a href="' + url + '" target="_blank">' + title + '</a></li><li>京东价：<span class="price">￥' + price + '</span></li></ul>';
				listItem += '</li>';
				
				listView.append(listItem);
			}
			
		}
		JDProduct();
		
	});
});