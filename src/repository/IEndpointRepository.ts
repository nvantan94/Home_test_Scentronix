import {Endpoint} from '../model/Endpoint';

export interface IEndpointRepository {
    getAllEndpoints(): Endpoint[];
    getEndpointsByPriority(priority: number): Endpoint[];
}
