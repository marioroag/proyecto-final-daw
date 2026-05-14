async function cargarCaballosUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const respuesta = await fetch(`${API_BASE}/usuarios/${id}/caballos`);
    const caballosUsuario = await respuesta.json();

    const contenedor = document.getElementById("lista-caballos");
    contenedor.innerHTML = '';

    const listaCaballos = document.createElement("div");
    console.log(caballosUsuario);
    if (caballosUsuario.length > 0) {
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