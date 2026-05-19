import { API_CONFIG } from '../config/apiConfig.js';

export async function fetchApi(method = 'GET', path, body = null) {
    let url = `${API_CONFIG.baseURL}${path}`;
    let response = {};
    let data = null;

    if (method === 'POST' || method === 'PUT') {
        response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

    } else {
        response = await fetch(url, { method: method });
    }

    if (method === 'DELETE') {
        data = response.ok;
    } else if (response.status == 204 || response.status == 404) {
        data = null;
    } else {
        data = await response.json();
    }

    return data;
}