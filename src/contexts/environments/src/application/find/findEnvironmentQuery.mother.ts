import UuidMother from "@context/shared/domain/uuid.mother";
import FindEnvironmentQuery, { FindEnvironmentQueryParams } from "./findEnvironmentQuery";
import EnvironmentMother from "@src/domain/environment.mother";
import Environment from "@src/domain/environment";

export default class FindEnvironmentQueryMother{
    static create(params: FindEnvironmentQueryParams): FindEnvironmentQuery {
        return new FindEnvironmentQuery(params);
    }

    static random(): FindEnvironmentQuery {
        return FindEnvironmentQueryMother.create({
            id: UuidMother.random().toString()
        })
    }

    static randomEnvironment(query: FindEnvironmentQuery): Environment {
        const id = UuidMother.create(query.id).toString()

        return EnvironmentMother.random({id})
    }
}