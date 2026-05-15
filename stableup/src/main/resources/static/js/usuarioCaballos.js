import { UsuarioAPI } from '../api/usuarioApi.js';

async function cargarCaballosUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const caballosUsuario = await UsuarioAPI.obtenerCaballos(id);

    const contenedor = document.getElementById("lista-caballos");
    contenedor.innerHTML = '';

    const listaCaballos = document.createElement("div");
    listaCaballos.classList.add("d-flex", "flex-wrap", "justify-content-center", "gap-4", "my-5");

    if (caballosUsuario.length > 0) {

        caballosUsuario.forEach(caballo => {
            const tarjetaCaballo = document.createElement("div");
            tarjetaCaballo.style.width = "18rem";

            const rareza = caballo.rareza.replace("_", " ")

            tarjetaCaballo.innerHTML = `
            <div class="card">
                    <div style="font-size: 5rem;">🐴</div>
            
                <div class="card-body">
                    <h5 class="card-title align-items-center">${caballo.nombre} <span class="badge rounded-pill bg-primary" style="font-size:0.75rem;">${rareza}</span></h5>
                    <p class="card-text">Velocidad: ${caballo.velocidad}<br>
                    Energía: ${caballo.energia}</p>
                    <a href="#" class="btn btn-dark">Ver historial</a>
                </div>
            </div>`

            listaCaballos.appendChild(tarjetaCaballo);

        });
        contenedor.appendChild(listaCaballos);
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
        contenedor.appendChild(listaCaballos);
    }
}

cargarCaballosUsuario();