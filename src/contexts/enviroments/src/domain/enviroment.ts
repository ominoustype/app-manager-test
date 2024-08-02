import AggregateRoot from "@context/shared/domain/aggregateRoot";
import EnviromentId from "./enviromentId";
import Uuid from "@context/shared/domain/uuid";
import NewEnviromentCreatedDomainEvent from "./newEnviromentCreatedDomainEvent";
import EnviromentRemovedDomainEvent from "./enviromentRemovedDomainEvent";
import { merge } from 'lodash';
import EnviromentUpdatedDomainEvent from "./enviromentUpdatedDomainEvent";

export type EnviromentPrimitives = {
    id: string,
    name: string,
    rules: string,
    customerId: string,
    path: string
};

export default class Enviroment extends AggregateRoot {
    readonly id: EnviromentId;
    readonly name: string;
    readonly rules: string;
    readonly customerId: string;
    readonly path: string;

    constructor(primitives: EnviromentPrimitives) {
        super();
        this.id = new EnviromentId(primitives.id);
        this.name = (primitives.name);
        this.rules = (primitives.rules);
        this.customerId = (primitives.customerId);
        this.path = (primitives.path);
    }

    toPrimitives(): EnviromentPrimitives {
        return {
            id: this.id.toString(),
            name: this.name.toString(),
            rules: this.rules.toString(),
            customerId: this.customerId.toString(),
            path: this.path.toString()
        }
    }

    static fromPrimitives(primitives: EnviromentPrimitives): Enviroment {
        return new Enviroment(primitives);
    }

    equalsTo(other: Enviroment): boolean {
        return ((!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) 
        ) as boolean
    }

    static create(primitives: Omit<EnviromentPrimitives, 'id'>) {
        const newEnviroment = new Enviroment({
            id: Uuid.random().toString(),
            ...primitives
        });

        newEnviroment.record(new NewEnviromentCreatedDomainEvent(newEnviroment.toPrimitives()));

        return newEnviroment;
    }

    delete(){
        this.record(new EnviromentRemovedDomainEvent(this.toPrimitives()));
    }

    merge(toMerge: Partial<EnviromentPrimitives>): EnviromentPrimitives{
        return merge(this.toPrimitives(), toMerge);
    }

    update(primitives: Partial<EnviromentPrimitives>): Enviroment{
        const newEnviroment = new Enviroment(this.merge(primitives));

        newEnviroment.record(new EnviromentUpdatedDomainEvent(newEnviroment.toPrimitives()));
        
        return newEnviroment;
    }
}