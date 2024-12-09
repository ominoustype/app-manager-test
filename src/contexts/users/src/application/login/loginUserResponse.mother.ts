import LogInUserResponse from './loginUserResponse';

export default class LoginUserResponseMother {
    static create(token: any, username: string) {
        return new LogInUserResponse(
            token, username
        );
    }

    static fromUser(token: any, username: string) {
        return LoginUserResponseMother.create(token, username);
    }
}