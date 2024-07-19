// eslint-disable-next-line no-shadow,import/prefer-default-export
export enum OrderType {
    None = 'none',
    Asc = 'asc',
    Desc = 'desc',
}

export function orderTypeFromValue(value: string): OrderType {
    switch (value) {
    case 'asc':
        return OrderType.Asc;
    case 'desc':
        return OrderType.Desc;
    default:
        return OrderType.None;
    }
}
