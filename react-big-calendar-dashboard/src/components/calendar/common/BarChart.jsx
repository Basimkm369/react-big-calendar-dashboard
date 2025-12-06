import { useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

const normalizeChartData = (data) => {
  if (!data) return [];

  return data.map((item, idx) => {
    if (item?.label !== undefined && item?.value !== undefined) {
      return { label: item.label, value: Number(item.value) || 0 };
    }

    const [key, value] = Object.entries(item || {})[0] || [
      `Item ${idx + 1}`,
      0,
    ];

    return { label: key, value: Number(value) || 0 };
  });
};

const BarChart = ({ data }) => {
  const chartData = useMemo(() => normalizeChartData(data), [data]);

  if (!chartData.length) {
    return <p className="bar-chart-empty">No metrics to visualize.</p>;
  }

  return (
    <div className="bar-chart-container">
      <p className="bar-chart-title">Data breakdown</p>
      <div className="bar-chart-chart">
        <ResponsiveContainer width="100%" height={260}>
          <RechartsBarChart
            data={chartData}
            margin={{ top: 10, right: 16, left: 6, bottom: 24 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              interval={0}
              height={44}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              angle={-12}
              textAnchor="end"
            />
            <YAxis allowDecimals={false} width={34} tick={{ fontSize: 12 }} />
            <Tooltip cursor={{ fill: 'rgba(25, 118, 210, 0.08)' }} />
            <Bar dataKey="value" fill="#1976d2" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
