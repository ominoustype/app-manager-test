import MotherCreator from "@context/shared/domain/motherCreator.mother";
import EnvironmentName from "./environmentName";

export default class EnvironmentNameMother {
    static create(value: string): EnvironmentName {
        return new EnvironmentName(value);
    }

    static random(): EnvironmentName{
        return EnvironmentNameMother.create(MotherCreator.word());
    }
}