import InvalidArgument from "@context/shared/domain/invalidArgument";
import StringValueObject from "@context/shared/domain/stringValueObject";

const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default class Email extends StringValueObject {
    constructor(email: string) {
        const lowerEmail = email.toLowerCase();

        Email.isValidEmail(lowerEmail);

        super(lowerEmail);
    }

    static isValidEmail(email: string) {
        if (!EMAIL_REGEX.test(email)) {
            throw new InvalidArgument(
                `<${this.name}> doesn't allow invalid emails <${email}>`
            );
        }
    }
}