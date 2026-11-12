type ReleaseNoteType = 'feature' | 'fix' | 'chore';

export type CreateReleaseNotePayload = {
    title: string;
    description: string;
    type?: ReleaseNoteType;
};

export type ReleaseNote = {
    id: string;
    title: string;
    description: string;
    type: ReleaseNoteType;
    createdAt: string;
};

export default class ReleaseNotesService {
    private readonly notes: ReleaseNote[] = [];

    public create(payload: CreateReleaseNotePayload): ReleaseNote {
        const note: ReleaseNote = {
            id: this.generateId(),
            title: payload.title.trim(),
            description: payload.description.trim(),
            type: payload.type ?? 'feature',
            createdAt: new Date().toISOString()
        };

        this.notes.unshift(note);

        return note;
    }

    public list(): ReleaseNote[] {
        return this.notes;
    }

    public findById(id: string): ReleaseNote | undefined {
        return this.notes.find((note) => note.id === id);
    }

    private generateId(): string {
        const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

        return `rn-${Date.now()}-${random}`;
    }
}

