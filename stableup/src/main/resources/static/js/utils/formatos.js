export function emojiPorTipo(tipo) {
    let emoji = "";
    if (tipo === "STRENGTH") emoji = "💪";
    if (tipo === "WELLBEING") emoji = "🌱";
    if (tipo === "MENTAL_HEALTH") emoji = "🧠";
    return emoji;
}

export function colorPorRareza(rareza) {
    let color = "";
    if (rareza === "COMUN") color = "#dce1e6";
    if (rareza === "POCO_COMUN") color = "#d1e7dd";
    if (rareza === "RARO") color = "#BFDBFE";
    if (rareza === "EPICO") color = "#DDD6FE";
    if (rareza === "LEGENDARIO") color = "#fce58b";
    return color;
}

export function formatearFechaRegistro(fechaRegistro) {
    const fecha = new Date(fechaRegistro);

    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return fechaFormateada;
}