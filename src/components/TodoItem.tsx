import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  function handleDoubleClick() {
    setEditing(true);
    setEditValue(todo.title);
  }

  function save() {
    const trimmed = editValue.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
    } else {
      onDelete(todo.id);
    }
    setEditing(false);
  }

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') {
      setEditValue(todo.title);
      setEditing(false);
    }
  }

  const liClass = [todo.done ? 'completed' : '', editing ? 'editing' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <li className={liClass}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.title}</label>
        <button className="destroy" onClick={() => onDelete(todo.id)} />
      </div>
      {editing && (
        <input
          ref={inputRef}
          className="edit"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyUp={handleKeyUp}
          onBlur={save}
        />
      )}
    </li>
  );
}
