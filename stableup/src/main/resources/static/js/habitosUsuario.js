async function cargarHabitosUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const respuesta = await fetch(`${API_BASE}/usuarios/${id}/habitos`);
    const habitosUsuario = await respuesta.json();

    const contenedor = document.getElementById("lista-habitos");
    contenedor.innerHTML = '';

    if (habitosUsuario.length > 0) {
        const listaHabitos = document.createElement("div");
        listaHabitos.innerHTML += "<h2> Lista de habitos:</h2>"

        habitosUsuario.forEach(habito => {
            const tarjetaHabito = document.createElement("div");
            tarjetaHabito.classList.add("card-habitos");
            tarjetaHabito.innerHTML = `
                <h3>${habito.nombre}</h3>
            `;
            listaHabitos.appendChild(tarjetaHabito);
        });

        contenedor.appendChild(listaHabitos);
    }
}
cargarHabitosUsuario();