import { sample } from "lodash";
import UserStatus from "./userStatus";

export default class UserStatusMother {
    static random(): UserStatus{
        return sample(Object.values(UserStatus)) as UserStatus;
    }
}
