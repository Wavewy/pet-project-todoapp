import type { Todo } from './types';

const BASE = '/api';

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE}/todos`);
  return res.json();
}

export async function createTodo(title: string): Promise<Todo> {
  const res = await fetch(`${BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function updateTodo(
  id: number,
  data: Partial<Pick<Todo, 'title' | 'done'>>
): Promise<Todo> {
  const res = await fetch(`${BASE}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  await fetch(`${BASE}/todos/${id}`, { method: 'DELETE' });
}

export async function clearCompleted(): Promise<void> {
  await fetch(`${BASE}/todos/completed`, { method: 'DELETE' });
}

export async function toggleAll(done: boolean): Promise<Todo[]> {
  const res = await fetch(`${BASE}/todos/toggle-all`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done }),
  });
  return res.json();
}
