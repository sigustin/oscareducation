dataArr = [[]];
labels = [[]];
colors = ['#0F408D','#6F1B75','#CA147A','#DA2228','#E8801B','#FCF302','#8DC922','#15993C','#87CCEE','#0092CE']



function chart_createPieChartStudent(del)//del is true if the method was called by deleteLastPie
{
	graphics = document.getElementsByClassName("chartQuestionStudent");
	var element;
	for(var i = 0;i<graphics.length;i++)
	{
		var type = $(graphics[i]).data( "chart-type" );
		if(type == "chart-piechart")
        {	
		    element = graphics[i];
		    var rawData = $(element).data( "chart-raw" );
		    var rawData2 = $(element).data( "chart-raw2" );
		    var rawData3 = $(element).data( "chart-raw3" );
		    element.id = "board"+i;
		    var r = {}; 
		    var box = [-5, 5, 5, -5];
		    var dataPoints = []
		
		    if(rawData2 != null)
		    {
		        rawData = chart_parse_orderedDictPie(rawData2);
		    }
		    if( rawData3 != null)
		    {
		        rawData = chart_parse_orderedDictPie(rawData3);
		    }
		    /*
		        if there is data given from the server, we must parse it.
		        We all write bad code, but if it works, it works.
		        Don't judge, morty.
		    */
		    if(rawData != undefined)
		    {
		        var test =String(rawData);
		        for(var temp = 0;temp<100;temp++) // I don't know why, but we must pass the regex as much as there answers
		           test = test.replace(/u'(?=[^:]+')/g, "'").replace(/'/g, '"').replace('u"', '"').replace("False", 'false').replace("True", 'true').replace('"{', '{').replace('}"', '}').replace('u"', '"')
		        var parsed =  JSON.parse(test);
		        r = parsed[0];
		        if(rawData2 != null)r = parsed;
		        if(rawData3 != null)r = parsed;
		        dataPoints = r.point
		    }
		    if(del == false)
		    {
				var sector = (($(".sector").eq(i).val())/360)*100;
				
				if(this.dataArr[i].reduce(function(a, b) { return a + b; }, 0)+sector>100){
					alert('la valeur entrée est trop grande ! Veuillez la réduire ou supprimer des portions précedentes');
					continue;
				}
				this.dataArr[i].push(sector)
				this.labels[i].push(' ')
		    }
		    
			var colorsChart = [];
			var labelsChart = [];
		    var sum = 0;
			var lastPortion = [];

			for(var j = 0;j<this.dataArr[i].length;j++)
			{
				colorsChart.push(colors[j%colors.length]);
				labelsChart.push(this.labels[i][j]);
				sum+=this.dataArr[i][j];
			}

			if(sum < 100)
			{
				lastPortion.push(100-sum);
				colorsChart.push('white');
				labelsChart.push(' ');
			}
		    board = JXG.JSXGraph.initBoard(element.id, {id:"chart-pieChartFromForm-"+i,showNavigation:false, showCopyright:false, boundingbox: box});
			board.containerObj.style.backgroundColor = 'white';
			board.options.label.strokeColor = 'black';
			board.suspendUpdate();
			let a = board.create('chart', this.dataArr[i].concat(lastPortion),
				{chartStyle:'pie',
				 colors:colorsChart,
				 fillOpacity:1, center:[0,0], strokeColor:'black', highlightStrokeColor:'black', strokeWidth:0,
				 labels:labelsChart,
				 highlightColors:['#E46F6A','#F9DF82','#F7FA7B','#B0D990','#69BF8E','#BDDDE4','#92C2DF','#637CB0','#AB91BC','#EB8EBF'],
				 highlightOnSector:false,
				 highlightBySize:false
				}
			);
			board.unsuspendUpdate();
		}
	}
}

function chart_createPieChartFromForm()
{
	graphics = document.getElementsByClassName("chartQuestionPiechart");
	var element;
	for(var i = 0;i<graphics.length;i++)
    {
  		var type = $(graphics[i]).data( "chart-type" );
		if(type == "chart-piechart")
	    {
			var sector = (($(".sector").eq(i).val())/360)*100;
			var label = $(".labelPie").eq(i).val();

			$(".sector").eq(i).val('');

			while(dataArr.length<=i)dataArr.push([]);
			while(labels.length<=i)labels.push([]);


			var sum = dataArr[i].reduce(function(a, b) { return a + b; }, 0);
			if(sector == undefined ||sector == null || sector == '')
			{
				continue;
			}
			if(sum+sector>100){
				alert('la valeur entrée est trop grande ! Veuillez la réduire ou supprimer des portions précedentes');
				continue;
			}

			this.dataArr[i].push(sector)
			this.labels[i].push(label)
	    	{
	    		create_pieChart(graphics[i],i);
	    	}
		}
	}
	chart_createPieChartStudent(false)
}

function create_pieChart(element,index)
{
	var colorsChart = [];
	var labelsChart = [];
	var sum = 0;
	var lastPortion = [];

	for(var i = 0;i<dataArr[index].length;i++)
	{
		colorsChart.push(colors[i%colors.length]);
		labelsChart.push(this.labels[index][i]);
		sum+=dataArr[index][i];
	}
	console.log(labelsChart);

	if(sum < 100)
	{
		lastPortion.push(100-sum);
		colorsChart.push('white');
		labelsChart.push(' ');
	}
	element.id = "board"+index;
	board = JXG.JSXGraph.initBoard(element.id, {id:"chart-pieChartFromForm-"+index,showNavigation:false, showCopyright:false, boundingbox: [-5, 5, 5, -5]});
	board.containerObj.style.backgroundColor = 'white';
	board.options.label.strokeColor = 'black';
	board.suspendUpdate();
	let a = board.create('chart', this.dataArr[index].concat(lastPortion),
		{chartStyle:'pie',
		 colors:colorsChart,
		 fillOpacity:1, center:[0,0], strokeColor:'black', highlightStrokeColor:'black', strokeWidth:0,
		 labels:labelsChart,
		 highlightColors:['#E46F6A','#F9DF82','#F7FA7B','#B0D990','#69BF8E','#BDDDE4','#92C2DF','#637CB0','#AB91BC','#EB8EBF'],
		 highlightOnSector:false,
		 highlightBySize:false
		}
	);
	board.unsuspendUpdate();

}

function chart_deleteLastPie(element)
{
    var index = $(".btn-deletePie").index(element);
	this.dataArr[index].pop()
	this.labels[index].pop()
	graphics = document.getElementsByClassName("chartQuestionStudent");	
	graphics2 = document.getElementsByClassName("chartQuestionPiechart");
	if(graphics.length == 0)
	{
		create_pieChart(document.getElementsByClassName("chartQuestionPiechart")[index],index)
	}
	else
	{
		chart_createPieChartStudent(true)
	}
}

function chart_getJSONPie(index)
{
    return JSON.stringify({
        "point":dataArr[index],
        "labels":labels[index]
    });
}

function chart_parse_orderedDictPie(orderedDictStr)
{
    return orderedDictStr.substring(orderedDictStr.indexOf("chart")+9,orderedDictStr.lastIndexOf('}')+1);
}
