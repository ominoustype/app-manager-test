import Customers, { CustomersPrimitives } from "@src/domain/customers";
import { Response } from '@context/shared/domain/queryBus/response';

export default class SearchCustomersResponse implements Response {
    readonly customers: CustomersPrimitives;
    
    constructor(customers: Customers) { 
        this.customers = customers.toPrimitives();
    }
}