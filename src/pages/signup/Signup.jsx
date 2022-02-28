import { useSignup } from 'hooks/useSignup';
import { useState } from 'react';
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState('');
  const { signup, isPending, error } = useSignup();

  const handleFileChange = (e) => {
    setThumbnail(null);
    const file = e.target.files[0];

    if (!file) {
      return setThumbnailError('Please select a file');
    }
    if (file.size > 100000) {
      return setThumbnailError('File is too big!');
    }

    setThumbnailError('');
    setThumbnail(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email: </span>
        <input type='email' required onChange={(e) => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>password: </span>
        <input
          type='password'
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name: </span>
        <input
          type='text'
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile thumbnail: </span>
        <input type='file' required accept='image/*' onChange={(e) => handleFileChange(e)} />
      </label>
      {thumbnailError && <div className='error'>{thumbnailError}</div>}
      {!isPending && <button className='btn'>Sign up</button>}
      {isPending && (
        <button className='btn' disabled>
          Loading...
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </form>
  );
}
