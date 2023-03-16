const URL = "192.168.100.28:8080";
const NUMERO_CUADROS = 12;
const TURNOS_PARA_TERMINAR_EL_JUEGO_SIN_ERRORES = 6;


describe('Juego Del Memo-Test', () => {

  describe('Test previos al Juego', () => {
    beforeEach(() => {
      cy.visit(URL);
    })


    it('Se asegura de que haya un tablero con cuadros', () => {
      cy.get("#tablero-de-juego")
        .find("input")
        .should("have.length", NUMERO_CUADROS);
    })

    it('Se asegura de que se randomizen los inputs', () => {
      let inputsPrincipales = [];
      cy.get('input')
        .then((inputs) => {
          inputs.each((i, $input) => {
            inputsPrincipales[i] = $input
          })
        })
      cy.visit("192.168.100.28:8080")
      let inputsSecundarios = [];
      cy.get('input')
        .then((nuevosInputs) => {
          nuevosInputs.each((i, $input2) => {
            inputsSecundarios[i] = $input2
          })
        })
      cy.wrap(inputsPrincipales)
        .should("not.deep.equal", inputsSecundarios);
      console.log(inputsPrincipales)
      console.log(inputsSecundarios)
    })

    it('Se asegura de que se coloreen todos los cuadros', () => {
      cy.get("input",)
        .should('satisfy', ($input) => {
          const classList = Array.from($input[3].classList)
          return classList.includes('bg-success') || classList.includes('bg-danger') || classList.includes('bg-light') || classList.includes('bg-dark') || classList.includes('bg-primary') || classList.includes('bg-warning')
        })
    })

    it('Se asegura que los inputs poseala opacidad en cero', () => {
      cy.get('input')
        .should('contain.css', 'opacity', '0')
    })

  })

  describe('Jugar al Juego Como Tal', () => {
    beforeEach(() => {
      cy.visit(URL);
    })
    it('Resolver el juego', () => {
      let mapaDePares, listaDePares;
      cy.get('input').then(inputs => {
        mapaDePares = obtenerParesDeCuadros(inputs);
        listaDePares = Object.values(mapaDePares);
        listaDePares.forEach((pares) => {
          cy.get(pares[0]).click()
          cy.get(pares[1]).click()
        })
      })
      cy.get('#resultado')
        .should("be.visible")
        .and('contain', `Felicidades terminaste en tan solo ${TURNOS_PARA_TERMINAR_EL_JUEGO_SIN_ERRORES} turnos`)
    })

  })

})





function obtenerParesDeCuadros(inputs) {
  const pares = {};
  inputs.each((i, input) => {
    const claseColorDelCuadro = input.className.replace("form-control w-100 h-100 ", "")
    if (pares[claseColorDelCuadro]) {
      pares[claseColorDelCuadro].push(input);
    } else {
      pares[claseColorDelCuadro] = [input];
    }
  })
  console.log(pares)
  return pares;
}