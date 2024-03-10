import {controller, httpGet, queryParam} from "inversify-express-utils";
import {inject} from "inversify";
import SYMBOLS from "../dependency-injection/Symbols";
import {EndpointService} from "../service/EndpointService";
import {Endpoint} from "../model/Endpoint";
import container from "../dependency-injection/inversify.config";
import {PriorityValidation} from "../validation/PriorityValidation";

@controller("/v1/reachable-endpoints")
export class EndpointController {
    constructor(@inject(SYMBOLS.EndpointService) private endpointService: EndpointService) {
    }

    @httpGet("/",
        container.get<PriorityValidation>(SYMBOLS.PriorityValidation).validate())
    async getAllReachableEndpoints(
        @queryParam("priority") priority: string | undefined): Promise<Endpoint[]> {
        if (priority === undefined) {
            return this.endpointService.getAllReachableEndpointsOrderedByPriority();
        }

        return this.endpointService.getReachableEndpointsByPriority(parseInt(priority));
    }
}
