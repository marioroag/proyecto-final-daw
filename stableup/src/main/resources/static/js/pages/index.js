import { UsuarioAPI } from '../api/UsuarioApi.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function botonEliminar() {
    document.querySelectorAll(".boton-eliminar-usuario").forEach(function (boton) {
        boton.addEventListener("click", async function () {

            const idUsuario = boton.dataset.idUsuario;

            console.log(idUsuario);

            await UsuarioAPI.eliminarPorId(idUsuario);
            cargarUsuariosModal();
        })
    })
}

cargarUsuariosModal();

botonEliminar();