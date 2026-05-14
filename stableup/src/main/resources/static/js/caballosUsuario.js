async function cargarCaballosUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const respuesta = await fetch(`${API_BASE}/usuarios/${id}/caballos`);
    const caballosUsuario = await respuesta.json();

    const contenedor = document.getElementById("lista-caballos");
    contenedor.innerHTML = '';

    const listaCaballos = document.createElement("div");
    listaCaballos.classList.add("card-usuario");
    caballosUsuario.forEach(caballo => {
        listaCaballos.innerHTML += `
                <h3>${caballo.nombre}</h3>
                <p>Nivel: ${caballo.nivel}
                <br>${caballo.rareza}</br>\n
            `;
    });
    contenedor.appendChild(listaCaballos);
}

cargarCaballosUsuario();