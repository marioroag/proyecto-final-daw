import { UsuarioAPI } from '../api/UsuarioApi.js';
import { CaballoAPI } from '../api/CaballoApi.js';
import { HabitoAPI } from '../api/HabitoApi.js';

import { crearBarraNavegacion } from '../components/navbar.js';
import { crearFooter } from '../components/footer.js';

import { tarjetaUsuario } from '../components/tarjetaUsuarioComponente.js';
import { establo } from '../components/establoComponente.js';

import { carruselHabitos } from '../components/carruselHabitosComponente.js';

import { cargarModalHabito } from '../components/crearHabitoComponente.js';
import { cargarModalEditarHabito } from '../components/editarHabitoComponente.js';
import { cargarBarraExperiencia } from '../components/experienciaBarraComponenete.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Navbar
document.getElementById("navbar").innerHTML = crearBarraNavegacion();
document.getElementById("stable-footer").innerHTML = crearFooter();

// Datos del usuario
async function cargarDatosUsuario() {
    const usuario = await UsuarioAPI.obtenerPorId(id);

    const contenedor = document.getElementById("datos-usuario");
    contenedor.innerHTML = tarjetaUsuario(usuario);

    const porcentajeNivel = (usuario.nivel - Math.trunc(usuario.nivel)) * 100;

    cargarModalEditarHabito();
    guardarHabitoEditado();
    eliminarHabitoSeleccionado();

    cargarModalHabito();
    botonCrearHabito();

    gachaCaballo();
    cargarBarraExperiencia(porcentajeNivel);

    // Inicializa tooltips de bootstrap
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(elemento => new bootstrap.Tooltip(elemento));
}

// Crea el habito con los datos proporcionados
async function botonCrearHabito() {
    document.getElementById("boton-crear-habito").addEventListener("click", async () => {
        const nombreHabito = document.getElementById("nombre-habito").value
        const tipoHabito = document.getElementById("tipo-habito").value

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
            // TODO: mejorar alert
            alert("Tipo o nombre invalidos")
        }
    })
}

// Lista de habitos
async function cargarHabitosUsuario() {
    const habitosUsuario = await UsuarioAPI.obtenerHabitos(id);

    const contenedor = document.getElementById("lista-habitos");
    contenedor.innerHTML = carruselHabitos(habitosUsuario);

    prepararEditarHabito();
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
function eliminarHabitoSeleccionado() {
    document.getElementById("boton-eliminar-habito").addEventListener("click", async function () {

        const idHabito = document.getElementById("editarHabitoModal").dataset.idHabito;

        await HabitoAPI.eliminar(idHabito);

        const modal = bootstrap.Modal.getInstance(document.getElementById("editarHabitoModal"));
        modal.hide();

        // Recarga los datos
        cargarHabitosUsuario();
        cargarDatosUsuario();
    });
}

// Guarda el habito con los nuevos datos
function guardarHabitoEditado() {
    document.getElementById("boton-guardar-habito").addEventListener("click", async function () {

        // Lee el formulario
        const nuevoNombre = document.getElementById("nuevo-nombre-habito").value
        const nuevoTipo = document.getElementById("nuevo-tipo-habito").value

        const idHabito = document.getElementById("editarHabitoModal").dataset.idHabito

        // Si no esta vacio lo axctualiza en la api
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
            alert("Nombre o tipo invalidos");
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

cargarDatosUsuario();
cargarHabitosUsuario();
cargarCaballosUsuario();