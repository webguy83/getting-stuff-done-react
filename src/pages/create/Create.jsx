import { useEffect, useState } from 'react';
import './Create.css';
import Select from 'react-select';
import { useCollection } from 'hooks/useCollection';

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

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, details, dueDate, category, assignUsers);
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
      </form>
    </div>
  );
}
