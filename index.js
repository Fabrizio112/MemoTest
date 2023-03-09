let $todosLosInputs = document.querySelectorAll("input");
let arrayDeLaSecuencia = [];
let jugadaDelUsuario = [];
let contadorDeTurnos = 0;
function asignarIDParaCadaInput(a) {
    a.forEach((input, indice) => {
        input.id = `input${indice + 1}`;
    })
}

function llenarELArrayDeLaSecuencia(a) {
    let cantidadNumeros = 12;
    while (a.length < cantidadNumeros) {
        const inputAleatorio = seleccionarAlgunInputAleatorio();
        let banderaDeInput = false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] == inputAleatorio) {
                banderaDeInput = true;
                break;
            }
        }
        if (!banderaDeInput) {
            a[a.length] = inputAleatorio;
        }

    }
}
function memoTestFuncionando() {
    asignarIDParaCadaInput($todosLosInputs);
    llenarELArrayDeLaSecuencia(arrayDeLaSecuencia);
    asignarNameALosInputs();
    document.querySelectorAll(`[id*="input"]`).forEach((input) => {
        colorearInput(input);
    })
    cambiarLaOpacidadACero();
}
memoTestFuncionando();
function evaluarElContadorDeInputsDeshabilitados(contadorDeInputsDeshabilitados, contadorDeTurnos) {
    if (contadorDeInputsDeshabilitados === 12) {
        document.querySelector(".container-fluid").classList.add("d-none");
        document.querySelector("#resultado").classList.remove("d-none");
        document.querySelector("#felicitaciones").textContent = `Felicidades terminaste en tan solo ${contadorDeTurnos} turnos`
    } else {
    }
}

let contadorDeInputsDeshabilitados = 0;
document.querySelectorAll(`[id*="input"]`).forEach((input) => {
    input.onclick = function (e) {
        input.style.opacity = 1;
        let inputTocado = e.target;
        jugadaDelUsuario.push(inputTocado)
        setTimeout(() => {
            if (jugadaDelUsuario.length === 2) {
                if (jugadaDelUsuario[0].id === jugadaDelUsuario[1].id) {
                    jugadaDelUsuario.forEach((jugada) => {
                        jugada.style.opacity = 0;
                    })
                    contadorDeTurnos++;
                    resetearLaJugadaDelUsuario()
                    cambiarLaOpacidadACero();
                    return;
                }



                if (jugadaDelUsuario[0].name === jugadaDelUsuario[1].name) {
                    jugadaDelUsuario.forEach((jugada) => {
                        jugada.disabled = true;
                        jugada.classList.add("bg-secondary");
                        jugada.id = "disabled";
                        contadorDeInputsDeshabilitados++;
                    })
                } else {
                    jugadaDelUsuario.forEach((jugada) => {
                        jugada.style.opacity = 0;
                    })
                }
                contadorDeTurnos++;
                resetearLaJugadaDelUsuario()
                cambiarLaOpacidadACero();
                setTimeout(() => {
                    evaluarElContadorDeInputsDeshabilitados(contadorDeInputsDeshabilitados, contadorDeTurnos)
                }, 600)
            }
        }, 200)
    }
})

function resetearLaJugadaDelUsuario() {
    jugadaDelUsuario = [];
}

function seleccionarAlgunInputAleatorio() {
    let valorInputs = document.querySelectorAll(`[id*="input"]`)
    let indice = Math.floor(Math.random() * valorInputs.length);
    return valorInputs[indice];
}

function asignarNameALosInputs() {
    colorearInputDeCeleste();
    colorearInputDeRojo();
    colorearInputDeBlanco();
    colorearInputDeNegro();
    colorearInputDeVerde();
    colorearInputDeNaranja();
}
function colorearInputDeCeleste() {
    arrayDeLaSecuencia[0].name = "1";
    arrayDeLaSecuencia[1].name = "1";
}

function colorearInputDeRojo() {
    arrayDeLaSecuencia[2].name = "2";
    arrayDeLaSecuencia[3].name = "2";
}

function colorearInputDeBlanco() {
    arrayDeLaSecuencia[4].name = "3";
    arrayDeLaSecuencia[5].name = "3";
}

function colorearInputDeNegro() {
    arrayDeLaSecuencia[6].name = "4";
    arrayDeLaSecuencia[7].name = "4";
}
function colorearInputDeVerde() {
    arrayDeLaSecuencia[8].name = "5";
    arrayDeLaSecuencia[9].name = "5";
}

function colorearInputDeNaranja() {
    arrayDeLaSecuencia[10].name = "6";
    arrayDeLaSecuencia[11].name = "6";
}

function colorearInput(input) {
    if (input.name === "1") {
        input.classList.add("bg-primary")
    }
    if (input.name === "2") {
        input.classList.add("bg-danger")
    }
    if (input.name === "3") {
        input.classList.add("bg-light")
    }
    if (input.name === "4") {
        input.classList.add("bg-dark")
    }
    if (input.name === "5") {
        input.classList.add("bg-success")
    }
    if (input.name === "6") {
        input.classList.add("bg-warning")
    }
}

function cambiarLaOpacidadACero() {
    document.querySelectorAll(`[id*="input"]`).forEach((input) => {
        input.style.opacity = 0;
    })
}