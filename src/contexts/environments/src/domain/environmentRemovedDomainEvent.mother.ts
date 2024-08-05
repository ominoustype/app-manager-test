import Environment, { EnvironmentPrimitives } from "./environment";
import EnvironmentMother from "./environment.mother";
import EnvironmentRemovedDomainEvent from "./environmentRemovedDomainEvent";

export default class EnvironmentRemovedDomainEventMother {
    static create(Environment: EnvironmentPrimitives) {
        return new EnvironmentRemovedDomainEvent(Environment);
    }

    static random() {
        return EnvironmentRemovedDomainEventMother.create(
            EnvironmentMother.random().toPrimitives()
        )
    }

    static fromEnvironment(Environment: Environment) {
        return EnvironmentRemovedDomainEventMother.create(Environment.toPrimitives());
    }
}
