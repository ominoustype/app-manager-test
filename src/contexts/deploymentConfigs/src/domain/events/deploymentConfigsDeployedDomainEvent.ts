import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DeploymentConfigsPrimitives } from "../deploymentConfigs";

type DeploymentConfigsDeployedDomainEventArgs = Readonly<DeploymentConfigsPrimitives 
                                                & { eventId?: string; occurredOn?: Date }>
type DeploymentConfigsDeployedDomainEventBody = Readonly<Omit<DeploymentConfigsPrimitives, 'id'>>;

export default class DeploymentConfigsDeployedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.deploymentConfigs.deployed';

    private readonly body: DeploymentConfigsDeployedDomainEventBody;

    constructor(args: DeploymentConfigsDeployedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(DeploymentConfigsDeployedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): DeploymentConfigsDeployedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: DeploymentConfigsDeployedDomainEventBody, eventId: string, occurredOn: Date) {
        return new DeploymentConfigsDeployedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        });
    }
}