import { formatearFechaRegistro } from '../utils/formatos.js';

export function tarjetaUsuario(usuario) {
    return `
        <div class="card border-dark-subtle text-center px-4 pb-3 h-100" style="min-height: 425px;">
            <div class="card-body">

                <div class="mb-4">
                    <div style="font-size: 5rem;">👤</div>
                    <h2 class="mt-2 mb-1">${usuario.username}</h2>
                    <p class="text-muted small mb-0">Miembro desde el ${formatearFechaRegistro(usuario.fechaRegistro)}</p>
                </div>

                <div class="row g-2 mb-4">
                    <div class="col">
                        <div class="bg-light rounded border p-3">
                            <div class="h4 mb-0">${Math.trunc(usuario.nivel)}</div>
                            <div class="text-muted small">🆙 nivel</div>
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

                <div class="mb-5" id="barra-progreso"></div>

                <div class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-outline-primary btn-sm px-4 py-2" data-bs-toggle="modal" data-bs-target="#habitoModal">+ Hábito</button>
                    <button class="btn btn-outline-success btn-sm px-4 py-2" id="gacha-caballos" data-bs-toggle="tooltip" data-bs-placement="top"
                    data-bs-title="Cuesta 100 🪙">+ Caballo</button>
                </div>

            </div>
        </div>
    `;
}