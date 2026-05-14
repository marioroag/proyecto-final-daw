// TODO: Hacer grid de compleciones
// Se me ocurre:
// 1: Crear grid de cuadrados redondeados y de color gris tipo github
// 2: Recorrer array de registros para el habito
// 3: Si hay registro -> colorear cuadrado

import { UsuarioAPI } from '../api/usuarioApi.js';

async function cargarHabitosUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const habitosUsuario = await UsuarioAPI.obtenerHabitos();

    const contenedor = document.getElementById("lista-habitos");
    contenedor.innerHTML = '';

    if (habitosUsuario.length > 0) {
        const listaHabitos = document.createElement("div");
        listaHabitos.classList.add("row", "justify-content-center")
        listaHabitos.innerHTML += "<h2> Lista de habitos:</h2>"

        habitosUsuario.forEach(habito => {
            const tarjetaHabito = document.createElement("div");
            tarjetaHabito.classList.add("my-3");
            tarjetaHabito.style.width = "18rem";

            const proximaRecompensa = habito.recompensa * habito.multiplicadorStreak

            tarjetaHabito.innerHTML = `
            <div class="card" >
                <img class="card-img-top" src="https://placehold.co/600x400/png" alt="Imagen del habito">
                <div class="card-body">
                    <h5 class="card-title, align-items">${habito.nombre} <span class="badge rounded-pill bg-primary" style="font-size:0.75rem;">${habito.tipo}</span></h5>
                    <p class="card-text">Streak: ${habito.multiplicadorStreak}<br>
                    Proxima recompensa: ${proximaRecompensa}</p>
                    <a href="#" class="btn btn-success">Marcar como completado</a>
                </div>
            </div>`

            listaHabitos.appendChild(tarjetaHabito);
        });

        contenedor.appendChild(listaHabitos);
    }
}
cargarHabitosUsuario();