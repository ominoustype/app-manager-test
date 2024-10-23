
export default class CustomerNotFoundError extends Error {
    constructor(id: string) {
        super(`Customer with id ${id} not found`);
    }
}