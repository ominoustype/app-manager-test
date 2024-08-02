import Enviroments, { EnviromentsPrimitives } from "@src/domain/enviroments";
import SearchEnviromentsResponse from "./searchEnviromentsResponse";
import EnviromentsMother from "@src/domain/enviroments.mother";

export default class SearchEnviromentsResponseMother {
    static create(enviroments: EnviromentsPrimitives): SearchEnviromentsResponse {
        return new SearchEnviromentsResponse(new Enviroments(enviroments));
    }

    static fromEnviroments(enviroments: Enviroments) {
        return SearchEnviromentsResponseMother.create(enviroments.toPrimitives());
    }

    static empty() {
        return SearchEnviromentsResponseMother.fromEnviroments(
            EnviromentsMother.empty()
        );
    }
}