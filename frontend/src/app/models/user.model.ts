export interface User {
    id: number;
    email: string;
    salt: string;
    hashed_password: string;
    username: "new user";
    profile_picture?: Text;
    role: 'user';
}

// for now username and role have default values because it is required in db