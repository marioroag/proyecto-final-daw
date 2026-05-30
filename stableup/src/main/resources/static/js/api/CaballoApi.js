import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const CaballoAPI = {
    obtenerTodos: () => fetchApi('GET', '/caballos'),
    obtenerPorId: (id) => fetchApi('GET', `/caballos/${id}`),
    obtenerParticipaciones: (id) => fetchApi('GET', `/caballos/${id}/participaciones`),
    obtenerContrincantes: (id) => fetchApi('GET', `/caballos/${id}/contrincantes`),
    generarParaUsuario: (usuarioId) => fetchApi('POST', `/caballos/usuario/${usuarioId}`),
    eliminar: (id) => fetchApi('DELETE', `/caballos/${id}`)

};