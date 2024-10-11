import Property from "./property";
import PropertyMother from "./property.mother";
import Properties, { PropertiesPrimitives } from "./properties";

export default class PropertiesMother {
    static create(properties: PropertiesPrimitives): Properties {
        return new Properties(properties);
    }

    static empty(): Properties {
        return PropertiesMother.create([]);
    }

    static random(): Properties {
        return PropertiesMother.create(
            PropertyMother.randomList().map((d: Property) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): Properties {
        return PropertiesMother.create(
            PropertyMother.randomListWithSize(size).map((d: Property) => d.toPrimitives())
        );
    }
}
