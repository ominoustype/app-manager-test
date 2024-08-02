import UuidMother from "@context/shared/domain/uuid.mother";
import FindEnviromentQuery, { FindEnviromentQueryParams } from "./findEnviromentQuery";
import EnviromentMother from "@src/domain/enviroment.mother";
import Enviroment from "@src/domain/enviroment";

export default class FindEnviromentQueryMother{
    static create(params: FindEnviromentQueryParams): FindEnviromentQuery {
        return new FindEnviromentQuery(params);
    }

    static random(): FindEnviromentQuery {
        return FindEnviromentQueryMother.create({
            id: UuidMother.random().toString()
        })
    }

    static randomEnviroment(query: FindEnviromentQuery): Enviroment {
        const id = UuidMother.create(query.id).toString()

        return EnviromentMother.random({id})
    }
}