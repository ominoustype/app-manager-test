import Previous from "./previous";
import PreviousMother from "./previous.mother";
import Previouses, { PreviousesPrimitives } from "./previouses";

export default class PreviousesMother {
    static create(previouses: PreviousesPrimitives): Previouses {
        return new Previouses(previouses);
    }

    static empty(): Previouses {
        return PreviousesMother.create([]);
    }

    static random(): Previouses {
        return PreviousesMother.create(
            PreviousMother.randomList().map((d: Previous) => d.toPrimitives())
        );
    }

    static randomNotReady(): Previouses {
        return PreviousesMother.create(
            PreviousMother.randomListNotReady().map((d: Previous) => d.toPrimitives())
        );
    }

    static randomReady(): Previouses {
        return PreviousesMother.create(
            PreviousMother.randomListReady().map((d: Previous) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): Previouses {
        return PreviousesMother.create(
            PreviousMother.randomListWithSize(size).map((d: Previous) => d.toPrimitives())
        );
    }
}
