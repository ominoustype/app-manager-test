import StringValueObject from '@src/domain/stringValueObject';
import InvalidArgumentError from '@src/domain/invalidArgument';

export default class Cursor extends StringValueObject {
    static fromObject(obj: Record<string, any>): Cursor {
        return new Cursor(Cursor.encrypt(obj));
    }

    private static encrypt(value: Record<string, any>): string {
        return Buffer.from(JSON.stringify(value)).toString('base64');
    }

    decrypt(): unknown {
        try {
            return JSON.parse(Buffer.from(this.value, 'base64').toString());
        } catch (e) {
            throw new InvalidArgumentError(
                `<${Cursor.name}> cursor <${this.value}> can't be read`
            );
        }
    }
}
