import Avatar from 'components/avatar/Avatar';
import { firestoreConfig } from 'firebase/config';
import { useAuthContext } from 'hooks/useAuthContext';
import { useFirestore } from 'hooks/useFirestore';
import { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState('');
  const { updateDocument, response } = useFirestore('projects');
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    const { Timestamp } = firestoreConfig;
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });

    if (!response.error) {
      setNewComment('');
    }
  };

  return (
    <div className='project-comments'>
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => {
            return (
              <li key={comment.id}>
                <div className='comment-author'>
                  <Avatar src={comment.photoURL} />
                  <p>{comment.displayName}</p>
                </div>
                <div className='comment-date'>
                  <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                </div>
                <div className='comment-content'>
                  <p>{comment.content}</p>
                </div>
              </li>
            );
          })}
      </ul>

      <form className='add-comment' onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className='btn'>Add Comment</button>
      </form>
    </div>
  );
}
