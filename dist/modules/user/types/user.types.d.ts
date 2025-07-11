export interface IProfile {
    _id: string;
    userId: string;
    avatar?: string;
    bio?: string;
    phone?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        zipCode?: string;
    };
    socialLinks?: {
        website?: string;
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    preferences?: {
        notifications?: {
            email?: boolean;
            push?: boolean;
            sms?: boolean;
        };
        privacy?: {
            profileVisible?: boolean;
            showEmail?: boolean;
            showPhone?: boolean;
        };
    };
    createdAt: Date;
    updatedAt: Date;
}
export interface UpdateProfileRequest {
    avatar?: string;
    bio?: string;
    phone?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        zipCode?: string;
    };
    socialLinks?: {
        website?: string;
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
}
export interface UpdatePreferencesRequest {
    notifications?: {
        email?: boolean;
        push?: boolean;
        sms?: boolean;
    };
    privacy?: {
        profileVisible?: boolean;
        showEmail?: boolean;
        showPhone?: boolean;
    };
}
export interface GetUsersQuery {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
//# sourceMappingURL=user.types.d.ts.map