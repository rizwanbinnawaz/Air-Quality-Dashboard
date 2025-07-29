'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { LineChartIcon } from 'lucide-react';

const chartTypes = ['line', 'bar', 'area', 'composed'];

export default function ChartTypeSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="max-w-[400px] flex flex-col justify-center items-center">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-1 text-center">
        <LineChartIcon className="w-4 h-4" />
        Chart Type
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white shadow-sm w-[200px]">
          <SelectValue placeholder="Select Chart Type" />
        </SelectTrigger>
        <SelectContent>
          {chartTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
