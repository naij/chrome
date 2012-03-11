KISSY.namespace('XZG.Main');
KISSY.add('xzg-main',function(S){
	function Main(){
		this.conShow = false;
		this.conWidth = 880;
		this.conHeight = 514;
		this.windowHeight = S.one(window).height();
		this.windowWidth = S.one(window).width();
		this.top = (this.windowHeight - this.conHeight)/2;

		this.init();
	}

	S.augment(Main,{
		init : function(){
			var windowWidth = this.windowWidth,conWidth = this.conWidth;

			//外部容器
			this.con = S.Node('<div>');
			this.con.addClass('xzg-website');
			this.con.attr('id','J_xzg_tabs');
			this.con.css({'left':(windowWidth-conWidth)/2});
			S.one('body').append(this.con);

			//遮罩层
			this.mask = S.Node('<div>');
			this.mask.addClass('xzg-mask');
			this.mask.css({'display':'none'});
			S.one('body').prepend(this.mask);

			this.render();
			this.bind();
		},

		render : function(){
			var conHtml = [],websiteHtml = [],navHtml = [];

			//页面框架
			conHtml.push('<div class="xzg-header">');
			conHtml.push('<span class="xzg-close" id="J_xzg_close"><i class="xzg-x"></i><i class="xzg-x xzg-x-inverse"></i></span>');
			conHtml.push('<h1 class="xzg-title">微导航<sub class="sub-title">For Chrome</sub></h1>');
			conHtml.push('<form class="xzg-search" id="J_searchForm" action="http://www.baidu.com/s" target="_blank">');
			conHtml.push('<div class="xzg-search-panel">');
			conHtml.push('<div class="xzg-search-engin">');
			conHtml.push('<h3 class="baidu" id="J_selectHandle"><i class="xzg-engin-icon"></i><span class="xzg-arrow"></span></h3>');
			conHtml.push('<ul class="xzg-select ks-hidden" id="J_selectPanel">');
			conHtml.push('<li class="baidu"><i class="xzg-engin-icon"></i><span class="xzg-name">百度</span></li>');
			conHtml.push('<li class="google"><i class="xzg-engin-icon"></i><span class="xzg-name">谷歌</span></li>');
			conHtml.push('<li class="bing"><i class="xzg-engin-icon"></i><span class="xzg-name">必应</span></li></ul></div>');
			conHtml.push('<div class="xzg-search-input"><input type="text" name="word" id="J_searchInput" /></div></div>');
			conHtml.push('<div class="xzg-search-button"><a href="#" id="J_searchSubmit"></a></div></form></div>');
			conHtml.push('<div class="xzg-content"><div class="ks-switchable-content"></div></div>');
			conHtml.push('<div class="xzg-nav"><ul class="ks-switchable-nav ks-clear"></ul></div>');
			this.con.append(conHtml.join('\n'));

			//网址列表
			S.each(xzgwebsite,function(witem,index){
				var tempHtml = [];

				S.each(witem.cnt,function(citem){
					tempHtml.push('<li class="xzg-panel-list"><a href="' + citem.url + '" target="_blank"><i></i>' + citem.name + '</a></li>');
				});
				
				websiteHtml.push('<div class="xzg-panel"' + (index == 0 ? '' : ' style="display:none;"')  +  '><ul class="ks-clear">' + tempHtml.join('\n') + '</ul></div>');
				navHtml.push('<li class="' + witem.class + (index == 0 ? ' ks-active' : '') +' xzg-nav-list"><span><i></i>' + witem.cat + '</span></li>');
			});
			this.con.one('.ks-switchable-content').append(websiteHtml.join('\n'));
			this.con.one('.ks-switchable-nav').append(navHtml.join('\n'));
		},

		bind : function(){
			var self = this;
				   
			//tab页切换
			var tabs = S.Tabs('#J_xzg_tabs', {
				switchTo : 0,
				triggerType : 'click'
			});
			
			//搜索引擎
			var search = new S.XZG.Searchengin();
			
			//设置快捷键
			key('w', function(){
				if(self.conShow){
					self.__hide();
				}
				else{
					self.__show();
				}
				return false;
			});

			key('esc', function(){
				if(self.conShow){
					self.__hide();
				}
				return false;
			});

			S.one('#J_xzg_close').on('click',function(e){
				if(self.conShow){
					self.__hide();
				}
				return false;
			});
		},

		__show : function(){
			var mask = this.mask,con = this.con,windowHeight = this.windowHeight,top = this.top;
					 
			mask.css({'display':'block'});
			mask.animate({height:windowHeight}, 0.35, 'easeOut');
			con.animate({top : top}, 0.3, 'easeOut');
			this.conShow = true;	 
		},

		__hide : function(){
			var mask = this.mask,con = this.con,conHeight = this.conHeight;

			mask.animate({height:0}, 0.35, 'easeOut',function(){mask.css('display','none');})
			con.animate({top : -conHeight}, 0.3, 'easeOut');
			this.conShow = false;		 
		}
	});

	S.XZG.Main = Main;
});

KISSY.ready(function(S){
	new S.XZG.Main();
});
