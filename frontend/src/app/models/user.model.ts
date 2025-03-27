export interface User {
    id: number;
    email: string;
    salt: string;
    hashed_password: string;
    username: "new user";
    profile_picture?: Text;
    role: 'user';
}