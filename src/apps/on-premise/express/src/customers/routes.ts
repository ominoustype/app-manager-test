import { Express } from 'express'
import { searchCustomers, findCustomer, closeConnections } from './controllers';
import { auth } from '../middleware/auths';

const BASE_URL = "/customers";
const BASIC_URL = BASE_URL+"/:id";

export default function loadCustomers(app: Express){
    app.get(BASE_URL, auth, searchCustomers);
    app.get(BASIC_URL, auth, findCustomer);
}

export async function closeConnectionsCustomers() {
    await closeConnections();
}