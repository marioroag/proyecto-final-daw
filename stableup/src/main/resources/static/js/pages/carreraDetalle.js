import { UsuarioAPI } from '../api/UsuarioApi.js';
import { CaballoAPI } from '../api/CaballoApi.js';
import { HabitoAPI } from '../api/HabitoApi.js';
import { CarreraAPI } from '../api/CarreraApi.js';

import { crearBarraNavegacion } from '../components/navbarComponente.js';
import { crearFooter } from '../components/footerComponente.js';
import { textoRotacionEfecto } from '../components/efectoTextoRotacion.js';

import { presentarCaballo } from '../components/presentacionCaballoComponente.js';
import { statsCaballo } from '../components/statsCaballoComponente.js';
import { mostrarContrincantes } from '../components/contrincantesComponente.js';
import { preparacionCarrera } from '../components/preparacionCarreraComponente.js';
import { modalScrolleableComponente } from '../components/modalScrolleableComponente.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const CONTRINCANTES_CARRERA = 4;
const caballosContrincantes = await CaballoAPI.obtenerContrincantes(id);
const caballoPropio = await CaballoAPI.obtenerPorId(id);
let contrincantesSeleccionados = [];

const numCaballos = caballosContrincantes.length;

const TAMANIO_PAGINA = 8;
let inicio = 0;

// Navbar y footer
document.getElementById("navbar").innerHTML = crearBarraNavegacion();
document.getElementById("stable-footer").innerHTML = crearFooter();

textoRotacionEfecto(".nombre-stableup");

// Tarjeta del caballo
async function cargarTarjetaCaballo() {
    const caballo = await CaballoAPI.obtenerPorId(id);

    document.getElementById("tarjeta-caballo").innerHTML = presentarCaballo(caballo);
}

async function cargarStatsCaballo() {
    const caballo = await CaballoAPI.obtenerPorId(id);

    document.getElementById("stats-caballo").innerHTML = statsCaballo(caballo, id);
}

async function cargarContrincantes() {
    let fin = inicio + TAMANIO_PAGINA;

    if (fin > numCaballos) {
        fin = numCaballos;
    }
    const caballosPagina = caballosContrincantes.slice(inicio, fin);

    document.getElementById("lista-contrincantes").innerHTML = mostrarContrincantes(caballosPagina, caballosPagina.length);

    if (caballosContrincantes.length > 0) {
        engancharBotonesPaginacion();
        engancharBotonesSeleccionar();
    }
}

function pasarPagina() {
    if (inicio + TAMANIO_PAGINA < numCaballos) {
        inicio += TAMANIO_PAGINA;
        cargarContrincantes();
    }
}

function volverPagina() {
    if (inicio > 0) {
        inicio -= TAMANIO_PAGINA;
        cargarContrincantes();
    }
}

function engancharBotonesPaginacion() {
    document.getElementById("pasar-pagina").addEventListener("click", pasarPagina);
    document.getElementById("volver-pagina").addEventListener("click", volverPagina);
}

function actualizarPreparacionCarrera() {
    const posibilidadExito = calcularPosibilidadExito(caballoPropio, contrincantesSeleccionados);
    const recompensa = calcularRecompensa(posibilidadExito);

    document.getElementById("preparacion-carrera").innerHTML = preparacionCarrera(contrincantesSeleccionados, posibilidadExito, recompensa, CONTRINCANTES_CARRERA);

    engancharBotonesQuitar();
    engancharBotonIniciar();
}

function calcularPosibilidadExito(caballoPropio, contrincantes) {
    let resultado = 0;

    if (contrincantes.length > 0) {
        let sumaStatsRivales = 0;

        contrincantes.forEach(function (caballo) {
            sumaStatsRivales += caballo.velocidad + caballo.energia;
        });

        const mediaStatsRivales = sumaStatsRivales / contrincantes.length;
        const statsCaballoPropio = caballoPropio.velocidad + caballoPropio.energia;

        resultado = Math.round((statsCaballoPropio / (statsCaballoPropio + mediaStatsRivales)) * 100);
    }

    return resultado;
}

