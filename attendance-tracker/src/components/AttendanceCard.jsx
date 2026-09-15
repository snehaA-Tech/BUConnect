import { useState } from 'react';
import Button from './Button';
import Modal from './Modal';
import Badge from './Badge';

const STATUS_META = {
  present: { label: 'Present', tone: 'safe' },
  absent: { label: 'Absent', tone: 'crit' },
  dayoff: { label: 'Day Off', tone: 'info' },
  holiday: { label: 'Holiday', tone: 'info' },
};

export default function AttendanceCard({ subject, time, record, holiday, onMark, onNote }) {
  const [pendingStatus, setPendingStatus] = useState(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [noteOpen, setNoteOpen] = useState(false);

  const currentStatus = holiday ? 'holiday' : record?.status;

  function handlePick(status) {
    if (holiday) return;
    if (record?.status) {
      // Already marked — confirm before changing (spec: prevent accidental duplicate / confirm edits)
      setPendingStatus(status);
    } else {
      onMark(status);
    }
  }

  function confirmChange() {
    onMark(pendingStatus);
    setPendingStatus(null);
  }

  function openNote() {
    setNoteDraft(record?.note || '');
    setNoteOpen(true);
  }

  function saveNote() {
    onNote(noteDraft);
    setNoteOpen(false);
  }

  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display font-semibold">{subject.name}</p>
          <p className="text-xs text-ink-muted mt-0.5">
            {time} · {subject.room} · {subject.teacher}
          </p>
        </div>
        <span className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ background: subject.color }} aria-hidden="true" />
      </div>

      {holiday ? (
        <Badge tone="info">Holiday — no attendance required</Badge>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant={currentStatus === 'present' ? 'safe' : 'outline'}
              onClick={() => handlePick('present')}
            >
              Present
            </Button>
            <Button
              size="sm"
              variant={currentStatus === 'absent' ? 'danger' : 'outline'}
              onClick={() => handlePick('absent')}
            >
              Absent
            </Button>
            <Button
              size="sm"
              variant={currentStatus === 'dayoff' ? 'primary' : 'outline'}
              onClick={() => handlePick('dayoff')}
            >
              Day Off
            </Button>
          </div>

          {record?.status && (
            <div className="flex items-center justify-between">
              <Badge tone={STATUS_META[record.status].tone}>Marked: {STATUS_META[record.status].label}</Badge>
              <button onClick={openNote} className="text-xs text-cobalt-500 font-medium hover:underline">
                {record.note ? 'Edit note' : '+ Add note'}
              </button>
            </div>
          )}
          {record?.note && <p className="text-xs text-ink-muted italic">"{record.note}"</p>}
        </>
      )}

      <Modal
        open={!!pendingStatus}
        onClose={() => setPendingStatus(null)}
        title="Change attendance?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setPendingStatus(null)}>Cancel</Button>
            <Button variant="primary" onClick={confirmChange}>Yes, update it</Button>
          </>
        }
      >
        <p className="text-sm text-ink-muted">
          {subject.name} is already marked as{' '}
          <strong>{record?.status && STATUS_META[record.status].label}</strong>. Change it to{' '}
          <strong>{pendingStatus && STATUS_META[pendingStatus].label}</strong>?
        </p>
      </Modal>

      <Modal
        open={noteOpen}
        onClose={() => setNoteOpen(false)}
        title="Attendance note"
        footer={
          <>
            <Button variant="ghost" onClick={() => setNoteOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={saveNote}>Save note</Button>
          </>
        }
      >
        <textarea
          autoFocus
          value={noteDraft}
          onChange={(e) => setNoteDraft(e.target.value)}
          placeholder="e.g. Feeling unwell, College event, Attended a hackathon…"
          rows={3}
          className="w-full rounded-lg border border-ink/10 dark:border-white/10 bg-white dark:bg-ink px-3 py-2 text-sm outline-none focus:border-cobalt-500"
        />
      </Modal>
    </div>
  );
}
