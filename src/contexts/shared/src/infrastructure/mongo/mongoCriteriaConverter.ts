import Criteria from '@src/domain/criteria/criteria';
import Cursor from '@src/domain/criteria/cursor';
import Filter from '@src/domain/criteria/filter';
import { FilterOperator } from '@src/domain/criteria/filterOperator';
import Filters from '@src/domain/criteria/filters';
import Order from '@src/domain/criteria/order';
import OrderBy from '@src/domain/criteria/orderBy';
import Orders from '@src/domain/criteria/orders';
import { OrderType } from '@src/domain/criteria/orderType';
import InvalidArgumentError from '@src/domain/invalidArgument';
import { Nullable } from '@src/domain/nullable';

export type MongoQueryParams = {
    find: Record<string, any>;
    sort: Nullable<Record<string, any>>;
};

export type MongoCursor = {
    _id: string;
    isBackward: boolean;
};

export default class MongoCriteriaConverter {
    // eslint-disable-next-line class-methods-use-this
    convert(criteria: Criteria): MongoQueryParams {
        let find: Record<string, any> = {},
            sort: Nullable<Record<string, any>> = null;

        if (criteria.hasOrder()) {
            sort = MongoCriteriaConverter.convertOrder(criteria.orders);
        }

        if (criteria.hasFilters()) {
            Object.assign(find, MongoCriteriaConverter.convertFilters(criteria.filters));
        }

        if (criteria.hasCursor()) {
            find = MongoCriteriaConverter.extendFindWithCursorFind(find, MongoCriteriaConverter.convertCursor(criteria.cursor!, sort));
        }

        return { find, sort };
    }

    private static convertOrder(order: Orders): any {
        const sort: Record<string, any> = order.orders.reduce((acc, o) => Object.assign(acc, MongoCriteriaConverter.sortByOrder(o)), {});

        if (!order.hasOrderBy(new OrderBy('_id'))) {
            // eslint-disable-next-line no-underscore-dangle
            sort._id = 1; // ensure we disambiguate by _id in case sorting fields aren't unique
        }

        return sort;
    }

    private static sortByOrder({ by, type }: Order): any {
        return { [by.value]: type === OrderType.Asc ? 1 : -1 };
    }

    private static convertFilters(filters: Filters): any {
        if (filters.isAllOfCondition()) {
            return filters.filters.reduce(
                (query, filter) => MongoCriteriaConverter.merge(query, MongoCriteriaConverter.queryForFilter(filter)),
                {}
            );
        }

        return { $or: filters.filters.map((filter) => MongoCriteriaConverter.queryForFilter(filter)) };
    }

    private static merge(target: Record<string, any>, other: Record<string, any>): Record<string, any> {
        const otherWithOverwrites = { ...other };

        Object.entries(other).forEach(([key, value]) => {
            if (target[key]) {
                const base = target[key].$all ? target[key].$all : [target[key]];

                otherWithOverwrites[key] = { $all: base.concat([value]) };
            }
        });

        return Object.assign(target, otherWithOverwrites);
    }

    private static queryForFilter(filter: Filter): any {
        switch (filter.operator) {
        case FilterOperator.Equal:
            return MongoCriteriaConverter.equalQuery(filter);

        case FilterOperator.NotEqual:
            return MongoCriteriaConverter.notEqualQuery(filter);

        case FilterOperator.GreaterThan:
        case FilterOperator.LowerThan:
            return MongoCriteriaConverter.rangeQuery(filter);

        case FilterOperator.Contains:
        case FilterOperator.NotContains:
            return MongoCriteriaConverter.regexQuery(filter);
        default:
            throw new InvalidArgumentError(`<MongoCriteriaConverter> doesn't allow the operator <${filter.operator}>`);
        }
    }

    private static equalQuery({ field, value }: Filter): any {
        try {
            const obj = JSON.parse(value.value);

            return { [field.value]: obj };
        } catch (e) {
            return { [field.value]: value.value };
        }
    }

    private static notEqualQuery({ field, value }: Filter): any {
        return { [field.value]: { $ne: value.value } };
    }

