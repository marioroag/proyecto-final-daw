import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const HabitoAPI = {
    obtenerTodos: () => fetchApi('GET', '/habitos'),
    obtenerPorId: (id) => fetchApi('GET', `/habitos/${id}`)
};
