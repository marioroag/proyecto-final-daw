import { colorPorRareza } from '../utils/formatos.js';

export function presentarCaballo(caballo, indice) {
    const rarezaMostrar = caballo.rareza.replace("_", " ");
    const color = colorPorRareza(caballo.rareza);

    return `
        <div>
            <div id="tarjeta-caballo-${indice}" class="card">
                <div class="mt-4" style="font-size: 5rem;">🐴</div>

                <div class="card-body p-5">
                    <h5 class="card-title align-items-center">${caballo.nombre} <span class="badge rounded-pill bg-primary" style="font-size:0.75rem;">${rarezaMostrar}</span></h5>
                    <hr/>
                    <p class="card-text text-muted">Descripcion generica del caballo</p>
                </div>
            </div>
            <style>
                #tarjeta-caballo-${indice} {
                    background-image: linear-gradient(to top, ${color}, white);
                    transition: all .5s ease-in-out;
                }
            </style>
        </div>
    `;
}