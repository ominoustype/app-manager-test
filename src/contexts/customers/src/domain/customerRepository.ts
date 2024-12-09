import { Nullable } from "@context/shared/domain/nullable";
import CustomerId from "./customerId";
import Customer from "./customer";
import { SearchCustomersQueryParams } from "@src/application/search/searchCustomersQuery";
import Customers from "./customers";

interface CustomerRepository {
    find(id: CustomerId): Promise<Nullable<Customer>>;

    search(params: SearchCustomersQueryParams): Promise<Customers>;
}

export default CustomerRepository;