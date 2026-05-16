import { tarjetaCaballo } from './tarjetaCaballoComponente.js';

export function establo(caballos) {
    let contenidoCaballos = "";

    if (caballos.length > 0) {
        caballos.forEach((caballo, indice) => {
            contenidoCaballos += tarjetaCaballo(caballo, indice);
        });
    } else {
        contenidoCaballos = `
            <div class="w-75">
                <div class="card">
                    <div style="font-size: 5rem;">🐴</div>

                    <div class="card-body">
                        <h5 class="card-title">Aún no tienes caballos</h5>
                        <p class="card-text text-muted">
                            Consigue tu primer caballo para empezar a competir.
                        </p>
                        <a href="#" class="btn btn-dark">Ir a la cuadra</a>
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <h2 class="m-5">Tu establo</h2>
        <div class="d-flex flex-wrap justify-content-center gap-5 p-2 mt-4 mb-5">
            ${contenidoCaballos}
        </div>
    `;
}