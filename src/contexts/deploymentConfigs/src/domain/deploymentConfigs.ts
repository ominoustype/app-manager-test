import Datetime from '@context/shared/domain/datetime';
import AggregateRoot from "@context/shared/domain/aggregateRoot";
import DeploymentConfigsId from "./deploymentConfigsId";
import Uuid from "@context/shared/domain/uuid";
import DeploymentConfigsName from "./deploymentConfigsName";
import DeploymentConfigsRemovedDomainEvent from "./events/deploymentConfigsRemovedDomainEvent";
import NewDeploymentConfigsCreatedDomainEvent from "./events/newDeploymentConfigsCreatedDomainEvent";
import DeploymentConfigsUpdatedDomainEvent from "./events/deploymentConfigsUpdatedDomainEvent";
import { merge } from 'lodash';
import DeploymentConfigsDeviceType from "./deploymentConfigsDeviceType";
import Customer, { CustomerPrimitives } from "./customer/customer";
import Environment, { EnvironmentPrimitives } from "./environment/environment";
import { DocumentPrimitives } from './documents/document';
import Documents from './documents/documents';
import DeploymentConfigsPath from './deploymentConfigsPath';
import DeploymentConfigsDeployedDomainEvent from './events/deploymentConfigsDeployedDomainEvent';
import DeploymentConfigsPushedDomainEvent from './events/deploymentConfigsPushedDomainEvent';
import DocumentStatus from './documents/documentStatus';

export type DeploymentConfigsPrimitives = {
    id: string,
    name: string,
    createdAt: string,
    environment: EnvironmentPrimitives,
    customer: CustomerPrimitives,
    deviceType: DeploymentConfigsDeviceType,
    path: string,
    documents: Array<DocumentPrimitives>,
    isDeployed: boolean;
    deployedAt: string;
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
    readonly isDeployed: Boolean;
    readonly deployedAt: Datetime;

    constructor(primitives: DeploymentConfigsPrimitives) {
        super();
        this.id = new DeploymentConfigsId(primitives.id);
        this.name = new DeploymentConfigsName(primitives.name);
        this.createdAt = new Datetime(primitives.createdAt);
        this.environment = new Environment(primitives.environment);
        this.customer = new Customer(primitives.customer);
        this.deviceType = (primitives.deviceType);
        this.path = new DeploymentConfigsPath(primitives.path);
        this.documents = new Documents(primitives.documents);
        this.isDeployed = new Boolean(primitives.isDeployed);
        this.deployedAt = new Datetime(primitives.deployedAt);
    }

    toPrimitives(): DeploymentConfigsPrimitives {
        return{
            id: this.id.toString(),
            name: this.name.toString(),
            createdAt: this.createdAt.toString(),
            environment: this.environment.toPrimitives(),
            customer: this.customer.toPrimitives(),
            deviceType: this.deviceType,
            path: this.path.toString(),              
            documents: this.documents.toPrimitives(),
            isDeployed: this.isDeployed.valueOf(),
            deployedAt: this.deployedAt.toString(),
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
            (this.deviceType === (other.deviceType)) &&
            (this.isDeployed === (other.isDeployed)) &&
            (!this.deployedAt || !other.deployedAt || (this.deployedAt && other.deployedAt && this.deployedAt.equalsTo(other.deployedAt))) 
        ) as boolean
    }

    static create(primitives: Omit<DeploymentConfigsPrimitives, 'id' | 'createdAt' | 'name' | 'deviceType' | 'path' |
        'isDeployed' | 'deployedAt' >) {
        const newDeploymentConfigs = new DeploymentConfigs({
            id: Uuid.random().toString(),
            createdAt: new Datetime().toString(),
            name: "???",
            deviceType: DeploymentConfigsDeviceType.ANDROID,
            path: "not saved yet",
            isDeployed: false,
            deployedAt: new Datetime().toString(),
            ...primitives,
        });
        
        newDeploymentConfigs.record(new NewDeploymentConfigsCreatedDomainEvent(newDeploymentConfigs.toPrimitives()));

        return newDeploymentConfigs;
    }
    
    delete() {
        this.record(new DeploymentConfigsRemovedDomainEvent(this.toPrimitives()));
    }

    merge(toMerge: Partial<DeploymentConfigsPrimitives>): DeploymentConfigsPrimitives {
        return merge(this.toPrimitives(), toMerge);
    }

    update(primitives: Partial<DeploymentConfigsPrimitives>): DeploymentConfigs {
        const newDeploymentsConfig = new DeploymentConfigs({
            ...this.toPrimitives(),
            ...primitives
        });

        newDeploymentsConfig.record(new DeploymentConfigsUpdatedDomainEvent(newDeploymentsConfig.toPrimitives()));

        return newDeploymentsConfig;
    }

    pushDocument(documentsReady: DocumentPrimitives): DeploymentConfigs {
        const primitives = this.toPrimitives();

        /* Add a document to the array of documents READY to be deployed */
        const newDeploymentConfigs = new DeploymentConfigs({
            ...primitives,
            documents: primitives.documents.concat(documentsReady)
        });
        
        newDeploymentConfigs.record(new DeploymentConfigsPushedDomainEvent(newDeploymentConfigs.toPrimitives()));

        return newDeploymentConfigs;
    }

    undoPushedDocument(documentId: string): DeploymentConfigs | null {
        const primitives = this.toPrimitives();

        /* Find the requested document within the documents[] array */
        let index = -1;
        for(const doc of primitives.documents) {
            if(doc.id === documentId) {
                index = primitives.documents.indexOf(doc);
                break;
            }
        }

        /* Remove the document (un-pushed it) */
        if (index > -1) { 
            primitives.documents.splice(index, 1);
        }
        else return null;

        return new DeploymentConfigs(primitives);
    }

    deploy(path: string): DeploymentConfigs {
        const primitives = this.toPrimitives();

        /* Change documents status to DEPLOYED */
        const documents = primitives.documents.map((document) => {
            document.status = DocumentStatus.DEPLOYED;
            return document;
        });

        const newDeploymentConfigs = new DeploymentConfigs({
            ...primitives,
            path: path,
            documents: documents,
            isDeployed: true,
            deployedAt: new Datetime().toString()
        });

        newDeploymentConfigs.record(new DeploymentConfigsDeployedDomainEvent(newDeploymentConfigs.toPrimitives()));

        return newDeploymentConfigs;
    }
}