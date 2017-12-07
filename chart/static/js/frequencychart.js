/*
    Every function must follow the format chart_nameInCamelCase
    TODO ; il faut gerer qund plusieurs questions sont posee; on peut avoir plusieurs reponses, mais pas plusieurs questions
*/

var points = [[]];
var AxisX = [];
var AxisY = [];
var boardFrequencyChart = [];
var maxX = [];
var maxY = [];
var zeroX = -1;
var zeroY = -1;
var chart_opacity = 1;
$( document ).ready(function() {
    chart_refreshFrequency();
});

function chart_changeInput($scope)
{
    $scope.barGraphX = "abscisses";
    $scope.barGraphY = "ordonnees";
    $scope.stepX = 1;
    $scope.stepY = 1;
    $scope.precisionValue = 1;

    $scope.zeroX = -1;
    $scope.zeroY = -1;
    $scope.maxX = 10;
    $scope.maxY = 10;


    $scope.frequencyGraphX = "abscisses";
    $scope.frequencyGraphY = "ordonnees";
    $scope.frequencyMaxX = 10;
    $scope.frequencyMaxY = 10;

    $scope.sector = 90;
    $scope.labelPie = "secteur";
}

function chart_refreshFrequency()
{
    var graphics = document.getElementsByClassName("chartQuestion");  //find all charts on the page
    for(var i = 0;i<graphics.length;i++){
        console.log("found "+graphics.length+" graphics");
        chart_createChart(graphics[i]);  //create the element founded
    }
    chart_createFrequencyChartFromForm()


}

function chart_setFrequencyPoints()
{
	this.points = [[]];
}

function chart_addFrequencyPoint(point,which)
{
	this.points[which].push(point);
}

function chart_removeFrequencyPoint(which)
{
	this.points[which].pop();
}

function chart_setFrequencyAxis(AxisX,AxisY,which)
{
	this.AxisX[which] = AxisX;
	this.AxisY[which] = AxisY;
}

function chart_setFrequencyOrigin(zX,zY,mX,mY,which)
{
	this.zeroX[which] = zX;
	this.zeroY[which]= zY;
	this.maxX[which]= mX;
	this.maxY[which] = mY;
}


function chart_updateFrequencyForStudent()
{
    graphics = document.getElementsByClassName("chartQuestionStudent");
	var element;
	for(var i = 0;i<graphics.length;i++)
	{

        element = graphics[i];
        var rawData = $(element).data( "chart-raw" );
        var rawData2 = $(element).data( "chart-raw2" );
        var rawData3 = $(element).data( "chart-raw3" );

        precisionValue[i] = 1;
        element.id = "board"+i;
        var r = {};
        r.AxisX = " nope";
        r.AxisY = " Nope";
        var box = [-1, 5, 5, -1];


        if(rawData2 != null)
        {
            rawData = chart_parse_orderedDict(rawData2);
        }
        if( rawData3 != null)
        {
            rawData = chart_parse_orderedDict(rawData3);
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
            box = [r.zeroX, r.maxY,r.maxX,r.zeroY];
        }

        let board = JXG.JSXGraph.initBoard(element.id,{ id:"chart-frequencyChartFromForm-"+i,axis:false,showCopyright:false, boundingbox:box,zoom:{factorX:0.75,factorY:0.75,wheel:true,eps:0.1}});
        this.boardFrequencyChart[i] = board;
        xaxis = board.create('axis', [[0,0],[1,0]],
                    {name:r.AxisX,
                    withLabel:true,
                    label: {
                        position:'rt',
                        offset:[-15,20]
                        }
                    });
        yaxis = board.create('axis', [[0,0],[0,1]],
                    {name:AxisY,
                    withLabel:true,
                    label: {
                        position:'rt',
                        offset:[20,0]
                        }
                    });
        var temp =[];
        if(this.points[i] == undefined) this.points[i] = [];
        for(var j = 0;j<this.points[i].length;j++)
        {
            let p = this.boardFrequencyChart[i].create('point',[j+1,this.points[i][j].Y()],{name:'',size:3,face:'^'});
			p.setProperty({fixed:true})
            temp.push(p);
        }
        this.points[i] = temp;
        for(var j = 0;j<this.points[i].length;j++)
    	{
    		if(j==0){
    			let p = this.boardFrequencyChart[i].create('line',[[0,0],[this.points[i][j].X(),this.points[i][j].Y()]],{straightFirst:false,straightLast:false,strokeWidth:2});
				p.setProperty({fixed:true})
    		}
    		else{
    			let p = this.boardFrequencyChart[i].create('line',[[this.points[i][j-1].X(),this.points[i][j-1].Y()],[this.points[i][j].X(),this.points[i][j].Y()]],{straightFirst:false,straightLast:false,strokeWidth:2});
				p.setProperty({fixed:true})
    		}
    	}
	}


}


