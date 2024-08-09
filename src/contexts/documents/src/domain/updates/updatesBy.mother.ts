import UpdateBy from "./updateBy";
import UpdateByMother from "./updateBy.mother";
import UpdatesBy, { UpdatesByPrimitives } from "./updatesBy";

export default class UpdatesByMother {
    static create(updatesBy: UpdatesByPrimitives): UpdatesBy {
        return new UpdatesBy(updatesBy);
    }

    static empty(): UpdatesBy {
        return UpdatesByMother.create([]);
    }

    static random(): UpdatesBy {
        return UpdatesByMother.create(
            UpdateByMother.randomList().map((d: UpdateBy) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): UpdatesBy {
        return UpdatesByMother.create(
            UpdateByMother.randomListWithSize(size).map((d: UpdateBy) => d.toPrimitives())
        );
    }
}
