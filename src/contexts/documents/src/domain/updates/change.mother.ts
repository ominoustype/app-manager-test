import Change, { ChangePrimitives } from "./change";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import DocumentNameMother from "../documentName.mother";
import DocumentTypeMother from "../documentType.mother";
import DocumentVersionMother from "../documentVersion.mother";
import DocumentStatusMother from "../documentStatus.mother";
import PropertiesMother from "../properties/properties.mother";

export default class ChangeMother {
    static create(primitives: ChangePrimitives): Change {
        return new Change(primitives);
    }

    static random(primitives?: Partial<ChangePrimitives>): Change {
        return ChangeMother.create({
            name: DocumentNameMother.random().toString(),
            type: DocumentTypeMother.random(),
            version: DocumentVersionMother.random().toString(),
            status: DocumentStatusMother.random(),
            properties: PropertiesMother.random().toPrimitives(),
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
