import Previous, { PreviousPrimitives } from "./previous";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import UsernameMother from "../users/username.mother";
import ChangeMother from "./change.mother";

export default class PreviousMother {
    static create(primitives: PreviousPrimitives): Previous {
        return new Previous(primitives);
    }

    static random(primitives?: Partial<PreviousPrimitives>): Previous {
        return PreviousMother.create({
            username: UsernameMother.random().toString(),
            changes: ChangeMother.random().toPrimitives(),
            ...primitives
        })
    }

    static randomNotReady(primitives?: Partial<PreviousPrimitives>): Previous {
        return PreviousMother.random({
            ...primitives,
            changes: ChangeMother.randomNotReady().toPrimitives()
        })
    }

    static randomReady(primitives?: Partial<PreviousPrimitives>): Previous {
        return PreviousMother.random({
            ...primitives,
            changes: ChangeMother.randomReady().toPrimitives()
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            PreviousMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListNotReady() {
        return Repeater.randomWithoutRepetitions(
            PreviousMother.randomNotReady,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListReady() {
        const list = Repeater.randomWithoutRepetitions(
            PreviousMother.randomNotReady,
            MotherCreator.positiveNumber(10)
        );

        list.push(PreviousMother.randomReady());

        return list;
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            PreviousMother.random,
            size
        );
    }
}
