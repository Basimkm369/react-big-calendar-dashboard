import { render, screen } from '@testing-library/react';
import BarChart from './BarChart';

// Lightweight mock for recharts primitives to avoid layout dependencies in jsdom.
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="responsive">{children}</div>,
  BarChart: ({ data, children }) => (
    <div data-testid="bar-chart">
      data:{JSON.stringify(data)}
      {children}
    </div>
  ),
  CartesianGrid: () => <div data-testid="grid" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Bar: () => <div data-testid="bar" />,
}));

describe('BarChart', () => {
  it('renders empty message when no data', () => {
    render(<BarChart data={[]} />);
    expect(screen.getByText(/No metrics to visualize/i)).toBeInTheDocument();
  });

  it('renders labels and values when data present', () => {
    const data = [{ user_1: 2 }, { label: 'Orders', value: 5 }];
    render(<BarChart data={data} />);

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByText(/data breakdown/i)).toBeInTheDocument();
    expect(screen.getByText(/user_1/i)).toBeInTheDocument();
    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
  });
});
