export default class UserCreationFaildError extends Error{
    constructor(message: string) {
        super(message);
    }
}