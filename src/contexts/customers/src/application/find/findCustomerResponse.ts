import Customer, { CustomerPrimitives } from "@src/domain/customer";

export default class FindCustomerResponse {
    readonly primitives: CustomerPrimitives;

    constructor(primitives: Customer) {
        this.primitives = primitives.toPrimitives();
    }
} 