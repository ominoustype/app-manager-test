import UpdateBy, { UpdateByPrimitives } from "./updateBy";
import UuidMother from '@context/shared/domain/uuid.mother';
import DatetimeMother from "@context/shared/domain/datetime.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import UsernameMother from "../users/username.mother";
import ChangesMother from "./changes.mother";

export default class UpdateByMother {
    static create(primitives: UpdateByPrimitives): UpdateBy {
        return new UpdateBy(primitives);
    }

    static random(primitives?: Partial<UpdateByPrimitives>): UpdateBy {
        return UpdateByMother.create({
            updatedAt: DatetimeMother.random().toString(),
            username: UsernameMother.random().toString(),
            userId: UuidMother.random().toString(),
            changes: ChangesMother.random().toPrimitives(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            UpdateByMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            UpdateByMother.random,
            size
        );
    }
}
