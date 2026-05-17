import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const HabitoAPI = {
    obtenerTodos: () => fetchApi('GET', '/habitos'),
    obtenerPorId: (id) => fetchApi('GET', `/habitos/${id}`),
    editar: (id, habito) => fetchApi('PUT', `/habitos/${id}`, habito),
    eliminar: (id) => fetchApi('DELETE', `/habitos/${id}`),
    completar: (id) => fetchApi('POST', `/habitos/${id}/completar`)
};
