import { Response } from '@context/shared/domain/queryBus/response';
import Enviroments, {EnviromentsPrimitives} from "@src/domain/enviroments";

export default class SearchEnviromentsResponse implements Response {
    readonly primitives: EnviromentsPrimitives;
    
    constructor(primitives: Enviroments) { 
        this.primitives = primitives.toPrimitives();
    }
}