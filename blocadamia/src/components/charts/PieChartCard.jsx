import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import { useState } from 'react';
import GlassCard from '../ui/GlassCard';

const COLORS = ['#4A90E2', '#7B61FF', '#34D399', '#F59E0B', '#EF4444'];

export default function PieChartCard({ title, data }) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        {/* Outline ring */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={outerRadius + 2}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill="none"
          stroke={fill}
          strokeWidth={3}
        />
      </g>
    );
  };
  return (
    <GlassCard>
      <div className="heading mb-4">{title}</div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
              labelLine={false}
              activeIndex={hoverIndex ?? selectedIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, idx) => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={(_, idx) => setSelectedIndex((prev) => (prev === idx ? null : idx))}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip cursor={false} wrapperStyle={{ outline: 'none' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
