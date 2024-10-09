import AggregateRoot from "@context/shared/domain/aggregateRoot";
import Password from "./password";
import Username from "./username";

export type CredentialsPrimitives = {
    username: string;
    password: string;
}

export default class Credentials extends AggregateRoot {
    readonly username: Username;
    readonly password: Password;

    constructor(primitives: CredentialsPrimitives) {
        super();
        this.username = new Username(primitives.username);
        this.password = new Password(primitives.password);
    }

    toPrimitives(): CredentialsPrimitives {
        return {
            username: this.username.toString(),
            password: this.password.toString()
        }
    }

    static fromPrimitives(primitives: CredentialsPrimitives): Credentials {
        return new Credentials(primitives);
    }

    equalsTo(other: Credentials): boolean {
        return ((!this.username) || (!other.username) || (this.username && other.username && this.username.equalsTo(other.username))) &&
        ((!this.password) || (!other.password) || (this.password && other.password && this.password.equalsTo(other.password)))
    }
}
