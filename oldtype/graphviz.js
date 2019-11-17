//input-placeholder
var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = inputs[i].getAttribute('data-placeholder');
    inputs[i].addEventListener('focus', function() {
        this.value = '';
    });
    inputs[i].addEventListener('blur', function() {
        if (this.value == '') {
            this.value = this.getAttribute('data-placeholder');
        }
    });
}



//elements
var btn = document.querySelector("#btn1");
var inp = document.querySelector("input");
var btn2 = document.querySelector("#btn2");
var btn3 = document.querySelector("#btn3");
var legenda = document.querySelector("div#legenda")

//headers
var dotIndex;
var graphviz;
var rainbowgraph
var dots = [];
var rainbowdots = []
var num;
var i = 0,
    j = 0;
var pt = []
var interative = false;
var txt;


document.body.addEventListener("keyup", (e) => {
    if (interative) {
        if (e.key === "ArrowRight") {
            dotIndex++;
            var dotLines = dots[dotIndex];
            var dot = dotLines.join('');
            const element = graphviz;
            element
            .renderDot(dot)
        }
    }
    if (interative) {
        if (e.key === "ArrowLeft") {
            dotIndex--;
            var dotLines = dots[dotIndex];
            var dot = dotLines.join('');
            const element = graphviz;
            element
            .renderDot(dot)
        }
    }
    
});

btn3.onclick = function() {
    interative = false;
    var dotLines = dots[dotIndex];
    var dot = dotLines.join('');
    const element = graphviz;
    element
        .renderDot(dot)
}

btn2.onclick = function() {
    interative = true;
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


btn.onclick = function() {
    interative = false;
    num = inp.value;
    pt = []
    dots = []
    rainbowdots = []


    for (let index = 0; index < num.length; index++) {
        const element = num[index];
        pt.push({
            'value': element,
            'color': getRandomColor(),
            'setValue': function(val) {
                this.value = val
            }
        })
        /*txt = document.createElement("h1");
        txt.textContent = "Peça nº " + (index + 1) + " do tipo " + element;
        txt.setAttribute("style", "color : " + pt[index].color);
        legenda.appendChild(txt);*/
    }


    checktam();

    if (i != 0) {
        var del = document.querySelector("#graph" + i);
        del.remove();
    }

    i++;
    var graph = document.createElement("div");
    graph.id = "graph" + i;
    var gradiv = document.querySelector("#graphs")
    gradiv.appendChild(graph);


    showElements();

    dotIndex = 0;
    graphviz = d3.select("#graph" + i).graphviz()
        .transition(function() {
            return d3.transition()
                .delay(0)
                .duration(500);
        })
        .on("initEnd", render);

}


function checktam() {


    if (num.length === 1) {
        push1(0);
        push2only(0);
        push3only1(0);
    } else if (num.length === 2) {
        push1(0);
        push2(0);
        push3only2(0);
        push3only1(1);
    } else {
        push1(0);
        push2(0);
        for (let index = 0; index < num.length - 2; index++) {
            push3(index);
        }
        push3only2(num.length - 2);
        push3only1(num.length - 1);
    }
    endpush();

}



function render() {
    var dotLines = dots[dotIndex];
    var dot = dotLines.join('');
    const element = graphviz;
    element
        .renderDot(dot)
        .on("end", function() {
            if (!interative) {
                dotIndex++;

                if (dotIndex < dots.length) {
                    render();
                }

            }
        });
}

function test(i) {
    return '    "q1"      [fillcolor="' + pt[i].color + '"]'
}

function test2(i) {
    if (pt[i].value == "1") {
        return '    "q2"      [fillcolor="' + pt[i].color + '"]'
    } else {
        return '"q2"'
    }
}

function test3(i) {
    return '    "q3"      [fillcolor="' + pt[i].color + '"]'
}

function test4(i) {
    if (pt[i].value == "2") {
        return '    "q4"      [fillcolor="' + pt[i].color + '"]'
    } else {
        return '"q4"'
    }
}


function endpush() {
    dots.push(
        [
            'digraph  {',
            'node [style="filled"]',
            '"q1"',
            '"q2"',
            '"q3"',
            '"q4"',
            '"q1" -> "q2" -> "q3"',
            '"q1" -> q4 -> q3',
            '}'
        ]);
}

function push1(i) {
    dots.push(
        [
            'digraph  {',
            'node [style="filled"]',
            test(i),
            '"q2"',
            '"q3"',
            '"q4"',
            '"q1" -> "q2" -> "q3"',
            '"q1" -> q4 -> q3',
            '}'
        ]
    )
}

function push2(i) {
    dots.push(
        [

            'digraph  {',
            'node [style="filled"]',
            test(i + 1),
            test2(i),
            '"q3"',
            test4(i),
            '"q1" -> "q2" -> "q3"',
            '"q1" -> q4 -> q3',
            '}'

        ]
    )
}

function push2only(i) {
    dots.push(
        [

            'digraph  {',
            'node [style="filled"]',
            '"q1"',
            test2(i),
            '"q3"',
            test4(i),
            '"q1" -> "q2" -> "q3"',
            '"q1" -> q4 -> q3',
            '}'

        ]
    )
}

function push3(i) {
    dots.push(
        [

            'digraph  {',
            'node [style="filled"]',
            test(i + 2),
            test2(i + 1),
            test3(i),
            test4(i + 1),
            '"q1" -> "q2" -> "q3"',
            '"q1" -> q4 -> q3',
            '}'

        ]
    )
}

function push3only1(i) {
    dots.push(
        [

            'digraph  {',
            'node [style="filled"]',
            '"q1"',
            '"q2"',
            test3(i),
            '"q4"',
            '"q1" -> "q2" -> "q3"',
            '"q1" -> q4 -> q3',
            '}'

        ]
    )
}

function push3only2(i) {
    dots.push(
        [

            'digraph  {',
            'node [style="filled"]',
            '"q1"',
            test2(i + 1),
            test3(i),
            test4(i + 1),
            '"q1" -> "q2" -> "q3"',
            '"q1" -> q4 -> q3',
            '}'

        ]
    )
}


function showElements() {
    if (j != 0) {
        var del = document.querySelector("#rainbow" + j);
        del.remove();
    }

    j++;
    var rainbow = document.createElement("div");
    rainbow.id = "rainbow" + i;
    var raindiv = document.querySelector("#rainbows")
    raindiv.appendChild(rainbow);



    dotIndex = 0;
    rainbowgraph = d3.select("#rainbow" + i).graphviz()
        .transition(function() {
            return d3.transition("main")
                .delay(0)
                .duration(0);
        })
        .engine("fdp")
        .height(400)
        .fit(true)
        .on("initEnd", render2);
}

function render2() {
    fillrainbow();
    var dotLines = rainbowdots[0];
    var dot = dotLines.join('');
    const element = rainbowgraph;
    element.renderDot(dot)
}

function colorsOfTheRainbow() {

    var text = [
        'digraph  {',
        'node [style="filled"]',
        '"tipo1" [shape = "polygon", color = "cyan"]',
        '"tipo2" [shape = "polygon", color = "yellow"]',
    ]

    for (let index = 1; index <= pt.length; index++) {
        const element = pt[index - 1];
        text.push("\"" + index + "\" [color = \"" + element.color + "\"]");
        if (element.value == "1") {
            text.push("\"" + index + "\" -> \"tipo1\"");
        } else if (element.value == "2") {
            text.push("\"" + index + "\" -> \"tipo2\"");
        }
    }

    text.push("}");

    return text;
}

function fillrainbow() {
    rainbowdots.push(
        colorsOfTheRainbow()
    )
}