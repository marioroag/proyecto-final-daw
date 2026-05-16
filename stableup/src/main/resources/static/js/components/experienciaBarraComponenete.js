export function cargarBarraExperiencia(porcentaje) {
    document.getElementById("barra-progreso").innerHTML = `
    <div class="progress" role="progressbar">
        <div class="progress-bar" style="width: ${porcentaje}%"></div>
    </div>
    `
};