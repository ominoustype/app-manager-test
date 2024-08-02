import EnviromentMother from "./enviroment.mother";
import Enviroment, { EnviromentPrimitives } from "./enviroment";
import NewEnviromentCreatedDomainEvent from "./newEnviromentCreatedDomainEvent";

export default class NewEnviromentCreatedDomainEventMother {
    static create(Enviroment: EnviromentPrimitives): NewEnviromentCreatedDomainEvent {
        return new NewEnviromentCreatedDomainEvent(Enviroment);
    }

    static random(): NewEnviromentCreatedDomainEvent {
        return NewEnviromentCreatedDomainEventMother.create(
            EnviromentMother.random().toPrimitives()
        );
    }

    static fromEnviroment(Enviroment: Enviroment) {
        return NewEnviromentCreatedDomainEventMother.create(Enviroment.toPrimitives());
    }
}