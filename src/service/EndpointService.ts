import {inject, injectable} from "inversify";
import {Endpoint} from "../model/Endpoint";
import SYMBOLS from "../dependency-injection/Symbols";
import {IEndpointRepository} from "../repository/IEndpointRepository";
import {all} from "inversify-express-utils";
import axios, {AxiosResponse} from "axios";

@injectable()
export class EndpointService {
    private readonly TIMEOUT_IN_MIlLISECONDS = 5 * 1000;

    constructor(
        @inject(SYMBOLS.IEndpointRepository) private endpointRepository: IEndpointRepository
    ) {
    }

    async getAllReachableEndpointsOrderedByPriority(): Promise<Endpoint[]> {
        const allEndpoints = this.endpointRepository.getAllEndpoints();
        const reachableEndpoints = await this.getOnlyReachableEndpoints(allEndpoints);
        reachableEndpoints.sort((e1, e2) => e1.priority - e2.priority);
        return reachableEndpoints;
    }

    async getReachableEndpointsByPriority(priority: number): Promise<Endpoint[]> {
        const allEndpointsByPriority = this.endpointRepository.getAllEndpoints().filter(e => e.priority === priority);
        if (allEndpointsByPriority.length === 0) {
            return [];
        }
        return this.getOnlyReachableEndpoints(allEndpointsByPriority);
    }

    private async getOnlyReachableEndpoints(endpoints: Endpoint[]): Promise<Endpoint[]> {
        const checkAvailabilityEndpoints: Promise<AxiosResponse>[] = endpoints.map(endpoint => {
            return axios.get(endpoint.url, {
                timeout: this.TIMEOUT_IN_MIlLISECONDS
            });
        });

        const promiseResults: PromiseSettledResult<AxiosResponse>[] = await Promise.allSettled(checkAvailabilityEndpoints);
        let reachableEndpoints : Endpoint[] = [];
        promiseResults.forEach(result  => {
            if (result.status === "fulfilled") {
                const res: AxiosResponse = result.value;
                if (res.status >= 200 && res.status <= 299) {
                    reachableEndpoints = reachableEndpoints.concat(endpoints.filter(e => e.url === res.config.url));
                }
            }
        });

        return reachableEndpoints;
    }
}