function chart_createFrequencyChartFromForm()
{
	graphics = document.getElementsByClassName("chartQuestionFrequencychart");
	var element;
	for(var i = 0;i<graphics.length;i++)
    {
  		var type = $(graphics[i]).data( "chart-type" );
		if(type == "chart-frequencychart")
        {
            var frequencyGraphX = $(".frequencyGraphX").eq(i).val();
            var frequencyGraphY = $(".frequencyGraphY").eq(i).val();

            var mX = parseInt($(".frequencyMaxX").eq(i).val());
            var mY = parseInt($(".frequencyMaxY").eq(i).val());
            element = graphics[i];

        	if(this.points == undefined)
        	{
        		chart_setFrequencyPoints(i);
        	}
        	chart_setFrequencyAxis(frequencyGraphX,frequencyGraphY,i);
        	chart_setFrequencyOrigin(0,0,mX,mY,i);

            element.id = "board"+i;
            let board = JXG.JSXGraph.initBoard(element.id,{ id:"chart-frequencyChartFromForm-"+i,fillOpacity:chart_opacity,axis:false,showCopyright:false, boundingbox: [-1, this.maxY[i], this.maxX[i], -1]});
            this.boardFrequencyChart[i] = board;
        	xaxis = board.create('axis', [[0,0],[1,0]],
        				{name:this.AxisX[i],
        				withLabel:true,
        				label: {
        					position:'rt',
        					offset:[-15,20]
        					}
        				});
        	yaxis = board.create('axis', [[0,0],[0,1]],
        				{name:this.AxisY[i],
        				withLabel:true,
        				label: {
        					position:'rt',
        					offset:[20,0]
        					}
        				});
        	var temp =[];
            if(this.points[i] == undefined) this.points[i] = [];
        	for(var j = 0;j<this.points[i].length;j++)
        	{
        		let p = this.boardFrequencyChart[i].create('point',[this.points[i][j].X(),this.points[i][j].Y()],{name:'',size:3,face:'[]'});
				p.setProperty({fixed:true})
        		temp.push(p);
        	}
        	this.points[i] = temp;
        	for(var j = 0;j<this.points[i].length;j++)
        	{
        		if(j==0){
        			let p = this.boardFrequencyChart[i].create('line',[[0,0],[this.points[i][j].X(),this.points[i][j].Y()]],{straightFirst:false,straightLast:false,strokeWidth:2});
					p.setProperty({fixed:true})
        		}
        		else{
        			let p = this.boardFrequencyChart[i].create('line',[[this.points[i][j-1].X(),this.points[i][j-1].Y()],[this.points[i][j].X(),this.points[i][j].Y()]],{straightFirst:false,straightLast:false,strokeWidth:2});
					p.setProperty({fixed:true})
        		}
        	}
        }
	}



}


function chart_addFrequency(element)
{
    var index = $(".btn-addFrequency").index(element);
	var newFrequencyY = parseInt($(".newFrequencyY").eq(index).val());
	var newFrequencyX = parseInt($(".newFrequencyX").eq(index).val());
	if(isNaN(newFrequencyX) || newFrequencyX <= 0){
		alert("Veuillez donner une abscisse correcte (>0)")
	}
	else if(isNaN(newFrequencyY) || newFrequencyY <= 0){
		alert("Veuillez donner une ordonnée correcte (>0)")
	}
	else if(this.points[index].length>1 && newFrequencyX <= this.points[index][this.points[index].length-1].X()){
		alert("Veuillez supprimer le dernier point ou mettre un nouveau point d'abscisse supérieure")
	}
	else{
		var p = this.boardFrequencyChart[index].create('point',[newFrequencyX,newFrequencyY],{name:'',size:3,face:'[]'});
		p.setProperty({fixed:true})
		chart_addFrequencyPoint(p,index);
		if(this.points[index].length>1){
			var l = this.boardFrequencyChart[index].create('line',[[this.points[index][this.points[index].length-1].X(),this.points[index][this.points[index].length-1].Y()],[newFrequencyX,newFrequencyY]],{straightFirst:false,straightLast:false,strokeWidth:2});
			l.setProperty({fixed:true})
		}
		else{
			var l = this.boardFrequencyChart[index].create('line',[[0,0],[newFrequencyX,newFrequencyY]],{straightFirst:false,straightLast:false,strokeWidth:2});
			l.setProperty({fixed:true})
		}
   		chart_update_freq();
   	}
}


function chart_btnUpdateFrequency(element)
{
    var index = $(".btn-updateFrequency").index(element);
    chart_createFrequencyChartFromForm();

}
function chart_update_freq()
{
    chart_createFrequencyChartFromForm();
    chart_updateFrequencyForStudent();
}




function chart_deleteLastFrequency(element)
{
    var index = $(".btn-deleteFrequency").index(element);
    chart_removeFrequencyPoint(index);
    chart_update_freq();
}

function chart_getJSONFrequency(index)
{
    pointValueX = [];
    pointValueY = [];
    if(this.points[index] == undefined)this.points[index] = [];
    for(var i = 0;i<this.points[index].length;i++)
    {
        pointValueX.push(this.points[index][i].X());
        pointValueY.push(this.points[index][i].Y());
    }

    console.log("asked jsson frequency")
    var t =  JSON.stringify({
        "pointX":pointValueX,
        "pointY":pointValueY,
        "AxisX":AxisX[index],
        "AxisY":AxisY[index],
        "zeroX":zeroX[index],
        "zeroY":zeroY[index],
        "maxX":maxX[index],
        "maxY":maxY[index]
    });
    console.log(t);
    return t;
}


function chart_parse_orderedDict(orderedDictStr)
{
    return orderedDictStr.substring(orderedDictStr.indexOf("chart")+9,orderedDictStr.lastIndexOf('}')+1);
}
