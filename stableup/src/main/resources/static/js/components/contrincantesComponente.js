import { tarjetaContrincante } from './tarjetaContrincanteComponente.js';

export function mostrarContrincantes(caballos, numContrincantesMostrar, caballosUsuario) {
    let seccionContrincantes = "";
    let contenidoCaballos = "";

    if (caballos.length > 0) {
        for (let i = 0; i < numContrincantesMostrar; i++) {
            contenidoCaballos += tarjetaContrincante(caballos[i], i);

        }

        seccionContrincantes = `
            <h2 class="mt-5">Contrincantes</h2>
            <p class="mt-1 text-muted">Selecciona 4 contrincantes para iniciar una carrera</p>
            <div class="d-flex flex-wrap justify-content-center gap-5 p-2 mt-4 mb-3">
                ${contenidoCaballos}
            </div>
            <div class="mb-4 d-flex justify-content-center gap-4">
                <button id="volver-pagina" class="btn btn-dark"><i class="bi bi-arrow-left"></i></button>
                <button id="pasar-pagina" class="btn btn-dark"><i class="bi bi-arrow-right"></i></button>
            </div>
        `
    } else {
        seccionContrincantes = `
                <div class="p-5">
                    <div style="font-size: 5rem;">🐴</div>

                    <div class="card-body">
                        <h5 class="card-title mb-5">No hay caballos disponibles con los que competir</h5>
                    </div>
                </div>
        `;
    }

    return seccionContrincantes;
}