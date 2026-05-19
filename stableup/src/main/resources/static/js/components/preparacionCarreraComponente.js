export function preparacionCarrera() {

    let contringantes = "" // funcion tarjetaSeleccionados
    let porcentajeExito = ""
    let recompensaCarrera = ""

    return `
                <h5 class="mt-3 text-center">Preparacion de carrera</h5>
                <div class="row mx-2" style="height: 180px;">
                    <div class="col-4 bg-light mt-3 border">
                        <p>${porcentajeExito}</p>
                        <p>Posibilidad éxito</p>
                    </div>
                    <div class="col-8 bg-light mt-3">${contringantes}</div>
                </div>
                <hr>
                <p class="fs-5 text-center">Recompensa: ${recompensaCarrera} 🪙</p>
                <button class="btn btn-dark text-center px-5">Iniciar</button>
        `;
}