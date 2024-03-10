import { Container } from "inversify";
import {EndpointService} from "../service/EndpointService";
import {EndpointController} from "../controller/EndpointController";
import {LocalEndpointRepository} from "../repository/LocalEndpointRepository";
import {IEndpointRepository} from "../repository/IEndpointRepository";
import SYMBOLS from "./Symbols";

const container = new Container();

container.bind<IEndpointRepository>(SYMBOLS.IEndpointRepository).to(LocalEndpointRepository);
container.bind<EndpointService>(SYMBOLS.EndpointService).to(EndpointService);
container.bind<EndpointController>(SYMBOLS.EndpointController).to(EndpointController);

export default container;
