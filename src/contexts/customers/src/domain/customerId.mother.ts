import UuidMother from '@context/shared/domain/uuid.mother';
import CustomerId from "./customerId";

export default class CustomerIdMother {
    static create(value: string) {
        return new CustomerId(value);
    }

    static random() {
        return CustomerIdMother.create(UuidMother.random().value);
    }
}