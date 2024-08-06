import DomainEnvironmentFinder from '@src/domain/environmentFinder';
import FindEnvironmentResponse from '@src/application/find/findEnvironmentResponse';
import FindEnvironmentQuery from './findEnvironmentQuery';
import EnvironmentRepository from '@src/domain/environmentRepository';

export default class EnvironmentFinder {
    private readonly finder: DomainEnvironmentFinder;

    constructor(repository: EnvironmentRepository) {
        this.finder = new DomainEnvironmentFinder(repository);
    }

    async run(query: FindEnvironmentQuery): Promise<FindEnvironmentResponse> {
        return new FindEnvironmentResponse(await this.finder.find(query.id));
    }
}