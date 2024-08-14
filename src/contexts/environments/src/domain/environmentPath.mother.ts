import MotherCreator from "@context/shared/domain/motherCreator.mother";
import EnvironmentPath from "./environmentPath";

export default class EnvironmentPathMother {
    static create(value: string): EnvironmentPath {
        return new EnvironmentPath(value);
    }

    static random(): EnvironmentPath{
        return EnvironmentPathMother.create(MotherCreator.words());
    }
}