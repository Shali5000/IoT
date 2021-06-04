// import chartjsChartRadialGauge from "https://cdn.skypack.dev/chartjs-chart-radial-gauge@1.1.0";
var socket = io.connect();

const dangerColor = '#eb4d4b'
const warningColor = '#f0932b'
const successColor = '#6ab04c'
const primaryColor = '#4834d4'

const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLight = 'light'

var change_color = {
	dangerColor : '#eb4d4b',
	successColor : '#6ab04c',
	warningColor : '#f0932b'
}

const body = document.getElementsByTagName('body')[0]

function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = "expires="+d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
  var name = cname + "="
  var ca = document.cookie.split(';')
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

loadTheme()

function loadTheme() {
	var theme = getCookie(themeCookieName)
	body.classList.add(theme === "" ? themeLight : theme)
}

function switchTheme() {
	if (body.classList.contains(themeLight)) {
		body.classList.remove(themeLight)
		body.classList.add(themeDark)
		setCookie(themeCookieName, themeDark)
	} else {
		body.classList.remove(themeDark)
		body.classList.add(themeLight)
		setCookie(themeCookieName, themeLight)
	}
}

function collapseSidebar() {
	body.classList.toggle('sidebar-expand')
}

// window.onclick = function(event) {
// 	openCloseDropdown(event)
// }

// function closeAllDropdown() {
// 	var dropdowns = document.getElementsByClassName('dropdown-expand')
// 	for (var i = 0; i < dropdowns.length; i++) {
// 		dropdowns[i].classList.remove('dropdown-expand')
// 	}
// }

// function openCloseDropdown(event) {
// 	if (!event.target.matches('.dropdown-toggle')) {
// 		// 
// 		// Close dropdown when click out of dropdown menu
// 		// 
// 		closeAllDropdown()
// 	} else {
// 		var toggle = event.target.dataset.toggle
// 		var content = document.getElementById(toggle)
// 		if (content.classList.contains('dropdown-expand')) {
// 			closeAllDropdown()
// 		} else {
// 			closeAllDropdown()
// 			content.classList.add('dropdown-expand')
// 		}
// 	}
// }

////////////////////////////////////////////////////////////////////////////\

// var trend_chart = document.getElementById('trend-chart')
// // trend_chart.height = 500
// // trend_chart.width = 500
// var trend_chart_data = {
// 	labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
// 	datasets: [
// 		{
// 		fill: false,
// 		label: 'Trend',
// 		borderColor: successColor,
// 		data: [0, 10, 40, 60, 50, 80, 90, 100, 30, 50, 90, 100],
// 		borderWidth: 2,
// 		lineTension: 0,
// 	}
// ]
// }

// var trend_chart = new Chart(trend_chart, {
// 	type: 'line',
// 	data: trend_chart_data,
// 	options: {
// 		maintainAspectRatio: false,
// 		bezierCurve: false,
// 	}
// })


// var ctx = document.getElementById('myChart')
var trend_chartx = document.getElementById('trend-chart')
trend_chartx.height = 205;
trend_chartx.width = 300;
var trend_chart = new Chart(trend_chartx, {
    type: 'line',
    data: {
    labels: [],
    datasets: [{
        label: "Production Trend",
        borderColor: successColor,
        data: [],
        fill: false,
        // pointStyle: 'circle',
        // backgroundColor: '#3498DB',
        pointRadius: 0,
        // pointHoverRadius: 7,
        borderWidth: 2,
        lineTension: 0.1,
    }]
    },
    options: {
        maintainAspectRatio: false,
        bezierCurve: false,
    }
    
});

////////////////////////////////////////////////////////////////////////////

Chart.defaults.global.defaultFontFamily = "Verdana";

var oee_chartx = document.getElementById('oee-chart').getContext("2d")
var oee_gradientStroke = oee_chartx.createLinearGradient(500, 200, 100, 0);
oee_gradientStroke.addColorStop(0, "#80b6f4");
oee_gradientStroke.addColorStop(1, "#f49080");
// var data_oee = {
// 	labels: ["OEE"],
// 	datasets: [
// 		{
// 		fill: false,
// 		label: 'OEE',
// 		backgroundColor: [oee_gradientStroke],
// 		data: [40],
// 		borderWidth: 0,
// 		lineTension: 0
// 	}
// ]
// }

var oee_chart = new Chart(oee_chartx, {
	type: 'radialGauge',
	data: {
		labels: ["OEE"],
		datasets: [
			{
			data: [0],
			fill: false,
			label: 'OEE',
			backgroundColor: [oee_gradientStroke],
			borderWidth: 0,
			lineTension: 0
		}
	]
	},
	options: {
		maintainAspectRatio: false,
		bezierCurve: false,
		responsive: true,
		legend: {},
		centerArea: {
			// text: data_oee[0],
			subText: '%',
		},
		centerPercentage: 80
	}
})

