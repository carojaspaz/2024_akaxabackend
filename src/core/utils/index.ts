export namespace Utils {    

    export const generatePassword = () : string => {
        const specialChars = '@$!%*#?&'
        const index1 = Math.random() * 8
        const char1 = specialChars.slice(index1, index1 + 1)
        const index2 = Math.random() * 8
        const char2 = specialChars.slice(index2, index2 + 1)
        const newPassword = char1 + Math.random().toString(36).substring(2, 8) + char2 + Math.random().toString(36).substring(2, 8)
        return newPassword        
    }
}