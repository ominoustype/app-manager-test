import Enviroment, { EnviromentPrimitives } from "@src/domain/enviroment";
import  FindEnviromentResponse from "./findEnviromentResponse";

export default class FindEnviromentResponseMother{
    static create(document: EnviromentPrimitives): FindEnviromentResponse {
        return new FindEnviromentResponse(new Enviroment(document));
    }
}