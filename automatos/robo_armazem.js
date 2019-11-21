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
        '    "n0" -> "RA0"',
        '    "RA0" -> "RA0" [label = "sra"]',
        '    "RA0" -> "RA1" [label = "pmp1, pmp2.1, pmp2.2, pmp2.3"]',
        '    "RA1" -> "RA2" [label = "ce"]',
        '    "RA2" -> "RA0" [label = "end"]',
        '    "RA0" -> "RA3" [label = "pe"]',
        '    "RA3" -> "RA4" [label = "pa1, pa2, pdes"]',
        '    "RA4" -> "RA0" [label = "end"]',
        '}'
    ],
];