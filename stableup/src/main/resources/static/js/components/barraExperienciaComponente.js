export function cargarBarraExperiencia(porcentaje) {
    document.getElementById("barra-progreso").innerHTML = `
    <div class="progress border border-secondary border-opacity-50" role="progressbar">
        <div class="progress-bar bg-success" style="width: ${porcentaje}%"></div>
    </div>
    `
};