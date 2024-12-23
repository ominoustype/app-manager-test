import EnvironmentIdMother from "@src/domain/environmentId.mother";
import SearchEnvironmentsQuery, { SearchEnvironmentQueryPermissions, SearchEnvironmentsQueryParams } from "./searchEnvironmentsQuery";

export default class SearchEnvironmentsQueryMother {
    static create(params: SearchEnvironmentsQueryParams, permissions: SearchEnvironmentQueryPermissions): SearchEnvironmentsQuery {
        return new SearchEnvironmentsQuery(params, permissions);
    }

    static random(): SearchEnvironmentsQuery {
        return SearchEnvironmentsQueryMother.create({
            },
            {
                environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
            }
        );
    }
}