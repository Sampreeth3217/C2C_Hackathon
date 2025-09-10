import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import GlassCard from '../ui/GlassCard';

export default function GaugeCard({ title, value }) {
  const data = [{ name: 'score', value }];
  return (
    <GlassCard>
      <div className="heading mb-2">{title}</div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={180} endAngle={0}>
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background dataKey="value" cornerRadius={10} fill="#7B61FF" />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-2xl font-bold">{value}%</div>
    </GlassCard>
  );
}
