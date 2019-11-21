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
        '    "n0" -> "B0"',
        '    "B0" -> "B1" [label = "col1"]',
        '    "B1" -> "B1" [label = "svl?"]',
        '    "B1" -> "B0" [label = "ret1"]',
        '    "B1" -> "B2" [label = "col2"]',
        '    "B2" -> "B2" [label = "sv2?"]',
        '    "B2" -> "B1" [label = "ret2"]',
        '    "B2" -> "B3" [label = "col3"]',
        '    "B3" -> "B3" [label = "sc?"]',
        '    "B3" -> "B2" [label = "ret3"]',
        '}'
    ],
];