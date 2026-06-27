import type { Filter } from '../types';

interface Props {
  activeCount: number;
  completedCount: number;
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  onClearCompleted: () => void;
}

export default function TodoFooter({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
  onClearCompleted,
}: Props) {
  if (activeCount + completedCount === 0) return null;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong>{' '}
        {activeCount === 1 ? 'item' : 'items'} left
      </span>
      <ul className="filters">
        {(['all', 'active', 'completed'] as Filter[]).map((f) => (
          <li key={f}>
            <a
              href={`#/${f === 'all' ? '' : f}`}
              className={filter === f ? 'selected' : ''}
              onClick={(e) => {
                e.preventDefault();
                onFilterChange(f);
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
