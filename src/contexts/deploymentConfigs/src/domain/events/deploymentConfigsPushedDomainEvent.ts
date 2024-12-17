import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DeploymentConfigsPrimitives } from "../deploymentConfigs";

type DeploymentConfigsPushedDomainEventArgs = Readonly<DeploymentConfigsPrimitives 
                                                & { eventId?: string; occurredOn?: Date }>
type DeploymentConfigsPushedDomainEventBody = Readonly<Omit<DeploymentConfigsPrimitives, 'id'>>;

export default class DeploymentConfigsPushedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.deploymentConfigs.pushed';

    private readonly body: DeploymentConfigsPushedDomainEventBody;

    constructor(args: DeploymentConfigsPushedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(DeploymentConfigsPushedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): DeploymentConfigsPushedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: DeploymentConfigsPushedDomainEventBody, eventId: string, occurredOn: Date) {
        return new DeploymentConfigsPushedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        });
    }
}