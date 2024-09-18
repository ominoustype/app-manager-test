import Criteria from '@context/shared/domain/criteria/criteria';
import Cursor from '@context/shared/domain/criteria/cursor';
import Filter from '@context/shared/domain/criteria/filter';
import { FilterOperator } from '@context/shared/domain/criteria/filterOperator';
import Filters, { FilterType } from '@context/shared/domain/criteria/filters';
import Orders from '@context/shared/domain/criteria/orders';
import { Nullable } from '@context/shared/domain/nullable';
import MongoRepository from '@context/shared/infrastructure/mongo/mongoRepository';
import { SearchUsersQueryParams } from '@src/application/search/searchUsersQuery';
import Token from '@src/domain/session/token';
import User from '@src/domain/user';
import Username from '@src/domain/username';
import UserRepository from '@src/domain/userRepository';
import Users from '@src/domain/users';
import UserStatus from '@src/domain/userStatus';

const TO_SEARCH_PARAMS_DICT = Object.freeze({
    search: ['_id','username','name']
});

const DEFAULT_PAGE_SIZE = 50;

export default class UserMongoRepository extends MongoRepository<User> implements UserRepository {
    protected moduleName(): string {
        return 'users';
    }

    protected getCursor(item: User, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            _id: item.id.toString(), 
            isBackward 
        });
    }

    async create(user: User): Promise<void> {
        await this.persist(user.id.value, user)
    }

    async update(user: User): Promise<void> {
        await this.persist(user.id.value, user)
    }

    async delete(user: User): Promise<void> {
        await this.remove(user.id.value);
    }

    async logicalDelete(user: User): Promise<void> {
        const primitives = user;
        primitives.status = UserStatus.DELETED;

        await this.persist(user.id.value, user);
    }

    // async find(id: UserId): Promise<Nullable<User>> {
    //     return this.byId(id.value, User.fromPrimitives);
    // }

    async findByUsername(username: Username): Promise<Nullable<User>> {
        const result = await this.byField(
            'username',
            username.value,
            User.fromPrimitives
        );

        return result.length ? result[0] : null;
    }

    async search(params: SearchUsersQueryParams = {}): Promise<Users> {
        const copyParams = { ...params };
        const limit = params.page_size ?? DEFAULT_PAGE_SIZE;
        const skip =
            params.page && limit
                ? params.page * limit
                : undefined;

        delete copyParams.page;
        delete copyParams.page_size;

        let find = {};

        const order = copyParams.order === 'true' ? 1 : -1;

        delete copyParams.order;

        if (copyParams.search) {
            const orFilters = new Filters(
                TO_SEARCH_PARAMS_DICT.search.map((field) =>
                    Filter.fromValues({
                        field,
                        operator: FilterOperator.Contains,
                        value: copyParams.search!
                    })
                ),
                FilterType.OR
            );

            const orConversions = super.convertCriteria(
                new Criteria(orFilters, Orders.none(), null)
            );

            find = { ...find, ...orConversions.find };

            delete copyParams.search;
        }

        const collection = await this.collection();

        const users = order ? collection.find(find, { limit, skip }).sort('createdAt', order) : collection.find(find, { limit, skip });
        const items = (await users.toArray()).map((user) => 
            this.getParsedUser(user)
        );

        // const count = collection.countDocuments(find);

        return new Users(
            items.length <= 0 ? [] : items.map((i) => i.toPrimitives())
        );
    }

    getParsedUser(user: any): User {
        return User.fromPrimitives({
            ...user,
            // eslint-disable-next-line no-underscore-dangle
            id: user._id
        });
    }

    login(user: User, token: Token) {
        return this.rawPersist(user.id.value, {
            ...user.toPrimitives(),
            session: token
        });
    }

    async getSession(username: Username): Promise<Nullable<Token>> {
        const user = await this.findByUsername(username);

        return user?.session ?? null;
    }

    async deleteSession(username: Username): Promise<void> {
        const user = await this.findByUsername(username);

        if (!user) {
            return;
        }

        return this.rawPersist(user.id.value, {
            ...user.toPrimitives(),
            session: null
        });
    }
}