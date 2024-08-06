import Environment, { EnvironmentPrimitives } from "@src/domain/environment";
import  FindEnvironmentResponse from "./findEnvironmentResponse";

export default class FindEnvironmentResponseMother{
    static create(document: EnvironmentPrimitives): FindEnvironmentResponse {
        return new FindEnvironmentResponse(new Environment(document));
    }
}