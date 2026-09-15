import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Enter your email and password to continue.');
      return;
    }
    login(email);
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-paper dark:bg-ink">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-lg bg-cobalt-500 flex items-center justify-center text-white font-display font-bold">A</div>
          <span className="font-display font-bold text-xl">Attendly</span>
        </div>
        <div className="card p-6">
          <h1 className="font-display font-bold text-xl mb-1">Welcome back</h1>
          <p className="text-sm text-ink-muted mb-5">Log in to track today's attendance.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@college.edu" />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            {error && <p className="text-xs text-crit">{error}</p>}
            <Button type="submit" className="mt-2 w-full">Log in</Button>
          </form>
        </div>
        <p className="text-center text-sm text-ink-muted mt-4">
          New here?{' '}
          <Link to="/register" className="text-cobalt-500 font-medium hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
