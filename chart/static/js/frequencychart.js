/*
    Every function must follow the format chart_nameInCamelCase
    TODO ; il faut gerer qund plusieurs questions sont posee; on peut avoir plusieurs reponses, mais pas plusieurs questions
*/

var frequencyPoints = [[]];
var frequencyAxisX = [];
var frequencyAxisY = [];
var boardFrequencyChart = [];
var frequencyMaxX = [];
var frequencyMaxY = [];
var frequencyZeroX = [];
var frequencyZeroY = [];
var chart_opacity = 1;
function chart_refreshFrequency()
{
    chart_update_freq();
}


function chart_setFrequencyPoints()
{
	this.frequencyPoints = [[]];
}

function chart_addFrequencyPoint(point,which)
{
	this.frequencyPoints[which].push(point);
}

function chart_removeFrequencyPoint(which)
{
	this.frequencyPoints[which].pop();
}

function chart_setFrequencyAxis(frequencyAxisX,frequencyAxisY,which)
{
	this.frequencyAxisX[which] = frequencyAxisX;
	this.frequencyAxisY[which] = frequencyAxisY;
}

function chart_setFrequencyOrigin(zX,zY,mX,mY,which)
{
	this.frequencyZeroX[which] = zX;
	this.frequencyZeroY[which]= zY;
	this.frequencyMaxX[which]= mX;
	this.frequencyMaxY[which] = mY;
}


