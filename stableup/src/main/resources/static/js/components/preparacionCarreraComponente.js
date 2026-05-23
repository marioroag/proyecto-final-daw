export function preparacionCarrera(contrincantesSeleccionados, posibilidadExito, recompensa) {
    let tarjetasContrincantes = "";

    contrincantesSeleccionados.forEach(function (caballo) {
        tarjetasContrincantes += `
            <div class="border rounded p-2 m-1 position-relative d-inline-block" style="width: 80px;">
                <div style="font-size: 1.5rem;">🐴</div>
                <small>${caballo.nombre}</small>
                <button class="boton-quitar-contrincante btn-close position-absolute top-0 end-0" data-id-caballo="${caballo.id}"></button>
            </div>
        `;
    });

    let atributoDeshabilitar = "disabled";
    if (contrincantesSeleccionados.length === 4) {
        atributoDeshabilitar = "";
    }

    return `
        <h5 class="mt-3 text-center">Preparación de carrera</h5>
        <div class="row mx-2" style="height: 180px;">
            <div class="col-4 bg-light mt-3 border d-flex flex-column justify-content-center align-items-center">
                <p class="fs-4 fw-bold mb-1">${posibilidadExito}%</p>
                <p class="text-muted small text-center">Posibilidad éxito</p>
            </div>
            <div class="col-8 bg-light mt-3 d-flex flex-wrap align-content-start">
                ${tarjetasContrincantes}
            </div>
        </div>
        <hr>
        <p class="fs-5 text-center">Recompensa: ${recompensa} 🪙</p>
        <button id="boton-iniciar-carrera" class="btn btn-dark text-center px-5" ${atributoDeshabilitar}>Iniciar</button>
    `;
}