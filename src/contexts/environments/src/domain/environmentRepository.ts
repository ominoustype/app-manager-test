import { Nullable } from "@context/shared/domain/nullable";
import Environment from "./environment";
import EnvironmentId from "./environmentId";
import { SearchEnvironmentsQueryParams } from "@src/application/search/searchEnvironmentsQuery";
import Environments from "./environments";

interface EnvironmentRepository {
    create(environment: Environment): Promise<void>;

    find(id: EnvironmentId): Promise<Nullable<Environment>>;

    search(params: SearchEnvironmentsQueryParams, environmentIds: Array<string>): Promise<Environments>;

    delete(environment: Environment): Promise<void>;

    update(environment: Environment): Promise<void>;
}

export default EnvironmentRepository;