import { colorPorRareza } from '../utils/formatos.js';
import { cargarBarra } from '../components/barraComponente.js';

export function statsCaballo(caballo, indice) {
    return `
            <div class="mx-4">
                <h5 class="">Velocidad</h5>
                <p class="fs-5">${caballo.velocidad}</p>
                <div class="mb-3">${cargarBarra(caballo.velocidad)}</div>
                <p class="text-muted">Influye en la posibilidad de ganar en carreras cortas</p>
            </div>

            <div class="mx-4">
                <h5>Energía</h5>
                <p class="fs-5 color-primary">${caballo.energia}</p>
                <div class="mb-3">${cargarBarra(caballo.energia)}</div>
                <p class="text-muted">Influye en la posibilidad de ganar en carreras largas</p>
            </div>
        `;
}