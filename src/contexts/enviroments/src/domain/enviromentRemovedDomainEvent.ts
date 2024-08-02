import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { EnviromentPrimitives } from "./enviroment";

type EnviromentRemovedDomainEventArgs = Readonly<EnviromentPrimitives & { eventId?: string; occurredOn?: Date }>

type EnviromentRemovedDomainEventBody = Readonly<Omit<EnviromentPrimitives, 'id'>>;

export default class EnviromentRemovedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.enviroment.removed';

    private readonly body: EnviromentRemovedDomainEventBody;

    constructor(args: EnviromentRemovedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(EnviromentRemovedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): EnviromentRemovedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: EnviromentRemovedDomainEventBody, eventId: string, occurredOn: Date) {
        return new EnviromentRemovedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}