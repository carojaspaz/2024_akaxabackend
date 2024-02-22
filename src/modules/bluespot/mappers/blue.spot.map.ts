export class UserMap {

    public static toDto(entity: any): any {
        return {
            username: entity.username,    
            firstName: entity.firstName,
            lastName: entity.lastName,
            email: entity.email,
            role: entity.role,
            isMailVerified: entity.isMailVerified,
            mustChangePassword: entity.mustChangePassword,
            profilePicture: entity.profilePicture,
            isActive: entity.isActive,
            registerDate: entity.registerDate    
        }
    }
}