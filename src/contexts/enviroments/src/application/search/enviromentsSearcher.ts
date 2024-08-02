import EnviromentRepository from "@src/domain/enviromentRepository";
import SearchEnviromentsQuery from "./searchEnviromentsQuery";
import SearchEnviromentsResponse from "./searchEnviromentsResponse";

export default class EnviromentsSearcher {
    private readonly repository: EnviromentRepository;

    constructor(repository: EnviromentRepository) {
        this.repository = repository;
    }

    async run(query: SearchEnviromentsQuery): Promise<SearchEnviromentsResponse> {
        return new SearchEnviromentsResponse(await this.repository.search(query.params));
    }
}