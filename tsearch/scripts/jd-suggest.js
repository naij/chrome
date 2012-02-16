KISSY.namespace("S8.JDSuggest");
KISSY.add("s8-jdsuggest", function(S) {
	function JDSuggest(textInput, dataSource){
		this.input = S.one(textInput);
		this.bind();
	}
});


var Suggest = function(input,container){
			this.input = $(input);
			this.container = $(container);
			this.bind();
		};
		
		Suggest.prototype.bind = function(){

		var i = this.input,_this = this;
			i.keyup(function(event) {
			  _this.keyup(event)
			});
			$("body").click(function(event){
			  _this.container.css("display","none");
			})
			
		  };
		  Suggest.prototype.keyup = function(e){
			var ths=this.input,c=this.container,thv = ths.val();
			if(!ths.val()||e.keyCode==27||e.keyCode==13)
			{
				c.css("display","none");return;
			}
			if((e.keyCode==38||e.keyCode==40)&&tn!=0)
			{
				if(c.css("display")=="none")return;
				if(e.keyCode==38)
				{
					if(thn==0) thn=tn;
					else thn--;
				}
				else
				{
					if(thn==tn) thn=0;
					else thn++;
				}
						c.find("li").removeClass("thover")
				if(thn==tn){
						  ths.val(thv);
						}
				else{
						  $('#sn'+thn).addClass("thover");
						  ths.val($('#sn_val'+thn).html());
				}
			}
			else
			{
				this.loadjs()
			}
		  };
		  Suggest.prototype.loadjs = function(){
			var js = $("#"+jsid).remove();
			var src="http://suggest.taobao.com/sug?code=utf-8&callback=fbk&q="+this.input.val();
			  var b=document.createElement("script");
			  b.setAttribute("charset","utf-8");
			  b.setAttribute("type","text/javascript");
			  b.setAttribute("src",src);
			  b.id=jsid;
			  document.getElementsByTagName("head")[0].appendChild(b);
		  }
		  Suggest.prototype.callback = function(a)
		  {
			var b,d="",tp,e=a['result'];w=' 涓疂璐�',c =this.container,input = this.input;
			tn=e.length;
			thn=tn;
			if(!e || !tn){c.css("display","none");return}
			for(b=0;b<tn;b++)
			{
			  d+='<li id="sn'+b+'" class="dli" onmouseover="this.style.background=\'#0066CC\'" onmouseout="this.style.background=\'#FFF\';" onclick="select_suggest(\''+e[b][0]+'\');"><span id="sn_val'+b+'" class="tleft">';
			  d+=e[b][0]+'</span><span class="tright">绾� '+e[b][1]+w;
			  d+='</span></li>';
			}
			c.html('<ul class="suggest_list">'+d+'</ul><div class="tclose"><a onclick="this.parentNode.parentNode.style.display=\'none\';return false;" href="#">鍏抽棴</a> </div>');
			if(!c.attr("isshow")){
			  var p = input.position();
			  c.css({top:p.top + input.height(),left:p.left,width:input.width()})
			  c.attr("isshow",true);
			}
			c.css("display","block")
		  };
		  Suggest.prototype.selected = function(v){
			this.input.val(v);
			this.container.css("display","none");
		  };
		  var suggest = new Suggest("#q","#suggest");
		  window.fbk = function(a){suggest.callback(a)};
		  window.select_suggest = function(v){
			suggest.selected(v);
		  }
		});