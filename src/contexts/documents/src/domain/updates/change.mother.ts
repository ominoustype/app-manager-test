import Change, { ChangePrimitives } from "./change";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";

export default class ChangeMother {
    static create(primitives: ChangePrimitives): Change {
        return new Change(primitives);
    }

    static random(primitives?: Partial<ChangePrimitives>): Change {
        return ChangeMother.create({
            field: MotherCreator.word(),
            oldValue: MotherCreator.word(),
            newValue: MotherCreator.word(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            ChangeMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            ChangeMother.random,
            size
        );
    }
}
