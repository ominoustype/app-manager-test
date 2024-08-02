import { Nullable } from "@context/shared/domain/nullable";
import Enviroment from "./enviroment";
import EnviromentId from "./enviromentId";
import { SearchEnviromentsQueryParams } from "@src/application/search/searchEnviromentsQuery";
import Enviroments from "./enviroments";

interface EnviromentRepository {
    create(enviroment: Enviroment): Promise<void>;

    find(id: EnviromentId): Promise<Nullable<Enviroment>>;

    search(params: SearchEnviromentsQueryParams): Promise<Enviroments>;

    delete(enviroment: Enviroment): Promise<void>;

    update(enviroment: Enviroment): Promise<void>;
}

export default EnviromentRepository;