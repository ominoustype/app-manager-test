export default class RoleMissingParameterError extends Error{
    constructor() {
        super(`Mandatory parameter is missing`);
    }
}