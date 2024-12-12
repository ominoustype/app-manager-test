import Datetime from '@context/shared/domain/datetime';
import AggregateRoot from "@context/shared/domain/aggregateRoot";
import EnvironmentId from "./environmentId";
import Uuid from "@context/shared/domain/uuid";
import NewEnvironmentCreatedDomainEvent from "./events/newEnvironmentCreatedDomainEvent";
import EnvironmentRemovedDomainEvent from "./events/environmentRemovedDomainEvent";
import { merge } from 'lodash';
import EnvironmentUpdatedDomainEvent from "./events/environmentUpdatedDomainEvent";
import Customer from "./customer/customer";
import EnvironmentName from "./environmentName";
import EnvironmentPath from "./environmentPath";
import { CustomerPrimitives } from "./customer/customer";
import Credentials, { CredentialsPrimitives } from "./credentials/credentials";
import PrevDeploys, { PrevDeploysPrimitives } from './prevDeploys/prevDeploys';

export type EnvironmentPrimitives = {
    id: string,
    name: string,
    createdAt: string,
    rules: Array<string>,
    customer: CustomerPrimitives,
    path: string,
    credentials: CredentialsPrimitives
    prevDeploys: PrevDeploysPrimitives;
};

export default class Environment extends AggregateRoot {
    readonly id: EnvironmentId;
    readonly name: EnvironmentName;
    readonly createdAt: Datetime;
    readonly rules: Array<string>;
    readonly customer: Customer;
    readonly path: EnvironmentPath;
    readonly credentials: Credentials;
    readonly prevDeploys: PrevDeploys;

    constructor(primitives: EnvironmentPrimitives) {
        super();
        this.id = new EnvironmentId(primitives.id);
        this.name = new EnvironmentName(primitives.name);
        this.createdAt = new Datetime(primitives.createdAt);;
        this.rules = (primitives.rules);
        this.customer = new Customer(primitives.customer);
        this.path = new EnvironmentPath(primitives.path);
        this.credentials = new Credentials(primitives.credentials);
        this.prevDeploys = new PrevDeploys(primitives.prevDeploys);
    }

    toPrimitives(): EnvironmentPrimitives {
        return {
            id: this.id.toString(),
            name: this.name.toString(),
            createdAt: this.createdAt.toString(),
            rules: this.rules,
            customer: this.customer.toPrimitives(),
            path: this.path.toString(),
            credentials: this.credentials.toPrimitives(),
            prevDeploys: this.prevDeploys.toPrimitives()
        }
    }

    static fromPrimitives(primitives: EnvironmentPrimitives): Environment {
        return new Environment(primitives);
    }

    equalsTo(other: Environment): boolean {
        return (
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) &&
            (!this.createdAt || !other.createdAt || (this.createdAt && other.createdAt && this.createdAt.equalsTo(other.createdAt))) &&
            (!this.rules || !other.rules || (this.rules && other.rules && JSON.stringify(this.rules) === JSON.stringify(other.rules))) &&
            (!this.customer || !other.customer || (this.customer && other.customer && JSON.stringify(this.customer) === JSON.stringify(other.customer))) &&
            (!this.path || !other.path || (this.path && other.path && this.path.equalsTo(other.path))) &&
            (!this.credentials || !other.credentials || (this.credentials && other.credentials && JSON.stringify(this.credentials) === JSON.stringify(other.credentials))) &&
            (!this.prevDeploys ||!other.prevDeploys || (this.prevDeploys && other.prevDeploys && JSON.stringify(this.prevDeploys) === JSON.stringify(other.prevDeploys)))
        ) as boolean
    }

    static create(primitives: Omit<EnvironmentPrimitives, 'id' | 'createdAt'>) {
        const newEnvironment = new Environment({
            id: Uuid.random().toString(),
            createdAt: new Datetime().toString(),
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

    deploy(primitives: Partial<EnvironmentPrimitives>, deploymentConfigsId: string): Environment {
        primitives.prevDeploys?.push({
            id: deploymentConfigsId,
            deployedAt: new Datetime().toString()
        });

        return this.update(primitives);
    }
}