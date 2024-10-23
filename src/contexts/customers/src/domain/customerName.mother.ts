import MotherCreator from "@context/shared/domain/motherCreator.mother";
import CustomerName from './customerName';

export default class CustomerNameMother {
    static create(name: string): CustomerName {
        return new CustomerName(name);
    }

    static random(): CustomerName {
        return CustomerNameMother.create(MotherCreator.word());    
    }
}