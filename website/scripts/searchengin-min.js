/**
 * 搜索引擎
 * time 2011-11-13
 * create wangjian	wolongxzg@gmail.com
 */
KISSY.namespace('XZG.Searchengin')
KISSY.add('xzg-searchengin',function(S){

	function searchengin(){
		this._init();
	}

	S.augment(searchengin,S.EventTarget,{
		
		_init : function(){
			this.engin = {
				'baidu' : ['word','http://www.baidu.com/s'],
				'google' : ['q','http://www.google.com.hk/search'],
				'bing' : ['q','http://cn.bing.com/search']
			}

			this.con = S.one('#J_selectPanel');
			this.hand = S.one('#J_selectHandle');
			this.form = S.one('#J_searchForm');
			this.input = S.one('#J_searchInput');
			this.submit = S.one('#J_searchSubmit');

			this.render();
			this.bindUI();
		},

		render : function(){
					 
		},

		bindUI : function(){
			var self = this;

			this.hand.on("click", function(e) {
				self.toggle();
			});
			S.one("body").on("click", function(e) {
				if (S.one(e.target).attr("id") == 'J_selectPanel') {
					return;
				}
				if (S.one(e.target).attr("id") == 'J_selectHandle') {
					return;
				}
				if (S.one(e.target).parent().attr("id") == 'J_selectHandle') {
					return;
				}
				if (self.con.hasClass('ks-hidden')) {
					return;
				}
				var B = function(D, E) {
					return	D[0] > E[0].x &&
							D[0] < E[1].x && 
							D[1] > E[0].y && 
							D[1] < E[1].y;
				};
				if (!B(
						[e.pageX, e.pageY], 
						[{x: self.con.offset().left,y: self.con.offset().top}, {x: self.con.offset().left + self.con.width(),y: self.con.offset().top + self.con.height()}]
				)) {
					self.hide();
				}
			});

			this.con.all('li').each(function(node){
				node.on('click',function(){
					self.change(node);	
				});
			});

			this.submit.on('click',function(e){
				e.preventDefault();
				self.form[0].submit();
			});
			
		},

		change : function(node){
			var self = this;

			//切换className
			var curClass = node.attr('class');
			var prevClass = this.hand.attr('class');
			this.hand.replaceClass(prevClass,curClass);
			this.hide();

			//切换表单
			this.input.attr('name',self.engin[curClass][0]);
			this.form.attr('action',self.engin[curClass][1]);
		},

		toggle : function() {
			if (this.con.hasClass('ks-hidden')) {
				this.show();
			} else {
				this.hide();
			}
		},

		show : function(){
			this.con.removeClass('ks-hidden');
		},

		hide : function(){
			this.con.addClass('ks-hidden');		   
		}
	});

	S.XZG.Searchengin = searchengin;
},{requires:["core","event"]});

