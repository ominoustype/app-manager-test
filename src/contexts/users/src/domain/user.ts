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

export type UserPrimitives = {
    id: string,
    createdAt: string,
    name: string,
    username: string,
    email: string,
    password?: string,
    customer: CustomerPrimitives,
    role: RolePrimitives,
    status: UserStatus
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

    constructor(primitives: UserPrimitives) {
        super();
        this.id = new Uuid(primitives.id);
        this.createdAt = new Datetime(primitives.createdAt);
        this.name = new Name(primitives.name);
        this.username = new Username(primitives.username);
        this.email = new Email(primitives.email);
        this.password = primitives.password ? new Password(primitives.password) : undefined;
        this.customer = new Customer(primitives.customer);
        //console.log("custom "+this.customer.id.value);
        this.role = new Role(primitives.role);
        this.status = primitives.status;
    }

    toPrimitives(): UserPrimitives {
        return {
            createdAt: this.createdAt.toString(),
            id: this.id.toString(),
            name: this.name.toString(),
            username: this.username.toString(),
            email: this.email.toString(),
            password: this.password?.value,
            customer: this.customer.toPrimitives(),
            role: this.role.toPrimitives(),
            status: this.status
        };
    }

    safeToPrimitives(): UserPrimitives {
        return {
            ...this.toPrimitives(),
            password: undefined
        };
    }

    static fromPrimitives(primitives: UserPrimitives): User {
        return new User(primitives);
    }

    static create(primitives: Omit<UserPrimitives, 'createdAt' | 'id' | 'status' >): User{
        const newUser = new User({
            createdAt: new Datetime().toString(),
            id: Uuid.random().toString(),
            status: UserStatus.ACTIVE,
            ...primitives
        });

        newUser.record(new NewUserCreatedDomainEvent(newUser.toPrimitives()));

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
        return merge(this.toPrimitives(), toMerge);
    }

    update(primitives: Partial<UserPrimitives>): User {
        const newUser = new User(this.merge(primitives));

        newUser.record(new UserUpdatedDomainEvent(newUser.toPrimitives()));

        return newUser;
    }

    delete() {
        this.record(new UserRemovedDomainEvent(this.toPrimitives()));
    }

    disable() {
        this.status = UserStatus.DISABLED;

        return this.safeToPrimitives();
    }
}
