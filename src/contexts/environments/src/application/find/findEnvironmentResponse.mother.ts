import Environment, { EnvironmentPrimitives } from "@src/domain/environment";
import  FindEnvironmentResponse from "./findEnvironmentResponse";

export default class FindEnvironmentResponseMother{
    static create(environment: EnvironmentPrimitives): FindEnvironmentResponse {
        return new FindEnvironmentResponse(new Environment(environment));
    }
}