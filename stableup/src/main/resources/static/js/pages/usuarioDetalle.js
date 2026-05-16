import { UsuarioAPI } from '../api/UsuarioApi.js';
import { CaballoAPI } from '../api/CaballoApi.js';
import { HabitoAPI } from '../api/HabitoApi.js';

import { crearBarraNavegacion } from '../components/navbar.js';
import { crearFooter } from '../components/footer.js';

import { emojiPorTipo, colorPorRareza, formatearFechaRegistro } from '../utils/formatos.js';
import { tarjetaUsuario } from '../components/tarjetaUsuarioComponente.js';

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
    crearHabito();

    gachaCaballo();
    cargarBarraExperiencia(porcentajeNivel);

    // Inicializa tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(elemento => new bootstrap.Tooltip(elemento));
}

async function crearHabito() {
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
            cargarHabitosUsuario();
        } else {
            // TODO: mejorar alert
            alert("Tipo o nombre invalidos")
        }
    })
}

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

// Lista de habitos
async function cargarHabitosUsuario() {
    const habitosUsuario = await UsuarioAPI.obtenerHabitos(id);

    const contenedor = document.getElementById("lista-habitos");

    let contenidoCarrousel = "";

    if (habitosUsuario.length > 0) {
        habitosUsuario.forEach((habito, indice) => {
            const proximaRecompensa = habito.recompensaBase * habito.multiplicadorStreak;
            const emoji = emojiPorTipo(habito.tipo);

            let activo = "";

            if (indice === 0) {
                activo = "active";
            }

            contenidoCarrousel += `
                    <div class="carousel-item ${activo}" style="height: 425px;">
                    
                        <div class="text-center px-5 py-4">
                            <div class="mt-3" style="font-size: 4rem; line-height: 1;">${emoji}</div>
                            <h3 class="mt-3 mb-1">${habito.nombre}</h3>
                            <p class="mb-4">
                                Streak x${habito.multiplicadorStreak}  -  ${proximaRecompensa} 🪙
                            </p>

                            <!-- TODO: GRID TIPO GITHUB -->
                            <div class="mb-5 mx-5">
                                <img class="card-img" src="https://placehold.co/600x400/png">
                            </div>

                            <div class="d-flex gap-2 justify-content-center">
                                <button class="boton-editar-habito btn btn-warning btn-sm px-4 py-2" data-bs-toggle="modal" data-bs-target="#editarHabitoModal" data-id-habito="${habito.id}">Editar</button>
                                <button class="btn btn-success btn-sm px-4 py-2">Marcar como completado</button>
                            </div>

                        </div>
                    </div>
                `;
        });
    } else {
        contenidoCarrousel = `
        <div class="carousel-item active" style="height: 425px;">
            <div class="text-center px-5 py-4 d-flex flex-column justify-content-center h-100">
                <div style="font-size: 4rem; line-height: 1;">📭</div>
                <h3 class="mt-3 mb-2">Aún no tienes hábitos</h3>
                <p class="mb-4">
                    Crea tu primer hábito para empezar a sumar recompensas
                </p>
            </div>
        </div>
    `;
    }

    contenedor.innerHTML = `
            <div id="carouselExampleControls" class="carousel slide bg-white border border-primary rounded h-100"
                data-bs-ride="carousel" data-bs-theme="dark">

                <div class="carousel-inner h-100">
                    ${contenidoCarrousel}
                </div>

                <button class="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;

    prepararEditarHabito();
}

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
    const caballosUsuario = await UsuarioAPI.obtenerCaballos(id);

    const contenedor = document.getElementById("lista-caballos");
    contenedor.innerHTML = `
            <h2 class="m-5">Tu establo</h2>
            `;

    const listaCaballos = document.createElement("div");
    listaCaballos.classList.add("d-flex", "flex-wrap", "justify-content-center", "gap-5", "p-2", "mt-4", "mb-5");

    if (caballosUsuario.length > 0) {
        caballosUsuario.forEach((caballo, indice) => {
            const tarjetaCaballo = document.createElement("div");
            tarjetaCaballo.style.width = "16rem";

            const rarezaMostrar = caballo.rareza.replace("_", " ");

            tarjetaCaballo.innerHTML = `
                    <div id="tarjeta-caballo-${indice}" class="card mb-2">
                        <div style="font-size: 5rem;">🐴</div>

                        <div class="card-body">
                            <h5 class="card-title align-items-center">${caballo.nombre} <span class="badge rounded-pill bg-primary" style="font-size:0.75rem;">${rarezaMostrar}</span></h5>
                            <p class="card-text">Velocidad: ${caballo.velocidad}<br>
                            Energía: ${caballo.energia}</p>
                            <a href="#" class="btn btn-dark">Ver historial</a>
                        </div>
                    </div>`;

            tarjetaCaballo.innerHTML += `
            <style>
                #tarjeta-caballo-${indice} {
                    background-image: linear-gradient(to top, ${colorPorRareza(caballo.rareza)}, white);
                    transition: all .5s ease-in-out;
                }
                #tarjeta-caballo-${indice}:hover {
                    transform: translateY(-0.25rem);
                    box-shadow: 0 0 1.25rem ${colorPorRareza(caballo.rareza)};
                }
            </style >
        `;

            listaCaballos.appendChild(tarjetaCaballo);
        });
    } else {
        const tarjetaVacia = document.createElement("div");
        tarjetaVacia.classList.add("w-75");

        tarjetaVacia.innerHTML = `
        <div class="card">
                    <div style="font-size: 5rem;">🐴</div>

                    <div class="card-body">
                        <h5 class="card-title">Aún no tienes caballos</h5>
                        <p class="card-text text-muted">
                            Consigue tu primer caballo para empezar a competir.
                        </p>
                        <a href="#" class="btn btn-dark">Ir a la cuadra</a>
                    </div>
                </div>
        `;

        listaCaballos.appendChild(tarjetaVacia);
    }

    contenedor.appendChild(listaCaballos);
}

cargarDatosUsuario();
cargarHabitosUsuario();
cargarCaballosUsuario();