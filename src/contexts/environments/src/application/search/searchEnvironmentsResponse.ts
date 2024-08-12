import { Response } from '@context/shared/domain/queryBus/response';
import Environments, {EnvironmentsPrimitives} from "@src/domain/environments";

export default class SearchEnvironmentsResponse implements Response {
    readonly environments: EnvironmentsPrimitives;
    
    constructor(environments: Environments) { 
        this.environments = environments.toPrimitives();
    }
}