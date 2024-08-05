import EnvironmentMother from "./environment.mother";
import Environment, { EnvironmentPrimitives } from "./environment";
import NewEnvironmentCreatedDomainEvent from "./newEnvironmentCreatedDomainEvent";

export default class NewEnvironmentCreatedDomainEventMother {
    static create(Environment: EnvironmentPrimitives): NewEnvironmentCreatedDomainEvent {
        return new NewEnvironmentCreatedDomainEvent(Environment);
    }

    static random(): NewEnvironmentCreatedDomainEvent {
        return NewEnvironmentCreatedDomainEventMother.create(
            EnvironmentMother.random().toPrimitives()
        );
    }

    static fromEnvironment(Environment: Environment) {
        return NewEnvironmentCreatedDomainEventMother.create(Environment.toPrimitives());
    }
}