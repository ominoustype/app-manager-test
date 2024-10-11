import Datetime from '@context/shared/domain/datetime';
import AggregateRoot from "@context/shared/domain/aggregateRoot";
import DeploymentConfigsId from "./deploymentConfigsId";
import Uuid from "@context/shared/domain/uuid";
import DeploymentConfigsName from "./deploymentConfigsName";
import DeploymentConfigsRemovedDomainEvent from "./deploymentConfigsRemovedDomainEvent";
import NewDeploymentConfigsCreatedDomainEvent from "./newDeploymentConfigsCreatedDomainEvent";
import DeploymentConfigsUpdatedDomainEvent from "./deploymentConfigsUpdatedDomainEvent";
import { merge } from 'lodash';
import DeploymentConfigsDeviceType from "./deploymentConfigsDeviceType";
import Customer, { CustomerPrimitives } from "./customer/customer";
import Environment, { EnvironmentPrimitives } from "./environment/environment";
import { DocumentPrimitives } from './documents/document';
import Documents from './documents/documents';
import DeploymentConfigsPath from './deploymentConfigsPath';

export type DeploymentConfigsPrimitives = {
    id: string,
    name: string,
    createdAt: string,
    environment: EnvironmentPrimitives,
    customer: CustomerPrimitives,
    deviceType: DeploymentConfigsDeviceType,
    path: string,
    documents: Array<DocumentPrimitives>
};

export default class DeploymentConfigs extends AggregateRoot {
    readonly id: DeploymentConfigsId;
    readonly name: DeploymentConfigsName;
    readonly createdAt: Datetime;
    readonly environment: Environment;
    readonly customer: Customer;
    readonly deviceType: DeploymentConfigsDeviceType;
    readonly path: DeploymentConfigsPath;
    readonly documents: Documents;

    constructor(primitives: DeploymentConfigsPrimitives){
        super();
        this.id = new DeploymentConfigsId(primitives.id);
        this.name = new DeploymentConfigsName(primitives.name);
        this.createdAt = new Datetime(primitives.createdAt);
        this.environment = new Environment(primitives.environment);
        this.customer = new Customer(primitives.customer);
        this.deviceType = (primitives.deviceType);
        this.path = new DeploymentConfigsPath(primitives.path);  // path is not a primitive, so it's not included in the constructor. It's added separately.  // consider using UUID for path instead of string.  // consider using a Map or Set for documents to improve efficiency.  // consider adding a method to add documents.  // consider adding a method to remove documents.  // consider adding a method to update documents.  // consider adding a method to search for documents
        this.documents = new Documents(primitives.documents);
    }

    toPrimitives(): DeploymentConfigsPrimitives {
        return{
            id: this.id.toString(),
            name: this.name.toString(),
            createdAt: this.createdAt.toString(),
            environment: this.environment.toPrimitives(),
            customer: this.customer.toPrimitives(),
            deviceType: this.deviceType,
            path: this.path.toString(),  // path is not a primitive, so it's not included in the toPrimitives() method. It's added separately.  // consider using UUID for path instead of string.  // consider adding a method to add documents.  // consider adding a method to remove documents.  // consider adding a method to update documents.  // consider adding a method to search for documents.  // consider using a Map or Set for documents to improve efficiency.
            documents: this.documents.toPrimitives()
        };
    }

    static fromPrimitives(primitives: DeploymentConfigsPrimitives) : DeploymentConfigs{
        return new DeploymentConfigs(primitives);
    }

    equalsTo(other: DeploymentConfigs): boolean {
        return (
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) && 
            (!this.createdAt || !other.createdAt || (this.createdAt && other.createdAt && this.createdAt.equalsTo(other.createdAt))) &&
            (!this.environment || !other.environment || (this.environment && other.environment && this.environment.equalsTo(other.environment))) && 
            (!this.customer || !other.customer || (this.customer && other.customer && this.customer.equalsTo(other.customer))) &&
            (!this.path || !other.path || (this.path && other.path && this.path.equalsTo(other.path))) && 
            (!this.documents || !other.documents || (this.documents && other.documents && JSON.stringify(this.documents) === JSON.stringify(other.documents))) &&
            (this.deviceType === (other.deviceType))
        ) as boolean
    }

    static create(primitives: Omit<DeploymentConfigsPrimitives, 'id' | 'createdAt'>) {
        const newDeploymentConfigs = new DeploymentConfigs({
            id: Uuid.random().toString(),
            createdAt: new Datetime().toString(),
            ...primitives
        });

        newDeploymentConfigs.record(new NewDeploymentConfigsCreatedDomainEvent(newDeploymentConfigs.toPrimitives()));

        return newDeploymentConfigs;
    }
    
    delete(){
        this.record(new DeploymentConfigsRemovedDomainEvent(this.toPrimitives()));
    }

    merge(toMerge: Partial<DeploymentConfigsPrimitives>): DeploymentConfigsPrimitives {
        return merge(this.toPrimitives(), toMerge);
    }

    update(primitives: Partial<DeploymentConfigsPrimitives>): DeploymentConfigs {
        const newDeploymentsConfig = new DeploymentConfigs(this.merge(primitives));

        newDeploymentsConfig.record(new DeploymentConfigsUpdatedDomainEvent(newDeploymentsConfig.toPrimitives()));

        return newDeploymentsConfig;
    }
}