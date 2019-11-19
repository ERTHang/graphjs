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
var dots = [];
var num;
var pt = []
var interative = false;
var txt;
var showQualidade = false
var manutencaotm = false
var manutencaomontagem = false
var manutimetm = 0;
var manutimemontagem = 0;

//peca
var peca = {
    'armazem': -1,
    'esteira': -1,
    'rqualidade': -1,
    'qualidade': -1,
    'tm': -1,
    'rtm': -1,
    'rmontagem': -1,
    'montagem': -1,
    'end': -1,
    'bqualidade': -1,
    'bmontagem': -1,
    'btm': -1,
}

//modificar
var modificar = {
    'armazem': true,
    'esteira': true,
    'rqualidade': true,
    'qualidade': true,
    'tm': true,
    'rtm': true,
    'rmontagem': true,
    'montagem': true,
    'end': true,
    'bqualidade': true,
    'bmontagem': true,
    'btm': true,
}

function reset() {
    modificar.armazem = true
    modificar.esteira = true
    modificar.rqualidade = true
    modificar.qualidade = true
    modificar.tm = true
    modificar.rtm = true
    modificar.rmontagem = true
    modificar.montagem = true
    modificar.end = true
    modificar.bqualidade = true
    modificar.bmontagem = true
    modificar.btm = true
    peca.armazem = -1
    peca.esteira = -1
    peca.rqualidade = -1
    peca.qualidade = -1
    peca.tm = -1
    peca.rtm = -1
    peca.rmontagem = -1
    peca.montagem = -1
    peca.end = -1
    peca.bqualidade = -1
    peca.bmontagem = -1
    peca.btm = -1
    pt = []
    dots = []
    interative = false;
    showQualidade = false;
    n = 1
    manutencaotm = false
    manutencaomontagem = false
    manutimetm = 0
    manutimemontagem = 0
}



