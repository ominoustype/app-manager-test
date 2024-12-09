import SearchUsersQuery from '@src/application/search/searchUsersQuery';
import SearchUsersResponse from '@src/application/search/searchUsersResponse';
import UserRepository from '@src/domain/userRepository';

export default class UsersSearcher {
    private readonly repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async run(query: SearchUsersQuery): Promise<SearchUsersResponse> {
        return new SearchUsersResponse(await this.repository.search(query.params));
    }
}
