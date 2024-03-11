import 'reflect-metadata';
import {suite, test} from '@testdeck/mocha';
import * as sinon from 'sinon';
import {EndpointService} from '../../../src/service/EndpointService';
import {EndpointController} from '../../../src/controller/EndpointController';
import {SinonStubbedInstance} from 'sinon';
import {Endpoint} from '../../../src/model/Endpoint';

@suite
export class EndpointControllerSpec {
    @test async 'should return a list of reachable endpoints sorted by priority'() {
        const stubbedEndpointService: SinonStubbedInstance<EndpointService> = sinon.createStubInstance(EndpointService);
        stubbedEndpointService.getAllReachableEndpointsOrderedByPriority.returns(new Promise<Endpoint[]>((resolve, _reject) => {
            resolve([{
                url: 'https://test123.com',
                priority: 1
            }])
        }));
        const endpointController: EndpointController = new EndpointController(stubbedEndpointService);
        console.log(endpointController.getAllReachableEndpoints());
    }

    @test async 'should return a list of reachable endpoints by a valid priority'() {

    }

    @test async 'should return 400 status code in the case of an invalid priority passed'() {

    }
}
