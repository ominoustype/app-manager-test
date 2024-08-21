import { Express } from 'express'

import { searchEnvironments, findEnvironment, createEnvironment,
    updateEnvironment, deleteEnvironment } from './controllers';

const BASE_URL = "/environments";

export default function loadEnvironment(app: Express) {
    app.get(BASE_URL, searchEnvironments);
    app.get(`${BASE_URL}/:id`, findEnvironment);
    app.post(BASE_URL, createEnvironment);
    app.put(`${BASE_URL}/:id`, updateEnvironment);
    app.delete(`${BASE_URL}/:id`, deleteEnvironment);
}