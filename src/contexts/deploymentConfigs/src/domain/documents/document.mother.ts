import Document, { DocumentPrimitives } from "./document";
import DatetimeMother from "@context/shared/domain/datetime.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import DocumentTypeMother from "./documentType.mother";
import DocumentNameMother from "./documentName.mother";
import DocumentVersionMother from "./documentVersion.mother";
import DocumentIdMother from "./documentId.mother";
import PropertiesMother from "./properties/properties.mother";
import CustomerMother from "./customer/customer.mother";
import EnvironmentMother from "./environment/environment.mother";
import DocumentStatusMother from "./documentStatus.mother";

export default class DocumentMother {
    static create(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
    }

    static random(primitives?: Partial<DocumentPrimitives>): Document {
        return DocumentMother.create({
            id: DocumentIdMother.random().value,
            createdAt: DatetimeMother.random().toString(),
            savedAt: DatetimeMother.random().toString(),
            name: DocumentNameMother.random().toString(),
            type: DocumentTypeMother.random(),
            version: DocumentVersionMother.random().toString(),
            status: DocumentStatusMother.random(),
            properties: PropertiesMother.random().toPrimitives(),
            customer: CustomerMother.random().toPrimitives(),
            environment: EnvironmentMother.random().toPrimitives(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            DocumentMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            DocumentMother.random,
            size
        );
    }
}
