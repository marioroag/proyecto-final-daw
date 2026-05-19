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
                    <a href="#" id="boton-carrera-caballo" class="btn btn-dark mt-4 mb-4">Ver historial</a>
                </div>
                </div>
            <style>
                #tarjeta-caballo-presentacion {
                    background-image: linear-gradient(to top, ${color}, white);
                    transition: all .5s ease-in-out;
                }
            </style>
    `;
}