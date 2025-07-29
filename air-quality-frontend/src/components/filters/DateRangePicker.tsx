'use client';
import { Input } from '@/components/ui/input';
import { CalendarIcon } from 'lucide-react';

export default function DateRangePicker({
    fromDate,
    toDate,
    setFromDate,
    setToDate,
}: {
    fromDate: string;
    toDate: string;
    setFromDate: (val: string) => void;
    setToDate: (val: string) => void;
}) {
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
            <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-1">
                    <CalendarIcon className="w-4 h-4" /> From
                </label>
                <Input type="date" className="bg-white" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1 mb-1">
                    <CalendarIcon className="w-4 h-4" /> To
                </label>
                <Input type="date" className="bg-white" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>
        </div>
    );
}
