import { UsuarioAPI } from '../api/usuarioApi.js';

async function cargarUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const usuario = await UsuarioAPI.obtenerPorId(id);

    const contenedor = document.getElementById("datos-usuario");
    contenedor.innerHTML = '';

    const perfil = document.createElement("div");
    perfil.classList.add("card");
    perfil.innerHTML = `
            <h3 class="card-header">${usuario.username}</h3>
            <p class="card-text">Nivel: ${usuario.nivel}
            <br>${usuario.monedas} monedas</br>
        `;
    contenedor.appendChild(perfil);
}

cargarUsuario();