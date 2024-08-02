import InvalidArgumentError from '@src/domain/invalidArgument';

// eslint-disable-next-line no-shadow,import/prefer-default-export
export enum FilterOperator {
    Equal = '=',
    NotEqual = '!=',
    GreaterThan = '>',
    LowerThan = '<',
    Contains = 'contains',
    NotContains = 'not_contains',
}

export function filterOperatorFromValue(value: string): FilterOperator {
    switch (value) {
    case '=':
        return FilterOperator.Equal;
    case '!=':
        return FilterOperator.NotEqual;
    case '>':
        return FilterOperator.GreaterThan;
    case '<':
        return FilterOperator.LowerThan;
    case 'contains':
        return FilterOperator.Contains;
    case 'not_contains':
        return FilterOperator.NotContains;
    default:
        throw new InvalidArgumentError(
            `<filterOperatorFromValue> can't find a FilterOperator for <${value}>`
        );
    }
}
