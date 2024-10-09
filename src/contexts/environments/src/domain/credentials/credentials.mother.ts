import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import Credentials, { CredentialsPrimitives } from "./credentials";

export default class CredentialsMother {
    static create(primitives: CredentialsPrimitives): Credentials {
        return new Credentials(primitives);
    }

    static random(primitives?: Partial<CredentialsPrimitives>): Credentials {
        return CredentialsMother.create({
            username: MotherCreator.word(),
            password: MotherCreator.word(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            CredentialsMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            CredentialsMother.random,
            size
        );
    }
}