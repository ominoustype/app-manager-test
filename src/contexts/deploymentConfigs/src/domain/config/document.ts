import AggregateRoot from "@context/shared/domain/aggregateRoot";
import Path from "./path";
import Version from "./version";

export type DocumentPrimitives = {
    version: string,
    path: string
};

export default class Document extends AggregateRoot{
    readonly version: Version;
    readonly path: Path;

    constructor(primitives: DocumentPrimitives){
        super();
        this.version = new Version(primitives.version);
        this.path = new Path(primitives.path);
    }

    toPrimitives(): DocumentPrimitives {
        return{
            version: this.version.toString(),
            path: this.path.toString()
        };
    }

    static fromPrimitives(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
    }

    equalsTo(other: Document): boolean {
        return (!this.version || !other.version || (this.version && other.version && this.version.equalsTo(other.version))) &&
        (!this.path || !other.path || (this.path && other.path && this.path.equalsTo(other.path)))
    }
}