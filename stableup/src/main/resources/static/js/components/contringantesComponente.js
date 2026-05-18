import { tarjetaContringante } from './tarjetaContringanteComponente.js';

export function mostrarContringantes(caballos, numContringantes) {
    let contenidoCaballos = "";

    for (let i = 0; i < numContringantes; i++) {
        contenidoCaballos += tarjetaContringante(caballos[i], i);
    }

    return `
        <h2 class="m-5">Contringantes</h2>
        <div class="d-flex flex-wrap justify-content-center gap-5 p-2 mt-4 mb-5">
            ${contenidoCaballos}
        </div>
    `;
}