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
        '"n0" [label= "", shape=none,height=.0,width=.0]',
        '    "n0" -> "MT0"',
        '    "MT0" -> "MT0" [label = "srmt"]',
        '    "MT0" -> "MT1" [label = "pe"]',
        '    "MT1" -> "MT2" [label = "cm"]',
        '    "MT2" -> "MT0" [label = "end"]',
        '    "MT0" -> "MT3" [label = "pe"]',
        '    "MT3" -> "MT4" [label = "cb"]',
        '    "MT4" -> "MT0" [label = "end"]',
        '    "MT0" -> "MT5" [label = "pm"]',
        '    "MT5" -> "MT6" [label = "ce"]',
        '    "MT6" -> "MT0" [label = "end"]',
        '    "MT0" -> "MT7" [label = "pb"]',
        '    "MT7" -> "MT8" [label = "cm"]',
        '    "MT8" -> "MT0" [label = "end"]',
        '}'
    ],
];