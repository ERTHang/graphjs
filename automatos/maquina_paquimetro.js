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
        '    "n0" -> "MP0"',
        '    "MP0" -> "MP0" [label = "smp"]',
        '    "MP0" -> "MP1" [label = "an"]',
        '    "MP1" -> "MP2" [label = "sd"]',
        '    "MP1" -> "MP3" [label = "cd"]',
        '    "MP3" -> "MP0" [label = "ssd"]',
        '    "MP2" -> "MP0" [label = "scd"]',
        '}'
    ],
];