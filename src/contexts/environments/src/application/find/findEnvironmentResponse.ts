import Environment, { EnvironmentPrimitives } from "@src/domain/environment";

export default class FindEnvironmentResponse{
    readonly primitives: EnvironmentPrimitives;

    constructor(environment: Environment) {
        this.primitives = environment.toPrimitives();
    }
}