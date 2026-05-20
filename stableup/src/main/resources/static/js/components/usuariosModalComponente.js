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
        <div class="d-flex justify-content-between" style="height: 30px">
            <a class="d-flex" style="line-height: 30px; text-decoration: none" href="usuarioDetalle.html?id=${usuario.id}" style="text-decoration: none">
                <p class="text-dark fw-semibold">${usuario.username}</p>
                <span class="text-muted ms-2">Nivel ${Math.trunc(usuario.nivel)}</span>
            </a>

            <div class="align-items-center">
                <button class="boton-editar-usuario btn btn-warning btn-sm" data-id-usuario="${usuario.id}" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="bi bi-pencil-square"></i></button>
                <button class="boton-eliminar-usuario btn btn-danger btn-sm" data-id-usuario="${usuario.id}"><i class="bi bi-x-square"></i></button>
            </div>
            
        </div>
            `;

        contenedor.appendChild(enlace);
    });

    botonEliminar();
    prepararEditarUsuario();
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

function formularioCrearUsuario() {
    document.getElementById("formulario-crear-usuario").addEventListener("submit", async function (e) {

        e.preventDefault();

        const nombreUsuario = document.getElementById("nombre-crear-usuario").value;
        const emailUsuario = document.getElementById("email-crear-usuario").value;

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
            document.getElementById("mensaje-error-crear").innerHTML = alertaErrorFormulario("Nombre o email inválidos");
        }
    })
}

async function prepararModalUsuario(nombreBoton) {
    const nombreLetraUpper = nombreBoton.charAt(0).toUpperCase() + nombreBoton.slice(1);

    document.getElementById(`modal${nombreLetraUpper}Usuario`).innerHTML = `
        <div class="modal fade" id="modal${nombreLetraUpper}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">${nombreLetraUpper} usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <form id="formulario-${nombreBoton}-usuario">
                        <div id="mensaje-error-${nombreBoton}"></div>
                        <div class="mb-3">
                                <label class="form-label">Nombre</label>
                                <input id="nombre-${nombreBoton}-usuario" type="text" maxlength="20" class="form-control" placeholder="Pepe">
                            </div>
                            <div>
                                <label class="form-label">Correo electrónico</label>
                                <input id="email-${nombreBoton}-usuario" type="text" maxlength="20" class="form-control" placeholder="pepe@gmail.com">
                            </div>
                        </form>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" id="boton-${nombreBoton}-usuario" form="formulario-${nombreBoton}-usuario" class="btn btn-primary">${nombreLetraUpper}</button>
                    </div>
                </div>
            </div>
        </div>
        `
}

// Prepara el modal de editar usuario sus datos
function prepararEditarUsuario() {
    document.querySelectorAll(".boton-editar-usuario").forEach(function (boton) {
        boton.addEventListener("click", async function () {

            // Resetea mensaje de error
            document.getElementById("mensaje-error-editar").innerHTML = ""

            const idUsuario = boton.dataset.idUsuario;

            // Aplica los datos actuales del usuario
            const usuario = await UsuarioAPI.obtenerPorId(idUsuario);

            document.getElementById("nombre-editar-usuario").value = usuario.username;
            document.getElementById("email-editar-usuario").value = usuario.email;
            document.getElementById("formulario-editar-usuario").dataset.idUsuario = idUsuario;

            formularioEditarUsuario()
        });
    });
}

function formularioEditarUsuario() {
    document.getElementById("formulario-editar-usuario").addEventListener("submit", async function (e) {
        const id = this.dataset.idUsuario;
        e.preventDefault();

        const nombreUsuario = document.getElementById("nombre-editar-usuario").value;
        const emailUsuario = document.getElementById("email-editar-usuario").value;

        if (nombreUsuario != "" && emailUsuario != "") {
            // Esconde el modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditar"));
            modal.hide();

            // Devuelve un objeto que la api convierte a json despues para java como usuario
            const usuario = {
                username: nombreUsuario,
                email: emailUsuario
            };

            await UsuarioAPI.editarUsuario(id, usuario);

            await cargarUsuariosModal();

        } else {
            document.getElementById("mensaje-error-editar").innerHTML = alertaErrorFormulario("Nombre o email inválidos");
        }
    })
}

await cargarUsuariosModal();

prepararModalUsuario("crear");
prepararModalUsuario("editar");

formularioCrearUsuario();

prepararEditarUsuario();