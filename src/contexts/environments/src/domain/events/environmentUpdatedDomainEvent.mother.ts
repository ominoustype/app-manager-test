import Environment, { EnvironmentPrimitives } from "../environment";
import EnvironmentMother from "../environment.mother";
import EnvironmentUpdatedDomainEvent from "./environmentUpdatedDomainEvent";

export default class EnvironmentUpdatedDomainEventMother {
    static create(Environment: EnvironmentPrimitives) {
        return new EnvironmentUpdatedDomainEvent(Environment);
    }

    static random() {
        return EnvironmentUpdatedDomainEventMother.create(
            EnvironmentMother.random().toPrimitives()
        )
    }

    static fromEnvironment(Environment: Environment) {
        return EnvironmentUpdatedDomainEventMother.create(Environment.toPrimitives());
    }
}