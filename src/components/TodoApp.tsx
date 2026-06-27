import { useState, useEffect, useCallback } from 'react';
import type { Todo, Filter } from '../types';
import * as api from '../api';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoFooter from './TodoFooter';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const load = useCallback(async () => {
    const data = await api.fetchTodos();
    setTodos(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(title: string) {
    const todo = await api.createTodo(title);
    setTodos((prev) => [...prev, todo]);
  }

  async function handleToggle(id: number) {
    const todo = todos.find((t) => t.id === id)!;
    const updated = await api.updateTodo(id, { done: !todo.done });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: number) {
    await api.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleEdit(id: number, title: string) {
    const updated = await api.updateTodo(id, { title });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleToggleAll(done: boolean) {
    const updated = await api.toggleAll(done);
    setTodos(updated);
  }

  async function handleClearCompleted() {
    await api.clearCompleted();
    setTodos((prev) => prev.filter((t) => !t.done));
  }

  const activeCount = todos.filter((t) => !t.done).length;
  const completedCount = todos.filter((t) => t.done).length;

  return (
    <div className="todoapp">
      <TodoHeader onAdd={handleAdd} />
      <TodoMain
        todos={todos}
        filter={filter}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onToggleAll={handleToggleAll}
      />
      <TodoFooter
        activeCount={activeCount}
        completedCount={completedCount}
        filter={filter}
        onFilterChange={setFilter}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}
