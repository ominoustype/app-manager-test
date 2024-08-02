import MotherCreator from '@src/domain/motherCreator.mother';
import Uuid from './uuid';

export default class UuidMother {
    static create(id: string): Uuid {
        return new Uuid(id);
    }

    static random(): Uuid {
        return UuidMother.create( MotherCreator.uuid());
    }
}
