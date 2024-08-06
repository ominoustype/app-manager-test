import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DeploymentConfigsPrimitives } from "./deploymentConfigs";

type DeploymentConfigsRemovedDomainEventArgs =
                Readonly<DeploymentConfigsPrimitives & { eventId? : string; occurredOn? : Date}>;
type DeploymentConfigsRemovedDomainEventBody =
                Readonly<Omit<DeploymentConfigsPrimitives, 'id'>>;

export default class DeploymentConfigsRemovedDomainEvent extends DomainEvent{
    static readonly EVENT_NAME: string = 'appmanager.1.event.deploymentConfigs.removed';

    private readonly body: DeploymentConfigsRemovedDomainEventBody;

    constructor(args: DeploymentConfigsRemovedDomainEventArgs){
        const { eventId, occurredOn, id, ...body } = args;

        super(DeploymentConfigsRemovedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
        this.body = body;
    }

    toPrimitives(): unknown {
        return this.body;
    }

    static fromPrimitives(id: string, body: DeploymentConfigsRemovedDomainEventBody, eventId: string, occurredOn: Date) {
        return new DeploymentConfigsRemovedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}