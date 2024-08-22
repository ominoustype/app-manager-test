import Property, { PropertyPrimitives } from "./property";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";

export default class PropertyMother {
    static create(primitives: PropertyPrimitives): Property {
        return new Property(primitives);
    }

    static random(primitives?: Partial<PropertyPrimitives>): Property {
        return PropertyMother.create({
            key: MotherCreator.word(),
            value: MotherCreator.word(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            PropertyMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            PropertyMother.random,
            size
        );
    }
}
