import User from "./user";
import { Nullable } from '@context/shared/domain/nullable';
import Username from "./username";
import { SearchUsersQueryParams } from "@src/application/search/searchUsersQuery";
import Users from "./users";
import Token from "./session/token";


interface UserRepository {
    create(user: User): Promise<void>;

    findByUsername(username: Username): Promise<Nullable<User>>;

    findByRole(roleId: string): Promise<Nullable<User>>;

    login(user: User, token: Token): Promise<void>;

    delete(user: User): Promise<void>;

    update(user: User): Promise<void>;

    search(params: SearchUsersQueryParams): Promise<Users>;
}

export default UserRepository