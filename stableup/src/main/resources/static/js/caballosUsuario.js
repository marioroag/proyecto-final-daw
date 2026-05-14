async function obtenerCaballosUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const respuesta = await fetch(`${API_BASE}/usuarios/${id}/caballos`);
    const caballosUsuario = await respuesta.json();

    return caballosUsuario;
}

async function cargarCaballosUsuario() {
    const caballosUsuario = await obtenerCaballosUsuario()

    const contenedor = document.getElementById("lista-caballos");
    contenedor.innerHTML = '';


    if (caballosUsuario.length > 0) {
        const listaCaballos = document.createElement("div");
        listaCaballos.innerHTML += "<h2> Lista de caballos:</h2>"

        caballosUsuario.forEach(caballo => {
            const tarjetaCaballo = document.createElement("div");
            tarjetaCaballo.classList.add("card-caballo");
            const rareza = caballo.rareza.replace("_", " ")

            tarjetaCaballo.innerHTML = `
                <h3>${caballo.nombre}</h3>
                <p>${caballo.rareza} - Velocidad: ${caballo.velocidad} - Energía: ${caballo.energia}</p>
            `;

            listaCaballos.appendChild(tarjetaCaballo);

        });
        contenedor.appendChild(listaCaballos);
    }

}

cargarCaballosUsuario();