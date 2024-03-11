/* eslint @typescript-eslint/no-var-requires: "off" */
import 'reflect-metadata';
import {suite, test} from '@testdeck/mocha';
import * as sinon from 'sinon';
import {EndpointService} from '../../../src/service/EndpointService';
import {EndpointController} from '../../../src/controller/EndpointController';
import {Endpoint} from '../../../src/model/Endpoint';
import * as assert from 'assert';

interface IAllReachableEndpointFixture {
    reachable_sorted_endpoints: Endpoint[]
}

interface IReachableEndpointByPriorityFixture {
    reachable_endpoints_by_priority: Endpoint[]
}

@suite
export class EndpointControllerSpec {
    @test async 'should return a list of reachable endpoints sorted by priority'() {
        const fixture: IAllReachableEndpointFixture = require('../fixtures/controller/all_reachable_endpoints.json');
        const getAllReachableEndpointsOrderedByPriorityStub = sinon.stub().returns(new Promise<Endpoint[]>((resolve) => {
            resolve(fixture.reachable_sorted_endpoints);
        }));
        const stubbedEndpointService: EndpointService = {
            getAllReachableEndpointsOrderedByPriority: getAllReachableEndpointsOrderedByPriorityStub
        } as unknown as EndpointService;
        const endpointController: EndpointController = new EndpointController(stubbedEndpointService);
        const actualReturnedEndpoints: Endpoint[] = await endpointController.getAllReachableEndpoints();

        assert.strictEqual(actualReturnedEndpoints, fixture.reachable_sorted_endpoints);
    }

    @test async 'should return a list of reachable endpoints by a valid priority'() {
        const fixture: IReachableEndpointByPriorityFixture = require('../fixtures/controller/reachable_endpoints_by_priority.json');
        const getReachableEndpointsByPriorityStub = sinon.stub().withArgs(1).returns(new Promise<Endpoint[]>((resolve) => {
            resolve(fixture.reachable_endpoints_by_priority);
        }));
        const stubbedEndpointService: EndpointService = {
            getReachableEndpointsByPriority: getReachableEndpointsByPriorityStub
        } as unknown as EndpointService;
        const endpointController: EndpointController = new EndpointController(stubbedEndpointService);
        const actualReturnedEndpoints: Endpoint[] = await endpointController.getAllReachableEndpoints('1');

        assert.strictEqual(actualReturnedEndpoints, fixture.reachable_endpoints_by_priority);
    }
}
