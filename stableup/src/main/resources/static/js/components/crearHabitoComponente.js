export function cargarModalHabito() {
    document.getElementById("contenedorModalHabito").innerHTML = `
        <div class="modal fade" id="habitoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Crear hábito</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <form action="">
                            <div class="mb-3">
                                <label for="fullName" class="form-label">Nombre</label>
                                <input id="nombre-habito" type="text" class="form-control" id="fullName" placeholder="Leer">
                            </div>
                            <div>
                                <label for="language" class="form-label">Tipo</label>
                                <select id="tipo-habito" class="form-select">
                                    <option value="" selected disabled>Elegir tipo</option>
                                    <option value="STRENGTH">Fuerza</option>
                                    <option value="WELLBEING">Bienestar</option>
                                    <option value="MENTAL_HEALTH">Salúd Mental</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button id="boton-crear-habito" type="button" class="btn btn-primary">Crear</button>
                    </div>
                </div>
            </div>
        </div>
        `
}