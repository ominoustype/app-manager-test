import Role, { RolePrimitives } from "./role";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import RoleIdMother from "./roleId.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import RoleNameMother from "./roleName.mother";
import UuidMother from "@context/shared/domain/uuid.mother";

export default class RoleMother {
    static create(primitives: RolePrimitives): Role {
        return new Role(primitives);
    }

    static random(primitives?: Partial<RolePrimitives>): Role {
        return RoleMother.create ({
            id: RoleIdMother.random().value,
            name: RoleNameMother.random().toString(),
            customerId: UuidMother.random().value,
            environmentIds: MotherCreator.words(),
            ...primitives
        });
    }

    static merge(oldEnvironment: Role, newEnvironment: Role) {
        return RoleMother.create({
            ...oldEnvironment.merge(newEnvironment.toPrimitives())
        });
    }

    static randomList(): Role[] {
        return Repeater.randomWithoutRepetitions(
            RoleMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number): Role[] {
        return Repeater.randomWithoutRepetitions(
            RoleMother.random,
            size
        );
    }
}