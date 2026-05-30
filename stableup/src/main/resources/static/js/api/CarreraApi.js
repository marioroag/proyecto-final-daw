import { API_CONFIG } from '../config/apiConfig.js';
import { fetchApi } from '../utils/apiUtils.js';

export const CarreraAPI = {
    obtenerTodos: () => fetchApi('GET', '/carreras'),
    obtenerPorId: (id) => fetchApi('GET', `/carreras/${id}`),
    iniciar: (idCaballoPropio, idsContrincantes) => fetchApi('POST', `/carreras/iniciar/${idCaballoPropio}`, idsContrincantes),
    eliminar: (id) => fetchApi('DELETE', `/carreras/${id}`)
};
