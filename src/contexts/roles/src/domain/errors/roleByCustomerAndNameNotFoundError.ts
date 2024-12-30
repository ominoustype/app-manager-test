export default class RoleByCustomerAndNameNotFoundError extends Error {
    constructor(customerId: string, name: string) {
        super(`Role with customerId ${customerId} and name ${name} not found`);
    }
}