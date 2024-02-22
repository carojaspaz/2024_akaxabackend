export interface ViewUserDto {    
    username: string;
    email: string;    
    role: string;
    isEmailVerified: boolean;
    mustChangePassword: boolean;
    isActive: boolean;
}