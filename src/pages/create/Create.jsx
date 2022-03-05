import { useEffect, useState } from 'react';
import './Create.css';
import Select from 'react-select';
import { useCollection } from 'hooks/useCollection';
import { useAuthContext } from 'hooks/useAuthContext';
import { firestoreConfig } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
import { useFirestore } from 'hooks/useFirestore';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

export default function Create() {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [users, setUsers] = useState([]);
  const [assignUsers, setAssignUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const { addDocument, response } = useFirestore('projects');
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const { documents } = useCollection('users');

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return {
          value: user,
          label: user.displayName,
        };
      });
      setUsers(options);
    }
  }, [documents]);

  async function handleSubmit(e) {
    const { Timestamp } = firestoreConfig;
    e.preventDefault();
    setFormError(null);

    if (!category) {
      return setFormError('Sorry no category');
    }

    if (assignUsers.length < 1) {
      return setFormError('Sorry no users');
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignUsers.map((u) => {
      return {
        displayName: u.displayName,
        photoURL: u.photoURL,
        id: u.id,
      };
    });

    const project = {
      name,
      details,
      category,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    try {
      await addDocument(project);
      if (!response.error) {
        navigate('/');
      }
    } catch (err) {
      setFormError(err.message);
    }
  }
  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input type='text' required onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            type='date'
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select onChange={(option) => setCategory(option.value)} options={categories} />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(options) => setAssignUsers(options.map((option) => option.value))}
            options={users}
            isMulti
          />
        </label>
        <button className='btn'>Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
}
