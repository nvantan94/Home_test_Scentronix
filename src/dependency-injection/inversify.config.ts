import { Container } from 'inversify';
import {EndpointService} from '../service/EndpointService';
import {LocalEndpointRepository} from '../repository/LocalEndpointRepository';
import {IEndpointRepository} from '../repository/IEndpointRepository';
import SYMBOLS from './Symbols';
import {PriorityValidation} from '../validation/PriorityValidation';

const container = new Container();

container.bind<PriorityValidation>(SYMBOLS.PriorityValidation).to(PriorityValidation);
container.bind<IEndpointRepository>(SYMBOLS.IEndpointRepository).to(LocalEndpointRepository);
container.bind<EndpointService>(SYMBOLS.EndpointService).to(EndpointService);

export default container;
