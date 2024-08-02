import UuidMother from "@context/shared/domain/uuid.mother";
import Enviroment, { EnviromentPrimitives } from "./enviroment";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";

export default class EnviromentMother{
    static create(primitives: EnviromentPrimitives): Enviroment {
        const aux = new Enviroment(primitives);
        return aux;
    }

    static random(primitives?: Partial<EnviromentPrimitives>): Enviroment {
        return EnviromentMother.create({
            id: UuidMother.random().value,
            name: MotherCreator.word(),
            rules: MotherCreator.words().toString(),
            customerId: MotherCreator.words().toString(),
            path: MotherCreator.words().toString(),
            ...primitives
        })
    }

    static merge(oldDocument: Enviroment, newDocument: Enviroment) {
        return EnviromentMother.create({
            ...oldDocument.merge(newDocument.toPrimitives())
        });
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            EnviromentMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            EnviromentMother.random,
            size
        );
    }
}