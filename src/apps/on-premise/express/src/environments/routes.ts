import { Express } from 'express'

import { searchEnvironments, findEnvironment, createEnvironment,
    updateEnvironment, deleteEnvironment } from './controllers';

import { auth } from '../middleware/auths';


const BASE_URL = "/environments";

export default function loadEnvironment(app: Express) {
    app.get(BASE_URL, auth, searchEnvironments);
    app.get(`${BASE_URL}/:id`, auth, findEnvironment);
    app.post(BASE_URL, auth, createEnvironment);
    app.put(`${BASE_URL}/:id`, auth, updateEnvironment);
    app.delete(`${BASE_URL}/:id`, auth, deleteEnvironment); //TODO ???
}