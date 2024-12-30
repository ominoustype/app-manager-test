export default class UserMissingParameterError extends Error{
    constructor() {
        super(`Mandatory parameter is missing`);
    }
}