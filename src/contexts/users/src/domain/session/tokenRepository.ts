interface TokenRepository {
    create(token: string, ttl: number): Promise<void>;

    find(token: string): Promise<string | null>;
}

export default TokenRepository