import AggregateRoot from "@context/shared/domain/aggregateRoot";
import EnvironmentId from "./environmentId";
import EnvironmentName from "./environmentName";

export type  EnvironmentPrimitives = {
    id: string,
    name: string
}

export default class Environment extends AggregateRoot{
    readonly id: EnvironmentId;
    readonly name: EnvironmentName;

    constructor(primitives: EnvironmentPrimitives){
        super();
        this.id = new EnvironmentId(primitives.id);
        this.name = new EnvironmentName(primitives.name);
    }

    toPrimitives(): EnvironmentPrimitives {
        return{
            id: this.id.toString(),
            name: this.name.toString()
        }
    }

    static fromPrimitives(primitives: EnvironmentPrimitives): Environment {
        return new Environment(primitives);
    }

    equalsTo(other: Environment): boolean {
        return ((!this.id) || (!other.id) || (this.id && other.id && this.id.equalsTo(other.id))) &&
        ((!this.name) || (!other.name) || (this.name && other.name && this.name.equalsTo(other.name)))
    }
}