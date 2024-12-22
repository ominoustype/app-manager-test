import { MongoClient } from 'mongodb';
import FindCustomerQuery from '@context/customers/application/find/findCustomerQuery';
import FindCustomerQueryHandler from '@context/customers/application/find/findCustomerQueryHandler';
import CustomersSearcher from '@context/customers/application/search/customersSearcher';
import SearchCustomersQueryHandler from '@context/customers/application/search/searchCustomersQueryHandler';
import CustomerFinder from '@context/customers/application/find/customerFinder';
import CustomerMongoRepository from '@context/customers/infrastructure/customerMongoRepository';
import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";
import SearchCustomersQuery from '@context/customers/application/search/searchCustomersQuery';

const HANDLERS = "handlers";
const REPOSITORIES = "repositories"
const ARRANGER = "arranger";
const LITERALS = { HANDLERS, REPOSITORIES, ARRANGER };
export default LITERALS;

const client = MongoClientFactory.createClient('customers', { 
    url: process.env.MONGODB_URI || 'mongodb://localhost:27028/' 
});    
const arranger = new MongoEnvironmentArranger(client);

const repository = new CustomerMongoRepository(client as unknown as MongoClient);

const dependencies = new Map();

const customerFinder = new CustomerFinder(repository);
const customerSearcher = new CustomersSearcher(repository);

const findCustomerQueryHandler =  new FindCustomerQueryHandler(customerFinder);
const searchCustomerQueryHandler = new SearchCustomersQueryHandler(customerSearcher);

const queryHandlers = new Map<any, any>();
queryHandlers.set(FindCustomerQuery, findCustomerQueryHandler);
queryHandlers.set(SearchCustomersQuery, searchCustomerQueryHandler);

dependencies.set(HANDLERS, { query: queryHandlers });
dependencies.set(REPOSITORIES, { repository: repository });
dependencies.set(ARRANGER, arranger);

export { dependencies, HANDLERS };
