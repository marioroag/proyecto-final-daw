import { UsuarioAPI } from '../api/usuarioApi.js';

async function cargarUsuariosModal() {
    const usuarios = await UsuarioAPI.obtenerTodos();

    const contenedor = document.getElementById("lista-usuarios-login");
    contenedor.innerHTML = "";

    usuarios.forEach(usuario => {
        const enlace = document.createElement("a");
        enlace.href = `perfilDetalle.html?id=${usuario.id}`;
        enlace.classList.add("btn", "btn-outline-secondary", "text-start");
        enlace.innerHTML = `
            <strong>${usuario.username}</strong>
            <span class="text-muted ms-2">Nivel ${usuario.nivel}</span>
        `;
        contenedor.appendChild(enlace);
    });
}

cargarUsuariosModal();