export declare class Database {
    private static instance;
    private isConnected;
    private constructor();
    static getInstance(): Database;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getConnectionStatus(): boolean;
}
export declare const database: Database;
//# sourceMappingURL=database.d.ts.map