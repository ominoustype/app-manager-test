import User from '@src/domain/user';
import LogInUserQuery, { LogInUserQueryParams } from './loginUserQuery';
import UsernameMother from '@src/domain/username.mother';

export default class LoginUserQueryMother {
    static create(params: LogInUserQueryParams): LogInUserQuery {
        return new LogInUserQuery(params);
    }

    static random(): LogInUserQuery {
        return LoginUserQueryMother.create({
            username: UsernameMother.random().toString(),
            password: UsernameMother.random().toString()
        })
    }

    static fromUser(user: User) {
        return LoginUserQueryMother.create({
            username: user.username.value,
            password: user.password!.value
        });
    }
}
