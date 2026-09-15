import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { overallSummary } from '../utils/attendance';
import Input from '../components/Input';
import Button from '../components/Button';
import ProgressRing from '../components/ProgressRing';

export default function Profile() {
  const { profile, updateProfile, logout } = useAuth();
  const { records, settings, subjects } = useApp();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const overall = overallSummary(records, settings.threshold);

  function save() {
    updateProfile(form);
    setEditing(false);
  }

  return (
    <div className="flex flex-col gap-5 max-w-lg">
      <h1 className="font-display font-bold text-2xl">Profile</h1>

      <div className="card p-5 flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-display font-bold text-xl shrink-0"
          style={{ background: profile.avatarColor }}
        >
          {profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-lg truncate">{profile.name}</p>
          <p className="text-xs text-ink-muted truncate">{profile.email}</p>
          <p className="text-xs text-ink-muted mt-0.5">{profile.course} · {profile.year} · Roll {profile.rollNo}</p>
        </div>
      </div>

      <div className="card p-5 flex items-center gap-5">
        <ProgressRing percentage={overall.percentage} state={overall.state} size={96} />
        <div>
          <p className="text-sm font-medium">Attendance summary</p>
          <p className="text-xs text-ink-muted mt-1">{subjects.length} subjects tracked</p>
          <p className="text-xs text-ink-muted">{overall.attended} attended · {overall.missed} missed</p>
        </div>
      </div>

      {editing ? (
        <div className="card p-5 flex flex-col gap-3">
          <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Roll number" value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} />
            <Input label="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
          </div>
          <Input label="Course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={() => { setForm(profile); setEditing(false); }}>Cancel</Button>
            <Button onClick={save}>Save changes</Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setEditing(true)}>Edit profile</Button>
      )}

      <Button variant="ghost" className="text-crit w-fit" onClick={logout}>Log out</Button>
    </div>
  );
}
