import { UsuarioAPI } from '../api/UsuarioApi.js';
import { CaballoAPI } from '../api/CaballoApi.js';
import { HabitoAPI } from '../api/HabitoApi.js';

import { crearBarraNavegacion } from '../components/navbarComponente.js';
import { crearFooter } from '../components/footerComponente.js';

import { tarjetaUsuario } from '../components/tarjetaUsuarioComponente.js';
import { cargarBarraExperiencia } from '../components/barraExperienciaComponente.js';

import { establo } from '../components/establoComponente.js';

import { carruselHabitos } from '../components/carruselHabitosComponente.js';

import { cargarModalHabito } from '../components/crearHabitoComponente.js';
import { cargarModalEditarHabito } from '../components/editarHabitoComponente.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

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

// Datos del usuario
async function cargarDatosUsuario() {
    const usuario = await UsuarioAPI.obtenerPorId(id);

    // Crea la tarjeta de usuario
    const contenedor = document.getElementById("datos-usuario");
    contenedor.innerHTML = tarjetaUsuario(usuario);

    const porcentajeNivel = (usuario.nivel - Math.trunc(usuario.nivel)) * 100;

    cargarBarraExperiencia(porcentajeNivel);

    gachaCaballo();

    // Inicializa tooltips de bootstrap
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(elemento => new bootstrap.Tooltip(elemento));
}

// Lista de habitos
async function cargarHabitosUsuario(idHabitoActivo) {
    const habitosUsuario = await UsuarioAPI.obtenerHabitos(id);

    const contenedor = document.getElementById("lista-habitos");
    contenedor.innerHTML = carruselHabitos(habitosUsuario, idHabitoActivo);

    prepararEditarHabito();
    prepararCompletarHabito();
}

// Prepara el boton de completar habito
function prepararCompletarHabito() {
    // Recorre botones de editar (hay uno por habito)
    document.querySelectorAll(".boton-completar-habito").forEach(function (boton) {
        boton.addEventListener("click", async function () {

            const idHabito = boton.dataset.idHabito;

            await HabitoAPI.completar(idHabito);

            cargarHabitosUsuario(idHabito);
            cargarDatosUsuario();

        });
    });
}

// Prepara el modal de editar habito con los datos del habito seleccionado
function prepararEditarHabito() {
    // Recorre botones de editar (hay uno por habito)
    document.querySelectorAll(".boton-editar-habito").forEach(function (boton) {
        boton.addEventListener("click", async function () {

            const idHabito = boton.dataset.idHabito;

            // Aplica los datos actuales del habito
            const habito = await HabitoAPI.obtenerPorId(idHabito);

            document.getElementById("nuevo-nombre-habito").value = habito.nombre;
            document.getElementById("nuevo-tipo-habito").value = habito.tipo;

            // Guarda el id del habito en el data del modal
            document.getElementById("editarHabitoModal").dataset.idHabito = idHabito;
        });
    });
}

// Elimina el habito seleccionado
function botonEliminarHabito() {
    document.getElementById("boton-eliminar-habito").addEventListener("click", async function () {

        // Encuentra y elimina el habito
        const idHabito = document.getElementById("editarHabitoModal").dataset.idHabito;
        await HabitoAPI.eliminar(idHabito);

        // Esconde el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("editarHabitoModal"));
        modal.hide();

        // Recarga los datos
        cargarHabitosUsuario();
        cargarDatosUsuario();
    });
}

// Guarda el habito con los nuevos datos
function botonGuardarHabito() {
    document.getElementById("formulario-editar-habito").addEventListener("submit", async function (e) {
        e.preventDefault();

        // Lee el formulario
        const nuevoNombre = document.getElementById("nuevo-nombre-habito").value
        const nuevoTipo = document.getElementById("nuevo-tipo-habito").value

        const idHabito = document.getElementById("editarHabitoModal").dataset.idHabito

        // Si no esta vacio lo actualiza en la api
        if (nuevoNombre != "" && nuevoTipo != "") {
            const habitoNuevo = {
                nombre: nuevoNombre,
                tipo: nuevoTipo
            };

            await HabitoAPI.editar(idHabito, habitoNuevo);

            // Cierra el modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("editarHabitoModal"));
            modal.hide();

            // Recarga
            cargarHabitosUsuario();
        } else {
            document.getElementById("mensaje-error-editar").innerText = "Tipo o nombre inválidos";
        }
    });
}

// Crea el habito con los datos proporcionados
function botonCrearHabito() {
    document.getElementById("formulario-crear-habito").addEventListener("submit", async function (e) {
        e.preventDefault();

        const nombreHabito = document.getElementById("nombre-habito").value;
        const tipoHabito = document.getElementById("tipo-habito").value;

        if (nombreHabito != "" && tipoHabito != "") {
            // Esconde el modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("habitoModal"));
            modal.hide();

            // Devuelve un objeto que la api convierte a json despues para java como habito
            const habito = {
                nombre: nombreHabito,
                tipo: tipoHabito
            };

            await UsuarioAPI.crearHabito(id, habito);

            // Recarga
            cargarDatosUsuario();
            cargarHabitosUsuario();
        } else {
            document.getElementById("mensaje-error-crear").innerText = "Tipo o nombre inválidos";
        }
    });
}

// Lista de caballos
async function cargarCaballosUsuario() {
    const caballos = await UsuarioAPI.obtenerCaballos(id);
    document.getElementById("lista-caballos").innerHTML = establo(caballos);
}

// Gacha de nuevo caballo
async function gachaCaballo() {
    document.getElementById('gacha-caballos').addEventListener('click', async () => {

        const boton = document.getElementById('gacha-caballos');
        const tooltipBoton = bootstrap.Tooltip.getInstance(boton);

        // Mensaje de monedas insuficientes
        const resultado = await CaballoAPI.generarParaUsuario(id);

        if (resultado == null) {
            tooltipBoton.setContent({ '.tooltip-inner': '¡No tienes suficientes monedas!' });
            tooltipBoton.show();
            return;
        }

        // Termina estancia vieja del tooltip
        if (tooltipBoton) tooltipBoton.dispose();

        // Refrescar la vista del usuario
        cargarDatosUsuario();
        cargarCaballosUsuario();
    });
}

// Inicializa la pagina
cargarModalEditarHabito();
cargarModalHabito();

botonCrearHabito();
botonGuardarHabito();
botonEliminarHabito();

cargarDatosUsuario();
cargarHabitosUsuario();
cargarCaballosUsuario();