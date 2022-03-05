import Avatar from 'components/avatar/Avatar';
import { Link } from 'react-router-dom';
import './ProjectList.css';

export default function ProjectList({ projects }) {
  return (
    <div className='project-list'>
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => {
        return (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className='assigned-to'>
              <ul>
                {project.assignedUsersList.map((user) => {
                  return (
                    <li key={user.photoURL}>
                      <Avatar src={user.photoURL} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
