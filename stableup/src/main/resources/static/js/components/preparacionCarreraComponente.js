import { colorPorRareza } from '../utils/formatos.js';

export function preparacionCarrera(contrincantesSeleccionados, posibilidadExito, recompensa, cantidadContrincantesMax) {
    let tarjetasContrincantes = "";

    contrincantesSeleccionados.forEach(function (caballo) {
        const color = colorPorRareza(caballo.rareza);
        tarjetasContrincantes += `
            <div id="tarjeta-seleccionado-${caballo.id}" class="border rounded bg-white position-relative m-1 d-flex flex-column align-items-center justify-content-center text-center" style="width: 73px; height: 70px;">
                <div class="mb-1" style="font-size: 1.4rem; line-height: 1;">🐴</div>
                <small style="font-size: 0.7rem;">${caballo.nombre}</small>
                <button class="boton-quitar-contrincante btn-close position-absolute" data-id-caballo="${caballo.id}" style="font-size: 0.5rem; top: 3px; right: 3px;"></button>
            </div>
            <style>
                #tarjeta-seleccionado-${caballo.id} {
                    background-image: linear-gradient(to top, ${color}, white);
                    transition: all .5s ease-in-out;
                }
            </style>
        `;
    });

    let atributoDeshabilitar = "disabled";
    if (contrincantesSeleccionados.length === cantidadContrincantesMax) {
        atributoDeshabilitar = "";
    }

    let colorPosiblidad = "";
    if (posibilidadExito == 0) {
        colorPosiblidad = "black"
    } else if (posibilidadExito > 65) {
        colorPosiblidad = "#20f80c"
    } else if (posibilidadExito > 50) {
        colorPosiblidad = "#7bd135"
    } else if (posibilidadExito > 35) {
        colorPosiblidad = "#e6ad02"
    } else {
        colorPosiblidad = "#fc2e05"
    }

    return `
        <h5 class="mt-3 mb-3 text-center">Preparación de carrera</h5>
        <div class="row mx-2 border rounded" style="min-height: 180px;">
            <div class="col-4 rounded bg-white d-flex flex-column justify-content-center align-items-center">
                <p class="fs-4 fw-bold mb-1" style="color: ${colorPosiblidad}">${posibilidadExito}%</p>
                <p class="text-muted small text-center">Posibilidad éxito</p>
            </div>
            <div class="col-8 rounded bg-white d-flex flex-wrap align-content-center justify-content-center">
                ${tarjetasContrincantes}
            </div>
        </div>
        <hr>
        <p class="fs-5 text-center">Recompensa: ${recompensa} 🪙</p>
        <button id="boton-iniciar-carrera" class="btn btn-dark text-center px-5" ${atributoDeshabilitar}>Iniciar</button>
    `;
}