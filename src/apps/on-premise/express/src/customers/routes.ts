import { Express } from 'express'
import { searchCustomers, findCustomer, closeConnections } from './controllers';

const BASE_URL = "/customers";
const BASIC_URL = BASE_URL+"/:id";

export default function loadCustomers(app: Express){
    app.get(BASE_URL, searchCustomers);
    app.get(BASIC_URL, findCustomer);
}

export async function closeConnectionsCustomers() {
    await closeConnections();
}