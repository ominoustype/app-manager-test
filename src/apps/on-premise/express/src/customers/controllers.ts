import { Request, Response } from "express";
import LITERALS, { dependencies } from "./application.di";
import SearchCustomersQueryHandler from "@context/customers/application/search/searchCustomersQueryHandler";
import FindCustomerQuery from "@context/customers/application/find/findCustomerQuery";
import FindCustomerQueryHandler from "@context/customers/application/find/findCustomerQueryHandler";
import SearchCustomersQuery from "@context/customers/application/search/searchCustomersQuery";

const CONTENT_TYPE = 'content-type';
const APPLICATION_JSON = 'application/json';

export async function searchCustomers(req: Request, res: Response) {
    console.log("Request for searchCustomers triggered");

    const handler = dependencies.get(LITERALS.HANDLERS).query.get(SearchCustomersQuery) as 
        SearchCustomersQueryHandler;

    const result = await handler.handle(
        new SearchCustomersQuery({
            ...req.query
    }));
    console.log(result);
    res.header(CONTENT_TYPE, APPLICATION_JSON);
    res.status(200).send({
        body: { result: result.customers }
    });
}

export async function findCustomer(req: Request, res: Response) {
    console.log("Request for findCustomer triggered");

    const { id } = req.params;

    const handler = dependencies.get(LITERALS.HANDLERS).query.get(FindCustomerQuery) as
        FindCustomerQueryHandler;

    console.log("Id to find: "+id);

    try{
        const response = await handler.handle(new FindCustomerQuery({ id }));

        res.header(CONTENT_TYPE, APPLICATION_JSON);
        res.status(200).send({
            body: response.primitives
        });
    }
    catch(e){
        res.status(404).send({ error: e });
    }
}

export async function closeConnections() {
    const arranger = dependencies.get(LITERALS.ARRANGER);
    await arranger.close();
}
