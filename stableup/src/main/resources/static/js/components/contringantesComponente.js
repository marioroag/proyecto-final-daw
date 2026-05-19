import { tarjetaContringante } from './tarjetaContringanteComponente.js';

export function mostrarContringantes(caballos, numContringantes) {
    let contenidoCaballos = "";

    for (let i = 0; i < numContringantes; i++) {
        contenidoCaballos += tarjetaContringante(caballos[i], i);
    }

    return `
        <h2 class="mt-5">Contringantes</h2>
        <p class="mt-1 text-muted">Selecciona 4 contringantes para iniciar una carrera</p>
        <div class="d-flex flex-wrap justify-content-center gap-5 p-2 mt-4 mb-5">
            ${contenidoCaballos}
        </div>
    `;
}