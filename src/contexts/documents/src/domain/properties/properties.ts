import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import Property, { PropertyPrimitives } from "./property";

export type PropertiesPrimitives = Array<PropertyPrimitives> 

export default class Properties extends UniqueObjectsArray<Property,PropertyPrimitives> {
    constructor(updates: PropertiesPrimitives) {
        super(updates,Property);
    }
}
