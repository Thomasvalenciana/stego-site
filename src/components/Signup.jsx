import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      alert('✅ Account created successfully!');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#fef9c3' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', width: '300px', textAlign: 'center', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleSignup}
          style={{ width: '100%', padding: '0.5rem', background: '#facc15', color: 'white', border: 'none', borderRadius: '0.25rem' }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
