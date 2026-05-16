import { UsuarioAPI } from '../api/usuarioApi.js';
import { CaballoAPI } from '../api/CaballoApi.js';
import { crearBarraNavegacion } from '../components/navbar.js';
import { crearFooter } from '../components/footer.js';
import { cargarModalHabito } from '../components/crearHabitoComponente.js';
import { cargarModalEditarHabito } from '../components/editarHabitoComponente.js';

// Navbar
document.getElementById("navbar").innerHTML = crearBarraNavegacion();
document.getElementById("stable-footer").innerHTML = crearFooter();

function emojiPorTipo(tipo) {
    let emoji = "";
    if (tipo === "STRENGTH") emoji = "💪";
    if (tipo === "WELLBEING") emoji = "🌱";
    if (tipo === "MENTAL_HEALTH") emoji = "🧠";
    return emoji;
}

function colorPorRareza(rareza) {
    let color = "";
    if (rareza === "COMUN") color = "#f8f9fa";
    if (rareza === "POCO_COMUN") color = "#d1e7dd";
    if (rareza === "RARO") color = "#BFDBFE";
    if (rareza === "EPICO") color = "#DDD6FE";
    if (rareza === "LEGENDARIO") color = "#ffe476";
    return color;
}

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Datos del usuario
async function cargarDatosUsuario() {
    const usuario = await UsuarioAPI.obtenerPorId(id);

    const cantidadCaballos = usuario.caballos.length;

    const contenedor = document.getElementById("datos-usuario");
    contenedor.innerHTML = `
            <div id="contenedorModalEditarHabito"></div>

            <div class="card border-secondary-subtle text-center p-3 h-100" style="min-height: 425px;">
                <div class="card-body">

                    <div class="mb-4">
                        <div style="font-size: 5rem;">👤</div>
                        <h2 class="mt-2 mb-1">${usuario.username}</h2>
                        <p class="text-muted small mb-0">Miembro desde ${usuario.fechaRegistro}</p>
                    </div>

                    <div class="row g-2 mb-5">
                        <div class="col">
                            <div class="bg-light rounded border p-3">
                                <div class="h4 mb-0">${Math.trunc(usuario.nivel)}</div>
                                <div class="text-muted small">🆙 nivel</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="bg-light rounded border p-3">
                                <div class="h4 mb-0">${usuario.monedas}</div>
                                <div class="text-muted small">🪙 monedas</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="bg-light rounded border p-3">
                                <div class="h4 mb-0">${usuario.caballos.length}</div>
                                <div class="text-muted small">🐎 caballos</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="bg-light rounded border p-3">
                                <div class="h4 mb-0">${usuario.habitos.length}</div>
                                <div class="text-muted small">🎯 hábitos</div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-outline-success btn-sm px-4 py-2" data-bs-toggle="modal" data-bs-target="#habitoModal">+ Hábito</button>
                        <button class="btn btn-outline-dark btn-sm px-4 py-2" id="gacha-caballos" data-bs-toggle="tooltip" data-bs-placement="top"
                        data-bs-title="Cuesta 100 🪙">+ Caballo</button>
                    </div>

                <div id="contenedorModalHabito"></div>

                </div>
            </div>
        `;

    gachaCaballo();
    cargarModalHabito();
    cargarModalEditarHabito();
    crearHabito();

    // Inicializa tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(elemento => new bootstrap.Tooltip(elemento));
}

async function crearHabito() {
    document.getElementById("boton-crear-habito").addEventListener("click", async () => {
        // Esconde el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById("habitoModal"));
        modal.hide();

        const nombreHabito = document.getElementById("nombre-habito").value
        const tipoHabito = document.getElementById("tipo-habito").value

        if (nombreHabito != "" && tipoHabito != "Elegir") {
            // Devuelve un objeto que la api convierte a json despues para java como habito
            const habito = {
                nombre: nombreHabito,
                tipo: tipoHabito
            };

            await UsuarioAPI.crearHabito(id, habito);

            // Recarga
            cargarHabitosUsuario();
        } else {
            alert("Tipo o nombre invalidos")
        }
    })
}

// TODO: funcionalidad para editar y borrar
async function editarHabito() {

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
                    <div class="carousel-item ${activo}" style="min-height: 425px;">
                    
                        <div class="text-center px-5 py-4">
                            <div style="font-size: 4rem; line-height: 1;">${emoji}</div>
                            <h3 class="mt-3 mb-1">${habito.nombre}</h3>
                            <p class="mb-4">
                                Streak x${habito.multiplicadorStreak}  -  ${proximaRecompensa} 🪙
                            </p>

                            <!-- TODO: GRID TIPO GITHUB -->
                            <div class="mb-4 mx-5">
                                <img class="card-img" src="https://placehold.co/600x400/png">
                            </div>

                            <div class="d-flex gap-2 justify-content-center">
                                <button id="boton-editar-habito" class="btn btn-warning btn-sm px-4 py-2" data-bs-toggle="modal" data-bs-target="#editarHabitoModal">Editar</button>
                                <button class="btn btn-success btn-sm px-4 py-2">Marcar como completado</button>
                            </div>

                        </div>
                    </div>
                `;
        });
    } else {
        contenidoCarrousel = `
                <div class="carousel-item active">
                    <div class="text-center px-5 py-4">
                        <div style="font-size: 4rem; line-height: 1;">📭</div>
                        <h3 class="mt-3 mb-1">Aún no tienes hábitos</h3>
                        <p class="mb-4">
                            Crea tu primer hábito para empezar a sumar recompensas
                        </p>
                    </div>
                </div>
            `;
    }

    contenedor.innerHTML = `
            <div id="carouselExampleControls" class="carousel slide bg-white border border-primary rounded"
                data-bs-ride="carousel" data-bs-theme="dark">
                <div class="carousel-inner">
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
                    <div  id="tarjeta-caballo-${indice}" class="card mb-2">
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
                    background-color: ${colorPorRareza(caballo.rareza)};
                }
            </style>
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