import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Email from "./email";

export default class EmailMother {
    static create(email: string) {
        return new Email(email);
    }

    static random() {
        return EmailMother.create(MotherCreator.email());
    }

    static malformed() {
        return 'not a valid email';
    }
}