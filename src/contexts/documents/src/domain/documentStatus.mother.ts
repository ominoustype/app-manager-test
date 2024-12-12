import { sample } from "lodash";
import DocumentStatus from "./documentStatus";

export default class DocumentStatusMother {
    static random(): DocumentStatus{
        return sample(Object.values(DocumentStatus)) as DocumentStatus;
    }

    static notReady(): DocumentStatus{
        return sample(DocumentStatus.DEPLOYED || DocumentStatus.DELETED) as DocumentStatus;
    }

    static ready(): DocumentStatus{
        return DocumentStatus.READY;
    }
}