function chart_createFrequencyChart(element)
{
    var type = $(element).data( "chart-type" );
    var rawData = $(element).data( "chart-raw" );
    var rawData2 = $(element).data( "chart-raw2" );
    var rawData3 = $(element).data( "chart-raw3" );
    var board;
    if(type.includes("chart-frequencychart"))
    {
        var box = [-1, 10, 10, -1];

        if(rawData2 != null)
        {
            rawData = chart_parse_orderedDictFrequency(rawData2);
        }
        if( rawData3 != null)
        {
            rawData = chart_parse_orderedDictFrequency(rawData3);
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
            box = [r.frequencyZeroX, r.frequencyMaxY,r.frequencyMaxX,r.frequencyZeroY];
        }
        
        let board = JXG.JSXGraph.initBoard(element.id, { axis:true,showCopyright:false, boundingbox: box,showNavigation : false});
        this.boardFrequencyChart[0] = board;      
    }
    chart_update_freq();
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

        element.id = "board"+i;
        var r = {};
        r.frequencyAxisX = " nope";
        r.frequencyAxisY = " Nope";
        var box = [-1, 5, 5, -1];
		
        if(rawData2 != null)
        {
            rawData = chart_parse_orderedDictFrequency(rawData2);
        }
        if( rawData3 != null)
        {
            rawData = chart_parse_orderedDictFrequency(rawData3);
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
            box = [r.frequencyZeroX, r.frequencyMaxY,r.frequencyMaxX,r.frequencyZeroY];
        }
        let board = JXG.JSXGraph.initBoard(element.id,{ id:"chart-frequencyChartFromForm-"+i,axis:false,showCopyright:false, boundingbox:box,zoom:{factorX:0.75,factorY:0.75,wheel:true,eps:0.1}});
        this.boardFrequencyChart[i] = board;
        xaxis = board.create('axis', [[0,0],[1,0]],
                    {name:r.frequencyAxisX,
                    withLabel:true,
                    label: {
                        position:'rt',
                        offset:[-15,20]
                        }
                    });
        yaxis = board.create('axis', [[0,0],[0,1]],
                    {name:r.frequencyAxisY,
                    withLabel:true,
                    label: {
                        position:'rt',
                        offset:[20,0]
                        }
                    });
        var temp =[];
        if(this.frequencyPoints[i] == undefined) this.frequencyPoints[i] = [];
        for(var j = 0;j<this.frequencyPoints[i].length;j++)
        {
            let p = this.boardFrequencyChart[i].create('point',[this.frequencyPoints[i][j].X(),this.frequencyPoints[i][j].Y()],{name:'',size:3,face:'[]'});
			p.setProperty({fixed:true})
            temp.push(p);
        }
        this.frequencyPoints[i] = temp;
        for(var j = 0;j<this.frequencyPoints[i].length;j++)
    	{
    		if(j==0){
    			let p = this.boardFrequencyChart[i].create('line',[[0,0],[this.frequencyPoints[i][j].X(),this.frequencyPoints[i][j].Y()]],{straightFirst:false,straightLast:false,strokeWidth:2});
				p.setProperty({fixed:true})
    		}
    		else{
    			let p = this.boardFrequencyChart[i].create('line',[[this.frequencyPoints[i][j-1].X(),this.frequencyPoints[i][j-1].Y()],[this.frequencyPoints[i][j].X(),this.frequencyPoints[i][j].Y()]],{straightFirst:false,straightLast:false,strokeWidth:2});
				p.setProperty({fixed:true})
    		}
    	}
    	
    	var getMouseCoords = function(e, j) {
			var cPos = board.getCoordsTopLeftCorner()
			var absPos = JXG.getPosition(e, j)
			var dx = absPos[0]-cPos[0]
			var dy = absPos[1]-cPos[1]

			return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
		}	
        var down = function(e) {
        	if(e != undefined){
				var canCreate = true, j, coords, el;

				if (e[JXG.touchProperty]) {
					// index of the finger that is used to extract the coordinates
					j = 0;
				}
				coords = getMouseCoords(e,j);
			
				for (el in board.objects) {
					if(JXG.isPoint(board.objects[el]) && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
						canCreate = false;
						break;
					}
				}			

				if (canCreate) {
					chart_addFrequencyMouse([round(coords.usrCoords[1]), round(coords.usrCoords[2])],board)
				}
			}
		}	
		
		
		this.boardFrequencyChart[i].on('down',down);
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

        	if(this.frequencyPoints == undefined)
        	{
        		chart_setFrequencyPoints(i);
        	}
        	chart_setFrequencyAxis(frequencyGraphX,frequencyGraphY,i);
        	chart_setFrequencyOrigin(-1,-1,mX,mY,i);

            element.id = "board"+i;
            let board = JXG.JSXGraph.initBoard(element.id,{ id:"chart-frequencyChartFromForm-"+i,fillOpacity:chart_opacity,axis:false,showCopyright:false, boundingbox: [-1, this.frequencyMaxY[i], this.frequencyMaxX[i], -1]});
            this.boardFrequencyChart[i] = board;
        	xaxis = board.create('axis', [[0,0],[1,0]],
        				{name:this.frequencyAxisX[i],
        				withLabel:true,
        				label: {
        					position:'rt',
        					offset:[-15,20]
        					}
        				});
        	yaxis = board.create('axis', [[0,0],[0,1]],
        				{name:this.frequencyAxisY[i],
        				withLabel:true,
        				label: {
        					position:'rt',
        					offset:[20,0]
        					}
        				});
        	var temp =[];
            if(this.frequencyPoints[i] == undefined) this.frequencyPoints[i] = [];
        	for(var j = 0;j<this.frequencyPoints[i].length;j++)
        	{
        		let p = this.boardFrequencyChart[i].create('point',[this.frequencyPoints[i][j].X(),this.frequencyPoints[i][j].Y()],{name:'',size:3,face:'[]'});
				p.setProperty({fixed:true})
        		temp.push(p);
        	}
        	this.frequencyPoints[i] = temp;
        	for(var j = 0;j<this.frequencyPoints[i].length;j++)
        	{
        		if(j==0){
        			let p = this.boardFrequencyChart[i].create('line',[[0,0],[this.frequencyPoints[i][j].X(),this.frequencyPoints[i][j].Y()]],{straightFirst:false,straightLast:false,strokeWidth:2});
					p.setProperty({fixed:true})
        		}
        		else{
        			let p = this.boardFrequencyChart[i].create('line',[[this.frequencyPoints[i][j-1].X(),this.frequencyPoints[i][j-1].Y()],[this.frequencyPoints[i][j].X(),this.frequencyPoints[i][j].Y()]],{straightFirst:false,straightLast:false,strokeWidth:2});
					p.setProperty({fixed:true})
        		}
        	}
			var getMouseCoords = function(e, j) {
				var cPos = board.getCoordsTopLeftCorner()
				var absPos = JXG.getPosition(e, j)
				var dx = absPos[0]-cPos[0]
				var dy = absPos[1]-cPos[1]

				return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
			}	
		    var down = function(e) {
		    	if(e != undefined){
					var canCreate = true, j, coords, el;

					if (e[JXG.touchProperty]) {
						// index of the finger that is used to extract the coordinates
						j = 0;
					}
					coords = getMouseCoords(e,j);
			
					for (el in board.objects) {
						if(JXG.isPoint(board.objects[el]) && board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
							canCreate = false;
							break;
						}
					}
					if (canCreate) {
						chart_addFrequencyMouse([round(coords.usrCoords[1]), round(coords.usrCoords[2])],board)
					}
				}
			}	
			this.boardFrequencyChart[i].on('down',down);	
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
	else if(this.frequencyPoints[index].length>1 && newFrequencyX <= this.frequencyPoints[index][this.frequencyPoints[index].length-1].X()){
		alert("Veuillez supprimer le dernier point ou mettre un nouveau point d'abscisse supérieure")
	}
	else{
		var p = this.boardFrequencyChart[index].create('point',[newFrequencyX,newFrequencyY],{name:'',size:3,face:'[]'});
		p.setProperty({fixed:true})
		chart_addFrequencyPoint(p,index);
		if(this.frequencyPoints[index].length>1){
			var l = this.boardFrequencyChart[index].create('line',[[this.frequencyPoints[index][this.frequencyPoints[index].length-2].X(),this.frequencyPoints[index][this.frequencyPoints[index].length-2].Y()],[newFrequencyX,newFrequencyY]],{straightFirst:false,straightLast:false,strokeWidth:2});
			l.setProperty({fixed:true})
		}
		else{
			var l = this.boardFrequencyChart[index].create('line',[[0,0],[newFrequencyX,newFrequencyY]],{straightFirst:false,straightLast:false,strokeWidth:2});
			l.setProperty({fixed:true})
		}
   	}
}

