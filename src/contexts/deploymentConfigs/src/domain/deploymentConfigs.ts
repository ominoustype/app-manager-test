import AggregateRoot from "@context/shared/domain/aggregateRoot";
import DeploymentConfigsId from "./deploymentConfigsId";
import Uuid from "@context/shared/domain/uuid";
import DeploymentConfigsName from "./deploymentConfigsName";
import DeploymentConfigsRemovedDomainEvent from "./deploymentConfigsRemovedDomainEvent";
import NewDeploymentConfigsCreatedDomainEvent from "./newDeploymentConfigsCreatedDomainEvent";
import DeploymentConfigsUpdatedDomainEvent from "./deploymentConfigsUpdatedDomainEvent";
import { merge } from 'lodash';

export type DeploymentConfigsPrimitives = {
    id: string,
    name: string,
    enviromentId: string;
    customerId: string,
    deviceType: string; //enum
};

export default class DeploymentConfigs extends AggregateRoot {
    readonly id: DeploymentConfigsId;
    readonly name: DeploymentConfigsName;
    readonly enviromentId: Uuid;
    readonly customerId: Uuid;
    readonly deviceType: string;

    constructor(primitives: DeploymentConfigsPrimitives){
        super();
        this.id = new DeploymentConfigsId(primitives.id);
        this.name = new DeploymentConfigsName(primitives.name);
        this.enviromentId = new Uuid(primitives.enviromentId);
        this.customerId = new Uuid(primitives.customerId);
        this.deviceType = (primitives.deviceType);
    }

    toPrimitives(): DeploymentConfigsPrimitives {
        return{
            id: this.id.toString(),
            name: this.name.toString(),
            enviromentId: this.enviromentId.toString(),
            customerId: this.customerId.toString(),
            deviceType: this.deviceType.toString()
        };
    }

    static fromPrimitives(primitives: DeploymentConfigsPrimitives) : DeploymentConfigs{
        return new DeploymentConfigs(primitives);
    }

    equalsTo(other: DeploymentConfigs): boolean {
        return (
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) &&
            (!this.enviromentId || !other.enviromentId || (this.enviromentId && other.enviromentId && this.enviromentId.equalsTo(other.enviromentId))) &&
            (!this.customerId || !other.customerId || (this.customerId && other.customerId && this.customerId.equalsTo(other.customerId))) &&
            (this.deviceType === (other.deviceType))
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
        const newDocument = new DeploymentConfigs(this.merge(primitives));

        newDocument.record(new DeploymentConfigsUpdatedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }
}