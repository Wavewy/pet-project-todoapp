export interface Todo {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Filter = 'all' | 'active' | 'completed';
