$(function (){

	elSelfForm = $(".selfSet");
	M.init($("#box"));
	
})


var Calendar, M, elBox, elSelfForm;

Calendar = M = {

	_year: null,
	_month: null,
	_day: null,

	init: function (el){
		elBox = el;
		M._init();
		M.bindEvent();
		M.test();
	},
	test: function (){
		for(var i = 0; i<8; i++){
			var D = new Date();
			D.setDate(D.getDate() + i);
		}
	},

	_init: function (D){
		var D = D || new Date();
		var y = D.getFullYear(),
			m = D.getMonth()+1,
			d = D.getDate();
		M._year = y;
		M._month = m-1;
		M._day = d;
		$(".title", elBox).html(y+'-'+M.formatShow(m)+'-'+M.formatShow(d));

		var days = M.getDays(y,m,d);
		var prevDays = M.getDays(y, m-1, d);
		var firstDay = M.getFirstDay(y, m-1, d);


		var html = M.getShowDays(days, prevDays, firstDay);

		$('.tbody', elBox).html(html);
	},

	getShowDays: function (days, prevDays, firstDay){
		var arr = [];
		for(var i = firstDay-1; i>=0; i--){
			arr.push("<li class='gray'>"+(prevDays-i)+"</li>");
		}
		for(var j = 1; j<=days; j++){
			arr.push("<li>"+j+"</li>");
		}
		for(var k = 1, len = 35-arr.length; k<=len; k++){
			arr.push("<li class='gray'>"+k+"</li>");
		}
		return  arr.join('');
	},

	getFirstDay: function (y,m,d){
		var D = new Date(y, m, 1);
		return D.getDay();
	},

	getDays: function (y,m,d){
		var D = new Date(y,m,1);
		D.setHours(D.getHours() - 1);
		return D.getDate();
	},

	formatShow: function (n){
		return n < 10 ? '0'+n : n;
	},

	prevfn: function (){
		M._init(new Date(M._year, M._month-1, M._day))
	},

	nextfn: function (){
		M._init(new Date(M._year, M._month+1, M._day))
	},

	bindEvent: function (){
		elBox.on("click", ".prevBtn", M.prevfn);
		elBox.on("click", ".nextBtn", M.nextfn);

		$('.btn-sure').on("click", function (ev){
			ev.preventDefault();
			var arr = elSelfForm.serializeArray();
			for(var i = 0, len=arr.length; i<len; i++){
				var temp = arr[i];
				switch(i){
					case 0:
						if(!/^[1-9]\d{3,}$/.test(temp.value)){
							return alert("请输入正确的年");
						}
					break;

					case 1:
						if(!/^[1-9]\d?$/.test(temp.value)){
							return alert("请输入正确的月份");
						}else{
							if(+temp.value > 12){
								return alert("请输入正确的月份");
							}
						}
					break;

					case 2:
						if(!/^[1-9]\d?$/.test(temp.value)){
							return alert("请输入正确的天");
						}else{
							if(+temp.value > 31){
								return alert("请输入正确的天");
							}
						}
					break;
				}
			}

			M._init(new Date(arr[0].value, arr[1].value-1, arr[2].value))

		})
	}


}