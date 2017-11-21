dataArr = []
labels = []
colors = ['#0F408D','#6F1B75','#CA147A','#DA2228','#E8801B','#FCF302','#8DC922','#15993C','#87CCEE','#0092CE']
function chart_createPieChartFromForm()
{
	graphics = document.getElementsByClassName("chartQuestionValidation");
	var element;
	for(var i = 0;i<graphics.length;i++)
    {
  		var type = $(graphics[i]).data( "chart-type" );
		if(type == "chart-piechart")
	    {
			var sector = (($(".sector").eq(i).val())/360)*100
			var label = $(".labelPie").eq(i).val()
			var sum = dataArr.reduce(function(a, b) { return a + b; }, 0);
			if(sum+sector>100){
				alert('la valeur entrée est trop grande ! Veuillez la réduire ou supprimer des portions précedentes');
				continue;
			}
			this.dataArr.push(sector)
			this.labels.push(label)
	    	{
	    		create_pieChart(graphics[i],i);
	    	}
		}
	}
}

function create_pieChart(element,index)//complete is a boolean determining if the pieChart is complete or not
{
	var colorsChart = [];
	var labelsChart = [];
	var sum = 0;
	var lastPortion = [];

	for(var i = 0;i<dataArr.length;i++)
	{
		colorsChart.push(colors[i%colors.length]);
		labelsChart.push(labels[i%labels.length]);
		sum+=dataArr[i];
	}


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
	let a = board.create('chart', this.dataArr.concat(lastPortion),
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

function chart_deleteLastPie()
{
	this.dataArr.pop()
	this.labels.pop()
	/*for(var j = 0;j<this.maxSector;j++)
	{
		if(j < this.dataArr.length)
		{
			this.dataColor[j] = this.colors[j]
		}
		if(this.dataColor[j] != '#FFFFFF' && j < this.dataArr.length)
		{
			alert(this.dataArr[j])
			sum = sum + this.dataArr[j]
		}
	}*/
	create_pieChart(document.getElementsByClassName("chartQuestionValidation")[0],0)
}
