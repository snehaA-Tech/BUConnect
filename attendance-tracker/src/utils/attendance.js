// Pure calculation helpers — no browser APIs, safe to reuse in React Native later.

export const ATTENDANCE_THRESHOLD_DEFAULT = 75;

/**
 * Records: array of { subjectId, date, status: 'present'|'absent'|'dayoff'|'holiday' }
 * Day off / holiday records are excluded from the percentage entirely (rule #6 and #7).
 */
export function countable(records) {
  return records.filter((r) => r.status === 'present' || r.status === 'absent');
}

export function calcPercentage(records) {
  const c = countable(records);
  if (c.length === 0) return null; // no classes held yet
  const attended = c.filter((r) => r.status === 'present').length;
  return (attended / c.length) * 100;
}

export function calcStats(records) {
  const c = countable(records);
  const attended = c.filter((r) => r.status === 'present').length;
  const missed = c.filter((r) => r.status === 'absent').length;
  const total = c.length;
  const percentage = total === 0 ? null : (attended / total) * 100;
  return { attended, missed, total, percentage };
}

export function attendanceState(percentage, threshold = ATTENDANCE_THRESHOLD_DEFAULT) {
  if (percentage === null || percentage === undefined) return 'none';
  if (percentage >= threshold + 5) return 'safe';
  if (percentage >= threshold) return 'safe';
  if (percentage >= threshold - 10) return 'warn';
  return 'crit';
}

/**
 * How many consecutive future "present" classes are needed to reach the threshold.
 * Formula: find smallest x such that (attended + x) / (total + x) >= threshold/100
 */
export function classesToReachThreshold(attended, total, threshold = ATTENDANCE_THRESHOLD_DEFAULT) {
  const t = threshold / 100;
  if (total === 0) return 0;
  if (attended / total >= t) return 0;
  // (attended + x) >= t * (total + x)  =>  x >= (t*total - attended) / (1 - t)
  const x = (t * total - attended) / (1 - t);
  return Math.max(0, Math.ceil(x - 1e-9));
}

/**
 * How many more classes (out of remaining scheduled, theoretically) can be missed
 * while staying at/above threshold, assuming all counted classes going forward.
 * Formula: find largest y such that attended / (total + y) >= threshold/100
 */
export function classesCanMiss(attended, total, threshold = ATTENDANCE_THRESHOLD_DEFAULT) {
  const t = threshold / 100;
  if (t === 0) return Infinity;
  if (attended / Math.max(total, 1) < t) return 0;
  // attended >= t * (total + y)  =>  y <= attended/t - total
  const y = attended / t - total;
  return Math.max(0, Math.floor(y + 1e-9));
}

export function subjectSummary(subjectId, records, threshold = ATTENDANCE_THRESHOLD_DEFAULT) {
  const subjectRecords = records.filter((r) => r.subjectId === subjectId);
  const { attended, missed, total, percentage } = calcStats(subjectRecords);
  return {
    subjectId,
    attended,
    missed,
    total,
    percentage,
    state: attendanceState(percentage, threshold),
    toReach: percentage !== null ? classesToReachThreshold(attended, total, threshold) : 0,
    canMiss: percentage !== null ? classesCanMiss(attended, total, threshold) : 0,
  };
}

export function overallSummary(records, threshold = ATTENDANCE_THRESHOLD_DEFAULT) {
  const { attended, missed, total, percentage } = calcStats(records);
  return {
    attended,
    missed,
    total,
    percentage,
    state: attendanceState(percentage, threshold),
    toReach: percentage !== null ? classesToReachThreshold(attended, total, threshold) : 0,
    canMiss: percentage !== null ? classesCanMiss(attended, total, threshold) : 0,
  };
}

export function monthlyBreakdown(records) {
  const byMonth = {};
  for (const r of countable(records)) {
    const key = r.date.slice(0, 7);
    byMonth[key] = byMonth[key] || { month: key, present: 0, absent: 0 };
    if (r.status === 'present') byMonth[key].present += 1;
    else byMonth[key].absent += 1;
  }
  return Object.values(byMonth).sort((a, b) => a.month.localeCompare(b.month));
}
