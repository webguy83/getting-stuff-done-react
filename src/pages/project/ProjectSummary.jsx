import Avatar from 'components/avatar/Avatar';
import { useAuthContext } from 'hooks/useAuthContext';
import { useFirestore } from 'hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore('projects');
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = () => {
    deleteDocument(project.id);
    navigate('/');
  };
  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className='due-date'>Project due by {project.dueDate.toDate().toDateString()}</p>
        <div className='details'>{project.details}</div>
        <h4>Project is assigned to:</h4>
        <div className='assign-users'>
          {project.assignedUsersList.map((user) => {
            return (
              <div key={user.id}>
                <Avatar src={user.photoURL} />
              </div>
            );
          })}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className='btn' onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
}
