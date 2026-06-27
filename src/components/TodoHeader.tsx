import { useState, KeyboardEvent } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export default function TodoHeader({ onAdd }: Props) {
  const [value, setValue] = useState('');

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim()) {
      onAdd(value.trim());
      setValue('');
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={handleKeyUp}
      />
    </header>
  );
}
