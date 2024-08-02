import StringValueObject from '@src/domain/stringValueObject';
import InvalidArgumentError from '@src/domain/invalidArgument';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getLocales } from 'country-language';

export default class LocaleValueObject extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureIsValidLocale(value);
    }

    private ensureIsValidLocale(value: string): void {
        const isValid = getLocales(true)
            .map((l: string) => l.replace('-', '_'))
            .includes(value);

        if (!isValid) {
            throw new InvalidArgumentError(
                `<${this.constructor.name}> doesn't allow the value <${value}>`
            );
        }
    }
}
