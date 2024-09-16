import { Express } from 'express'
import { searchRoles, findRole, createRole, updateRole, deleteRole } from './controllers';

const BASE_URL = "/roles";
const BASIC_URL = BASE_URL+"/:id";

export default function loadRoles(app: Express){
    app.get(BASE_URL, searchRoles);
    app.get(BASIC_URL, findRole);
    app.post(BASE_URL, createRole);
    app.put(BASIC_URL, updateRole);
    app.delete(BASIC_URL, deleteRole);
}