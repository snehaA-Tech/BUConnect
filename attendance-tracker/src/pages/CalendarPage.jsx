import { useState } from 'react';
import { useApp } from '../context/AppContext';
import CalendarEvent from '../components/CalendarEvent';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Select from '../components/Select';
import { todayISO } from '../utils/date';

const TYPES = ['holiday', 'test', 'exam', 'assignment', 'event', 'vacation', 'other'];
const emptyForm = { name: '', date: todayISO(), type: 'event', description: '' };

export default function CalendarPage() {
  const { calendar, addCalendarEvent, deleteCalendarEvent } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState('all');

  const sorted = [...calendar]
    .filter((e) => filter === 'all' || e.type === filter)
    .sort((a, b) => a.date.localeCompare(b.date));

  function save() {
    if (!form.name.trim() || !form.date) return;
    addCalendarEvent(form);
    setForm(emptyForm);
    setModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl">Academic calendar</h1>
          <p className="text-sm text-ink-muted mt-1">Holidays, tests, exams and college events</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>+ Add event</Button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {['all', ...TYPES].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap capitalize transition-colors ${
              filter === t ? 'bg-cobalt-500 text-white' : 'bg-ink/5 dark:bg-white/10 text-ink-muted hover:bg-ink/10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {sorted.length === 0 ? (
          <div className="card p-8 text-center text-sm text-ink-muted">No events found.</div>
        ) : (
          sorted.map((event) => (
            <CalendarEvent key={event.id} event={event} onDelete={() => deleteCalendarEvent(event.id)} />
          ))
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add academic event"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Input label="Event name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Periodical Test — Mathematics" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {TYPES.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </Select>
          </div>
          <Input label="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Syllabus, room, notes…" />
          {form.type === 'holiday' && (
            <p className="text-xs text-ink-muted">Marking this as a holiday means attendance won't be required that day.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
