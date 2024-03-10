import {injectable} from "inversify";
import {Endpoint} from "../model/Endpoint";

@injectable()
export class LocalEndpointRepository {
    private readonly endpoints: Endpoint[];

    constructor() {
        this.endpoints = require("../../database/endpoints.json");
    }

    getAllEndpoints(): Endpoint[] {
        return this.endpoints;
    }
}
