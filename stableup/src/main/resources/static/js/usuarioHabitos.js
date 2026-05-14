// TODO: Hacer grid de compleciones
// Se me ocurre:
// 1: Crear grid de cuadrados redondeados y de color gris tipo github
// 2: Recorrer array de registros para el habito
// 3: Si hay registro -> colorear cuadrado

import { UsuarioAPI } from '../api/usuarioApi.js';

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
            tarjetaHabito.innerHTML = `
                <p>${habito.nombre}</p>
            `

            contenedor.appendChild(tarjetaHabito);
        });

    }
}
cargarHabitosUsuario();