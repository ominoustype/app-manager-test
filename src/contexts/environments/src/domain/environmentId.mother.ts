import UuidMother from "@context/shared/domain/uuid.mother";
import EnvironmentId from "./environmentId";


export default class EnvironmentIdMother {
    static create(value: string) {
        return new EnvironmentId(value);
    }

    static random() {
        return EnvironmentIdMother.create(UuidMother.random().value)
    }
}