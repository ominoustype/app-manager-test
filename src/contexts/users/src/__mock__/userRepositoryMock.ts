
import UserRepository from "@src/domain/userRepository";
import User from "@src/domain/user";
import { omit } from 'lodash';
import Username from "@src/domain/username";
import { SearchUsersQueryParams } from "@src/application/search/searchUsersQuery";
import Users from "@src/domain/users";
import Token from "@src/domain/session/token";
import { Nullable } from "@context/shared/domain/nullable";

export default class UserRepositoryMock implements UserRepository {
    private mockCreate = jest.fn();
    private mockFindByUsername = jest.fn();
    private mockFindByRoleId = jest.fn();
    private mockLogin = jest.fn();
    private mockGetSession = jest.fn();
    private mockDeleteSession = jest.fn();
    private mockDelete = jest.fn();
    private mockUpdate = jest.fn();
    private mockSearch = jest.fn();
 
    create(user: User): Promise<void> {
        return this.mockCreate(user);
    }

    assertCreateHasBeenCalledWith(user: User, exclusions: Array<string>) {
        const { mock } = this.mockCreate,
            lastUserCreated = mock.calls[mock.calls.length - 1][0],
            lastUserCreatedPrimitives = omit(
                lastUserCreated.toPrimitives(),
                exclusions ?? []
            ),
            expectedBody = omit(user.toPrimitives(), exclusions ?? []);

        expect(lastUserCreatedPrimitives).toStrictEqual(expectedBody);
    }

    async findByUsername(username: Username): Promise<Nullable<User>> {
        return this.mockFindByUsername(username);
    }

    async findByRole(roleId: string): Promise<Nullable<User>> {
        return this.mockFindByRoleId(roleId);
    }
    
    async whenFindByUsernameThenReturn(user: Nullable<User>): Promise<void> {
        this.mockFindByUsername.mockReturnValue(Promise.resolve(user));
    }

    async assertFindByUsernameHasBeenCalledWith(username: Username): Promise<void> {
        expect(this.mockFindByUsername).toHaveBeenCalledWith(username);
    }

    login(user: User, token: Token) {
        return this.mockLogin(user, token);
    }

    ensureLoginCalledWith(user: User, token: Token) {
        expect(this.mockLogin).toHaveBeenCalledWith(user, token);
    }

    ensureLoginIsNotCalled() {
        expect(this.mockLogin).not.toHaveBeenCalled();
    }

    getSession(username: Username) {
        return this.mockGetSession(username);
    }

    whenGetSessionThenReturn(session: Token) {
        this.mockGetSession.mockReturnValue(session);
    }

    ensureGetSessionCalledWith(username: Username) {
        expect(this.mockGetSession).toHaveBeenCalledWith(username);
    }

    ensureGetSessionIsNotCalled() {
        expect(this.mockGetSession).not.toHaveBeenCalled();
    }

    deleteSession(username: Username) {
        return this.mockDeleteSession(username);
    }

    ensureDeleteSessionCalledWith(username: Username) {
        expect(this.mockDeleteSession).toHaveBeenCalledWith(username);
    }

    delete(user: User): Promise<void> {
        return this.mockDelete(user);
    }

    async assertDeleteHasBeenCalledWith(user: User): Promise<void> {
        expect(this.mockDelete).toHaveBeenCalledWith(user);
    }

    update(user: User): Promise<void> {
        return this.mockUpdate(user);
    }

    async assertUpdateHasBeenCalledWith(user: User): Promise<void> {
        expect(this.mockUpdate).toHaveBeenCalledWith(user);
    }

    search(params: SearchUsersQueryParams): Promise<Users> {
        return this.mockSearch(params);
    }

    async whenSearchThenReturn(users: Users): Promise<void> {
        this.mockSearch.mockReturnValue(users);
    }

    async assertSearchHasBeenCalledWith(params: SearchUsersQueryParams): Promise<void> {
        expect(this.mockSearch).toHaveBeenCalledWith(params);
    }
}