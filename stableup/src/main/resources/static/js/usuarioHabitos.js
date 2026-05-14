// TODO: Hacer grid de compleciones
// Se me ocurre:
// 1: Crear grid de cuadrados redondeados y de color gris tipo github
// 2: Recorrer array de registros para el habito
// 3: Si hay registro -> colorear cuadrado

import { UsuarioAPI } from '../api/usuarioApi.js';

function emojiPorTipo(tipo) {
    let emoji = "";
    if (tipo === "STRENGTH") emoji = "💪";
    if (tipo === "WELLBEING") emoji = "🌱";
    if (tipo === "MENTAL_HEALTH") emoji = "🧠";
    return emoji;
}

async function cargarHabitosUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const habitosUsuario = await UsuarioAPI.obtenerHabitos(id);

    const contenedor = document.getElementById("carrusel-habitos");
    contenedor.innerHTML = '';

    if (habitosUsuario.length > 0) {
        habitosUsuario.forEach((habito, indice) => {
            const tarjetaHabito = document.createElement("div");
            tarjetaHabito.classList.add("carousel-item");
            if (indice === 0) {
                tarjetaHabito.classList.add("active");
            }

            const proximaRecompensa = habito.recompensa * habito.multiplicadorStreak;

            // TODO: TERMINAR
            const emoji = emojiPorTipo(habito.tipo);

            tarjetaHabito.innerHTML = `
            <div class="text-center px-5 py-4">
                <div style="font-size: 4rem; line-height: 1;">${emoji}</div>
                <h3 class="mt-3 mb-1">${habito.nombre}</h3>
                <p class="text-muted mb-4">
                    Streak x${habito.multiplicadorStreak}  -  ${proximaRecompensa} 🪙
                </p>

                <div class="mb-4 mx-auto">
                <img class="card-img-top" src="https://placehold.co/600x300/png" alt="Imagen del caballo">
                    <!-- TODO: GRID TIPO GITHUB -->
                </div>

                <button class="btn btn-success">Marcar como completado</button>
            </div>
        `;

            contenedor.appendChild(tarjetaHabito);
        });

    }
}
cargarHabitosUsuario();