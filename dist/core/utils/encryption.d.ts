export declare class EncryptionUtils {
    static hashPassword(password: string): Promise<string>;
    static comparePassword(password: string, hash: string): Promise<boolean>;
    static generateToken(payload: object, expiresIn?: string): string;
    static generateRefreshToken(payload: object): string;
    static verifyToken(token: string): any;
    static verifyRefreshToken(token: string): any;
    static generateRandomString(length?: number): string;
}
//# sourceMappingURL=encryption.d.ts.map