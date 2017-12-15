

round = function(value) {
    return Number(value.toFixed(0));
}

var getMouseCoords = function(e, i) {
    var cPos = brd.getCoordsTopLeftCorner(e, i),
    absPos = JXG.getPosition(e, i),
    dx = absPos[0]-cPos[0],
    dy = absPos[1]-cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], brd);
}

down = function(e) {
    var canCreate = true, i, coords, el;

    if (e[JXG.touchProperty]) {
        // index of the finger that is used to extract the coordinates
        i = 0;
    }
    coords = getMouseCoords(e, i);

    for (el in brd.objects) {
        if(JXG.isPoint(brd.objects[el]) && brd.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
            canCreate = false;
            break;
        }
    }

    if (canCreate && points.length < numberOfPoints) {
        var point = brd.create('point', [round(coords.usrCoords[1]), round(coords.usrCoords[2])]);
        points.push(point);

        if (points.length > 1) {
            brd.create('line', [points[points.length - 2], points[points.length - 1]], {straightFirst:false, straightLast:false})
        }

        if (points.length == numberOfPoints)
            brd.create('line', [points[points.length - 1], points[0]], {straightFirst:false, straightLast:false})
    }
}

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

function chart_changeScopeQuestions(questions)
{
    var counterBar = 0;
    var counterPie = 0;
    var counterFrequency = 0;
    for(var i = 0;i<questions.length;i++)
    {
        if(questions[i].type == "chart-barchart")
        {
            for(var j = 0;j<questions[i].answers.length;j++)
            {
                questions[i].answers[j].chart = chart_getJSONBar(counterBar);
                counterBar++;
            }
        }
        if(questions[i].type == "chart-piechart")
        {
            for(var j = 0;j<questions[i].answers.length;j++)
            {
                questions[i].answers[j].chart = chart_getJSONPie(counterPie);
                counterPie++;
            }
        }
        if(questions[i].type == "chart-frequencychart")
        {
            for(var j = 0;j<questions[i].answers.length;j++)
            {
                questions[i].answers[j].chart = chart_getJSONFrequency(counterFrequency);
                counterFrequency++;
            }
        }
    }
    return questions;
}

