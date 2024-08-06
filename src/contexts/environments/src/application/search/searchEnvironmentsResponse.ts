import { Response } from '@context/shared/domain/queryBus/response';
import Environments, {EnvironmentsPrimitives} from "@src/domain/environments";

export default class SearchEnvironmentsResponse implements Response {
    readonly primitives: EnvironmentsPrimitives;
    
    constructor(primitives: Environments) { 
        this.primitives = primitives.toPrimitives();
    }
}