import Enviroment, { EnviromentPrimitives } from "@src/domain/enviroment";

export default class EnviromentResponse{
    readonly primitives: EnviromentPrimitives;

    constructor(enviroment: Enviroment) {
        this.primitives = enviroment.toPrimitives();
    }
}