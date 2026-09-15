import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const TOOLTIP_STYLE = {
  background: 'var(--tooltip-bg, #14161F)',
  border: 'none',
  borderRadius: 10,
  fontSize: 12,
  color: 'white',
};

export function MonthlyBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
        <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(45,91,255,0.06)' }} />
        <Bar dataKey="present" stackId="a" fill="#1B8A5A" radius={[0, 0, 0, 0]} name="Present" />
        <Bar dataKey="absent" stackId="a" fill="#C7402D" radius={[4, 4, 0, 0]} name="Absent" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TrendLineChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `${v}%`} />
        <Line type="monotone" dataKey="percentage" stroke="#2D5BFF" strokeWidth={2.5} dot={{ r: 3 }} name="Attendance %" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SubjectPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `${Math.round(v)}%`} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function PresentAbsentBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ left: 8 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Bar dataKey="present" fill="#1B8A5A" name="Present" radius={[0, 4, 4, 0]} />
        <Bar dataKey="absent" fill="#C7402D" name="Absent" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
