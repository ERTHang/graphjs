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
        '    "n0" -> "MI0"',
        '    "MI0" -> "MI0" [label = "smi"]',
        '    "MI0" -> "MI1" [label = "an"]',
        '    "MI1" -> "MI2" [label = "sd"]',
        '    "MI1" -> "MI3" [label = "cd"]',
        '    "MI2" -> "MI0" [label = "ssd"]',
        '    "MI3" -> "MI0" [label = "scd"]',
        '}'
    ],
];