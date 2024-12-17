import { sample } from "lodash";
import DocumentStatus from "./documentStatus";

export default class DocumentStatusMother {
    static random(): DocumentStatus{
        return sample(Object.values(DocumentStatus)) as DocumentStatus;
    }
}