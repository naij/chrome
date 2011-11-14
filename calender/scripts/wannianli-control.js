/**
 * 万年历控制器
 * time 2011-11-03
 * create wangjian	wolongxzg@gmail.com
 */
function wannianliControl(){
	this._init();
}

wannianliControl.prototype = {
	
	_init : function(){
		var Today = new Date(),
			tY = parseInt(Today.getFullYear()),
			tM = parseInt(Today.getMonth()),
			tD = parseInt(Today.getDate());

		//日期浮层
		this.pop = new popMsg();
		//渲染日历
		this.renderDate(tY, tM);
		//渲染notes
		this.renderNotes();
		//绑定事件
		this.bindUI();
	},

	renderDate : function(year, month){
		
		var Today = new Date(),
			tY = parseInt(Today.getFullYear()),
			tM = parseInt(Today.getMonth()),
			tD = parseInt(Today.getDate());
					 
		//实例化日历
		this.cld = new calendar(year, month, tY, tM, tD);

		var	I, J, j = 1,
			cld = this.cld,
			firstWeek = cld.firstWeek,
			monthLength = cld.length,
			dateBox = $("#J_dates"),
			totalDay = Math.ceil((firstWeek + monthLength) / 7) * 7,
			dateList = [], self = this;
		
		//初始化页头
		$('#sy').text(year);
		$('#sm').text(month + 1);
		$('#gz').text('农历' + cyclical(year - 1900 + 36) + '年');
		$('#J_dateHeader').removeClass();
		$('#J_dateHeader').addClass('lunar-box sx' + (year - 4) % 12);
		$('#J_dateHeader').attr('title',Animals[(year - 4) % 12] + "年");

		//初始化日期框架
		for (var i = 0;i < totalDay; i++) {
			dateList.push('<li><div class="inner"><i class="note-icon"></i></div></li>');
		}
		dateBox.html(dateList.join(''));
		
		$('#J_dates li').each(function(index){
			var inner = $(this).find('.inner'),
				startDay = index - firstWeek;

			if(index >= firstWeek && j < monthLength + 1){
				$(this).attr('index',year + '-' + (month + 1) + "-" + j);
				inner.append('<em>' + j + '</em>');
				
				j++;

				if (cld[startDay].isToday) {
					$(this).addClass('today');
				}

				if(self.isNote($(this).attr('index'))){
					$(this).addClass('note');
				}

				var S = "";
				if (cld[startDay].lDay == 1) {
					S = "<b>" + (cld[startDay].isLeap ? "\u95f0" : "") + cld[startDay].lMonth + "\u6708" + (monthDays(cld[startDay].lYear, cld[startDay].lMonth) == 29 ? "\u5c0f" : "\u5927") + "</b>";
				} else {
					S = cDay(cld[startDay].lDay);
				}
				I = cld[startDay].lunarFestival;
				if (cld[startDay].lMonth == "4" && I.indexOf("\u7aef\u5348\u8282") != -1) {
					I = "";
					cld[startDay].lunarFestival = ""
				}
				if (I.length > 0) {
					if (I.length > 7) {
						I = I.substr(0, 5) + "\u2026"
					}
					I = I.fontcolor("#909090");
				} else {
					I = cld[startDay].solarFestival;
					if (I.length > 0) {
						J = (I.charCodeAt(0) > 0 && I.charCodeAt(0) < 128) ? 9 : 5;
						if (I.length > J + 1) {
							I = I.substr(0, J - 1) + "\u2026"
						}
						I = I.fontcolor("#909090");
					} else {
						I = cld[startDay].solarTerms;
						if (I.length > 0) {
							I = I.fontcolor("#ff7200")
						}
					}
				}
				if (I.length > 0) {
					S = I
				}

				inner.append('<p>' + S + '</p>');

				$(this).attr("jr", cld[startDay].solarFestival ? cld[startDay].solarFestival : cld[startDay].solarTerms ? cld[startDay].solarTerms : cld[startDay].lunarFestival ? cld[startDay].lunarFestival : "");
				var N = $(this).attr("jr").replace(/^\s+|\s+$/g, "");
				var M = $(this).find("font").length && $(this).find("font").html().replace(/^\s+|\s+$/g, "");
				var D = typeof (BG_DATA[N]) != "undefined" ? BG_DATA[N] : typeof (BG_DATA[M]) != "undefined" ? BG_DATA[M] : false;
				if (D) {
					inner.css('background-img',D);
				}
			}

			//鼠标点击
			self.dateSelect(this,index);
			//鼠标滑过
			self.dateHover(this,self.cld);
		});		
		
		//保存今天
		this.curDate = tY + '-' + (tM + 1) + '-' + tD;
	},

	renderNotes : function(){
		$('#note-list').addClass('ks-hidden');
		$('#note-none').addClass('ks-hidden');
		$('#note-create').addClass('ks-hidden');
					  
		var curDate = this.curDate,
			curNote = this.getInfo(),
			tY = curDate.split('-')[0],
			tM = curDate.split('-')[1],
			tD = curDate.split('-')[2];

		if(curNote){
			curNote = $.parseJSON(curNote);
			
			$('#note-date').text(tY + '年' + tM + '月' + tD + '日');
			$('#note-theme').text(curNote.theme);
			$('#note-content').text(curNote.content);
			$('#note-list').removeClass('ks-hidden');
		}
		else{
			$('#note-none').removeClass('ks-hidden');
		}
	},

	bindUI : function(){
		var self = this,
			dateBtn = ['J_preYear','J_nextYear','J_preMonth','J_nextMonth','J_curDay'];

		//日期导航
		$.each(dateBtn,function(i,n){
			$('#' + n).click(function(e){
				e.preventDefault();
				self.dateChange($(this).attr('dateType'));
			});
		});

		//事件修改
		$('#J_editNote').click(function(e){
			var curDate = self.curDate,
				curNote = self.getInfo();

			curNote = $.parseJSON(curNote);
			var tY = curDate.split('-')[0],
				tM = curDate.split('-')[1],
				tD = curDate.split('-')[2];				

			$('#note-date-input').text(tY + '年' + tM + '月' + tD + '日');
			$('#note-theme-input').val(curNote.theme);
			$('#note-content-input').val(curNote.content);

			$('#note-list').addClass('ks-hidden');
			$('#note-create').removeClass('ks-hidden');
		});

		//事件删除
		$('#J_deleteNote').click(function(){
			var curDate = self.curDate,
				index = self.index;

			self.delInfo(curDate);
			self.renderNotes();

			//移除相应li上note class
			$($('#J_dates li')[index]).removeClass('note');
		});

		//事件创建
		$('#J_createNote').click(function(e){
			var curDate = self.curDate;
			
			var tY = curDate.split('-')[0],
				tM = curDate.split('-')[1],
				tD = curDate.split('-')[2];				

			$('#note-date-input').text(tY + '年' + tM + '月' + tD + '日');
			$('#note-theme-input').val('');
			$('#note-content-input').val('');

			$('#note-none').addClass('ks-hidden');
			$('#note-create').removeClass('ks-hidden');
		});

		//事件保存
		$('#J_saveNote').click(function(e){
			var index = self.index,
				noteDate = self.curDate,
				noteTheme = $('#note-theme-input').val(),
				noteContent = $('#note-content-input').val();
			
			if(noteTheme == ''){
				alert("请输入主题");
			}
			else if(noteContent == ''){
				alert("请输入内容");
			}
			else if(noteTheme.replace(/[^\x00-\xFF]/g,'**').length > 20){
				alert("主题最多20个字符（10个汉字）");
			}
			else if(noteContent.replace(/[^\x00-\xFF]/g,'**').length > 260){
				alert("主题最多260个字符（130个汉字）");
			}
			else{
				self.setInfo(noteDate,'{"theme":"' + noteTheme + '","content":"' + noteContent + '"}');
				self.renderNotes();

				//将相应的li加上note class
				$($('#J_dates li')[index]).addClass('note');
			}
		});

		//事件取消
		$('#J_cancleNote').click(function(e){
			self.renderNotes();
		});

	},

	dateChange : function(dateType){
		var sy = $('#sy'),
			sm = $('#sm'),
			isy = parseInt(sy.text()),
			ism = parseInt(sm.text());
							 
		switch (dateType) {
			case "YU":
				if (isy > 1900) {
					sy.text(isy - 1);
				}
				break;
			case "YD":
				if (isy < 2049) {
					sy.text(isy + 1);
				}
				break;
			case "MU":
				if (ism > 1) {
					sm.text(ism - 1);
				} else {
					sm.text(12);
					if (isy > 1900) {
						sy.text(isy - 1);
					}
				}
				break;
			case "MD":
				if (ism < 12) {
					sm.text(ism + 1);
				} else {
					sm.text(1);
					if (isy < 2049) {
						sy.text(isy + 1)
					}
				}
				break;
			case "CUR":
				var today = new Date();
				var tY = today.getFullYear();
				var tM = today.getMonth();
				var tD = today.getUTCDate();
				sm.text(tM + 1);
				sy.text(tY);
				break
		}

		this.renderDate(parseInt(sy.text()),parseInt(sm.text())-1);
	},

	dateSelect : function(node,index){
		var self = this;
					 
		$(node).click(function(e){
			$('#J_dates li').removeClass('selected');

			if($(this).hasClass('selected')){
				$(this).removeClass('selected');
			}
			else{
				$(this).addClass('selected');
			}

			self.curDate = $(this).attr('index');
			self.index = index;
			self.renderNotes();
		});			 
	},

	dateHover : function(node,cld){
		var self = this;
					
		$(node).hover(
			function(e){
				$(this).addClass('mouseover');
				if($(this).attr('index')){
					self.pop.show($(this),cld);
				}
			},
			function(e){
				$(this).removeClass('mouseover');
				self.pop.hide();
			}
		);			
	},

	isNote : function(curDate){
		for(var i = 0 ; i < localStorage.length ; i ++){
			if(curDate == localStorage.key(i)){
				return true;
			}
		}
		return false;
	},

	//获取note
	getInfo : function(){
		return localStorage.getItem(this.curDate);		  
	},

	//设置note
	setInfo : function(curDate,note){
		localStorage.setItem(curDate, note);		   
	},

	//删除note
	delInfo : function(curDate){
		localStorage.removeItem(curDate);	  
	}

}

