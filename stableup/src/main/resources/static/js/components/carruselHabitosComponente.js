import { emojiPorTipo } from '../utils/formatos.js';

export function carruselHabitos(habitos) {
    let contenidoCarrousel = "";

    if (habitos.length > 0) {
        habitos.forEach((habito, indice) => {
            const proximaRecompensa = habito.recompensaBase * habito.multiplicadorStreak;
            const emoji = emojiPorTipo(habito.tipo);

            let activo = "";

            if (indice === 0) {
                activo = "active";
            }

            contenidoCarrousel += `
                    <div class="carousel-item ${activo}" style="height: 425px;">
                    
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
                                <button class="boton-editar-habito btn btn-warning btn-sm px-4 py-2" data-bs-toggle="modal" data-bs-target="#editarHabitoModal" data-id-habito="${habito.id}">Editar</button>
                                <button class="btn btn-success btn-sm px-4 py-2">Marcar como completado</button>
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