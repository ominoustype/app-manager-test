import { Response } from '@context/shared/domain/queryBus/response';
import User, { UserPrimitives } from '@src/domain/user';

export default class FindUserResponse implements Response {
    readonly primitives: Omit<UserPrimitives, 'password'>;

    constructor(user: User) {
        this.primitives = user.safeToPrimitives();
    }
}
