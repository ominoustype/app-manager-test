import ConsoleLogger from '@context/shared/infrastructure/consoleLogger'
import { Request, Response, NextFunction } from 'express'

export default function errorHandler<T extends Error>(error: T, _request: Request, response: Response, _next: NextFunction) {
    const log: ConsoleLogger = new ConsoleLogger();

    log.error(error.message);

    response.status(500).send({ message: "Something went wrong" });
}