import Cursor from '@src/domain/criteria/cursor';
import LocaleValueObject from '@src/domain/localeValueObject';
import Uuid from '@src/domain/uuid';

interface WithId {
    id: Uuid;
}

interface LocalizedObject {
    availableLocales(): LocaleValueObject[];
    toLocalizedPrimitives(locale: LocaleValueObject): any;
}

export default class MongoCursorMother {
    static create(tiebreakers: Record<string, any>, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            isBackward,
            ...tiebreakers
        });
    }

    static idBased<T extends WithId>(item: T, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            isBackward,
            _id: item.id.value
        });
    }

    static fromLocalizedObject<T extends LocalizedObject>(item: T, isBackward: boolean, mapping: { [key: string]: string } = {}): Cursor {
        const locales = item.availableLocales(),
            tiebreakers = locales.reduce((acc: Record<string, any>, l) => {
                const primitives = item.toLocalizedPrimitives(l);

                if (primitives) {
                    Object.entries(primitives).forEach(([propertyName, value]) => {
                        const key = mapping[propertyName] || propertyName;

                        if (!acc[key]) {
                            acc[key] = value;
                        }
                    });
                }

                return acc;
            }, {});

        return MongoCursorMother.create(tiebreakers, isBackward);
    }
}
