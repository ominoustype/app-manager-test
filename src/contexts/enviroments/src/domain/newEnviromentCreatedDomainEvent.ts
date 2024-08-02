import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { EnviromentPrimitives } from "./enviroment";

type NewEnviromentCreatedDomainEventArgs = Readonly<EnviromentPrimitives & { eventId?: string; occurredOn?: Date }>

type NewEnviromentCreatedDomainEventBody = Readonly<Omit<EnviromentPrimitives, 'id'>>;

export default class NewEnviromentCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.Enviroment.created';

    private readonly body: NewEnviromentCreatedDomainEventBody;

    constructor(args: NewEnviromentCreatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(NewEnviromentCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): NewEnviromentCreatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: NewEnviromentCreatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new NewEnviromentCreatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}