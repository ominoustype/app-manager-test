import MotherCreator from '@src/domain/motherCreator.mother';

const DEFAULT_NUMBER_OF_ITEMS = 20;
export default class Repeater {
    // eslint-disable-next-line @typescript-eslint/ban-types
    static random(callable: Function, iterations?: number): Array<any> {
        return Array(iterations !== undefined ? iterations : MotherCreator.zeroOrPositiveNumber(20))
            .fill({})
            .map(() => callable());
    }

    static randomWithoutRepetitions<T extends { equalsTo: (item: T) => boolean }>(callable: () => T, iterations: number | undefined): Array<T> {
        const nItems =
            iterations ??
            MotherCreator.zeroOrPositiveNumber(DEFAULT_NUMBER_OF_ITEMS);
        const items = [];

        for (let i = 0; i < nItems; i += 1) {
            let alreadyIncluded = false;

            do {
                const item = callable();

                alreadyIncluded = !!items.find((it) => it.equalsTo(item));

                if (!alreadyIncluded) {
                    items.push(item);
                }
            } while (alreadyIncluded);
        }

        return items;
    }
}
