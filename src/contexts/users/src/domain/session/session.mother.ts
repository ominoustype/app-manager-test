import MotherCreator from "@context/shared/domain/motherCreator.mother";

export default class SessionMother {
    static random() {
        return {
            expiration: MotherCreator.future().toISOString()
        };
    }
}