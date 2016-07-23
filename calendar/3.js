$(function(){
	
	//ready  DOM加载完成才执行里面的代码
	
	function riliFn(options,that){

		this.setting = {
			weekDays: ['一', '二', '三', '四', '五', '六','日'],
			Css:{
				background:'#272c3d'
			}
		}
		//background:#272c3d;
		$.extend(this.setting,options);
		this.createDom(that);
		this.createCss();
		
		that.css(this.setting.Css);
		
		this.timer = null;
		
		this.time1 = that.find('#time1'); //第一行的时间
		
		this.timer2 = that.find('#time2');//2016年6月15日,星期三
		
		this.timer3 = that.find('#time3');
		
		this.porn = that.find('#porn');
		
		this.spans = this.porn.children();
		
		this.num = 0; //默认为当前月
		
		
		this.dateBox = that.find('#dateBox');//放日历的ul
		
		this.day = 42;
		
		
		
		//console.log(this.time1 );
		

		this.setTime1();
		this.setTime2();
		this.setTime3();
		this.createDay(that);
		this.nextFn();
		this.prevFn();
		
		
	}
	
	riliFn.prototype = {
		constructor : riliFn,
		createDom:function(that){
			/*
				生成结构 
			*/
			that.html('');
			var html = '<p id="time1"></p>'+
			'<p id="time2"></p>'+
			'<header>'+
				'<p id="time3"></p>'+
				'<div id="porn">'+
					'<span>上</span>'+
					'<span>下</span>'+
				'</div>'+
			'</header>'+
			'<ol id="dayBox">';
			
			for(var i=0;i<this.setting.weekDays.length;i++){
				html+='<li>'+this.setting.weekDays[i]+'</li>';
			}
			
			html+='</ol>'+
			'<ul id="dateBox"></ul>';
			that.append(html);
		},
		createCss:function(){
			var Link = $('<link rel="stylesheet" href="1.css" />')
			Link.appendTo($('head'));
		},
		Hfs:function(){
			//获取时分秒
			var oDate = new Date();
			var iFull = oDate.getFullYear();
			var iMon = oDate.getMonth()+1;
			var iHour = oDate.getHours();
			var iMiu = oDate.getMinutes();
			var iS = oDate.getSeconds();
			var iDate = oDate.getDate();
			var iDay = oDate.getDay();
			
			return {
				y:iFull,
				m:this.toDou(iMon),
				h:this.toDou(iHour),
				s:this.toDou(iS),
				f:this.toDou(iMiu),
				r:this.toDou(iDate),
				d:iDay
			}
		},
		setTime1:function(){
			//debugger
			//timer1的时间
			var _this = this;
			
			function timer(){
				var time = _this.Hfs();
				
				_this.time1.html(time.h + ':' + time.f + ':' +time.s); 
			}
			timer();
			this.timer = setInterval(timer,1000);
		},
		setTime2:function(){
			//timer2的时间
			var time = this.Hfs();
			this.timer2.html(time.y+'年'+time.m+'月'+time.r+'日,星期'+this.setting.weekDays[time.d]);
		},
		toDou:function(n){
			return n<10?'0'+n:''+n;
		},
		createDay:function(){
			
			this.dateBox.html('');//清空内容
			//查看一个月的1号是周几？
			var weekDay = new Date();
			weekDay.setMonth(weekDay.getMonth()+this.num);
			weekDay.setDate(1);  //这个月的1号是周5
			var w = weekDay.getDay();
			//if(w == 0)w = 7;
			(w == 0) && (w = 7);
//			if(w == 0){
//				w = 7;
//			}
			w--; //如果是周5循环4次就可以了
//			

			/*
				找到上个月的最后一天是多少？
				
				30 - 4 = 26    27,28,29,30
			*/
			
			//设置上个月的最后一天
			weekDay.setDate(0);
			
			//拿到上个月有多少天。
			var oldDate = weekDay.getDate();
			
			var oldNiuMang = oldDate - w; 
			
			//console.log(weekDay.getDate())
			
			for(var i=0;i<w;i++){
				$('<li class="gray">'+(++oldNiuMang)+'</li>').appendTo(this.dateBox);
			}

			
			
			//获取当前月份的天数
			
			var oDate = new Date();
			oDate.setMonth(oDate.getMonth()+(this.num+1),0); //这个月的时间
			var days = oDate.getDate();
			
			for(var i=0;i<days;i++){
				$('<li>'+(i+1)+'</li>').appendTo(this.dateBox);
			}
			
			/*
				生成下个月一部分日期 
			*/
			var nextDate = this.day - this.dateBox.children().length;
			for(var i=0;i<nextDate;i++){
				$('<li class="gray">'+(i+1)+'</li>').appendTo(this.dateBox);
			}
			
			//console.log(nextDate)
		},
		setTime3:function(){
			var oDate = new Date();
			oDate.setMonth(oDate.getMonth()+this.num)
			
			
			this.timer3.html(oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月');
		},
		nextFn:function(){
			var _this = this;
			this.spans.eq(1).on('click',function(){
				//alert(1)
				_this.num++;
				_this.createDay();
				_this.setTime3();
			});
		},
		prevFn:function(){
			var _this = this;
			this.spans.eq(0).on('click',function(){
				_this.num--;
				_this.createDay();
				_this.setTime3();
			});
		}
 	}
	
	
	
	$.fn.extend({
		rili:function(opt){
			new riliFn(opt,this);
		}
	});
	
	
	
});

