import { sample } from "lodash";
import DocumentType from "./documentType";

export default class DocumentTypeMother {
    static random(): DocumentType {
        return sample(Object.values(DocumentType)) as DocumentType;
    }
}
