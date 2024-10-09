import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import PrevDeploy, { PrevDeployPrimitives } from "./prevDeploy";

export type PrevDeploysPrimitives = Array<PrevDeployPrimitives> 

export default class PrevDeploys extends UniqueObjectsArray<PrevDeploy,PrevDeployPrimitives> {
    constructor(prevDeploy: PrevDeploysPrimitives) {
        super(prevDeploy, PrevDeploy);
    }
}