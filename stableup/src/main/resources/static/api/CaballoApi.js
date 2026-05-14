import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const CaballoAPI = {
    obtenerTodos: () => fetchApi('GET', '/caballos'),
    obtenerPorId: (id) => fetchApi('GET', `/caballos/${id}`)
};