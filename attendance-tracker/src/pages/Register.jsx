import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', rollNo: '', course: '', year: '1st Year' });
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Name and email are required.');
      return;
    }
    register(form);
    navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-paper dark:bg-ink">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-9 h-9 rounded-lg bg-cobalt-500 flex items-center justify-center text-white font-display font-bold">A</div>
          <span className="font-display font-bold text-xl">Attendly</span>
        </div>
        <div className="card p-6">
          <h1 className="font-display font-bold text-xl mb-1">Create your account</h1>
          <p className="text-sm text-ink-muted mb-5">Set up your student profile to start tracking attendance.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Aarav Sharma" />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@college.edu" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Roll number" value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} placeholder="CS21B045" />
              <Input label="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="3rd Year" />
            </div>
            <Input label="Course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} placeholder="B.Tech Computer Science" />
            {error && <p className="text-xs text-crit">{error}</p>}
            <Button type="submit" className="mt-2 w-full">Create account</Button>
          </form>
        </div>
        <p className="text-center text-sm text-ink-muted mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-cobalt-500 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
