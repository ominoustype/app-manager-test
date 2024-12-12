import { JwtPayload } from "jsonwebtoken";
import { UserPrimitives } from "../user";
import { RolePrimitives } from "@context/roles/domain/role";

export type TokenPayload = {
    id: string,
    username: string,
    name: string,
    roleId: string,
    permissions: {
        roleName: string,
        environmentIds: Array<string>,
        customerId: string
    }
}

export default interface Tokenator {
    generateAccessToken(user: UserPrimitives, role: RolePrimitives): string;
    generateRefreshToken(user: UserPrimitives): string;
    verify(token: string): { payload: TokenPayload | null, isValid: boolean };
    isValid(token: string): boolean;
    timeToLife(token: JwtPayload): number;
}