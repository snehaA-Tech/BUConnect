import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { subjectSummary } from '../utils/attendance';
import SubjectCard from '../components/SubjectCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';

const COLORS = ['#2D5BFF', '#1B8A5A', '#C77D0A', '#8452D5', '#C7402D', '#0EA5A5'];

const emptyForm = { name: '', code: '', teacher: '', room: '', color: COLORS[0] };

export default function Subjects() {
  const { subjects, records, settings, addSubject, editSubject, deleteSubject } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState(null);

  function openAdd() {
    setEditing(null);
    setForm({ ...emptyForm, color: COLORS[subjects.length % COLORS.length] });
    setModalOpen(true);
  }

  function openEdit(subject) {
    setEditing(subject.id);
    setForm(subject);
    setModalOpen(true);
  }

  function save() {
    if (!form.name.trim()) return;
    if (editing) editSubject({ id: editing, ...form });
    else addSubject(form);
    setModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl">Subjects</h1>
          <p className="text-sm text-ink-muted mt-1">Manage your enrolled subjects</p>
        </div>
        <Button onClick={openAdd}>+ Add subject</Button>
      </div>

      {subjects.length === 0 ? (
        <div className="card p-8 text-center text-sm text-ink-muted">No subjects yet — add your first one.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subjects.map((s) => (
            <SubjectCard
              key={s.id}
              subject={s}
              summary={subjectSummary(s.id, records, settings.threshold)}
              onEdit={() => openEdit(s)}
              onDelete={() => setConfirmDelete(s)}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit subject' : 'Add subject'}
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Input label="Subject name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Data Structures" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Subject code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="CS201" />
            <Input label="Classroom" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} placeholder="C-204" />
          </div>
          <Input label="Teacher name" value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} placeholder="Dr. Rao" />
          <div>
            <span className="block text-xs font-medium text-ink-muted mb-1.5">Color</span>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm({ ...form, color: c })}
                  className={`w-7 h-7 rounded-full ${form.color === c ? 'ring-2 ring-offset-2 ring-cobalt-500 dark:ring-offset-ink' : ''}`}
                  style={{ background: c }}
                  aria-label={`Choose color ${c}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete subject?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => { deleteSubject(confirmDelete.id); setConfirmDelete(null); }}>Delete</Button>
          </>
        }
      >
        <p className="text-sm text-ink-muted">
          This removes <strong>{confirmDelete?.name}</strong>, its timetable entries, and its attendance history. This can't be undone.
        </p>
      </Modal>
    </div>
  );
}
