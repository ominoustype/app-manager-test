import UuidMother from "@context/shared/domain/uuid.mother";
import Customer, { CustomerPrimitives } from "./customer";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";

export default class CustomerMother {
    static create(primitives: CustomerPrimitives): Customer {
        return new Customer(primitives);
    }

    static random(primitives?: Partial<CustomerPrimitives>) {
        return CustomerMother.create({
            id: UuidMother.random().value,
            name: MotherCreator.words().toString(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            CustomerMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            CustomerMother.random,
            size
        );
    }
}