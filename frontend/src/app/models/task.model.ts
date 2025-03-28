export interface Task {
    id: number;
    title: string;
    sort_order: number;
    description?: string;
    priority?: string;
    kanban_category?: string;
    due_date?: Date;
    done: boolean;
    to_do_list_id: number;
    created_at: Date;
  }