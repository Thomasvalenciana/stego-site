import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('✅ Account created!');
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up 💜</h2>
      {error && <p style={styles.error}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleSignUp} style={styles.button}>
        Sign Up
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f4efff',
    padding: '2rem',
    borderRadius: '16px',
    maxWidth: '400px',
    margin: '5rem auto',
    boxShadow: '0 4px 12px rgba(128, 0, 128, 0.2)',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '1.5rem',
    color: '#6a0dad',
    fontWeight: 'bold',
    fontSize: '1.8rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#8e44ad',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#d8000c',
    marginBottom: '1rem',
  },
};

export default SignUp;
