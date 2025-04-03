export interface Note{
    id: number;
    user_id: number;
    title?: string;
    body: string;
    sort_order: number;
    color: 'grey'; // valeur par défault pour le moment. Update dans la branche "custom"
    pinned: false;
    created_at: Date;
}