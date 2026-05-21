import { tarjetaContringante } from './tarjetaContringanteComponente.js';

export function mostrarContringantes(caballos, numContringantesMostrar) {
    let contenidoCaballos = "";
    let seccionContringantes = "";

    for (let i = 0; i < numContringantesMostrar; i++) {
        contenidoCaballos += tarjetaContringante(caballos[i], i);
    }

    seccionContringantes = `
        <h2 class="mt-5">Contringantes</h2>
        <p class="mt-1 text-muted">Selecciona 4 contringantes para iniciar una carrera</p>
        <div class="d-flex flex-wrap justify-content-center gap-5 p-2 mt-4 mb-3">
            ${contenidoCaballos}
        </div>
    `;

    seccionContringantes += `
    <div class="mb-4 d-flex justify-content-center gap-4">
        <button id="volver-pagina" class="btn btn-dark"><i class="bi bi-arrow-left"></i></button>
        <button id="pasar-pagina" class="btn btn-dark"><i class="bi bi-arrow-right"></i></button>
    </div>
    `


    return seccionContringantes;
}