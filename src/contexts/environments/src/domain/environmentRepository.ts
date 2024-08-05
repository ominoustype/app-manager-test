import { Nullable } from "@context/shared/domain/nullable";
import Environment from "./environment";
import EnvironmentId from "./environmentId";
import { SearchEnvironmentsQueryParams } from "@src/application/search/searchEnvironmentsQuery";
import Environments from "./environments";

interface EnvironmentRepository {
    create(Environment: Environment): Promise<void>;

    find(id: EnvironmentId): Promise<Nullable<Environment>>;

    search(params: SearchEnvironmentsQueryParams): Promise<Environments>;

    delete(Environment: Environment): Promise<void>;

    update(Environment: Environment): Promise<void>;
}

export default EnvironmentRepository;