function calcularRecompensa(posibilidadExito) {
    const recompensaMinima = 50;
    const recompensaMaxima = 500;
    const posibilidadFracaso = (100 - posibilidadExito) / 100;
    const resultado = Math.round(recompensaMinima + (recompensaMaxima - recompensaMinima) * posibilidadFracaso);

    return resultado;
}

function seleccionarContrincante(idCaballoSeleccionar) {
    if (contrincantesSeleccionados.length < 4) {
        let seleccionado = false;

        // Comprueba si ya esta seleccionado
        contrincantesSeleccionados.forEach(function (caballoSeleccionado) {
            if (caballoSeleccionado.id == idCaballoSeleccionar) {
                seleccionado = true;
            }
        });

        if (!seleccionado) {
            let caballoEncontrado = null;
            // Busca el caballo en el array que ya tenemos
            caballosContrincantes.forEach(function (caballo) {
                if (caballo.id == idCaballoSeleccionar) {
                    caballoEncontrado = caballo;
                }
            });

            contrincantesSeleccionados.push(caballoEncontrado);
            actualizarPreparacionCarrera();
        }
    }
}

function quitarContrincante(idCaballo) {
    const nuevosContrincantes = [];
    contrincantesSeleccionados.forEach(function (caballo) {
        if (caballo.id != idCaballo) {
            nuevosContrincantes.push(caballo);
        }
    });

    contrincantesSeleccionados = nuevosContrincantes;
    actualizarPreparacionCarrera();
}

function engancharBotonesSeleccionar() {
    document.querySelectorAll(".boton-seleccionar-contrincante").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const idCaballo = boton.dataset.idCaballo;
            seleccionarContrincante(idCaballo);
        });
    });
}

function engancharBotonesQuitar() {
    document.querySelectorAll(".boton-quitar-contrincante").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const idCaballo = boton.dataset.idCaballo;
            quitarContrincante(idCaballo);
        });
    });
}

function engancharBotonIniciar() {
    const botonIniciar = document.getElementById("boton-iniciar-carrera");

    // Esta el boton?
    if (!(botonIniciar == null)) {
        botonIniciar.addEventListener("click", async function () {

            // Hay 4 contrincantes seleccionados?
            if (contrincantesSeleccionados.length == CONTRINCANTES_CARRERA) {
                const idsContrincantes = [];

                contrincantesSeleccionados.forEach(function (caballo) {
                    idsContrincantes.push(caballo.id);
                });

                const carreraResultado = await CarreraAPI.iniciar(id, idsContrincantes);

                // Busca su participacion
                let participacionPropia = null;
                carreraResultado.participaciones.forEach(function (participacion) {
                    if (participacion.idCaballo == id) {
                        participacionPropia = participacion;
                    }
                });

                let mensaje = "";

                if (participacionPropia.posicion === 1) {
                    mensaje = `GANADOR!\nPosicion: ${participacionPropia.posicion}\nTiempo: ${participacionPropia.tiempoFinal}s\nRecompensa: ${participacionPropia.recompensa} 🪙`;
                } else {
                    mensaje = `Posicion: ${participacionPropia.posicion}\nTiempo: ${participacionPropia.tiempoFinal}s\nRecompensa: ${participacionPropia.recompensa} 🪙`;
                }
                alert(mensaje);

                cargarParticipacionesModal()
                contrincantesSeleccionados = [];
                actualizarPreparacionCarrera();
            };
        })
    }
}

async function cargarParticipacionesModal() {
    const participaciones = await CaballoAPI.obtenerParticipaciones(id);
    let filas = "";

    participaciones.forEach(participacion => {
        filas += `
            <div class="d-flex justify-content-between border rounded p-2 mb-2">
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

await cargarContrincantes();

actualizarPreparacionCarrera()
cargarParticipacionesModal();