import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import Previous, { PreviousPrimitives } from "./previous";

export type PreviousesPrimitives = Array<PreviousPrimitives> 

export default class Previouses extends UniqueObjectsArray<Previous,PreviousPrimitives> {
    constructor(previouses: PreviousesPrimitives) {
        super(previouses, Previous);
    }
}