    private static rangeQuery({ field, operator, value }: Filter): any {
        const operation = operator === FilterOperator.GreaterThan ? { $gt: value.value } : { $lt: value.value };

        return { [field.value]: operation };
    }

    private static regexQuery({ field, operator, value }: Filter): any {
        const regex = operator === FilterOperator.NotEqual ? new RegExp(`(?!${value.value})`, 'i') : new RegExp(value.value, 'i');

        return { [field.value]: regex };
    }

    private static extendFindWithCursorFind(find: Record<string, any>, cursorFind: Record<string, any>): any {
        if (Object.keys(find).length === 0) {
            return cursorFind;
        }

        if (find.$or) {
            if (cursorFind.$or) {
                return { $and: [find, cursorFind] };
            }

            return { $and: [find, { $or: cursorFind }] };
        }

        return { $and: [find, cursorFind] };
    }

    private static convertCursor(cursor: Cursor, sortCriteria: Nullable<Record<string, any>>): any {
        const { isBackward, ...tiebreakers } = cursor.decrypt() as Record<string, any>;

        if (sortCriteria) {
            return MongoCriteriaConverter.convertCursorWithSortCriteria(sortCriteria, tiebreakers, isBackward);
        }

        // eslint-disable-next-line one-var
        const idComparator = isBackward ? '$lt' : '$gt';

        // eslint-disable-next-line no-underscore-dangle
        return { _id: { [idComparator]: tiebreakers._id } };
    }

    private static convertCursorWithSortCriteria(
        sortCriteria: Record<string, any>,
        tiebreakers: Record<string, any>,
        isBackward: boolean
    ): any {
        const sortCondition = MongoCriteriaConverter.sortCriteriaToFindCondition(sortCriteria, tiebreakers, isBackward),
            tiebreakerCondition = MongoCriteriaConverter.addTiebreaker(sortCriteria, tiebreakers, isBackward),
            isSortConditionEmpty = Object.keys(sortCondition).length === 0;

        if (isSortConditionEmpty) {
            return tiebreakerCondition;
        }
        return {
            $or: [sortCondition, tiebreakerCondition]
        };
    }

    private static sortCriteriaToFindCondition(
        sortCriteria: Record<string, any>,
        tiebreakers: Record<string, any>,
        isBackward: boolean
    ): any {
        return Object.entries(sortCriteria)
            .filter(([key]) => key !== '_id' && !!tiebreakers[key])
            .reduce((cursorFind: any, [key, sortDirection]) => {
                const cursorComparator = MongoCriteriaConverter.getComparator(sortDirection, isBackward);

                // eslint-disable-next-line no-param-reassign
                cursorFind[key] = {
                    [cursorComparator]: tiebreakers[key]
                };

                return cursorFind;
            }, {});
    }

    private static addTiebreaker(sortCriteria: Record<string, any>, tiebreakers: Record<string, any>, isBackward: boolean): any {
        return Object.entries(sortCriteria)
            .filter(([key]) => !!tiebreakers[key])
            .reduce((cursorFind: any, [key, sortDirection]) => {
                const cursorComparator = MongoCriteriaConverter.getComparator(sortDirection, isBackward);

                if (key !== '_id') {
                    // eslint-disable-next-line no-param-reassign
                    cursorFind[key] = tiebreakers[key];
                } else {
                    // eslint-disable-next-line no-param-reassign
                    cursorFind[key] = {
                        [cursorComparator]: tiebreakers[key]
                    };
                }

                return cursorFind;
            }, {});
    }

    private static getComparator(sortDirection: number, isBackward: boolean): '$gt' | '$lt' {
        let direction = sortDirection;

        if (isBackward) {
            direction = sortDirection > 0 ? -1 : 1;
        }

        return MongoCriteriaConverter.getComparatorBasedOnDirection(direction);
    }

    private static getComparatorBasedOnDirection(direction: number): '$gt' | '$lt' {
        return direction === 1 ? '$gt' : '$lt';
    }
}
