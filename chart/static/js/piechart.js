dataArr = []
maxSector = 0
labels = []
dataColor = []
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
			var maxSector = $(".maxSector").eq(i).val()
			var label = $(".labelPie").eq(i).val()
			if(maxSector != this.maxSector)
			{
				this.dataArr = []
				this.labels = []
				this.dataColor = []
				for(var j = 0;j<maxSector;j++)
				{
					this.dataColor.push('#FFFFFF')
				}
			}
			if(dataArr.length == maxSector)
			{
				alert("Le diagramme est déjà complet, veuillez supprimer un ou plusieurs secteurs si vous voulez le modifier")
				return
			}
			this.dataArr.push(sector)
			this.labels.push(label)
			this.maxSector = maxSector
	    	sum = 0
	    	for(var j = 0;j<this.maxSector;j++)
	    	{
	    		if(j < this.dataArr.length)
	    		{
	    			this.dataColor[j] = this.colors[j]
	    		}
	    		if(this.dataColor[j] != '#FFFFFF')
	    		{
	    			sum = sum + this.dataArr[j]
	    		}
	    	}
	    	if(dataArr.length == this.maxSector && sum < 100)
	    	{
	    		this.dataArr.pop()
	    		this.labels.pop()
	    		alert("Le dernier secteur n'est pas assez élevé")
	    		return
	    	}
	    	if(sum > 100)
	    	{
	    		alert("Dernier secteur trop élevé !")
	    		this.dataArr.pop()
	    		this.labels.pop()
	    	}
	    	else
	    	{
	    		create_pieChart(sum)
	    	}
		}
	}
}

function create_pieChart(sum)//complete is a boolean determining if the pieChart is complete or not
{
	for(var i = 0;i<graphics.length;i++)
    {
		var app = []
		if(sum < 100)
		{
			for(var j = 0;j<(this.maxSector - dataArr.length);j++)
	    	{
	    		app.push((100-sum)/(this.maxSector-dataArr.length))
	   		}
		}
		element = graphics[i]
		element.id = "board"+i;
		board = JXG.JSXGraph.initBoard(element.id, {id:"chart-pieChartFromForm-"+i,showNavigation:false, showCopyright:false, boundingbox: [-5, 5, 5, -5]});
		board.containerObj.style.backgroundColor = 'white';
		board.options.label.strokeColor = 'black';
		board.suspendUpdate();
		let a = board.create('chart', this.dataArr.concat(app),
			{chartStyle:'pie',
			 colors:dataColor,
			 fillOpacity:0.8, center:[0,0], strokeColor:'black', highlightStrokeColor:'black', strokeWidth:0,
			 labels:this.labels,
			 highlightColors:['#E46F6A','#F9DF82','#F7FA7B','#B0D990','#69BF8E','#BDDDE4','#92C2DF','#637CB0','#AB91BC','#EB8EBF'],
			 highlightOnSector:false,
			 highlightBySize:false
			}
		);
		board.unsuspendUpdate();
	}
}

function chart_deleteLastPie()
{
	this.dataColor[this.dataArr.length-1] = '#FFFFFF'
	this.dataArr.pop()
	this.labels.pop()
	var sum = 0
	for(var j = 0;j<this.maxSector;j++)
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
	}
	create_pieChart(sum)
}


