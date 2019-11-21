var dotIndex = 0;
var graphviz = d3.select("#graph").graphviz()
    .on("initEnd", render);

function render() {
    var dotLines = dots[dotIndex];
    var dot = dotLines.join('');
    graphviz
        .renderDot(dot)
        .on("end", function() {
            dotIndex += 1;
            if (dotIndex < dots.length) {
                render();
            }
        });
}
var dots = [
    [
        'digraph  {',
        '    node [style="filled"]',
        '    "n0" [label= "", shape=none,height=.0,width=.0]',
        '    "n0" -> "MPF0"',
        '    "MPF0" -> "MPF0" [label = "smpf"]',
        '    "MPF0" -> "MPF1" [label = "pa"]',
        '    "MPF1" -> "MPF0" [label = "tp"]',
        '}'
    ],
];