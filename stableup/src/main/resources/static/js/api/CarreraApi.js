import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const CarreraAPI = {
    obtenerTodos: () => fetchApi('GET', '/carreras'),
    obtenerPorId: (id) => fetchApi('GET', `/carreras/${id}`)
};
