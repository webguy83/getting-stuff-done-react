import Avatar from 'components/avatar/Avatar';

export default function ProjectSummary({ project }) {
  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
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
    </div>
  );
}
