'use client';
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  ComposedChart,
  XAxis, YAxis, Tooltip,
} from 'recharts';
import { ChartDataItem } from '@/types/common'; 


interface Props {
  chartType: 'line' | 'bar' | 'area' | 'composed';
  chartData: ChartDataItem[];
}

export function RenderCharts({ chartType, chartData }: Props) {
  const axisElements = (
    <>
      <XAxis dataKey="datetime" tick={{ fontSize: 10 }} interval={100} />
      <YAxis />
      <Tooltip />
    </>
  );

  switch (chartType) {
    case 'bar':
      return (
        <BarChart data={chartData}>
          {axisElements}
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      );
    case 'area':
      return (
        <AreaChart data={chartData}>
          {axisElements}
          <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#bfdbfe" />
        </AreaChart>
      );
    case 'composed':
      return (
        <ComposedChart data={chartData}>
          {axisElements}
          <Bar dataKey="value" fill="#60a5fa" />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" />
          <Area type="monotone" dataKey="value" fill="#93c5fd" stroke="#2563eb" />
        </ComposedChart>
      );
    case 'line':
    default:
      return (
        <LineChart data={chartData}>
          {axisElements}
          <Line type="monotone" dataKey="value" stroke="#3b82f6" dot={false} />
        </LineChart>
      );
  }
}
