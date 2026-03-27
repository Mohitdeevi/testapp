export interface Task {
  id: string;
  title: string;
  description?: string;
  categoryId?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Category {
  id: string;
  name: string;
}
