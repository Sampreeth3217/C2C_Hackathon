import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import GlassCard from '../ui/GlassCard';

export default function BarChartCard({ title, data, dataKey = 'value', xKey = 'name', color = '#4A90E2' }) {
  return (
    <GlassCard>
      <div className="heading mb-4">{title}</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
