import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import GlassCard from '../ui/GlassCard';

const COLORS = ['#4A90E2', '#7B61FF', '#34D399', '#F59E0B', '#EF4444'];

export default function PieChartCard({ title, data }) {
  return (
    <GlassCard>
      <div className="heading mb-4">{title}</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