///////////////////////////////

// var ctx2 = document.getElementById('myChart2')
// ctx2.height = 300;
// ctx2.width = 500;
// var chartx = new Chart(ctx2, {
//     type: 'doughnut',
//     data: {
//         labels: ["Hourly Cap", "Hourly Plug", "Hourly Refil"],
//         datasets: [{
//             label: "Test",
//             data: [],
//             backgroundColor: [
//                 'rgba(255, 153, 102, 1)',
//                 'rgba(198, 201, 202, 1)',
//                 'rgba(128, 116, 110, 1)',
//             ],
//             borderColor: [
//                 'rgba(255, 153, 102, 1)',
//                 'rgba(198, 201, 202, 1)',
//                 'rgba(128, 116, 110, 1)',
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         title: {
//             display: true,
//             text: "Product Rejection Doughnut Chart"
//         },
//         animation: {
// 			animateScale: true,
// 			animateRotate: true
// 		},
//         responsive: true,
//         maintainAspectRatio: false,
        
//         legend: {
// 		    position: 'right',
//             labels:{
//                 boxWidth: 10,
//                 padding: 12
//             }
// 		},
//     }
// });

////////////////////////////////////////////////////////////////////////////

var ava_chart = document.getElementById('ava-chart').getContext("2d");
var ava_gradientStroke = ava_chart.createLinearGradient(500, 0, 100, 0);
ava_gradientStroke.addColorStop(0, "#80b6f4");
ava_gradientStroke.addColorStop(1, "#f49080");
// ctx.height = 500
// ctx.width = 500
// var data_ava = {
// 	labels: ["Availability"],
// 	datasets: [
// 		{
// 		fill: false,
// 		label: 'Availability',
// 		backgroundColor: [ava_gradientStroke],
// 		data: [70],
// 		borderWidth: 0,
// 		lineTension: 0,
// 	}
// ]
// }

var ava_chart = new Chart(ava_chart, {
	type: 'radialGauge',
	data: {
		labels: ["Availability"],
		datasets: [
			{
			fill: false,
			label: 'Availability',
			backgroundColor: [ava_gradientStroke],
			data: [0],
			borderWidth: 0,
			lineTension: 0,
		}
	]
	},
	options: {
		maintainAspectRatio: false,
		bezierCurve: false,
		responsive: true,
		legend: {},
		title: {
			display: true,
			text: "Availability"
		}, 
		centerArea: {
			// text: data_ava[0],
			subText: '%',
		},
		centerPercentage: 80
	}
})

////////////////////////////////////////////////////////////////////////////

var per_chart = document.getElementById('per-chart').getContext("2d");
var pre_gradientStroke = per_chart.createLinearGradient(500, 0, 100, 0);
pre_gradientStroke.addColorStop(0, "#80b6f4");
pre_gradientStroke.addColorStop(1, "#f49080");
// ctx.height = 500
// ctx.width = 500
// var data_pre = {
// 	labels: ["Performance"],
// 	datasets: [
// 		{
// 		fill: false,
// 		label: 'Performance',
// 		backgroundColor: [pre_gradientStroke],
// 		data: [60],
// 		borderWidth: 0,
// 		lineTension: 0,
// 	}
// ]
// }

var per_chart = new Chart(per_chart, {
	type: 'radialGauge',
	data: {
		labels: ["Performance"],
		datasets: [
			{
			fill: false,
			label: 'Performance',
			backgroundColor: [pre_gradientStroke],
			data: [0],
			borderWidth: 0,
			lineTension: 0,
		}
	]
	},
	options: {
		maintainAspectRatio: false,
		bezierCurve: false,
		responsive: true,
		legend: {},
		title: {
			display: true,
			text: "Performance"
		}, 
		centerArea: {
			// text: data_pre[0],
			subText: '%',
		},
		centerPercentage: 80
	}
})

////////////////////////////////////////////////////////////////////////////

var qua_chart = document.getElementById('qua-chart').getContext("2d");
var qua_gradientStroke = qua_chart.createLinearGradient(500, 0, 100, 0);
qua_gradientStroke.addColorStop(0, "#80b6f4");
qua_gradientStroke.addColorStop(1, "#f49080");
// ctx.height = 500
// ctx.width = 500
// var data_qua = {
// 	labels: ["Quality"],
// 	datasets: [
// 		{
// 		fill: false,
// 		label: 'Quality',
// 		backgroundColor: [qua_gradientStroke],
// 		data: [80],
// 		borderWidth: 0,
// 		lineTension: 0,
// 	}
// ]
// }

var qua_chart = new Chart(qua_chart, {
	type: 'radialGauge',
	data: {
		labels: ["Quality"],
		datasets: [
			{
			fill: false,
			label: 'Quality',
			backgroundColor: [qua_gradientStroke],
			data: [0],
			borderWidth: 0,
			lineTension: 0,
		}
	]
	},
	options: {
		maintainAspectRatio: false,
		bezierCurve: false,
		responsive: true,
		legend: {},
		title: {
			display: true,
			text: "Quality"
		}, 
		centerArea: {
			// text: data_qua[0],
			subText: '%',
		},
		centerPercentage: 80
	}
})

////////////////////////////////////////////////////////////////////////////

// var updatedDataSet;
// var colouarray = [
// 	'rgba(255, 99, 132, 0.2)',
// 	'rgba(54, 162, 235, 0.2)',
// 	'rgba(255, 206, 86, 0.2)',
// 	'rgba(75, 192, 192, 0.2)',
// 	'rgba(153, 102, 255, 0.2)',
// 	'rgba(255, 159, 64, 0.2)',
// 	'rgba(255, 99, 132, 0.2)',
// 	'rgba(54, 162, 235, 0.2)',
// 	'rgba(255, 206, 86, 0.2)',
// 	'rgba(75, 192, 192, 0.2)',
// 	'rgba(153, 102, 255, 0.2)',
// 	'rgba(255, 159, 64, 0.2)'
//   ];

// var bar_chart = document.getElementById("bar-chart");
// bar_chart.height = 185
// bar_chart.width = 400
// var bar_chart = new Chart(bar_chart, {
//   type: 'bar',
//   data: {
//     labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
//     datasets: [{
//       	label: 'Hours',
//       	data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 		backgroundColor: [
// 			'rgba(255, 99, 132, 0.2)',
// 			'rgba(54, 162, 235, 0.2)',
// 			'rgba(255, 206, 86, 0.2)',
// 			'rgba(75, 192, 192, 0.2)',
// 			'rgba(153, 102, 255, 0.2)',
// 			'rgba(255, 159, 64, 0.2)',
// 			'rgba(255, 99, 132, 0.2)',
// 			'rgba(54, 162, 235, 0.2)',
// 			'rgba(255, 206, 86, 0.2)',
// 			'rgba(75, 192, 192, 0.2)',
// 			'rgba(153, 102, 255, 0.2)',
// 			'rgba(255, 159, 64, 0.2)'
// 		],
//       	borderWidth: 0
//     }]
//   },
//   options: {
//     responsive: false
//   }
// });

var labelsx = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
var colouarray = [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
			];

var initialData = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
var updatedDataSet;

var bar_chartx = document.getElementById("bar-chart");
bar_chartx.height = 185;
bar_chartx.width = 400;
var barChart = new Chart(bar_chartx, {
type: 'bar',
data: {
	labels: labelsx,
	datasets: [{
		backgroundColor: colouarray,
		label: 'Hours',
		data: initialData
	}]
},
options: {
	responsive: false,
	// scales: {
	// yAxes: [{
	// 	ticks: {
	// 	beginAtZero: true,
	// 	min: 0,
	// 	max: 100,
	// 	stepSize: 10,
	// 	}
	// }]
	// }
}
});

////////////////////////////////////////////////////////////////////////////

var rej_chart = document.getElementById('rej-chart')
// rej_chart .height = 250;
// rej_chart .width = 500;
var rej_chart = new Chart(rej_chart , {
    type: 'doughnut',
    data: {
        labels: ["Refill", "Stopper", "Cap"],
        datasets: [{
            label: "Test",
            data: [],
            backgroundColor: [
                'rgba(255, 153, 102, 1)',
                'rgba(198, 201, 202, 1)',
                'rgba(128, 116, 110, 1)',
            ],
            borderColor: [
                'rgba(255, 153, 102, 1)',
                'rgba(198, 201, 202, 1)',
                'rgba(128, 116, 110, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        animation: {
			animateScale: true,
			animateRotate: true
		},
        responsive: true,
        maintainAspectRatio: false,
        
        legend: {
		    position: 'left',
            labels:{
                boxWidth: 10,
                padding: 12
            }
		},
    }
});

////////////////////////////////////////////////////////////////////////////

var stop_chart = document.getElementById('stop-chart')
// stop_chart.height = 250;
// stop_chart.width = 500;
var stop_chart = new Chart(stop_chart, {
    type: 'doughnut',
    data: {
        labels: ["Air", "Cap", "Stopper", "Refil", "label", "Count"],
        datasets: [{
            label: "Test",
            data: [],
            backgroundColor: [
                'rgba(255, 153, 102, 1)',
                'rgba(198, 201, 202, 1)',
                'rgba(128, 116, 110, 1)',
				'rgba(128, 255, 110, 1)',
				'rgba(128, 255, 255, 1)',
				'rgba(240, 255, 110, 1)'

            ],
            borderColor: [
                'rgba(255, 153, 102, 1)',
                'rgba(198, 201, 202, 1)',
                'rgba(128, 116, 110, 1)',
            ],
            borderWidth: 1,
			hoverOffset: 20
        }]
    },
    options: {
        animation: {
			animateScale: true,
			animateRotate: true
		},
        responsive: true,
        maintainAspectRatio: false,
        
        legend: {
		    position: 'left',
            labels:{
                boxWidth: 10,
                padding: 12
            }
		},
    }
});

function inRange(x, min, max) {
	return ((x-min)*(x-max) <= 0);
}

socket.on('json', function(data) { 
    // document.getElementById('hourlyProduction').innerHTML = data.hourlyProduction;
    // document.getElementById('OMRON_CP1H_1_DW0').innerHTML = data.OMRON_CP1H_1_DW0;
    // document.getElementById('shiftProduction').innerHTML = data.shiftProduction;

    // document.getElementById('hourlyCap').innerHTML = data.hourlyCap;
    // document.getElementById('hourlyPlug').innerHTML = data.hourlyPlug;
    // document.getElementById('hourlyRefil').innerHTML = data.hourlyRefil;

    if(trend_chart.data.labels.length != 1200) {
        trend_chart.data.labels.push(data.time);
        trend_chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data.OMRON_CP1H_1_DW0);
        });
    }
    else {
        trend_chart.data.labels.shift();
        trend_chart.data.labels.push(data.time);
        trend_chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
            dataset.data.push(data.OMRON_CP1H_1_DW0);
        });
    }
    trend_chart.update();

	var danger = 40;

	oee_chart.data.datasets[0].data[0] = data.oeeHourly;
	if(oee_chart.data.datasets[0].data[0] < danger){
		oee_chart.data.datasets[0].backgroundColor = change_color.dangerColor;
	}
	else if(inRange(oee_chart.data.datasets[0].data[0], 40, 75)){
		oee_chart.data.datasets[0].backgroundColor = change_color.warningColor;
	}
	else{
		oee_chart.data.datasets[0].backgroundColor = change_color.successColor;
	}
	oee_chart.update();

	ava_chart.data.datasets[0].data[0] = data.availHourly;
	if(ava_chart.data.datasets[0].data[0] < danger){
		ava_chart.data.datasets[0].backgroundColor = change_color.dangerColor;
	}
	else if(inRange(ava_chart.data.datasets[0].data[0], 40, 75)){
		ava_chart.data.datasets[0].backgroundColor = change_color.warningColor;
	}
	else{
		ava_chart.data.datasets[0].backgroundColor = change_color.successColor;
	}
	ava_chart.update();

	per_chart.data.datasets[0].data[0] = data.perHourly;
	if(per_chart.data.datasets[0].data[0] < danger){
		per_chart.data.datasets[0].backgroundColor = change_color.dangerColor;
	}
	else if(inRange(per_chart.data.datasets[0].data[0], 40, 75)){
		per_chart.data.datasets[0].backgroundColor = change_color.warningColor;
	}
	else{
		per_chart.data.datasets[0].backgroundColor = change_color.successColor;
	}
	per_chart.update();

	qua_chart.data.datasets[0].data[0] = data.qualHourly;
	if(qua_chart.data.datasets[0].data[0] < danger){
		qua_chart.data.datasets[0].backgroundColor = change_color.dangerColor;
	}
	else if(inRange(qua_chart.data.datasets[0].data[0], 40, 75)){
		qua_chart.data.datasets[0].backgroundColor = change_color.warningColor;
	}
	else{
		qua_chart.data.datasets[0].backgroundColor = change_color.successColor;
	}
	qua_chart.update();

    rej_chart.data.datasets[0].data[0] = data.hourlyRefil;
    rej_chart.data.datasets[0].data[1] = data.hourlyPlug;
    rej_chart.data.datasets[0].data[2] = data.hourlyCap;
    rej_chart.update();

	stop_chart.data.datasets[0].data[0] = data.hourlyAirStop;
    stop_chart.data.datasets[0].data[1] = data.hourlyCapStop;
    stop_chart.data.datasets[0].data[2] = data.hourlyStopperStop;
	stop_chart.data.datasets[0].data[3] = data.hourlyRefilStop;
	stop_chart.data.datasets[0].data[4] = data.hourlyLabelStop;
	stop_chart.data.datasets[0].data[5] = data.hourlyCountStop;
    stop_chart.update();

	/*Function to update the bar chart*/
	function updateBarGraph(chart, label, color, data) {
		chart.data.datasets.pop();
		chart.data.datasets.push({
			label: label,
			backgroundColor: color,
			data: data
		});
		chart.update();
	}
  
	updatedDataSet = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
	updateBarGraph(barChart, 'Prediction', colouarray, updatedDataSet);

});