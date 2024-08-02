import Enviroment, { EnviromentPrimitives } from "./enviroment";
import EnviromentMother from "./enviroment.mother";
import EnviromentUpdatedDomainEvent from "./enviromentUpdatedDomainEvent";

export default class EnviromentUpdatedDomainEventMother {
    static create(Enviroment: EnviromentPrimitives) {
        return new EnviromentUpdatedDomainEvent(Enviroment);
    }

    static random() {
        return EnviromentUpdatedDomainEventMother.create(
            EnviromentMother.random().toPrimitives()
        )
    }

    static fromEnviroment(Enviroment: Enviroment) {
        return EnviromentUpdatedDomainEventMother.create(Enviroment.toPrimitives());
    }
}