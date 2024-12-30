import { NextFunction, Request, Response } from "express";
import LITERALS, { dependencies } from "./application.di";
import SearchCustomersQueryHandler from "@context/customers/application/search/searchCustomersQueryHandler";
import FindCustomerQuery from "@context/customers/application/find/findCustomerQuery";
import FindCustomerQueryHandler from "@context/customers/application/find/findCustomerQueryHandler";
import SearchCustomersQuery from "@context/customers/application/search/searchCustomersQuery";
import logger from "@context/shared/infrastructure/logger";

const CONTENT_TYPE = 'content-type';
const APPLICATION_JSON = 'application/json';

export async function searchCustomers(req: Request, res: Response) {
    logger.info("Request for searchCustomers triggered");

    const handler = dependencies.get(LITERALS.HANDLERS).query.get(SearchCustomersQuery) as 
        SearchCustomersQueryHandler;

    const result = await handler.handle(
        new SearchCustomersQuery({
            ...req.query
    }));

    res.header(CONTENT_TYPE, APPLICATION_JSON);
    res.status(200).send({
        body: { result: result.customers }
    });
}

export async function findCustomer(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for findCustomer triggered");

    const { id } = req.params;

    const handler = dependencies.get(LITERALS.HANDLERS).query.get(FindCustomerQuery) as
        FindCustomerQueryHandler;

    logger.info("Id to find: "+id);

    try{
        const response = await handler.handle(new FindCustomerQuery({ id }));

        res.header(CONTENT_TYPE, APPLICATION_JSON);
        res.status(200).send({
            body: response.primitives
        });
    }
    catch(e){
        next(e);
    }
}

export async function closeConnections() {
    const arranger = dependencies.get(LITERALS.ARRANGER);
    await arranger.close();
}
