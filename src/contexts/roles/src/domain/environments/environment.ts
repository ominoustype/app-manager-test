import AggregateRoot from "@context/shared/domain/aggregateRoot";
import EnvironmentId from "./environmentId";

export type  EnvironmentPrimitives = {
    id: string
}

export default class Environment extends AggregateRoot{
    readonly id: EnvironmentId;

    constructor(primitives: EnvironmentPrimitives){
        super();
        this.id = new EnvironmentId(primitives.id);
    }

    toPrimitives(): EnvironmentPrimitives {
        return{
            id: this.id.toString()
        }
    }

    static fromPrimitives(primitives: EnvironmentPrimitives): Environment {
        return new Environment(primitives);
    }

    equalsTo(other: Environment): boolean {
        return ((!this.id) || (!other.id) || (this.id && other.id && this.id.equalsTo(other.id)))
    }
}