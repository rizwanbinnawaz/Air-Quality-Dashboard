'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon, } from 'lucide-react';
import {
  ResponsiveContainer,
} from 'recharts';
import ChartTypeSelect from '@/components/filters/ChartTypeSelect';
import ParameterSelect from '@/components/filters/ParameterSelect';
import DateRangePicker from '@/components/filters/DateRangePicker';
import { apiClient } from '@/lib/apiClient';
import { ChartDataItem } from '@/types/common';
import { RenderCharts } from '@/components/chart/RenderCharts';


export default function Home() {
  const [selectedParam, setSelectedParam] = useState('co');
  const [fromDate, setFromDate] = useState('2004-03-01');
  const [toDate, setToDate] = useState('2004-04-01');
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<any>('line');

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<any[]>('/data/range', {
        from: fromDate,
        to: toDate,
      });

      const processed = data.map((item) => ({
        datetime: new Date(item.datetime).toLocaleString(),
        value: item[selectedParam] ?? item.sensors?.[selectedParam] ?? null,
      }));

      setChartData(processed);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // fetch once on load
  }, [selectedParam]);


  return (
    <main
      className="p-6 space-y-8 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(120deg, #fddb92 0%, #d1fdff 100%)`
      }}
    >
      {/* Filter Section */}
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-xl border-none bg-white/70 backdrop-blur-md">
          <CardContent className="flex flex-col md:flex-row md:items-end gap-6 p-6">
            <ParameterSelect value={selectedParam} onChange={setSelectedParam} />
            <DateRangePicker fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
            <div className="w-full max-w-[300px]">
              <Button onClick={fetchData} disabled={loading} className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                <RefreshCwIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Loading...' : 'Refresh'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Type Selector */}
      <div className="flex justify-center">
        <ChartTypeSelect value={chartType} onChange={setChartType} />
      </div>

      {/* Chart Display */}
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-2xl border-none bg-white/80 backdrop-blur-md">
          <CardContent className="h-[340px] p-6">
            {loading ? (
              <div className="h-full flex items-center justify-center text-blue-500 font-semibold animate-pulse">
                Loading chart...
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                {RenderCharts({ chartType, chartData })}
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-center text-lg">
                No data found for selected filter.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Developed by */}
      <div className='w-full text-center text-sm text-gray-600'>Air Qulaity Data Developed by: rizwanbinnawaz@gmail.com</div>
    </main>

  );
}
