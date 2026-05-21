import { UsuarioAPI } from '../api/UsuarioApi.js';
import { CaballoAPI } from '../api/CaballoApi.js';
import { HabitoAPI } from '../api/HabitoApi.js';

import { crearBarraNavegacion } from '../components/navbarComponente.js';
import { crearFooter } from '../components/footerComponente.js';

import { presentarCaballo } from '../components/presentacionCaballoComponente.js';
import { statsCaballo } from '../components/statsCaballoComponente.js';
import { mostrarContringantes } from '../components/contringantesComponente.js';
import { preparacionCarrera } from '../components/preparacionCarreraComponente.js';
import { modalScrolleableComponente } from '../components/modalScrolleableComponente.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const caballos = await CaballoAPI.obtenerTodos();
const numCaballos = caballos.length

const TAMANIO_PAGINA = 8;
let inicio = 0;

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

    document.getElementById("tarjeta-caballo").innerHTML = presentarCaballo(caballo);
}

async function cargarStatsCaballo() {
    const caballo = await CaballoAPI.obtenerPorId(id);

    document.getElementById("stats-caballo").innerHTML = statsCaballo(caballo, id);
}

async function cargarContringantes() {
    let fin = inicio + TAMANIO_PAGINA;

    if (fin > numCaballos) {
        fin = numCaballos;
    }
    const caballosPagina = caballos.slice(inicio, fin);

    document.getElementById("lista-contringantes").innerHTML = mostrarContringantes(caballosPagina, caballosPagina.length);

    engancharBotonesPaginacion();
}

function pasarPagina() {
    if (inicio + TAMANIO_PAGINA < numCaballos) {
        inicio += TAMANIO_PAGINA;
        cargarContringantes();
    }
}

function volverPagina() {
    if (inicio > 0) {
        inicio -= TAMANIO_PAGINA;
        cargarContringantes();
    }
}

function engancharBotonesPaginacion() {
    document.getElementById("pasar-pagina").addEventListener("click", pasarPagina);
    document.getElementById("volver-pagina").addEventListener("click", volverPagina);
}

async function cargarPreparacion() {
    document.getElementById("preparacion-carrera").innerHTML = preparacionCarrera();
}

async function cargarParticipacionesModal() {
    const participaciones = await CaballoAPI.obtenerParticipaciones(id);
    let filas = "";

    participaciones.forEach(participacion => {
        filas += `
            <div class="d-flex justify-content-between border p-2 mb-1">
                <span class="text-dark fw-semibold">Posición: ${participacion.posicion}</span>
                <span class="text-muted">Tiempo: ${participacion.tiempoFinal}</span>
                <span class="text-muted">Recompensa: ${participacion.recompensa}</span>
            </div>
        `;
    });

    document.getElementById("contenedorModalHistorialCaballo").innerHTML = modalScrolleableComponente(filas, "Historial");
}

// Inicializa la pagina
cargarTarjetaCaballo();
cargarStatsCaballo();

await cargarContringantes();
engancharBotonesPaginacion();
cargarPreparacion();

cargarParticipacionesModal();