document.body.addEventListener("keyup", (e) => {
    if (interative) {
        if (e.key === "ArrowRight") {
            dotIndex++;
            if (dotIndex < dots.length) {
                var dotLines = dots[dotIndex];
                var dot = dotLines.join('');
                const element = graphviz;
                element
                    .renderDot(dot)
            } else if (!showQualidade) {
                dotIndex--;
                var relatorio = legenda.querySelectorAll("h1")
                var i = 0
                relatorio.forEach((param) => {
                    param.innerHTML = param.innerHTML + " [" + pt[i].qualidade + "%]"
                    i++
                })
                showQualidade = true;
                var erros = document.createElement("h1")
                erros.textContent = 'Porcentagem de erro'
                erros.setAttribute('style', 'font-size: 2em; color: red; margin-left: auto; margin-right:auto')
                legenda.before(erros)
            }
        }
    }
    if (interative) {
        if (e.key === "ArrowLeft") {
            dotIndex--;
            if (dotIndex >= 0) {
                var dotLines = dots[dotIndex];
                var dot = dotLines.join('');
                const element = graphviz;
                element
                    .renderDot(dot)
            }
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
    num = inp.value;
    reset()

    var erro = divs.querySelector("h1")
    if (erro != null) {
        erro.remove()
    }

    legenda.remove()
    var aux = document.createElement("div")
    aux.id = "legenda"
    divs.appendChild(aux)
    legenda = document.querySelector("#legenda")

    if (num[0] === "I") {
        alert("Por favor, insira pelo menos um valor \"1\" ou \"2\"")
        return;
    }


    for (let index = 0; index < num.length; index++) {
        const element = num[index];

        if (element != "1" && element != "2") {
            alert("Valor inválido: \"" + element + "\", insira apenas \"1\" ou \"2\"");
            return;
        }

        pt.push({
            'value': element,
            'color': getRandomColor(),
            'etapa': '',
            'destino': '',
            'complete': false,
            'qualidade': 0
        })

    }

    checks()

    if (k >= 1200) {
        alert("Ops, algo deu errado, tente novamente")
        location.reload()
        return;
    }

    var gradiv = document.querySelector("#graphs")
    var del = gradiv.querySelector("#graph");
    del.remove();
    var graph = document.createElement("div");
    graph.id = "graph";
    gradiv.appendChild(graph);

    dotIndex = 0;
    graphviz = d3.select("#graph").graphviz()
        .transition(function() {
            return d3.transition()
                .delay(0)
                .duration(500)
        })
        .on("initEnd", render)
        .height(300)
        .fit(true)

}

var j;

function render() {
    var dotLines = dots[dotIndex];
    var dot = dotLines.join('');
    const element = graphviz;
    element
        .renderDot(dot)
        .on("end", function() {
            if (j < pt.length) {
                if (dots[dotIndex][2].includes('color')) {
                    criar_legenda(j)
                    j++
                }
            }

            if (!interative) {
                dotIndex++;

                if (dotIndex < dots.length) {
                    render();
                } else if (!showQualidade) {
                    var relatorio = legenda.querySelectorAll("h1")
                    var i = 0
                    relatorio.forEach((param) => {
                        param.innerHTML = param.innerHTML + " [" + pt[i].qualidade + "%]"
                        i++
                    })
                    var erros = document.createElement("h1")
                    erros.textContent = 'Porcentagem de erro'
                    erros.setAttribute('style', 'font-size: 2em; color: red; margin-left: auto; margin-right:auto')
                    legenda.before(erros)
                    showQualidade = true
                }

            }
        });
}
var i;
var k;

function checks() {
    j = 0
    i = 0
    k = 0
    while (i != pt.length && k < 1200) {
        //while (k < 60) {
        k++
        check_esteira()
        check_rtm()
        check_btm()
        check_tm()
        check_rmontagem()
        check_bmontagem()
        check_montagem()
        check_rqualidade()
        check_bqualidade()
        check_qualidade()
        check_end()
        check_armazem()
        update()
    }
}

//CHEKS

function check_end() {
    if (peca.end != -1) {
        if (modificar.end) {
            pt[peca.end].etapa = 'fim'
            peca.end = -1
            i++;
        }
    }
}

function criar_legenda(index) {
    txt = document.createElement("h1");
    txt.textContent = "Peça nº " + (index + 1) + " do tipo " + pt[index].value;
    txt.setAttribute("style", "color : " + pt[index].color);
    legenda.appendChild(txt);
}

function check_armazem() {
    if (peca.armazem === -1) {
        for (let index = 0; index < pt.length; index++) {
            const element = pt[index];
            if (element.etapa === '') {
                element.etapa = 'armazem'
                element.destino = 'qualidade'
                peca.armazem = index
                modificar.armazem = false
                break
            }
        }
    } else {
        if (modificar.armazem) {
            if (pt[peca.armazem].destino === 'end') {
                troca('armazem', 'end')
            } else if (pt[peca.armazem].destino === 'descarte') {
                pt[peca.armazem].etapa = 'fim'
                peca.armazem = -1
                i++;
            } else if (peca.esteira === -1) {
                troca('esteira', 'armazem')
            }
        }
    }
}

function check_esteira() {
    if (peca.esteira != -1) {
        if (pt[peca.esteira].destino === 'end' || pt[peca.esteira].destino === 'descarte') {
            if (peca.armazem != -1) {
                check_end()
                check_armazem()
            }
            troca('armazem', 'esteira')
            modificar.armazem = false
        } else if (pt[peca.esteira].destino === 'qualidade') {
            if (peca.rqualidade != -1) {
                if (pt[peca.rqualidade].destino != 'qualidade') {
                    troca('esteira', 'rqualidade')
                } else {
                    check_rqualidade()
                }
            } else {
                troca('esteira', 'rqualidade')
            }
        } else if (pt[peca.esteira].destino === 'turnmill') {
            if (peca.rtm != -1) {
                if (pt[peca.rtm].destino != 'turnmill') {
                    troca('esteira', 'rtm')
                } else {
                    check_rtm()
                }
            } else {
                troca('esteira', 'rtm')
            }
        } else if (pt[peca.esteira].destino === 'montagem') {
            if (peca.rmontagem != -1) {
                if (pt[peca.rmontagem].destino != 'montagem') {
                    troca('esteira', 'rmontagem')
                } else {
                    check_rmontagem()
                }
            } else {
                troca('esteira', 'rmontagem')
            }
        }
    }
}

function check_rqualidade() {
    if (peca.rqualidade != -1) {
        if (modificar.rqualidade) {
            if (pt[peca.rqualidade].destino != 'qualidade') {
                if (modificar.esteira) {
                    if (peca.esteira === -1) {
                        troca('rqualidade', 'esteira')
                    }
                } else {
                    if (peca.bqualidade === -1) {
                        troca('rqualidade', 'bqualidade')
                    } else {
                        check_bqualidade()
                    }
                }
            } else if (peca.qualidade === -1) {
                if (pt[peca.rqualidade].destino === 'qualidade') {
                    troca('rqualidade', 'qualidade')
                }
            } else {
                check_qualidade()
            }
        }
    }
}

function check_bqualidade() {
    if (peca.bqualidade != -1) {
        if (modificar.bqualidade) {
            if (peca.rqualidade === -1) {
                troca('rqualidade', 'bqualidade')
            } else {
                if (modificar.rqualidade) {
                    if (peca.qualidade === -1 && pt[peca.qualidade].destino === 'qualidade') {
                        check_rqualidade()
                        troca('rqualidade', 'bqualidade')
                    } else if (peca.rqualidade > peca.bqualidade) {
                        troca('rqualidade', 'bqualidade')
                    }
                }
            }
        }
    }
}

var n;

function check_qualidade() {
    if (peca.qualidade != -1) {
        if (modificar.qualidade) {
            if (pt[peca.qualidade].complete) {
                pt[peca.qualidade].qualidade = Math.round(Math.random() * n++ * 100) / 100
                if (pt[peca.qualidade].qualidade >= 5 && pt[peca.qualidade].value == '1') {
                    pt[peca.qualidade].destino = 'descarte'
                    if (!manutencaotm) {
                        manutencaotm = true
                        manutimetm = 0
                    }
                } else if (pt[peca.qualidade].qualidade >= 3 && pt[peca.qualidade].value == '2') {
                    pt[peca.qualidade].destino = 'descarte'
                    if (!manutencaomontagem) {
                        manutencaomontagem = true
                        manutimemontagem = 0
                    }
                } else {
                    pt[peca.qualidade].destino = 'end'
                }
            } else {
                if (pt[peca.qualidade].value === '1') {
                    pt[peca.qualidade].destino = 'turnmill'
                } else {
                    pt[peca.qualidade].destino = 'montagem'
                }
            }
            if (modificar.rqualidade) {
                if (peca.rqualidade === -1) {
                    troca('qualidade', 'rqualidade')
                } else {
                    if (pt[peca.rqualidade].destino === 'qualidade') {
                        troca('qualidade', 'rqualidade')
                    }
                }
            }
        }
    }
}

function check_btm() {
    if (peca.btm != -1) {
        if (modificar.btm) {
            if (peca.rtm === -1 && (!manutencaotm || pt[peca.btm].destino != 'turnmill')) {
                troca('rtm', 'btm')
            }
        }
    }
}

function check_rtm() {
    if (peca.rtm != -1) {
        if (modificar.rtm) {
            if (pt[peca.rtm].destino != 'turnmill') {
                if (modificar.esteira) {
                    if (peca.esteira === -1) {
                        troca('esteira', 'rtm')
                    }
                } else {
                    if (peca.btm === -1) {
                        troca('rtm', 'btm')
                    } else {
                        check_btm()
                    }
                }
            } else if (peca.tm === -1) {
                if (!manutencaotm) {
                    troca('rtm', 'tm')
                } else {
                    if (peca.btm === -1) {
                        troca('rtm', 'btm')
                    }
                }
            } else {
                check_tm()
            }
        }
    }
}

function check_tm() {
    if (peca.tm != -1) {
        if (modificar.tm) {
            pt[peca.tm].destino = 'qualidade'
            pt[peca.tm].complete = true
            if (modificar.rtm) {
                troca('tm', 'rtm')
            }
        }
    } else {
        console.log(manutimetm)
        if (manutencaotm) {
            manutimetm++;
            if (manutimetm === 10) {
                n = 1
                manutencaotm = false
            }
        }
    }
}

function check_bmontagem() {
    if (peca.bmontagem != -1) {
        if (modificar.bmontagem) {
            if (peca.rmontagem === -1 && (!manutencaomontagem || pt[peca.bmontagem] != 'montagem')) {
                troca('rmontagem', 'bmontagem')
            }
        }
    }
}

function check_rmontagem() {
    if (peca.rmontagem != -1) {
        if (modificar.rmontagem) {
            if (pt[peca.rmontagem].destino != 'montagem') {
                if (modificar.esteira) {
                    if (peca.esteira === -1) {
                        troca('esteira', 'rmontagem')
                    }
                } else {
                    if (peca.bmontagem === -1) {
                        troca('rmontagem', 'bmontagem')
                    } else {
                        check_bmontagem()
                    }
                }
            } else if (peca.montagem === -1) {
                if (!manutencaomontagem) {
                    troca('rmontagem', 'montagem')
                } else {
                    if (peca.bmontagem === -1) {
                        troca('rmontagem', 'bmontagem')
                    }
                }
            } else {
                check_montagem()
            }
        }
    }
}

function check_montagem() {
    if (peca.montagem != -1) {
        if (modificar.montagem) {
            pt[peca.montagem].destino = 'qualidade'
            pt[peca.montagem].complete = true
            if (modificar.montagem) {
                troca('montagem', 'rmontagem')
            }
        }
    } else {
        if (manutencaomontagem) {
            manutimemontagem++;
            if (manutimemontagem === 10) {
                n = 1
                manutencaomontagem = false
            }
        }
    }
}

//PUSHS

function update() {
    dots.push(
        [
            'digraph  {',
            'node [style="filled"]',
            test_armazem(),
            test_esteira(),
            test_qualidade(),
            test_bqualidade(),
            test_montagem(),
            test_bmontagem(),
            test_mt(),
            test_bmt(),
            test_rqualidade(),
            test_rmontagem(),
            test_rmt(),
            test_end(),
        ].concat(extra())
    )

    modificar.armazem = true
    modificar.esteira = true
    modificar.qualidade = true
    modificar.bqualidade = true
    modificar.montagem = true
    modificar.bmontagem = true
    modificar.tm = true
    modificar.btm = true
    modificar.rqualidade = true
    modificar.rmontagem = true
    modificar.rtm = true
    modificar.end = true

    console.log(pt[0].etapa)

}

function test_montagem() {
    try {
        return '"Montagem" [color = "' + pt[peca.montagem].color + '"]'
    } catch (error) {
        if (manutencaomontagem) {
            return '"Montagem" [fontcolor = "red", style = "dotted", color = "red"]';
        }
        return '"Montagem"';
    }
}

function test_bmontagem() {
    try {
        return '"bMontagem" [color = "' + pt[peca.bmontagem].color + '"]'
    } catch (error) {
        return '"bMontagem"';
    }
}

function test_mt() {
    try {
        return '"Mill_turn" [color = "' + pt[peca.tm].color + '"]'
    } catch (error) {
        if (manutencaotm) {
            return '"Mill_turn" [fontcolor = "red", style = "dotted", color = "red"]';
        }
        return '"Mill_turn"';
    }
}

function test_bmt() {
    try {
        return '"bMillTurn" [color = "' + pt[peca.btm].color + '"]'
    } catch (error) {
        return '"bMillTurn"';
    }
}

function test_rmontagem() {
    try {
        return '"rMontagem" [color = "' + pt[peca.rmontagem].color + '"]'
    } catch (error) {
        return '"rMontagem"';
    }
}

function test_rmt() {
    try {
        return '"rMillTurn" [color = "' + pt[peca.rtm].color + '"]'
    } catch (error) {
        return '"rMillTurn"';
    }
}


function test_armazem() {
    try {
        return '"Armazem" [color = "' + pt[peca.armazem].color + '\"]'
    } catch (error) {
        return '"Armazem"'
    }
}

function test_esteira() {
    try {
        return '"Esteira" [color = "' + pt[peca.esteira].color + '\"]'
    } catch (error) {
        return '"Esteira"'
    }
}

function test_qualidade() {
    try {
        return '"Qualidade" [color = "' + pt[peca.qualidade].color + '\"]'
    } catch (error) {
        return '"Qualidade"'
    }
}

function test_bqualidade() {
    try {
        return '"bQualidade" [color = "' + pt[peca.bqualidade].color + '\"]'
    } catch (error) {
        return '"bQualidade"'
    }
}

function test_rqualidade() {
    try {
        return '"rQualidade" [color = "' + pt[peca.rqualidade].color + '\"]'
    } catch (error) {
        return '"rQualidade"'
    }
}

function test_end() {
    try {
        return '"END" [color = "' + pt[peca.end].color + '\"]'
    } catch (error) {
        return '"END"'
    }
}

function extra() {
    return [
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
}

function troca(a, b) {
    [peca[a], peca[b]] = [peca[b], peca[a]]
    if (peca[a] != -1) {
        pt[peca[a]].etapa = a
        modificar[a] = false
    } else { modificar[a] = true }
    if (peca[b] != -1) {
        pt[peca[b]].etapa = b
        modificar[b] = false
    } else { modificar[b] = true }
}