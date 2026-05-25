const velocidadEfecto = 75

export function textoRotacionEfecto(claseTexto) {
    const elemento = document.querySelector(claseTexto);
    let palabra = elemento.innerText;

    elemento.addEventListener("mouseover", function () {
        for (let i = 0; i < palabra.length; i++) {
            setTimeout(function () {
                const primeraLetra = palabra.charAt(0);
                palabra = palabra.slice(1) + primeraLetra;
                elemento.textContent = palabra;
            }, i * velocidadEfecto); // el bucle no espera al timeout para la siguiente itineracion 
            // asi que si no lo escalonas se programan todas las acciones a la vez
        }
    });
}