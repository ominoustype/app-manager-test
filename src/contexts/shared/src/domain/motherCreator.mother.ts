import * as faker from 'faker';

export default class MotherCreator {
    static uuid(): string {
        return faker.datatype.uuid();
    }

    static indexNumber(max: number): number {
        return faker.datatype.number({ min: 0, max });
    }

    static words(): string {
        return faker.lorem.words();
    }

    static boolean(): boolean {
        return faker.datatype.boolean();
    }

    static positiveNumber(max?: number): number {
        return faker.datatype.number({ min: 1, max });
    }

    static zeroOrPositiveNumber(max?: number): number {
        return faker.datatype.number({ min: 0, max });
    }

    static email(): string {
        return faker.internet.email();
    }

    static spanishPhoneNumber(): string {
        const format = MotherCreator.boolean() ? '91#######' : '6########';

        return faker.phone.phoneNumber(format);
    }

    static text(): string {
        return faker.lorem.paragraph();
    }

    static recentDate(): Date {
        return faker.date.recent();
    }

    static firstName(): string {
        return faker.name.firstName();
    }

    static surname(): string {
        return faker.name.lastName();
    }

    static age(): number {
        return faker.datatype.number({ min: 0, max: 120 });
    }

    static street(): string {
        return faker.address.streetAddress();
    }

    static city(): string {
        return faker.address.city();
    }

    static country(): string {
        return faker.address.country();
    }
}
