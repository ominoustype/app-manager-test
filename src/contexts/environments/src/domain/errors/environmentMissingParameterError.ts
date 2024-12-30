export default class EnvironmentMissingParameterError extends Error{
    constructor() {
        super(`Mandatory parameter is missing`);
    }
}