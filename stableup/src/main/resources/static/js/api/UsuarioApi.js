import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const UsuarioAPI = {
    obtenerTodos: () => fetchApi('GET', '/usuarios'),
    obtenerPorId: (id) => fetchApi('GET', `/usuarios/${id}`),
    obtenerCaballos: (id) => fetchApi('GET', `/usuarios/${id}/caballos`),
    obtenerHabitos: (id) => fetchApi('GET', `/usuarios/${id}/habitos`),
    crearHabito: (id, habito) => fetchApi('POST', `/usuarios/${id}/habitos`, habito),
    eliminarPorId: (id) => fetchApi('DELETE', `/usuarios/${id}`)
};
