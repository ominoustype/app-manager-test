import Repeater from "@context/shared/domain/repeater.mother";
import Customer, { CustomerPrimitives } from "./customer";
import CustomerIdMother from "./customerId.mother";
import CustomerNameMother from "./customerName.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";

export default class CustomerMother {
    static create(primitives: CustomerPrimitives): Customer {
        return new Customer(primitives);
    }

    static random(primitives?: Partial<CustomerPrimitives>): Customer {
        return new Customer({
            id: CustomerIdMother.random().value,
            name: CustomerNameMother.random().toString(),
            ...primitives
        });
    }

    static randomList(): Customer[] {
        return Repeater.randomWithoutRepetitions(
            CustomerMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number): Customer[] {
        return Repeater.randomWithoutRepetitions(
            CustomerMother.random,
            size as number
        );
    }
}