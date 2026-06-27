import type { Todo, Filter } from '../types';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onToggleAll: (done: boolean) => void;
}

export default function TodoMain({
  todos,
  filter,
  onToggle,
  onDelete,
  onEdit,
  onToggleAll,
}: Props) {
  if (todos.length === 0) return null;

  const visible = todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  const allDone = todos.every((t) => t.done);

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={allDone}
        onChange={(e) => onToggleAll(e.target.checked)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {visible.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </section>
  );
}
