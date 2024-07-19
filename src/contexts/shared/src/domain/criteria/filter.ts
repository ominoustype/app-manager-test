import FilterField from '@src/domain/criteria/filterField';
import { FilterOperator, filterOperatorFromValue } from '@src/domain/criteria/filterOperator';
import FilterValue from '@src/domain/criteria/filterValue';

export type FilterParams = {
    field: string;
    operator: string;
    value: string;
};

export default class Filter {
    readonly field: FilterField;

    readonly operator: FilterOperator;

    readonly value: FilterValue;

    constructor(field: FilterField, operator: FilterOperator, value: FilterValue) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }

    static create(field: string, operator: string, value: string): Filter {
        return new Filter(new FilterField(field), filterOperatorFromValue(operator), new FilterValue(value));
    }

    static fromValues({ field, operator, value }: FilterParams): Filter {
        return Filter.create(field, operator, value);
    }

    isPositive(): boolean {
        return this.operator !== FilterOperator.NotEqual && this.operator !== FilterOperator.NotContains;
    }

    isConcrete(): boolean {
        return this.operator !== FilterOperator.Contains && this.operator !== FilterOperator.NotContains;
    }

    equalsTo(other: Filter): boolean {
        return this.field.equalsTo(other.field) && this.operator === other.operator && this.value.equalsTo(other.value);
    }
}
