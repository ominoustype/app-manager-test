import OrderBy from '@src/domain/criteria/orderBy';
import { OrderType, orderTypeFromValue } from '@src/domain/criteria/orderType';

export type OrderParams = {
    orderBy: string;
    orderType: string;
};

export default class Order {
    readonly by: OrderBy;

    readonly type: OrderType;

    constructor(by: OrderBy, type: OrderType) {
        this.by = by;
        this.type = type;
    }

    static fromValues({ orderBy, orderType }: OrderParams): Order {
        return new Order(new OrderBy(orderBy), orderTypeFromValue(orderType));
    }

    static asc(orderBy: string): Order {
        return new Order(new OrderBy(orderBy), OrderType.Asc);
    }

    static desc(orderBy: string): Order {
        return new Order(new OrderBy(orderBy), OrderType.Desc);
    }

    hasOrder(): boolean {
        return this.type !== OrderType.None;
    }

    equalsTo(other: Order): boolean {
        return this.by.equalsTo(other.by) && this.type === other.type;
    }
}
