import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (loading) return; // prevent double-clicks
    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      setSuccess(true); // ✅ trigger message
      setTimeout(() => {
        navigate('/'); // redirect after 2.5s
      }, 2500);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {success ? (
          <p className="text-green-600 font-semibold text-center mb-4">
            🎉 Account successfully created! Redirecting...
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              onClick={handleSignup}
              disabled={loading}
              className={`bg-yellow-500 text-white px-4 py-2 rounded w-full transition ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-600'
              }`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
