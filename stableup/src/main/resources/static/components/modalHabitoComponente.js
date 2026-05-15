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
                                <input type="text" class="form-control" id="fullName" placeholder="Leer">
                            </div>
                            <div>
                                <label for="language" class="form-label">Tipo</label>
                                <select class="form-select">
                                    <option selected>Elegir</option>
                                    <option value="fuerza">Fuerza</option>
                                    <option value="bienestar">Bienestar</option>
                                    <option value="salud">Salúd Mental</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary">Crear</button>
                    </div>
                </div>
            </div>
        </div>
        `
}