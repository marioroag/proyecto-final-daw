import { UsuarioAPI } from '../api/usuarioApi.js';

async function cargarUsuariosModal() {
    const usuarios = await UsuarioAPI.obtenerTodos();

    const contenedor = document.getElementById("lista-usuarios-login");
    contenedor.innerHTML = "";

    usuarios.forEach(usuario => {
        const enlace = document.createElement("div");
        enlace.classList.add("btn", "btn-outline-secondary", "text-start");
        enlace.innerHTML = `
        <div class="d-flex justify-content-between">
            <a href="usuarioDetalle.html?id=${usuario.id}" style="text-decoration: none">
                <strong>${usuario.username}</strong>
                <span class="text-muted ms-2">Nivel ${Math.trunc(usuario.nivel)}</span>
            </a>

            <div>
                <button class="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                <button class="boton-eliminar-usuario btn btn-danger" data-id-usuario="${usuario.id}"><i class="bi bi-x-square"></i></button>
            </div>
            
        </div>
            `;

        contenedor.appendChild(enlace);
    });

    contenedor.innerHTML += `
    <button id="boton-crear-usuario" class="btn btn-dark">Crear usuario</button>
    `
    botonEliminar()
}


async function botonEliminar() {
    document.querySelectorAll(".boton-eliminar-usuario").forEach(function (boton) {
        boton.addEventListener("click", async function () {

            const idUsuario = boton.dataset.idUsuario;

            console.log(idUsuario);

            await UsuarioAPI.eliminarPorId(idUsuario);
            await cargarUsuariosModal();
        })
    })
}

async function botonCrear() {
    document.getElementById("boton-crear-usuario").forEach(function (boton) {
        boton.addEventListener("click", async function () {

            await UsuarioAPI.eliminarPorId(idUsuario);
            await cargarUsuariosModal();
        })
    })
}

async function cargarModalHabito() {
    document.getElementById("modalCrearUsuario").innerHTML = `
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
                        <div id="mensaje-error-crear"></div>
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
                                    <option value="LEARNING">Aprendizaje</option>
                                    <option value="ORGANIZATION">Organización</option>
                                    <option value="SOCIAL">Social</option>
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
await cargarUsuariosModal();

botonEliminar();