import Customer, { CustomerPrimitives } from "@src/domain/customer";
import FindCustomerResponse from "./findCustomerResponse";

export default class FindCustomerResponseMother {
    static create(primitives: CustomerPrimitives): FindCustomerResponse {
        return new FindCustomerResponse(new Customer(primitives));
    }
}