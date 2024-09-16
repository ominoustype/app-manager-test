import UuidMother from "@context/shared/domain/uuid.mother";
import RoleId from "./roleId";

export default class RoleIdMother {
    static create(value: string): RoleId {
        return new RoleId(value);
    }

    static random(): RoleId {
        return RoleIdMother.create(UuidMother.random().value);
    }
}