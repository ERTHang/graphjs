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
        '    "n0" -> "MMT0"',
        '    "MMT0" -> "MMT0" [label = "smmt"]',
        '    "MMT0" -> "MMT1" [label = "tb"]',
        '    "MMT1" -> "MMT0" [label = "tp"]',
        '}'
    ],
];