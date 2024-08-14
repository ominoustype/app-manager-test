import AggregateRoot from "@context/shared/domain/aggregateRoot";
import EnvironmentId from "./environmentId";
import Uuid from "@context/shared/domain/uuid";
import NewEnvironmentCreatedDomainEvent from "./newEnvironmentCreatedDomainEvent";
import EnvironmentRemovedDomainEvent from "./environmentRemovedDomainEvent";
import { merge } from 'lodash';
import EnvironmentUpdatedDomainEvent from "./environmentUpdatedDomainEvent";
import CustomerId from "./customerId";
import EnvironmentName from "./environmentName";
import EnvironmentPath from "./environmentPath";

export type EnvironmentPrimitives = {
    id: string,
    name: string,
    rules: Array<string>,
    customerId: string,
    path: string
};

export default class Environment extends AggregateRoot {
    readonly id: EnvironmentId;
    readonly name: EnvironmentName;
    readonly rules: Array<string>;
    readonly customerId: CustomerId;
    readonly path: EnvironmentPath;

    constructor(primitives: EnvironmentPrimitives) {
        super();
        this.id = new EnvironmentId(primitives.id);
        this.name = new EnvironmentName(primitives.name);
        this.rules = (primitives.rules);
        this.customerId = new CustomerId(primitives.customerId);
        this.path = new EnvironmentPath(primitives.path);
    }

    toPrimitives(): EnvironmentPrimitives {
        return {
            id: this.id.toString(),
            name: this.name.toString(),
            rules: this.rules,
            customerId: this.customerId.toString(),
            path: this.path.toString()
        }
    }

    static fromPrimitives(primitives: EnvironmentPrimitives): Environment {
        return new Environment(primitives);
    }

    equalsTo(other: Environment): boolean {
        return (
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) &&
            (!this.rules || !other.rules || (this.rules && other.rules && JSON.stringify(this.rules) === JSON.stringify(other.rules))) &&
            (!this.customerId || !other.customerId || (this.customerId && other.customerId &&
                 this.customerId.equalsTo(other.customerId))) &&
            (!this.path || !other.path || (this.path && other.path && this.path.equalsTo(other.path))) 
        ) as boolean
    }

    static create(primitives: Omit<EnvironmentPrimitives, 'id'>) {
        const newEnvironment = new Environment({
            id: Uuid.random().toString(),
            ...primitives
        });

        newEnvironment.record(new NewEnvironmentCreatedDomainEvent(newEnvironment.toPrimitives()));

        return newEnvironment;
    }

    delete(){
        this.record(new EnvironmentRemovedDomainEvent(this.toPrimitives()));
    }

    merge(toMerge: Partial<EnvironmentPrimitives>): EnvironmentPrimitives{
        return merge(this.toPrimitives(), toMerge);
    }

    update(primitives: Partial<EnvironmentPrimitives>): Environment{
        const newEnvironment = new Environment(this.merge(primitives));

        newEnvironment.record(new EnvironmentUpdatedDomainEvent(newEnvironment.toPrimitives()));
        
        return newEnvironment;
    }
}