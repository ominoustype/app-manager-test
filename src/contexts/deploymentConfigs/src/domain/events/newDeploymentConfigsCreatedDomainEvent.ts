import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DeploymentConfigsPrimitives } from "../deploymentConfigs";

type NewDeploymentConfigsCreatedDomainEventArgs = Readonly<DeploymentConfigsPrimitives & { eventId?: string; occurredOn?: Date }>
type NewDeploymentConfigsCreatedDomainEventBody = Readonly<Omit<DeploymentConfigsPrimitives, 'id'>>;

export default class NewDeploymentConfigsCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.deploymentConfigs.created';

    private readonly body: NewDeploymentConfigsCreatedDomainEventBody;

    constructor(args: NewDeploymentConfigsCreatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(NewDeploymentConfigsCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): NewDeploymentConfigsCreatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: NewDeploymentConfigsCreatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new NewDeploymentConfigsCreatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}