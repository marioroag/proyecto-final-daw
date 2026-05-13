async function cargarUsuarios() {
    const respuesta = await fetch(`${API_BASE}/usuarios`);
    const usuarios = await respuesta.json();

    const contenedor = document.getElementById("lista-usuarios");
    contenedor.innerHTML = "";

    usuarios.forEach(usuario => {
        const perfil = document.createElement("a");
        perfil.href = `perfilDetalle.html?id=${usuario.id}`;
        perfil.classList.add("card-usuario");
        perfil.innerHTML = `
            <h3>${usuario.username}</h3>
            <p>Nivel: ${usuario.nivel}
            <br>${usuario.monedas} monedas</p>
        `;
        contenedor.appendChild(perfil);
    });
}

cargarUsuarios();