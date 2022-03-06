const filters = ['all', 'mine', 'development', 'design', 'marketing', 'sales'];

export default function ProjectFilter({ changeFilter, currentFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className='project-filter'>
      <nav>
        <p>Filter by:</p>
        {filters.map((f) => {
          return (
            <button
              key={f}
              className={currentFilter === f ? 'active' : ''}
              onClick={() => handleClick(f)}
            >
              {f}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
