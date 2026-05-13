async function cargarUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const respuesta = await fetch(`${API_BASE}/usuarios/${id}`);
    const usuario = await respuesta.json();

    const contenedor = document.getElementById("perfil-detalle");
    contenedor.innerHTML = '';

    const perfil = document.createElement("div");
    perfil.classList.add("card-usuario");
    perfil.innerHTML = `
            <h3>${usuario.username}</h3>
            <p>Nivel: ${usuario.nivel}
            <br>${usuario.monedas} monedas</br>
        `;
    contenedor.appendChild(perfil);
}

cargarUsuario();