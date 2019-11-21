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
        '"n1" [label= "", shape=none,height=.0,width=.0]',
        '"n2" [label= "", shape=none,height=.0,width=.0]',
        '"n3" [label= "", shape=none,height=.0,width=.0]',
        '    "n0" -> "SDA0"',
        '    "SDA0" -> "SDA1" [label = "vpa"]',
        '    "SDA1" -> "SDA0" [label = "ava"]',
        '    "n1" -> "SDPC0"',
        '    "SDPC0" -> "SDPC1" [label = "vppc"]',
        '    "SDPC1" -> "SDPC0" [label = "avpc"]',
        '    "n2" -> "SDC0"',
        '    "SDC0" -> "SDC1" [label = "vpc"]',
        '    "SDC1" -> "SDC0" [label = "avc"]',
        '    "n3" -> "SDMT0"',
        '    "SDMT0" -> "SDMT1" [label = "vpmt"]',
        '    "SDMT1" -> "SDMT0" [label = "avmt"]',
        '}'
    ],
];