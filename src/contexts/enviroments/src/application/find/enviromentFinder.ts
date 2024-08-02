import DomainEnviromentFinder from '@src/domain/enviromentFinder';
import FindEnviromentResponse from '@src/application/find/findEnviromentResponse';
import FindEnviromentQuery from './findEnviromentQuery';
import EnviromentRepository from '@src/domain/enviromentRepository';

export default class EnviromentFinder {
    private readonly finder: DomainEnviromentFinder;

    constructor(repository: EnviromentRepository) {
        this.finder = new DomainEnviromentFinder(repository);
    }

    async run(query: FindEnviromentQuery): Promise<FindEnviromentResponse> {
        return new FindEnviromentResponse(await this.finder.find(query.id));
    }
}