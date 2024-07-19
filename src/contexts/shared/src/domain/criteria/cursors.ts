import Cursor from '@src/domain/criteria/cursor';
import { Nullable } from '@src/domain/nullable';

export default class Cursors {
    readonly prev: Nullable<Cursor>;

    readonly next: Nullable<Cursor>;

    constructor(prev: Nullable<Cursor>, next: Nullable<Cursor>) {
        this.prev = prev;
        this.next = next;
    }

    static createFromList<T>(items: T[], getCursor: (item: T, isBackward: boolean) => Nullable<Cursor>): Cursors {
        const hasCursors = items.length > 0,
            prev = hasCursors ? getCursor(items[0], true) : null,
            next = hasCursors ? getCursor(items[items.length - 1], false) : null;

        return new Cursors(prev, next);
    }
}
