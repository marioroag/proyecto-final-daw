export function cargarModalEditarHabito() {
    document.getElementById("contenedorModalEditarHabito").innerHTML = `
        <div class="modal fade" id="editarHabitoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Editar hábito</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <form id="formulario-editar-habito">
                        <div id="mensaje-error-editar" class="text-danger mb-1 fw-bold"></div>
                            <div class="mb-3">
                                <label class="form-label">Nombre</label>
                                <input id="nuevo-nombre-habito" type="text" maxlength="20" class="form-control" placeholder="Leer">
                            </div>
                            <div>
                                <label class="form-label">Tipo</label>
                                <select id="nuevo-tipo-habito" class="form-select">
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
                        <button type="button" id="boton-eliminar-habito" class="btn btn-danger">Eliminar</button>
                        <button type="submit" id="boton-guardar-habito" form="formulario-editar-habito" class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        `
}