import {injectable} from 'inversify';
import {Endpoint} from '../model/Endpoint';

@injectable()
export class LocalEndpointRepository {
    private readonly endpoints: Endpoint[];

    constructor() {
        this.endpoints = require('../../database/endpoints.json');
    }

    getAllEndpoints(): Endpoint[] {
        return this.endpoints;
    }

    getEndpointsByPriority(priority: number): Endpoint[] {
        return this.endpoints.filter(e => e.priority === priority);
    }
}
