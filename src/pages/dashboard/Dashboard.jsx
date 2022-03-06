import ProjectList from 'components/project-list/ProjectList';
import { useAuthContext } from 'hooks/useAuthContext';
import { useCollection } from 'hooks/useCollection';
import { useState } from 'react';
import './Dashboard.css';
import ProjectFilter from './ProjectFilter';

export default function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { documents, error } = useCollection('projects');
  const { user } = useAuthContext();

  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case 'mine':
            return document.assignedUsersList.every((assignedUser) => assignedUser.id === user.uid);
          case 'development':
          case 'design':
          case 'sales':
          case 'marketing':
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter} />}
      {documents && <ProjectList projects={projects} />}
    </div>
  );
}
