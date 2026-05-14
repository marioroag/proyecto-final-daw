import { UsuarioAPI } from '../api/usuarioApi.js';

async function cargarCaballosUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const caballosUsuario = await UsuarioAPI.obtenerCaballos(id);

    const contenedor = document.getElementById("lista-caballos");
    contenedor.innerHTML = '';

    if (caballosUsuario.length > 0) {
        const listaCaballos = document.createElement("div");
        listaCaballos.classList.add("row", "justify-content-center", "my-5")

        caballosUsuario.forEach(caballo => {
            const tarjetaCaballo = document.createElement("div");
            tarjetaCaballo.classList.add("col-md-3");
            tarjetaCaballo.style.width = "18rem";

            const rareza = caballo.rareza.replace("_", " ")

            tarjetaCaballo.innerHTML = `
            <div class="card">
                <img class="card-img-top" src="https://placehold.co/600x400/png" alt="Imagen del caballo">
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
    }
}

cargarCaballosUsuario();