import { colorPorRareza } from '../utils/formatos.js';

export function tarjetaContringante(caballo, indice) {
    const rarezaMostrar = caballo.rareza.replace("_", " ");
    const color = colorPorRareza(caballo.rareza);

    return `
        <div style="width: 16rem;" class="h-100">
            <div id="tarjeta-caballo-${indice}" class="card mb-2">
                <div style="font-size: 5rem;">🐴</div>

                <div class="card-body">
                    <h5 class="card-title align-items-center">${caballo.nombre} <span class="badge rounded-pill bg-primary" style="font-size:0.75rem;">${rarezaMostrar}</span></h5>
                    <hr/>
                    <p class="card-text text-muted">Velocidad: ${caballo.velocidad}<br>
                    Energía: ${caballo.energia}</p>
                    <a href="#" class="btn btn-dark">Desafiar</a>
                </div>
            </div>
            <style>
                #tarjeta-caballo-${indice} {
                    background-image: linear-gradient(to top, ${color}, white);
                    transition: all .5s ease-in-out;
                }
                #tarjeta-caballo-${indice}:hover {
                    transform: translateY(-0.25rem);
                    box-shadow: 0 0 1.25rem ${color};
                }
            </style>
        </div>
    `;
}