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
        '    "n0" -> "RPC0"',
        '    "RPC0" -> "RPC0" [label = "srpc"]',
        '    "RPC0" -> "RPC1" [label = "pe"]',
        '    "RPC1" -> "RPC2" [label = "cb"]',
        '    "RPC2" -> "RPC0" [label = "end"]',
        '    "RPC0" -> "RPC3" [label = "pb"]',
        '    "RPC3" -> "RPC4" [label = "cpf, cc"]',
        '    "RPC4" -> "RPC0" [label = "end"]',
        '    "RPC0" -> "RPC5" [label = "ppf"]',
        '    "RPC5" -> "RPC6" [label = "cc"]',
        '    "RPC6" -> "RPC0" [label = "end"]',
        '    "RPC0" -> "RPC7" [label = "pc"]',
        '    "RPC7" -> "RPC8" [label = "ce"]',
        '    "RPC8" -> "RPC0" [label = "end"]',
        '}'
    ],
];