/**
 * 日期浮层
 * time 2011-11-03
 */
function popMsg(){
	this._init();
}

popMsg.prototype = {
	
	_init : function(){
		this.con = $('<div>');
		$('body').append(this.con);
		this.con.css({
            'top':'0px',
            'position':'absolute',
            'visibility':'hidden'
        });
		this.con.addClass('pop-common pop-wnl');

		this.render();
	},

	render : function(){
		var pop = [];
        pop.push('<div class="content">');
        pop.push('<div class="pop-arr-wrap"><div class="arr-top-bg"></div><div class="arr-top"></div></div>');
        pop.push('<div class="pop-content"></div>');
        pop.push("</div>");
        this.con.append(pop.join(""));		 
	},

	renderDate : function(curLi,cld){
		var curDate = curLi.attr("index");
        if (curDate) {
            var I = curDate.split("-");
            var y = I[1];
            var m = I[2];
            var L = cld[m - 1];
            var J = [];
            J.push('<p class="jieri-info">' + ('<b style="color:#359b12; font-weight:normal;">' + L.solarFestival + "</b>" + L.lunarFestival + L.solarTerms) + "</p>");
            J.push('<div class="date-infos ks-clear">');
            J.push('<em class="day">' + m + "</em>");
            J.push('<p class="guolli">' + L.sYear + "\u5e74" + L.sMonth + "\u6708" + L.sDay + "\u65e5&nbsp;&nbsp;\u661f\u671f" + L.week + "</p>");
            J.push('<p class="nongli">\u519c\u5386' + nStr1[L.lMonth] + "\u6708" + cDay(cld[m - 1].lDay) + "&nbsp;&nbsp;" + L.cYear + "\u5e74 &nbsp;&nbsp;" + L.cMonth + "\u6708&nbsp;&nbsp;" + L.cDay + "\u65e5</p>");
            J.push("</div>");
            this.con.find('.pop-content').html(J.join(""));
        }			 
	},

	show : function(curLi,cld){
		var G = curLi.offset(),self = this;
		this.renderDate(curLi,cld);
        this.con.offset({left: G.left - 10,top: G.top - 85});
		this.con.css('visibility', 'visible');
		this.con.find('.mask').css({'height':self.con.height() + 12,'width':self.con.width() + 12});
	},

	hide : function(){
		this.con.css('visibility', 'hidden');		   
	}
}

var wnl = new wannianliControl();

