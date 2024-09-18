import Uuid from '@context/shared/domain/uuid';
import AggregateRoot from '@context/shared/domain/aggregateRoot';
import Datetime from '@context/shared/domain/datetime';
import Customer, { CustomerPrimitives } from './customer/customer';
import Role, { RolePrimitives } from './role/role';
import Name from './name';
import Username from './username';
import Password from './password/password';
import { merge } from 'lodash';
import NewUserCreatedDomainEvent from './domainEvents/newUserCreatedDomainEvent';
import UserUpdatedDomainEvent from './domainEvents/userUpdatedDomainEvent';
import UserRemovedDomainEvent from './domainEvents/userRemovedDomainEvent';
import Email from './email';
import UserStatus from './userStatus';
import Token, { TokenPrimitives } from './session/token';

export type UserPrimitives = {
    id: string,
    createdAt: string,
    name: string,
    username: string,
    email: string,
    password?: string,
    customer: CustomerPrimitives,
    role: RolePrimitives,
    status: UserStatus,
    session?: TokenPrimitives
};

export default class User extends AggregateRoot {
    readonly id: Uuid;
    readonly createdAt: Datetime;
    readonly name: Name;
    readonly username: Username;
    readonly email: Email;
    readonly password?: Password;
    readonly customer: Customer;
    readonly role: Role;
    status: UserStatus;
    session?: Token;

    constructor(primitives: UserPrimitives) {
        super();
        this.id = new Uuid(primitives.id);
        this.createdAt = new Datetime(primitives.createdAt);
        this.name = new Name(primitives.name);
        this.username = new Username(primitives.username);
        this.email = new Email(primitives.email);
        this.password = primitives.password ? new Password(primitives.password) : undefined;
        this.customer = new Customer(primitives.customer);
        this.role = new Role(primitives.role);
        this.status = primitives.status;
        this.session = primitives.session ? new Token(primitives.session) : undefined;
    }

    toPrimitives(): Omit<UserPrimitives, 'password'> {
        return {
            createdAt: this.createdAt.toString(),
            id: this.id.toString(),
            name: this.name.toString(),
            username: this.username.toString(),
            email: this.email.toString(),
            customer: this.customer.toPrimitives(),
            role: this.role.toPrimitives(),
            status: this.status,
            session: this.session?.toPrimitives()
        };
    }

    fullToPrimitives(): UserPrimitives {
        return {
            ...this.toPrimitives(),
            password: this.password?.value
        };
    }

    static fromPrimitives(primitives: UserPrimitives): User {
        return new User(primitives);
    }

    getLoginResponse(): Partial<UserPrimitives> {
        return {
            id: this.id.toString(),
            name: this.name.toString(),
            email: this.email.toString(),
            username: this.username.toString(),
            role: this.role.toPrimitives()
        };
    }

    static create(primitives: Omit<UserPrimitives, 'createdAt' | 'id'>) {
        const newUser = new User({
            createdAt: new Datetime().toString(),
            id: Uuid.random().toString(),
            ...primitives
        });

        newUser.record(new NewUserCreatedDomainEvent(newUser.fullToPrimitives()));

        return newUser;
    }

    equalsTo(other: User): boolean {
        return ((!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.createdAt || !other.createdAt || (this.createdAt && other.createdAt && this.createdAt.equalsTo(other.createdAt))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) &&
            (!this.username || !other.username || (this.username && other.username && this.username.equalsTo(other.username))) &&
            (!this.email || !other.email || (this.email && other.email && this.email.equalsTo(other.email))) &&
            (!this.password || !other.password || (this.password && other.password && this.password.equalsTo(other.password))) &&
            (!this.customer || !other.customer || (this.customer && other.customer && this.customer.equalsTo(other.customer))) &&
            (!this.role || !other.role || (this.role && other.role && this.role.equalsTo(other.role))) &&
            (this.status === other.status)
        ) as boolean
    }

    merge(toMerge: Partial<UserPrimitives>): UserPrimitives {
        return merge(this.fullToPrimitives(), toMerge);
    }

    update(primitives: Partial<UserPrimitives>): User {
        const newUser = new User(this.merge(primitives));

        newUser.record(new UserUpdatedDomainEvent(newUser.fullToPrimitives()));

        return newUser;
    }

    delete() {
        this.record(new UserRemovedDomainEvent(this.fullToPrimitives()));
    }

    disable() {
        this.status = UserStatus.DISABLED;

        return this.toPrimitives();
    }
}
