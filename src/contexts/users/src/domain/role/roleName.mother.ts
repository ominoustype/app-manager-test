import { sample } from "lodash";
import RoleName from "./roleName";

export default class RoleNameMother {
    static random(): RoleName {
        return sample(Object.values(RoleName)) as RoleName;
    }
}
