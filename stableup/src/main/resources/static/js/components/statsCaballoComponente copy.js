import { colorPorRareza } from '../utils/formatos.js';
import { cargarBarra } from '../components/barraComponente.js';

export function statsCaballo(caballo, indice) {
    return `
        <div class="d-flex flex-column justify-content-around">
            <div class="mt-4">
                <h5 class="align-items-center">Velocidad</h5>
                <p class="fs-5">${caballo.velocidad}</p>
                <div>${cargarBarra(caballo.velocidad)}</div>
            </div >

        <div class="mt-5">
            <h5 class="card-title align-items-center">Energía</h5>
            <p class="fs-5">${caballo.energia}</p>
            <div class="card-text">${cargarBarra(caballo.energia)}</div>
        </div>
        `;
}