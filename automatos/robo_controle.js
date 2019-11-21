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
        '    "n0" -> "RC0"',
        '    "RC0" -> "RC0" [label = "src"]',
        '    "RC0" -> "RC1" [label = "pe"]',
        '    "RC1" -> "RC2" [label = "cp, ci"]',
        '    "RC2" -> "RC0" [label = "end"]',
        '    "RC0" -> "RC3" [label = "pe"]',
        '    "RC3" -> "RC4" [label = "cb"]',
        '    "RC4" -> "RC0" [label = "end"]',
        '    "RC0" -> "RC5" [label = "pp, pi"]',
        '    "RC5" -> "RC6" [label = "ce"]',
        '    "RC6" -> "RC0" [label = "end"]',
        '    "RC0" -> "RC7" [label = "pb"]',
        '    "RC7" -> "RC8" [label = "cp, ci"]',
        '    "RC8" -> "RC0" [label = "end"]',
        '}'
    ],
];