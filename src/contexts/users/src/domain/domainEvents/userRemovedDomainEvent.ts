import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { UserPrimitives } from "../user";

type UserRemovedDomainEventArgs = Readonly<UserPrimitives & { eventId?: string; occurredOn?: Date }>

type UserRemovedDomainEventBody = Readonly<Omit<UserPrimitives, 'id'>>;

export default class UserRemovedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.user.removed';

    private readonly body: UserRemovedDomainEventBody;

    constructor(args: UserRemovedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(UserRemovedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): UserRemovedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: UserRemovedDomainEventBody, eventId: string, occurredOn: Date) {
        return new UserRemovedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}