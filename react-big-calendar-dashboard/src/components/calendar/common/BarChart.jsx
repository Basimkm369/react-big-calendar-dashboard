import { useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Cell,
} from 'recharts';
import { Tooltip as ReactTooltip } from 'react-tooltip';

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

  if (!chartData?.length) {
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
            <Bar
              dataKey="value"
              fill="#6d4bff"
              stroke="#5a3bff"
              radius={[6, 6, 0, 0]}
              barSize={32}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.label}
                  data-tooltip-id="bar-tooltip"
                  data-label={entry.label}
                  data-value={entry.value}
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
      <ReactTooltip
        id="bar-tooltip"
        place="top"
        variant="light"
        className="bar-tooltip"
        render={({ activeAnchor }) => {
          if (!activeAnchor?.getAttribute) return null;
          const label = activeAnchor.getAttribute('data-label');
          const value = activeAnchor.getAttribute('data-value');
          if (!label) return null;
          return (
            <div className="bar-tooltip-content">
              <div className="bar-tooltip-label">{label}</div>
              <div className="bar-tooltip-value">Value: {value}</div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default BarChart;
