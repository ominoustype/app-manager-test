import Enviroment, { EnviromentPrimitives } from "./enviroment";
import EnviromentMother from "./enviroment.mother";
import EnviromentRemovedDomainEvent from "./enviromentRemovedDomainEvent";

export default class EnviromentRemovedDomainEventMother {
    static create(Enviroment: EnviromentPrimitives) {
        return new EnviromentRemovedDomainEvent(Enviroment);
    }

    static random() {
        return EnviromentRemovedDomainEventMother.create(
            EnviromentMother.random().toPrimitives()
        )
    }

    static fromEnviroment(Enviroment: Enviroment) {
        return EnviromentRemovedDomainEventMother.create(Enviroment.toPrimitives());
    }
}
