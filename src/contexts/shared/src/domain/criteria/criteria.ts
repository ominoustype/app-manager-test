import { Nullable } from '@src/domain/nullable';
import Filters from '@src/domain/criteria/filters';
import Orders from '@src/domain/criteria/orders';
import Cursor from '@src/domain/criteria/cursor';
import FilterValue from '@src/domain/criteria/filterValue';

export default class Criteria {
    readonly filters: Filters;

    readonly orders: Orders;

    readonly cursor: Nullable<Cursor>;

    constructor(filters: Filters, orders: Orders, cursor: Nullable<Cursor>) {
        this.filters = filters;
        this.orders = orders;
        this.cursor = cursor;
    }

    hasFilters(): boolean {
        return this.filters.hasFilters();
    }

    getFilterValue(field: string): Nullable<FilterValue> {
        return this.filters.getFilterValue(field);
    }

    hasOrder(): boolean {
        return this.orders.hasOrder();
    }

    hasCursor(): boolean {
        return !!this.cursor;
    }

    equalsTo(other: Criteria): boolean {
        return (
            this.filters.equalsTo(other.filters)
            && this.orders.equalsTo(other.orders)
            && ((this.cursor && other.cursor && this.cursor.equalsTo(other.cursor)) || (!this.cursor && !other.cursor))
        );
    }
}
