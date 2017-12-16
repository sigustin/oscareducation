

round = function(value) {
    return Number(value.toFixed(0));
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
