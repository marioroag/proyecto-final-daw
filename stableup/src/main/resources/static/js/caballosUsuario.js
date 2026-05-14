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
        listaCaballos.classList.add("row", "justify-content-center")
        listaCaballos.innerHTML += "<h2> Lista de caballos:</h2>"

        caballosUsuario.forEach(caballo => {
            const tarjetaCaballo = document.createElement("div");
            tarjetaCaballo.classList.add("mx-3");
            tarjetaCaballo.style.width = "18rem";

            const rareza = caballo.rareza.replace("_", " ")

            tarjetaCaballo.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="https://placehold.co/600x400/png" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${caballo.nombre}</h5>
                    <p class="card-text">Velocidad: ${caballo.velocidad}<br>
                    Energía: ${caballo.energia}</p>
                    <a href="#" class="btn btn-primary">Ver historial</a>
                </div>
            </div>`

            listaCaballos.appendChild(tarjetaCaballo);

        });
        contenedor.appendChild(listaCaballos);
    }
}

cargarCaballosUsuario();