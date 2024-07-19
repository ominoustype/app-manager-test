/* eslint-disable no-underscore-dangle */
import Order, { OrderParams } from '@src/domain/criteria/order';
import OrderBy from '@src/domain/criteria/orderBy';

export default class Orders {
    private readonly _orders: Order[];

    get orders(): Order[] {
        return this._orders.map((o) => Order.fromValues({ orderBy: o.by.value, orderType: o.type })).filter((o) => o.hasOrder());
    }

    constructor(orders: Order[]) {
        this._orders = orders;
    }

    static fromValues(values: OrderParams[]): Orders {
        return new Orders(values.map((value) => Order.fromValues(value)));
    }

    static none(): Orders {
        return new Orders([]);
    }

    hasOrder(): boolean {
        const { orders } = this;

        return orders.length > 0 && orders.reduce((_hasOrder: boolean, order) => _hasOrder || order.hasOrder(), false);
    }

    hasOrderBy(field: OrderBy): boolean {
        const order = this.orders.find(({ by }) => by.equalsTo(field));

        return !!order;
    }

    mutateBys(mapping: { [key: string]: string }): Orders {
        return new Orders(
            this.orders.map((o) => {
                if (mapping[o.by.value]) {
                    return Order.fromValues({
                        orderBy: mapping[o.by.value],
                        orderType: o.type
                    });
                }

                return o;
            })
        );
    }

    equalsTo(other: Orders): boolean {
        const isThisOnOther = this._orders.reduce(
                (areIncluded, item) => areIncluded && !!other._orders.find((i) => i.equalsTo(item)),
                true
            ),
            isOtherOnThis = other._orders.reduce((areIncluded, item) => areIncluded && !!this._orders.find((i) => i.equalsTo(item)), true);

        return isThisOnOther && isOtherOnThis;
    }
}
