import { Request, Response, NextFunction } from 'express'

export default function errorHandler<T extends Error>(error: T, _request: Request, response: Response, _next: NextFunction) {
    console.log(error)
    // TODO: parse all the errors with the specific codes
    response.status(500).send({ message: error.message})
}