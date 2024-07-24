import { createHash } from 'crypto';

export default abstract class UniqueObjectsArray<T extends { toPrimitives(): P }, P> {
    private readonly list: Map<string, T>; 
    readonly Ctor: new (p: P) => T;

    protected constructor(primitives: Array<P>, Ctor: new (p: P) => T) {
        this.Ctor = Ctor;

        this.list = primitives.reduce((map, p) => {
            const item = new this.Ctor(p);
            const hash = UniqueObjectsArray.hash(item);

            if (!map.has(hash)) {
                map.set(hash, item);
            }

            return map;
        }, new Map());
    }

    get length(): number {
        return this.list.size;
    }

    private static hash(item: { toPrimitives(): any }): string {
        const str = JSON.stringify(item.toPrimitives());

        return createHash('md5').update(str).digest('hex');
    }

    find(callbackFn: (element: T, index?: number, array?: T[]) => boolean): (T | undefined) {
        return this.toPrimitives()
            .map((p) => new this.Ctor(p))
            .find(callbackFn);
    }

    findIndex(callbackFn: (element: T, index?: number, array?: T[]) => boolean): number {
        return this.toPrimitives()
            .map((p) => new this.Ctor(p))
            .findIndex(callbackFn);
    }

    filter(callbackFn: (element: T, index?: number, array?: T[]) => boolean): Array<T> {
        return Array.from(this.list.values()).filter(callbackFn);
    }

    forEach(callbackFn: (element: T, index: number, array: T[]) => void): void {
        Array.from(this.list.values()).forEach(callbackFn);
    }

    map<R>(callbackFn: (element: T, index: number, array: T[]) => R): Array<R> {
        return Array.from(this.list.values()).map(callbackFn);
    }

    reduce<R>(callbackFn: (currentValue: R, element: T, index?: number, array?: T[]) => R, initialValue: R): R {
        return Array.from(this.list.values()).reduce(callbackFn, initialValue);
    }

    equalsTo(other: UniqueObjectsArray<T, P>): boolean {
        if (other.constructor.name !== this.constructor.name || this.list.size !== other.list.size) {
            return false;
        }
    
        return Array.from(this.list.values()).reduce(
			    (areEqual, item) =>
			        areEqual && other.list.has(UniqueObjectsArray.hash(item)),
			    true
			);
    }

    toPrimitives(): Array<P> {
        return Array.from(this.list.values()).map((i: any) => i.toPrimitives());
    }
}