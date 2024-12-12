import Environment, { EnvironmentPrimitives } from "@src/domain/environment";
import { Response } from '@context/shared/domain/queryBus/response';
export default class FindEnvironmentResponse implements Response{
    readonly primitives: EnvironmentPrimitives;

    constructor(environment: Environment) {
        this.primitives = environment.toPrimitives();
    }
}