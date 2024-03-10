import {injectable} from 'inversify';
import {NextFunction, RequestHandler, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {ErrorResponse} from '../error/ErrorResponse';

@injectable()
export class PriorityValidation {
    public validate(): RequestHandler {
        return (request: Request, response: Response, next: NextFunction) => {
            if (request.query.priority === undefined) {
                return next();
            }
            const priority: string = request.query.priority as string;
            const number: number = parseInt(priority);

            if (isNaN(number) || number <= 0) {
                response.status(StatusCodes.BAD_REQUEST).json(new ErrorResponse('priority must be a positive number!'));
            }

            next();
        }
    }
}
