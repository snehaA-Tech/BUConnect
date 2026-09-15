import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DAY_NAMES } from '../utils/date';
import TimetableCard from '../components/TimetableCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';

const WEEKDAYS = DAY_NAMES.filter((d) => d !== 'Sunday');

const emptyForm = { subjectId: '', day: 'Monday', start: '09:00 AM', end: '10:00 AM' };

export default function Timetable() {
  const { subjects, timetable, addTimetableEntry, editTimetableEntry, deleteTimetableEntry } = useApp();
  const [activeDay, setActiveDay] = useState('Monday');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const subjectById = Object.fromEntries(subjects.map((s) => [s.id, s]));
  const entries = timetable
    .filter((t) => t.day === activeDay)
    .sort((a, b) => a.start.localeCompare(b.start));

  function openAdd() {
    setEditing(null);
    setForm({ ...emptyForm, day: activeDay, subjectId: subjects[0]?.id || '' });
    setModalOpen(true);
  }

  function openEdit(entry) {
    setEditing(entry.id);
    setForm(entry);
    setModalOpen(true);
  }

  function save() {
    if (!form.subjectId) return;
    if (editing) editTimetableEntry({ id: editing, ...form });
    else addTimetableEntry(form);
    setModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl">Timetable</h1>
          <p className="text-sm text-ink-muted mt-1">Your weekly class schedule</p>
        </div>
        <Button onClick={openAdd} disabled={subjects.length === 0}>+ Add class</Button>
      </div>

      {subjects.length === 0 && (
        <div className="card p-4 text-sm text-ink-muted">Add a subject first from the Subjects page.</div>
      )}

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {WEEKDAYS.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeDay === day
                ? 'bg-cobalt-500 text-white'
                : 'bg-ink/5 dark:bg-white/10 text-ink-muted hover:bg-ink/10'
            }`}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {entries.length === 0 ? (
          <div className="card p-8 text-center text-sm text-ink-muted">No classes on {activeDay}.</div>
        ) : (
          entries.map((entry) => (
            <TimetableCard
              key={entry.id}
              entry={entry}
              subject={subjectById[entry.subjectId]}
              onEdit={() => openEdit(entry)}
              onDelete={() => deleteTimetableEntry(entry.id)}
            />
          ))
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit class' : 'Add class'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Select label="Subject" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </Select>
          <Select label="Day" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>
            {WEEKDAYS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Select>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Start time" type="text" placeholder="09:00 AM" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
            <Input label="End time" type="text" placeholder="10:00 AM" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
