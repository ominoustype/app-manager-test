import Environment, { EnvironmentPrimitives } from "@src/domain/environment";
import  FindEnvironmentResponse from "./findEnvironmentResponse";
import EnvironmentMother from "@src/domain/environment.mother";

export default class FindEnvironmentResponseMother{
    static create(environment: EnvironmentPrimitives): FindEnvironmentResponse {
        return new FindEnvironmentResponse(new Environment(environment));
    }

    static random(overwrite?: Partial<EnvironmentPrimitives>) {
        return FindEnvironmentResponseMother.create(
            EnvironmentMother.random(overwrite).toPrimitives()
        );
    }
}