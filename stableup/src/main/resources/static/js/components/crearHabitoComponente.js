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
                        <form id="formulario-crear-habito">
                            <div class="mb-3">
                                <label class="form-label">Nombre</label>
                                <input id="nombre-habito" type="text" maxlength="20" class="form-control" placeholder="Leer">
                            </div>
                            <div>
                                <label class="form-label">Tipo</label>
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
                        <button type="submit" id="boton-crear-habito" form="formulario-crear-habito" class="btn btn-primary">Crear</button>
                    </div>
                </div>
            </div>
        </div>
        `
}