import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import Customer, { CustomerPrimitives } from "./customer";

export type CustomersPrimitives = Array<CustomerPrimitives>;

export default class Customers extends UniqueObjectsArray<Customer, CustomerPrimitives>{
    constructor(primitives: CustomersPrimitives){
        super(primitives, Customer);
    }
}