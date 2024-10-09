import AggregateRoot from "@context/shared/domain/aggregateRoot";
import CustomerId from "./prevDeployId";
import PrevDeployId from "./prevDeployId";
import PrevDeployCreatedAt from "./prevDeployCreatedAt";

export type PrevDeployPrimitives = {
    id: string,
    createdAt: string
}

export default class PrevDeploy extends AggregateRoot  {
    readonly id: PrevDeployId;
    readonly createdAt: PrevDeployCreatedAt;

    constructor(primitives: PrevDeployPrimitives) {
        super();
        this.id = new CustomerId(primitives.id);
        this.createdAt = new PrevDeployCreatedAt(primitives.createdAt);
    }

    toPrimitives(): PrevDeployPrimitives {
        return {
            id: this.id.toString(),
            createdAt: this.createdAt.toString(),
        };
    }

    static fromPrimitives(primitives: PrevDeployPrimitives): PrevDeploy {
        return new PrevDeploy(primitives);
    }

    equalsTo(other: PrevDeploy): boolean {
        return ((!this.id) || (!other.id) || (this.id && other.id && this.id.equalsTo(other.id))) &&
        ((!this.createdAt) || (!other.createdAt) || (this.createdAt && other.createdAt && this.createdAt.equalsTo(other.createdAt)))
    }
}