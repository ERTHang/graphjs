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
var divs = document.querySelector("#divs");

//headers
var dotIndex;
var graphviz;
//var rainbowgraph
var dots = [];
//var rainbowdots = []
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
    //rainbowdots = []


    legenda.remove()
    var aux = document.createElement("div")
    aux.id = "legenda"
    divs.appendChild(aux)
    legenda = document.querySelector("#legenda")


    for (let index = 0; index < num.length; index++) {
        const element = num[index];

        if (element != "1" && element != "2") {
            alert("Valor inválido: \"" + element + "\", insira apenas \"1\" ou \"2\"");
            return;
        }

        pt.push({
            'value': element,
            'color': getRandomColor(),
            'setValue': function(val) {
                this.value = val
            }
        })
        txt = document.createElement("h1");
        txt.textContent = "Peça nº " + (index + 1) + " do tipo " + element;
        txt.setAttribute("style", "color : " + pt[index].color);
        legenda.appendChild(txt);
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


    //showElements();

    dotIndex = 0;
    graphviz = d3.select("#graph" + i).graphviz()
        .transition(function() {
            return d3.transition()
                .delay(0)
                .duration(500);
        })
        .totalMemory(1073741824)
        .on("initEnd", render);

}


function checktam() {

    push()
    push_armazem(0)
    push_esteira(0)
    push_rqualidade(0)
    push_qualidade(0)
    push_rqualidade(0)
    push_esteira(0)
    push_rmaquinas(0)
    push_maquinas(0)
    push_rmaquinas(0)
    push_esteira(0)
    push_rqualidade(0)
    push_qualidade(0)
    push_rqualidade(0)
    push_esteira(0)
    push_armazem(0)
    push_end(0)
    push()
}



