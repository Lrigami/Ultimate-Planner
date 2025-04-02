export interface Todolist {
    id: number;
    title: string;
    sort_order: number;
    pinned: boolean;
    color?: string;
}