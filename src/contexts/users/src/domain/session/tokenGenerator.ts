import User from "../user";
import Token from "./token";

export default interface TokenGenerator {    
    generate(user: User): Token;

    isValid(token: Token): boolean;
    
    decode(token: Token): any;
}