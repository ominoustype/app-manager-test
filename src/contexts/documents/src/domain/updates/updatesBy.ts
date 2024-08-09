import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import UpdateBy, { UpdateByPrimitives } from "./updateBy";

export type UpdatesByPrimitives = Array<UpdateByPrimitives> 

export default class UpdatesBy extends UniqueObjectsArray<UpdateBy,UpdateByPrimitives> {
    constructor(updates: UpdatesByPrimitives) {
        super(updates,UpdateBy);
    }
}
