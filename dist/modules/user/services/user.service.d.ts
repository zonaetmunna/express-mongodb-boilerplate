export declare class UserService {
    static getProfile(userId: string): Promise<{
        id: any;
        email: string;
        name: string;
        role: "user" | "admin";
    }>;
    static updateProfile(userId: string, data: {
        name?: string;
    }): Promise<{
        id: any;
        email: string;
        name: string;
        role: "user" | "admin";
    }>;
}
//# sourceMappingURL=user.service.d.ts.map