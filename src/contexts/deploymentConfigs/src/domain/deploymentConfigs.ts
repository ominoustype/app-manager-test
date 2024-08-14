import AggregateRoot from "@context/shared/domain/aggregateRoot";
import DeploymentConfigsId from "./deploymentConfigsId";
import Uuid from "@context/shared/domain/uuid";
import DeploymentConfigsName from "./deploymentConfigsName";
import DeploymentConfigsRemovedDomainEvent from "./deploymentConfigsRemovedDomainEvent";
import NewDeploymentConfigsCreatedDomainEvent from "./newDeploymentConfigsCreatedDomainEvent";
import DeploymentConfigsUpdatedDomainEvent from "./deploymentConfigsUpdatedDomainEvent";
import { merge } from 'lodash';
import EnvironmentId from "./environmentId";
import CustomerId from "./customerId";
import DeploymentConfigsDeviceType from "./deploymentConfigsDeviceType";
import { DocumentPrimitives } from "./config/document";
import Documents from "./config/documents";

export type DeploymentConfigsPrimitives = {
    id: string,
    name: string,
    environmentId: string,
    customerId: string,
    deviceType: DeploymentConfigsDeviceType,
    documents: Array<DocumentPrimitives>
};

export default class DeploymentConfigs extends AggregateRoot {
    readonly id: DeploymentConfigsId;
    readonly name: DeploymentConfigsName;
    readonly environmentId: EnvironmentId;
    readonly customerId: CustomerId;
    readonly deviceType: DeploymentConfigsDeviceType;
    readonly documents: Documents;

    constructor(primitives: DeploymentConfigsPrimitives){
        super();
        this.id = new DeploymentConfigsId(primitives.id);
        this.name = new DeploymentConfigsName(primitives.name);
        this.environmentId = new EnvironmentId(primitives.environmentId);
        this.customerId = new CustomerId(primitives.customerId);
        this.deviceType = (primitives.deviceType);
        this.documents = new Documents(primitives.documents);
    }

    toPrimitives(): DeploymentConfigsPrimitives {
        return{
            id: this.id.toString(),
            name: this.name.toString(),
            environmentId: this.environmentId.toString(),
            customerId: this.customerId.toString(),
            deviceType: this.deviceType,
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
            (!this.environmentId || !other.environmentId || (this.environmentId && other.environmentId && this.environmentId.equalsTo(other.environmentId))) && 
            (!this.customerId || !other.customerId || (this.customerId && other.customerId && this.customerId.equalsTo(other.customerId))) && 
            (this.deviceType === (other.deviceType)) &&
            (!this.documents || !other.documents || (this.documents && other.documents && JSON.stringify(this.documents) === JSON.stringify(other.documents)))
        ) as boolean
    }

    static create(primitives: Omit<DeploymentConfigsPrimitives, 'id'>) {
        const newDeploymentConfigs = new DeploymentConfigs({
            id: Uuid.random().toString(),
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