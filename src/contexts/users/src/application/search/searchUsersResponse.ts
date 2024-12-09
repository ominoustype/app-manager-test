import { Response } from '@context/shared/domain/queryBus/response';
import Users, { UsersPrimitives } from '@src/domain/users';

export default class SearchUsersResponse implements Response {
    readonly primitives: UsersPrimitives;

    constructor(users: Users) {
        this.primitives = users.toPrimitives();
    }
}
