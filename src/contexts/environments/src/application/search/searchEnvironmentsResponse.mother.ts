import Environments, { EnvironmentsPrimitives } from "@src/domain/environments";
import SearchEnvironmentsResponse from "./searchEnvironmentsResponse";
import EnvironmentsMother from "@src/domain/environments.mother";

export default class SearchEnvironmentsResponseMother {
    static create(environments: EnvironmentsPrimitives): SearchEnvironmentsResponse {
        return new SearchEnvironmentsResponse(new Environments(environments));
    }

    static fromEnvironments(environments: Environments) {
        return SearchEnvironmentsResponseMother.create(environments.toPrimitives());
    }

    static empty() {
        return SearchEnvironmentsResponseMother.fromEnvironments(
            EnvironmentsMother.empty()
        );
    }
}