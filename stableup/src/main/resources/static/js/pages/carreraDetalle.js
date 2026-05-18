import { UsuarioAPI } from '../api/UsuarioApi.js';
import { CaballoAPI } from '../api/CaballoApi.js';
import { HabitoAPI } from '../api/HabitoApi.js';

import { crearBarraNavegacion } from '../components/navbarComponente.js';
import { crearFooter } from '../components/footerComponente.js';

import { presentarCaballo } from '../components/presentacionCaballoComponente.js';
import { statsCaballo } from '../components/statsCaballoComponente.js';
import { mostrarContringantes } from '../components/contringantesComponente.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const contringantesPagina = 8;

// Navbar y footer
document.getElementById("navbar").innerHTML = crearBarraNavegacion();
document.getElementById("stable-footer").innerHTML = crearFooter();

textoRotacionEfecto();

// Lo vi en una pagina y me gusto
function textoRotacionEfecto() {
    const elemento = document.querySelector(".nombre-stableup");
    let palabra = elemento.innerText;

    elemento.addEventListener("mouseover", function () {
        for (let i = 0; i < palabra.length; i++) {
            setTimeout(function () {
                const primeraLetra = palabra.charAt(0);
                palabra = palabra.slice(1) + primeraLetra;
                elemento.textContent = palabra;
            }, i * 75); // el bucle no espera al timeout para la siguiente itineracion 
            // asi que si no lo escalonas se programan todas las acciones a la vez
        }
    });
}

// Tarjeta del caballo
async function cargarTarjetaCaballo() {
    const caballo = await CaballoAPI.obtenerPorId(id);

    document.getElementById("tarjeta-caballo").innerHTML = presentarCaballo(caballo, id);
}

async function cargarStatsCaballo() {
    const caballo = await CaballoAPI.obtenerPorId(id);

    document.getElementById("stats-caballo").innerHTML = statsCaballo(caballo, id);
}

async function cargarContringantes() {
    const caballo = await CaballoAPI.obtenerTodos(id);

    document.getElementById("lista-contringantes").innerHTML = mostrarContringantes(caballo, contringantesPagina);
}

// Inicializa la pagina
cargarTarjetaCaballo();
cargarStatsCaballo();

cargarContringantes();