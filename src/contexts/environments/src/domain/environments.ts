import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import Environment, { EnvironmentPrimitives } from "./environment";

export type EnvironmentsPrimitives = Array<EnvironmentPrimitives>;

export default class Environments extends UniqueObjectsArray<Environment, EnvironmentPrimitives>{
    constructor(environments: EnvironmentsPrimitives){
        super(environments, Environment);
    }
}