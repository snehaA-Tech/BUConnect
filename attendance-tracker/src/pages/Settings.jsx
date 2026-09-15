import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import Modal from '../components/Modal';

export default function Settings() {
  const { settings, updateSettings, resetDemoData } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="flex flex-col gap-5 max-w-lg">
      <h1 className="font-display font-bold text-2xl">Settings</h1>

      <div className="card p-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Dark mode</p>
          <p className="text-xs text-ink-muted mt-0.5">Switch between light and dark theme</p>
        </div>
        <button
          role="switch"
          aria-checked={settings.darkMode}
          onClick={() => updateSettings({ darkMode: !settings.darkMode })}
          className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${settings.darkMode ? 'bg-cobalt-500' : 'bg-ink/15'}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${settings.darkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
      </div>

      <div className="card p-5">
        <p className="text-sm font-medium">Minimum attendance threshold</p>
        <p className="text-xs text-ink-muted mt-0.5 mb-3">Used for warnings and predictions across the app</p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="50"
            max="90"
            step="1"
            value={settings.threshold}
            onChange={(e) => updateSettings({ threshold: Number(e.target.value) })}
            className="flex-1 accent-cobalt-500"
          />
          <span className="font-display font-semibold w-12 text-right">{settings.threshold}%</span>
        </div>
      </div>

      <div className="card p-5">
        <p className="text-sm font-medium">Demo data</p>
        <p className="text-xs text-ink-muted mt-0.5 mb-3">Reset subjects, timetable, calendar and attendance history back to sample data</p>
        <Button variant="outline" onClick={() => setConfirmReset(true)}>Reset to sample data</Button>
      </div>

      <Modal
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset demo data?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { resetDemoData(); setConfirmReset(false); }}>Reset</Button>
          </>
        }
      >
        <p className="text-sm text-ink-muted">This replaces all subjects, timetable entries, calendar events and attendance records with the sample dataset. This can't be undone.</p>
      </Modal>
    </div>
  );
}
