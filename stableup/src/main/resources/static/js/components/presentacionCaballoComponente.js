import { colorPorRareza } from '../utils/formatos.js';

export function presentarCaballo(caballo) {
    const rarezaMostrar = caballo.rareza.replace("_", " ");
    const color = colorPorRareza(caballo.rareza);

    return `
            <div class="card-body p-3 mt-2">
                    <div class="mb-2" style="font-size: 5rem;">🐴</div>
                    <h5 class="card-title align-items-center mb-4">${caballo.nombre} <span class="badge rounded-pill bg-primary" style="font-size:0.75rem;">${rarezaMostrar}</span></h5>
                    <hr/>
                    <p class="card-text text-muted mt-4">Descripcion generica del caballo</p>
                    <button id="boton-historial-caballo" class="btn btn-dark mt-4 mb-4" data-bs-toggle="modal" data-bs-target="#modalScrolleable">Ver historial</button>
                </div>
                </div>
            <style>
                #tarjeta-caballo {
                    background-image: linear-gradient(to top, ${color}, white);
                    transition: all .5s ease-in-out;
                }
            </style>
    `;
}