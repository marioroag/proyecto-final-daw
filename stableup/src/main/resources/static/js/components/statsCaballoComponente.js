import { colorPorRareza } from '../utils/formatos.js';
import { cargarBarra } from '../components/barraComponente.js';

export function statsCaballo(caballo, indice) {
    return `
            <div class="p-3 px-4 mb-3 border border-secondary-subtle rounded bg-white">
                <h5 class="mb-1">Velocidad</h5>
                <p class="fs-5">${caballo.velocidad}</p>
                <div class="mb-3">${cargarBarra(caballo.velocidad)}</div>
                <p class="text-muted mb-2">Influye en la posibilidad de ganar en carreras cortas</p>
            </div>

            <div class="p-3 px-4 border border-secondary-subtle rounded bg-white">
                <h5 class="mb-1">Energía</h5>
                <p class="fs-5">${caballo.energia}</p>
                <div class="mb-3">${cargarBarra(caballo.energia)}</div>
                <p class="text-muted mb-2">Influye en la posibilidad de ganar en carreras largas</p>
            </div>
        `;
}