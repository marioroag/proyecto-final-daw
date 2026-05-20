import { UsuarioAPI } from '../api/UsuarioApi.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// TODO: IMPORTANTE: Logica de este pages esta toda en usuariosModalComponente, UNIFICAR AQUI Y REFACTORIZAR COMPONENTE