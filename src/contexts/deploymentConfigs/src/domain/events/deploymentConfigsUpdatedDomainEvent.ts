import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DeploymentConfigsPrimitives } from "../deploymentConfigs";

type DeploymentConfigsUpdatedDomainEventArgs = Readonly<DeploymentConfigsPrimitives 
                                                & { eventId?: string; occurredOn?: Date }>
type DeploymentConfigsUpdatedDomainEventBody = Readonly<Omit<DeploymentConfigsPrimitives, 'id'>>;

export default class DeploymentConfigsUpdatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.deploymentConfigs.updated';

    private readonly body: DeploymentConfigsUpdatedDomainEventBody;

    constructor(args: DeploymentConfigsUpdatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(DeploymentConfigsUpdatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): DeploymentConfigsUpdatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: DeploymentConfigsUpdatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new DeploymentConfigsUpdatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        });
    }
}