function chart_addFrequencyMouse(point,board)
{
	if(this.boardFrequencyChart.includes(board))
	{
		index = this.boardFrequencyChart.indexOf(board)
		var newFrequencyX = point[0]
		var newFrequencyY = point[1]
		if(isNaN(newFrequencyX) || newFrequencyX <= 0){
			alert("Veuillez donner une abscisse correcte (>0)")
		}
		else if(isNaN(newFrequencyY) || newFrequencyY <= 0){
			alert("Veuillez donner une ordonnée correcte (>0)")
		}
		else if(this.frequencyPoints[index].length>1 && newFrequencyX < this.frequencyPoints[index][this.frequencyPoints[index].length-1].X()){
			alert("Veuillez supprimer le dernier point ou mettre un nouveau point d'abscisse supérieure")
		}
		else if(this.frequencyPoints[index].length>1 && newFrequencyX == this.frequencyPoints[index][this.frequencyPoints[index].length-1].X()){
			return
		}
		else{
			var p = this.boardFrequencyChart[index].create('point',[newFrequencyX,newFrequencyY],{name:'',size:3,face:'[]'});
			p.setProperty({fixed:true})
			chart_addFrequencyPoint(p,index);
			if(this.frequencyPoints[index].length>1){
				var l = this.boardFrequencyChart[index].create('line',[[this.frequencyPoints[index][this.frequencyPoints[index].length-2].X(),this.frequencyPoints[index][this.frequencyPoints[index].length-2].Y()],[newFrequencyX,newFrequencyY]],{straightFirst:false,straightLast:false,strokeWidth:2});
				l.setProperty({fixed:true})
			}
			else{
				var l = this.boardFrequencyChart[index].create('line',[[0,0],[newFrequencyX,newFrequencyY]],{straightFirst:false,straightLast:false,strokeWidth:2});
				l.setProperty({fixed:true})
			}
	   	}
	}
}


function chart_btnUpdateFrequency(element)
{
    var index = $(".btn-updateFrequency").index(element);
    chart_createFrequencyChartFromForm();

}
function chart_update_freq()
{
	var type = document.location.pathname
	if(type.split("/")[1] == "professor")
	{
	    chart_createFrequencyChartFromForm();
	}
	else
	{
    	chart_updateFrequencyForStudent();
    }
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
    if(this.frequencyPoints[index] == undefined)this.frequencyPoints[index] = [];
    for(var i = 0;i<this.frequencyPoints[index].length;i++)
    {
        pointValueX.push(this.frequencyPoints[index][i].X());
        pointValueY.push(this.frequencyPoints[index][i].Y());
    }

    console.log("asked jsson frequency")
    var t =  JSON.stringify({
        "pointX":pointValueX,
        "pointY":pointValueY,
        "frequencyAxisX":this.frequencyAxisX[index],
        "frequencyAxisY":this.frequencyAxisY[index],
        "frequencyZeroX":this.frequencyZeroX[index],
        "frequencyZeroY":this.frequencyZeroY[index],
        "frequencyMaxX":this.frequencyMaxX[index],
        "frequencyMaxY":this.frequencyMaxY[index]
    });
    console.log(t);
    return t;
}


function chart_parse_orderedDictFrequency(orderedDictStr)
{
    return orderedDictStr.substring(orderedDictStr.indexOf("chart")+9,orderedDictStr.lastIndexOf('}')+1);
}
