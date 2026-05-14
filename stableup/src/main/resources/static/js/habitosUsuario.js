// TODO: Hacer grid de compleciones
// Se me ocurre:
// 1: Crear grid de cuadrados redondeados y de color gris tipo github
// 2: Recorrer array de registros para el habito
// 3: Si hay registro -> colorear cuadrado

async function obtenerHabitosUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const respuesta = await fetch(`${API_BASE}/usuarios/${id}/habitos`);
    const habitosUsuario = await respuesta.json();

    return habitosUsuario
}


async function cargarHabitosUsuario() {
    const habitosUsuario = await obtenerHabitosUsuario();

    const contenedor = document.getElementById("lista-habitos");
    contenedor.innerHTML = '';

    if (habitosUsuario.length > 0) {
        const listaHabitos = document.createElement("div");
        listaHabitos.innerHTML += "<h2> Lista de habitos:</h2>"

        habitosUsuario.forEach(habito => {
            const tarjetaHabito = document.createElement("div");
            tarjetaHabito.classList.add("card-habitos");
            const proximaRecompensa = habito.recompensa * habito.multiplicadorStreak

            tarjetaHabito.innerHTML = `
                <h3>${habito.nombre}</h3>
                <p>${habito.tipo} - Streak: ${habito.multiplicadorStreak} - Proxima recompensa: ${proximaRecompensa}</p>
            `;
            listaHabitos.appendChild(tarjetaHabito);
        });

        contenedor.appendChild(listaHabitos);
    }
}
cargarHabitosUsuario();