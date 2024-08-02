import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import Enviroment, { EnviromentPrimitives } from "./enviroment";

export type EnviromentsPrimitives = Array<EnviromentPrimitives>;

export default class Enviroments extends UniqueObjectsArray<Enviroment, EnviromentPrimitives>{
    constructor(enviroments: EnviromentsPrimitives){
        super(enviroments, Enviroment);
    }
}