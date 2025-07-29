'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const parameters = ['co', 'benzene', 'nmhc', 'nox', 'no2'];

export default function ParameterSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="w-full md:w-1/4">
      <label className="text-sm font-semibold text-gray-700 block mb-1">Parameter</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-white shadow-sm">
          <SelectValue placeholder="Select Parameter" />
        </SelectTrigger>
        <SelectContent>
          {parameters.map((param) => (
            <SelectItem key={param} value={param}>
              {param.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
