import { UsuarioAPI } from '../api/usuarioApi.js';

async function cargarUsuario() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const usuario = await UsuarioAPI.obtenerPorId(id);

    const contenedor = document.getElementById("datos-usuario");
    contenedor.innerHTML = `
        <div class="card h-100 text-center">
            <div class="card-body p-4">

                <div class="mb-4">
                    <div style="font-size: 5rem;">🐎</div>
                    <h2 class="mt-2 mb-1">${usuario.username}</h2>
                    <p class="text-muted small mb-0">Miembro desde ${usuario.fechaRegistro}</p>
                </div>

                <div class="row g-2 mb-5">
                    <div class="col">
                        <div class="bg-light rounded border p-3">
                            <div class="h4 mb-0">${usuario.nivel}</div>
                            <div class="text-muted small">Nivel</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="bg-light rounded border p-3">
                            <div class="h4 mb-0">${usuario.monedas}</div>
                            <div class="text-muted small">🪙 monedas</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="bg-light rounded border p-3">
                            <div class="h4 mb-0">${usuario.caballos.length}</div>
                            <div class="text-muted small">🐎 caballos</div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="bg-light rounded border p-3">
                            <div class="h4 mb-0">${usuario.habitos.length}</div>
                            <div class="text-muted small">🎯 hábitos</div>
                        </div>
                    </div>
                </div>
                    
                <div class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-outline-success btn-sm">+ Hábito</button>
                    <button class="btn btn-outline-dark btn-sm">+ Caballo</button>
                </div>

            </div>

        </div>
        `;
}

cargarUsuario();