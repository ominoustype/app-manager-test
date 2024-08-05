import EnvironmentRepository from "@src/domain/environmentRepository";
import SearchEnvironmentsQuery from "./searchEnvironmentsQuery";
import SearchEnvironmentsResponse from "./searchEnvironmentsResponse";

export default class EnvironmentsSearcher {
    private readonly repository: EnvironmentRepository;

    constructor(repository: EnvironmentRepository) {
        this.repository = repository;
    }

    async run(query: SearchEnvironmentsQuery): Promise<SearchEnvironmentsResponse> {
        return new SearchEnvironmentsResponse(await this.repository.search(query.params));
    }
}