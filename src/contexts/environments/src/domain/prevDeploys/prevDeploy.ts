import AggregateRoot from "@context/shared/domain/aggregateRoot";
import CustomerId from "./prevDeployId";
import PrevDeployId from "./prevDeployId";
import Datetime from "@context/shared/domain/datetime";

export type PrevDeployPrimitives = {
    id: string,
    deployedAt: string
}

export default class PrevDeploy extends AggregateRoot  {
    readonly id: PrevDeployId;
    readonly deployedAt: Datetime;

    constructor(primitives: PrevDeployPrimitives) {
        super();
        this.id = new CustomerId(primitives.id);
        this.deployedAt = new Datetime(primitives.deployedAt);
    }

    toPrimitives(): PrevDeployPrimitives {
        return {
            id: this.id.toString(),
            deployedAt: this.deployedAt.toString(),
        };
    }

    static fromPrimitives(primitives: PrevDeployPrimitives): PrevDeploy {
        return new PrevDeploy(primitives);
    }

    equalsTo(other: PrevDeploy): boolean {
        return ((!this.id) || (!other.id) || (this.id && other.id && this.id.equalsTo(other.id))) &&
        ((!this.deployedAt) || (!other.deployedAt) || (this.deployedAt && other.deployedAt && this.deployedAt.equalsTo(other.deployedAt)))
    }
}