import Change from "./change";
import ChangeMother from "./change.mother";
import Changes, { ChangesPrimitives } from "./changes";

export default class ChangesMother {
    static create(changes: ChangesPrimitives): Changes {
        return new Changes(changes);
    }

    static empty(): Changes {
        return ChangesMother.create([]);
    }

    static random(): Changes {
        return ChangesMother.create(
            ChangeMother.randomList().map((d: Change) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): Changes {
        return ChangesMother.create(
            ChangeMother.randomListWithSize(size).map((d: Change) => d.toPrimitives())
        );
    }
}
