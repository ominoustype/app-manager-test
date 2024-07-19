/* eslint-disable no-underscore-dangle */
import Filter, { FilterParams } from '@src/domain/criteria/filter';
import { Nullable } from '@src/domain/nullable';
import FilterValue from '@src/domain/criteria/filterValue';

// eslint-disable-next-line no-shadow
export enum FilterType {
    AND = 'and',
    OR = 'or',
}

export default class Filters {
    private readonly _filters: Filter[];

    private readonly mode: FilterType;

    get filters(): Filter[] {
        return this._filters.map((f) => Filter.fromValues({
            field: f.field.value,
            operator: f.operator,
            value: f.value.value
        }));
    }

    constructor(filters: Filter[], mode?: FilterType) {
        this._filters = filters;
        this.mode = mode || FilterType.AND;
    }

    static fromValues(values: FilterParams[], mode?: FilterType): Filters {
        return new Filters(
            values.map((v) => Filter.fromValues(v)),
            mode
        );
    }

    static none(): Filters {
        return new Filters([]);
    }

    clone(options?: { remove?: string[] }): Filters {
        return new Filters(
            this.filters.filter((f) => !options?.remove?.includes(f.field.value)),
            this.mode
        );
    }

    addFilter(filter: Filter): void {
        this._filters.push(filter);
    }

    hasFilters(): boolean {
        return this.filters.length > 0;
    }

    by(field: string): boolean {
        return !!this.filters.find((f) => f.field.value === field);
    }

    getFilterValue(field: string): Nullable<FilterValue> {
        return this.filters.find((f) => f.field.value === field)?.value || null;
    }

    // eslint-disable-next-line class-methods-use-this
    isAllOfCondition(): boolean {
        return this.mode === FilterType.AND;
    }

    mutateFields(mapping: { [key: string]: string | string[] | ((filter: Filter) => string)}): Filters {
        return new Filters(
            this.filters
                .map((f) => {
                    if (mapping[f.field.value]) {
                        if (Array.isArray(mapping[f.field.value])) {
                            return (mapping[f.field.value] as string[]).map((value) => Filter.create(value, f.operator, f.value.value));
                        }

                        if (typeof mapping[f.field.value] === 'function') {
                            return Filter.create((mapping[f.field.value] as (filter: Filter) => string)(f), f.operator, f.value.value);
                        }

                        return Filter.create(mapping[f.field.value] as string, f.operator, f.value.value);
                    }

                    return f;
                })
                .flat(),
            this.mode
        );
    }

    equalsTo(other: Filters): boolean {
        const isThisOnOther = this._filters.reduce(
                (areIncluded, item) => areIncluded && !!other._filters.find((i) => i.equalsTo(item)),
                true
            ),
            isOtherOnThis = other._filters.reduce(
                (areIncluded, item) => areIncluded && !!this._filters.find((i) => i.equalsTo(item)),
                true
            );

        return isThisOnOther && isOtherOnThis;
    }
}