function render() {
    var dotLines = dots[dotIndex];
    console.log(dots[dotIndex])
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
function push() {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem"',
            '"Esteira"',
            '"Qualidade"',
            '"bQualidade"',
            '"Montagem"',
            '"bMontagem"',
            '"Mill_turn"',
            '"bMillTurn"',
            '"rQualidade"',
            '"rMontagem"',
            '"rMillTurn"',
            '"END"',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}

/*          '"Armazem"',
            '"Esteira"',
            '"Qualidade"',
            '"bQualidade"',
            '"Montagem"',
            '"bMontagem"',
            '"Mill_turn"',
            '"bMillTurn"',
            '"rQualidade"',
            '"rMontagem"',
            '"rMillTurn"',
            '"END"',
            */

function push_armazem(i) {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem" [color = "' + pt[i].color +'\"]',
            '"Esteira"',
            '"Qualidade"',
            '"bQualidade"',
            '"Montagem"',
            '"bMontagem"',
            '"Mill_turn"',
            '"bMillTurn"',
            '"rQualidade"',
            '"rMontagem"',
            '"rMillTurn"',
            '"END"',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}

function push_esteira(i) {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem"',
            '"Esteira" [color = \"' + pt[i].color +'\"]',
            '"Qualidade"',
            '"bQualidade"',
            '"Montagem"',
            '"bMontagem"',
            '"Mill_turn"',
            '"bMillTurn"',
            '"rQualidade"',
            '"rMontagem"',
            '"rMillTurn"',
            '"END"',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}
function push_rqualidade(i) {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem"',
            '"Esteira"',
            '"Qualidade"',
            '"bQualidade"',
            '"Montagem"',
            '"bMontagem"',
            '"Mill_turn"',
            '"bMillTurn"',
            '"rQualidade" [color = \"' + pt[i].color +'\"]',
            '"rMontagem"',
            '"rMillTurn"',
            '"END"',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}

function push_qualidade(i) {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem"',
            '"Esteira"',
            '"Qualidade" [color = \"' + pt[i].color +'\"]',
            '"bQualidade"',
            '"Montagem"',
            '"bMontagem"',
            '"Mill_turn"',
            '"bMillTurn"',
            '"rQualidade"',
            '"rMontagem"',
            '"rMillTurn"',
            '"END"',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}

function push_bqualidade(i) {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem"',
            '"Esteira"',
            '"Qualidade"',
            '"bQualidade" [color = \"' + pt[i].color +'\"]',
            '"Montagem"',
            '"bMontagem"',
            '"Mill_turn"',
            '"bMillTurn"',
            '"rQualidade"',
            '"rMontagem"',
            '"rMillTurn"',
            '"END"',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}

function push_maquinas(i) {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem"',
            '"Esteira"',
            '"Qualidade"',
            '"bQualidade"',
            test_montagem(i),
            '"bMontagem"',
            test_mt(i),
            '"bMillTurn"',
            '"rQualidade"',
            '"rMontagem"',
            '"rMillTurn"',
            '"END"',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}

function push_bmaquinas(i) {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem"',
            '"Esteira"',
            '"Qualidade"',
            '"bQualidade"',
            '"Montagem"',
            test_bmontagem(i),
            '"Mill_turn"',
            test_bmt(i),
            '"rQualidade"',
            '"rMontagem"',
            '"rMillTurn"',
            '"END"',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}

function push_rmaquinas(i) {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem"',
            '"Esteira"',
            '"Qualidade"',
            '"bQualidade"',
            '"Montagem"',
            '"bMontagem"',
            '"Mill_turn"',
            '"bMillTurn"',
            '"rQualidade"',
            test_rmontagem(i),
            test_rmt(i),
            '"END"',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}

function push_end(i) {
    dots.push(
        [
        'digraph  {',
            'node [style="filled"]',
            '"Armazem"',
            '"Esteira"',
            '"Qualidade"',
            '"bQualidade"',
            '"Montagem"',
            '"bMontagem"',
            '"Mill_turn"',
            '"bMillTurn"',
            '"rQualidade"',
            '"rMontagem"',
            '"rMillTurn"',
            '"END" [color = \"' + pt[i].color +'\"]',
            '"Armazem" -> "Esteira" [label = "a.1, b.1"]',
            '"Esteira" -> "Esteira" [label = "el?"]',
            //qualidade
            '"Esteira" -> "rQualidade" [label = "a.7, b.7"]',
            '"rQualidade" -> "bQualidade" [label = "a.3, b.3"]',
            '"bQualidade" -> "rQualidade" [label = "a.4, b.4"]',
            '"rQualidade" -> "Qualidade" [label = "a.5, b.5"]',
            '"Qualidade" -> "rQualidade" [label = "a.6, b.6"]',
            '"rQualidade" -> "Esteira" [label = "a.2, b.2"]',
            //montagem
            '"Esteira" -> "rMontagem" [label = "a.8"]',
            '"rMontagem" -> "bMontagem" [label = "a.9"]',
            '"bMontagem" -> "rMontagem" [label = "a.10"]',
            '"rMontagem" -> "Montagem" [label = "a.11"]',
            '"Montagem" -> "rMontagem" [label = "a.12"]',
            '"rMontagem" -> "Esteira" [label = "a.13"]',
            //millturn
            '"Esteira" -> "rMillTurn" [label = "b.8"]',
            '"rMillTurn" -> "bMillTurn" [label = "b.9"]',
            '"bMillTurn" -> "rMillTurn" [label = "b.10"]',
            '"rMillTurn" -> "Mill_turn" [label = "b.11"]',
            '"Mill_turn" -> "rMillTurn" [label = "b.12"]',
            '"rMillTurn" -> "Esteira" [label = "b.13"]',
            //fim
            '"Esteira" -> "Armazem" [label = "a.def, b.def, a.ok, b.ok"]',
            '"Armazem" -> "END" [label = "fim"]',
            '}'
        ]
    )
}

function test_montagem(i) {
    if (pt[i].value === "2") {
        return '"Montagem" [color = "' + pt[i].color +'"]'
    }
    else{
        return '"Montagem"';
    }
}

function test_bmontagem(i) {
    if (pt[i].value === "2") {
        return '"bMontagem" [color = "' + pt[i].color +'"]'
    }
    else{
        return '"bMontagem"';
    }
}

function test_mt(i) {
    if (pt[i].value === "1") {
        return '"Mill_turn" [color = "' + pt[i].color +'"]'
    }
    else{
        return '"Mill_turn"';
    }
}

function test_bmt(i) {
    if (pt[i].value === "1") {
        return '"bMillTurn" [color = "' + pt[i].color +'"]'
    }
    else{
        return '"bMillTurn"';
    }
}

function test_rmontagem(i) {
    if (pt[i].value === "2") {
        return '"rMontagem" [color = "' + pt[i].color +'"]'
    }
    else{
        return '"rMontagem"';
    }
}

function test_rmt(i) {
    if (pt[i].value === "1") {
        return '"rMillTurn" [color = "' + pt[i].color +'"]'
    }
    else{
        return '"rMillTurn"';
    }
}