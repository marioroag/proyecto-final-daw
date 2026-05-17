import { emojiPorTipo } from '../utils/formatos.js';

export function carruselHabitos(habitos, habitoActivo) {
    let contenidoCarrousel = "";

    if (habitos.length > 0) {
        const hoy = new Date().toJSON().slice(0, 10);

        habitos.forEach((habito, indice) => {

            const proximaRecompensa = habito.recompensaBase * habito.multiplicadorStreak;
            const emoji = emojiPorTipo(habito.tipo);

            let activo = "";

            // Coloca el primer como activo si no se especifica lo contrario
            if (habitoActivo == null && indice == 0) {
                activo = "active";
            } else if (habito.id == habitoActivo) {
                activo = "active";
            }

            // Muestra estilos de completado a los habitos con registros hoy
            let completadoHoy = false;
            habito.registros.forEach(function (registro) {
                if (registro.fechaCompletado === hoy) {
                    completadoHoy = true;
                }
            });

            let botonCompletar = "";
            let estiloTarjetaCompletado = "";

            if (completadoHoy) {
                botonCompletar = `<button class="btn btn-success btn-sm px-4 py-2 border" disabled>Completado hoy</button>`;
                estiloTarjetaCompletado = `background-image: linear-gradient(to top, #5b9358, #c6f3c4);`;
            } else {
                botonCompletar = `<button class="boton-completar-habito btn btn-success btn-sm px-4 py-2" data-id-habito="${habito.id}">Marcar como completado</button>`;
                estiloTarjetaCompletado = "";
            }

            contenidoCarrousel += `
                    <div id="habito-${habito.id}" class="carousel-item ${activo} h-100" style="${estiloTarjetaCompletado}">
                    
                        <div class="text-center px-5 py-4">
                            <div class="mt-3" style="font-size: 4rem; line-height: 1;">${emoji}</div>
                            <h3 class="mt-3 mb-1">${habito.nombre}</h3>
                            <p class="mb-4">
                                Streak x${habito.multiplicadorStreak}  -  ${proximaRecompensa} 🪙
                            </p>

                            <!-- TODO: GRID TIPO GITHUB -->
                            <div class="mb-5 mx-5">
                                <img class="card-img" src="https://placehold.co/600x400/png">
                            </div>

                            <div class="d-flex gap-2 justify-content-center">
                                <button class="boton-editar-habito btn btn-warning btn-sm px-4 py-2 border" data-bs-toggle="modal" data-bs-target="#editarHabitoModal" data-id-habito="${habito.id}">Editar</button>
                                ${botonCompletar}
                            </div>

                        </div>
                    </div>
                `;
        });
    } else {
        contenidoCarrousel = `
        <div class="carousel-item active" style="height: 425px;">
            <div class="text-center px-5 py-4 d-flex flex-column justify-content-center h-100">
                <div style="font-size: 4rem; line-height: 1;">📭</div>
                <h3 class="mt-3 mb-2">Aún no tienes hábitos</h3>
                <p class="mb-4">
                    Crea tu primer hábito para empezar a sumar recompensas
                </p>
            </div>
        </div>
    `;
    }

    return `
            <div id="carouselExampleControls" class="carousel slide bg-white border border-primary rounded h-100"
                data-bs-ride="carousel" data-bs-theme="dark">

                <div class="carousel-inner h-100">
                    ${contenidoCarrousel}
                </div>

                <button class="carousel-control-prev" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button"
                    data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        `;
}