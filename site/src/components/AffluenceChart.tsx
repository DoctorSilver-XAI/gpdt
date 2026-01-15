'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import affluenceData from '@/data/affluence.json';
import { ChevronDown, BarChart3, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DayName = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const days: { key: DayName; label: string }[] = [
    { key: 'Monday', label: 'Lundi' },
    { key: 'Tuesday', label: 'Mardi' },
    { key: 'Wednesday', label: 'Mercredi' },
    { key: 'Thursday', label: 'Jeudi' },
    { key: 'Friday', label: 'Vendredi' },
    { key: 'Saturday', label: 'Samedi' },
    { key: 'Sunday', label: 'Dimanche' },
];

export function AffluenceChart() {
    const [selectedDay, setSelectedDay] = useState<DayName>('Monday');
    const [currentHour, setCurrentHour] = useState<number | null>(null);
    const [isToday, setIsToday] = useState(false);

    useEffect(() => {
        // Set initial day to today
        const now = new Date();
        const dayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        // Convert 0-6 to our DayName keys (Mon=0 in our array logic if we map manually, but getDay is Sun=0)
        const dayMap: DayName[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayName = dayMap[dayIndex];
        setSelectedDay(todayName);
        setCurrentHour(now.getHours());
    }, []);

    useEffect(() => {
        const now = new Date();
        const dayIndex = now.getDay();
        const dayMap: DayName[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        setIsToday(dayMap[dayIndex] === selectedDay);
    }, [selectedDay]);

    const data = affluenceData[selectedDay];
    const maxTraffic = 100; // Normalized data is 0-100

    return (
        <Card className="w-full bg-white shadow-sm border-slate-200">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-semibold text-slate-900">Affluence</CardTitle>
                            <CardDescription>Estimation de la fréquentation</CardDescription>
                        </div>
                    </div>

                    <div className="relative group">
                        <select
                            className="appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 pr-8 cursor-pointer font-medium"
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value as DayName)}
                        >
                            {days.map((day) => (
                                <option key={day.key} value={day.key}>
                                    {day.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Legend and Status */}
                    <div className="flex items-center justify-between text-sm">
                        {isToday && currentHour !== null && (
                            <div className="flex items-center gap-2 text-emerald-600 font-medium animate-in fade-in">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                En ce moment
                            </div>
                        )}
                        {!isToday && <span className="text-slate-500">Horaires habituels pour ce jour</span>}

                        <div className="text-slate-400 text-xs text-right">
                            Basé sur les visites historiques
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="relative h-48 w-full flex items-end justify-between gap-1 pt-6 text-xs text-slate-500">
                        {data.map((item, index) => {
                            const isCurrentHour = isToday && currentHour === item.hour;
                            const heightPercentage = Math.max(item.traffic, 4); // Min height ensures bar is visible (at least 4%)

                            // Determine color intensity based on traffic volume
                            let barColorClass = "bg-emerald-100";
                            if (item.traffic > 66) barColorClass = "bg-emerald-400"; // High traffic
                            else if (item.traffic > 33) barColorClass = "bg-emerald-300"; // Medium traffic
                            else if (item.traffic > 0) barColorClass = "bg-emerald-200"; // Low traffic

                            if (isCurrentHour) barColorClass = "bg-emerald-600 ring-2 ring-emerald-200 ring-offset-2";

                            return (
                                <div key={item.hour} className="flex flex-col items-center justify-end h-full flex-1 group relative">
                                    {/* Tooltip on Hover */}
                                    <div className="absolute bottom-[100%] mb-2 hidden group-hover:flex flex-col items-center z-10">
                                        <div className="bg-slate-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
                                            {item.hour}h - {item.hour + 1}h : {item.traffic > 66 ? 'Élevée' : item.traffic > 33 ? 'Moyenne' : 'Faible'}
                                        </div>
                                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-900"></div>
                                    </div>

                                    {/* The Bar */}
                                    <div
                                        className={cn(
                                            "w-full max-w-[12px] rounded-t-sm transition-all duration-500 ease-out",
                                            barColorClass
                                        )}
                                        style={{ height: `${heightPercentage}%` }}
                                    />

                                    {/* X-Axis Label (every 3 hours) */}
                                    <div className="mt-2 h-4">
                                        {(item.hour % 3 === 0 || item.hour === 9 || item.hour === 12 || item.hour === 15 || item.hour === 18) && (
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap hidden sm:block">
                                                {item.hour}h
                                            </span>
                                        )}
                                        {/* Always show key hours on mobile if needed, or stick to simplified view */}
                                        {(item.hour === 9 || item.hour === 12 || item.hour === 15 || item.hour === 18) && (
                                            <span className="sm:hidden block absolute -bottom-4 left-1/2 -translate-x-1/2">
                                                {item.hour}h
                                            </span>
                                        )}
                                        <span className="sm:block hidden opacity-50 text-[10px]">
                                            {item.hour % 3 === 0 ? `${item.hour}h` : ''}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* X-Axis Line */}
                    <div className="h-px bg-slate-200 w-full mb-1"></div>

                    <div className="flex justify-between w-full text-xs text-slate-400 px-1">
                        <span>06h</span>
                        <span>12h</span>
                        <span>18h</span>
                        <span>23h</span>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
