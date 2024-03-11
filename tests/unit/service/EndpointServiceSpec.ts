/* eslint @typescript-eslint/no-var-requires: 'off' */
import 'reflect-metadata';
import {test, suite} from '@testdeck/mocha';
import {Endpoint} from '../../../src/model/Endpoint';
import * as sinon from 'sinon';
import {EndpointService} from '../../../src/service/EndpointService';
import {IEndpointRepository} from '../../../src/repository/IEndpointRepository';
import assert from 'assert';
import nock from 'nock';

interface ITargetUrl {
    url: string,
    status_code: number,
    timeout?: number | undefined
}
interface IAllEndpointsFixture {
    all_endpoints: Endpoint[],
    mock_target_urls: ITargetUrl[],
    expected_endpoints: Endpoint[]
}

@suite
export class EndpointServiceSpec {
    @test async 'should return a list of reachable endpoints sorted by priority'() {
        const fixture: IAllEndpointsFixture = require('../fixtures/service/all_endpoints.json');
        const getAllEndpointsStub = sinon.stub().returns(fixture.all_endpoints);
        const stubbedEndpointRepository: IEndpointRepository = {
            getAllEndpoints: getAllEndpointsStub
        } as unknown as IEndpointRepository;
        this.mockTargetUrls(fixture.mock_target_urls);

        const endpointService: EndpointService = new EndpointService(stubbedEndpointRepository);
        const actualReachableEndpoints: Endpoint[] = await endpointService.getAllReachableEndpointsOrderedByPriority();

        assert.deepStrictEqual(actualReachableEndpoints, fixture.expected_endpoints);
    }

    @test async 'should return a list of reachable endpoints for a valid priority'() {
        const fixture: IAllEndpointsFixture = require('../fixtures/service/all_endpoints_with_specific_priority.json');
        const getEndpointsByPriorityStub = sinon.stub().returns(fixture.all_endpoints);
        const stubbedEndpointRepository: IEndpointRepository = {
            getEndpointsByPriority: getEndpointsByPriorityStub
        } as unknown as IEndpointRepository;
        this.mockTargetUrls(fixture.mock_target_urls);

        const endpointService: EndpointService = new EndpointService(stubbedEndpointRepository);
        const actualReachableEndpoints: Endpoint[] = await endpointService.getReachableEndpointsByPriority(2);

        assert.deepStrictEqual(actualReachableEndpoints, fixture.expected_endpoints);
    }

    private mockTargetUrls(targetUrls: ITargetUrl[]) {
        targetUrls.forEach(targetUrl => {
            nock(targetUrl.url)
                .persist()
                .get('/')
                .reply(targetUrl.status_code);
        });
    }
}
