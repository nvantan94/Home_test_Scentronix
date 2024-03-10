import { Request, Response } from "express";
import {controller, httpGet, queryParam} from "inversify-express-utils";
import {inject} from "inversify";
import SYMBOLS from "../dependency-injection/Symbols";
import {EndpointService} from "../service/EndpointService";
import {StatusCodes} from "http-status-codes";
import {ErrorResponse} from "../error/ErrorResponse";
import {Endpoint} from "../model/Endpoint";

@controller("/v1/reachable-endpoints")
export class EndpointController {
    constructor(@inject(SYMBOLS.EndpointService) private endpointService: EndpointService) {
    }

    @httpGet("/")
    async getAllReachableEndpoints(
        @queryParam("priority") priority: string | undefined,
        req: Request,
        res: Response): Promise<Endpoint[]> {
        if (priority === undefined) {
            return this.endpointService.getAllReachableEndpointsOrderedByPriority();
        }

        if (!this.isPriorityAPositiveNumber(priority)) {
            res.status(StatusCodes.BAD_REQUEST).json(new ErrorResponse("priority must be a positive number!"));
            return;
        }

        return this.endpointService.getReachableEndpointsByPriority(parseInt(priority));
    }

    private isPriorityAPositiveNumber(priority: string) : boolean {
        const number: number = parseInt(priority);

        if (isNaN(number) || number <= 0) {
            return false;
        }

        return true;
    }
}
