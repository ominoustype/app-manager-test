import UuidMother from "@context/shared/domain/uuid.mother";
import FindEnvironmentQuery, { FindEnvironmentQueryParams, FindEnvironmentQueryPermissions } from "./findEnvironmentQuery";
import EnvironmentMother from "@src/domain/environment.mother";
import Environment from "@src/domain/environment";
import EnvironmentIdMother from "@src/domain/environmentId.mother";

export default class FindEnvironmentQueryMother{
    static create(params: FindEnvironmentQueryParams, permissions: FindEnvironmentQueryPermissions): FindEnvironmentQuery {
        return new FindEnvironmentQuery(params, permissions);
    }

    static random(): FindEnvironmentQuery {
        return FindEnvironmentQueryMother.create({
            id: UuidMother.random().toString()
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)

        });
    }

    static randomEnvironment(query: FindEnvironmentQuery): Environment {
        const id = UuidMother.create(query.id).toString()

        return EnvironmentMother.random({id})
    }
}