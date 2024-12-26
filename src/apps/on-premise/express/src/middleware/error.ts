import logger from '@context/shared/infrastructure/logger';
import { Request, Response, NextFunction } from 'express'

export default function errorHandler<T extends Error>(error: T, _request: Request, response: Response, _next: NextFunction) {
    logger.error(error.message);

    response.status(500).send({ message: "Something went wrong" });
}