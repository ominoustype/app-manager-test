import Environment, { EnvironmentPrimitives } from "@src/domain/environment";

export default class EnvironmentResponse{
    readonly primitives: EnvironmentPrimitives;

    constructor(environment: Environment) {
        this.primitives = environment.toPrimitives();
    }
}