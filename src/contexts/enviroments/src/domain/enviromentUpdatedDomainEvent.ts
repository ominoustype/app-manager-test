import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { EnviromentPrimitives } from "./enviroment";

type EnviromentUpdatedDomainEventArgs = Readonly<EnviromentPrimitives & { eventId?: string; occurredOn?: Date }>

type EnviromentUpdatedDomainEventBody = Readonly<Omit<EnviromentPrimitives, 'id'>>;

export default class EnviromentUpdatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.enviroment.updated';

    private readonly body: EnviromentUpdatedDomainEventBody;

    constructor(args: EnviromentUpdatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(EnviromentUpdatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): EnviromentUpdatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: EnviromentUpdatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new EnviromentUpdatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}