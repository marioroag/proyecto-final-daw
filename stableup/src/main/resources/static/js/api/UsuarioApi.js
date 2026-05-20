import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const UsuarioAPI = {
    crearUsuario: (usuario) => fetchApi('POST', `/usuarios`, usuario),
    editarUsuario: (id, usuario) => fetchApi('PUT', `/usuarios/${id}`, usuario),
    obtenerTodos: () => fetchApi('GET', '/usuarios'),
    obtenerPorId: (id) => fetchApi('GET', `/usuarios/${id}`),
    obtenerCaballos: (id) => fetchApi('GET', `/usuarios/${id}/caballos`),
    obtenerHabitos: (id) => fetchApi('GET', `/usuarios/${id}/habitos`),
    crearHabito: (id, habito) => fetchApi('POST', `/usuarios/${id}/habitos`, habito),
    eliminarPorId: (id) => fetchApi('DELETE', `/usuarios/${id}`)
};
