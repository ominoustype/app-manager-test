import AggregateRoot from "@context/shared/domain/aggregateRoot";
import EnvironmentId from "./environmentId";
import Uuid from "@context/shared/domain/uuid";
import NewEnvironmentCreatedDomainEvent from "./newEnvironmentCreatedDomainEvent";
import EnvironmentRemovedDomainEvent from "./environmentRemovedDomainEvent";
import { merge } from 'lodash';
import EnvironmentUpdatedDomainEvent from "./environmentUpdatedDomainEvent";

export type EnvironmentPrimitives = {
    id: string,
    name: string,
    rules: string,
    customerId: string,
    path: string
};

export default class Environment extends AggregateRoot {
    readonly id: EnvironmentId;
    readonly name: string;
    readonly rules: string;
    readonly customerId: string;
    readonly path: string;

    constructor(primitives: EnvironmentPrimitives) {
        super();
        this.id = new EnvironmentId(primitives.id);
        this.name = (primitives.name);
        this.rules = (primitives.rules);
        this.customerId = (primitives.customerId);
        this.path = (primitives.path);
    }

    toPrimitives(): EnvironmentPrimitives {
        return {
            id: this.id.toString(),
            name: this.name.toString(),
            rules: this.rules.toString(),
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
            (!this.name || !other.name || (this.name && other.name && this.name === other.name)) &&
            (!this.rules || !other.rules || (this.rules && other.rules && this.rules === other.rules)) &&
            (!this.customerId || !other.customerId || (this.customerId && other.customerId && this.customerId === other.customerId)) &&
            (!this.path || !other.path || (this.path && other.path && this.path === other.path)) 
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