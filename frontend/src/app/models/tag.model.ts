export interface Tag {
    id: number;
    user_id: number;
    name: string;
    color: 'grey'; // valeur par défault pour le moment. Update dans la branche "custom"
    created_at: Date;
}