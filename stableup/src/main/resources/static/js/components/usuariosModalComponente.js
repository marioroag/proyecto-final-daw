import { UsuarioAPI } from '../api/usuarioApi.js';
import { alertaErrorFormulario } from '../components/alertaFormularioComponente.js';

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

    botonEliminar();
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

async function prepararModalUsuario() {
    document.getElementById("modalCrearUsuario").innerHTML = `
        <div class="modal fade" id="modalCrear" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Crear hábito</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <form id="formulario-crear-usuario">
                        <div id="mensaje-error-crear"></div>
                        <div class="mb-3">
                                <label class="form-label">Nombre</label>
                                <input id="nombre-usuario" type="text" maxlength="20" class="form-control" placeholder="Pepe">
                            </div>
                            <div>
                                <label class="form-label">Correo electrónico</label>
                                <input id="email-usuario" type="text" maxlength="20" class="form-control" placeholder="pepe@gmail.com">
                            </div>
                        </form>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" id="boton-crear-usuario" form="formulario-crear-usuario" class="btn btn-primary">Crear</button>
                    </div>
                </div>
            </div>
        </div>
        `
}

function botonCrearUsuario() {
    document.getElementById("formulario-crear-usuario").addEventListener("submit", async function (e) {

        e.preventDefault();
        // Resetea mensaje de error
        document.getElementById("mensaje-error-crear").innerHTML = ""

        const nombreUsuario = document.getElementById("nombre-usuario").value;
        const emailUsuario = document.getElementById("email-usuario").value;

        if (nombreUsuario != "" && emailUsuario != "") {
            // Esconde el modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("modalCrear"));
            modal.hide();

            // Devuelve un objeto que la api convierte a json despues para java como usuario
            const usuario = {
                username: nombreUsuario,
                email: emailUsuario
            };

            await UsuarioAPI.crearUsuario(usuario);

            await cargarUsuariosModal();

        } else {
            document.getElementById("mensaje-error-crear").innerHTML = alertaErrorFormulario();
        }
    })
}

await cargarUsuariosModal();
prepararModalUsuario();
botonCrearUsuario();