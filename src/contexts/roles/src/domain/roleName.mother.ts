import MotherCreator from "@context/shared/domain/motherCreator.mother";
import RoleName from "./roleName";

export default class RoleNameMother {
    static create(value: string): RoleName {
        return new RoleName(value);
    }

    static random(): RoleName {
         return RoleNameMother.create(MotherCreator.words());
    }
}