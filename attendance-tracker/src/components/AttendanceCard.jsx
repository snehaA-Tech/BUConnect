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
    <div className="card attendance-class-card relative flex flex-col gap-4 overflow-hidden border-l-4 border-l-teal p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-base font-bold text-maroon-deep">{subject.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            {time} · {subject.room} · {subject.teacher}
          </p>
        </div>
        <span className="mt-1 h-3 w-3 shrink-0 rounded-full ring-4 ring-paper" style={{ background: subject.color }} aria-hidden="true" />
      </div>

      {holiday ? (
        <Badge tone="info">Holiday — no attendance required</Badge>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            <Button
              size="sm"
              variant={currentStatus === 'present' ? 'safe' : 'outline'}
              className={currentStatus === 'present' ? '' : 'border-teal/40 text-teal-deep hover:bg-safe-bg'}
              onClick={() => handlePick('present')}
            >
              Present
            </Button>
            <Button
              size="sm"
              variant={currentStatus === 'absent' ? 'danger' : 'outline'}
              className={currentStatus === 'absent' ? '' : 'border-maroon/35 text-maroon-deep hover:bg-[#F0DCC7]'}
              onClick={() => handlePick('absent')}
            >
              Absent
            </Button>
            <Button
              size="sm"
              variant={currentStatus === 'dayoff' ? 'warn' : 'outline'}
              className={currentStatus === 'dayoff' ? '' : 'border-gold/60 text-ink hover:bg-warn-bg'}
              onClick={() => handlePick('dayoff')}
            >
              Day Off
            </Button>
          </div>

          {record?.status && (
            <div className="flex items-center justify-between">
              <Badge tone={STATUS_META[record.status].tone}>Marked: {STATUS_META[record.status].label}</Badge>
              <button onClick={openNote} className="text-xs text-teal-deep font-semibold hover:underline">
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
