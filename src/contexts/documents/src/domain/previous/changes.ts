import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import Change, { ChangePrimitives } from "./change";

export type ChangesPrimitives = Array<ChangePrimitives> 

export default class Changes extends UniqueObjectsArray<Change,ChangePrimitives> {
    constructor(updates: ChangesPrimitives) {
        super(updates,Change);
    }
}
