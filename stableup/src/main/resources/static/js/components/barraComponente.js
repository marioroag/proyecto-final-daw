export function cargarBarra(porcentaje, color) {
    return `
    <div class="progress border border-secondary border-opacity-50" role="progressbar">
        <div class="progress-bar ${color}" style="width: ${porcentaje}%"></div>
    </div>
    `
};