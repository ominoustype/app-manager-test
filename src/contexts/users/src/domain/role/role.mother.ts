import Role, { RolePrimitives } from "./role";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import UuidMother from "@context/shared/domain/uuid.mother";

export default class RoleMother {
    static create(primitives: RolePrimitives): Role {
        return new Role(primitives);
    }

    static random(primitives?: Partial<RolePrimitives>): Role {
        return RoleMother.create({
            id: UuidMother.random().value,
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            RoleMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            RoleMother.random,
            size
        );
    }
}
