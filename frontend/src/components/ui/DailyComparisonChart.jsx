import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';

export function DailyComparisonChart({ title, data, color }) {
    return (
        <div className="chart-card">
            <div className="chart-title">{title}</div>
            <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 12, bottom: 0, left: 0 }}>
                        <CartesianGrid
                            strokeDasharray="2 4"
                            stroke="var(--border-subtle)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="period"
                            tickLine={false}
                            axisLine={false}
                            fontSize={10}
                            tick={{ fill: 'var(--text-muted)' }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            fontSize={10}
                            tick={{ fill: 'var(--text-muted)' }}
                            width={40}
                        />
                        <Tooltip
                            contentStyle={{
                                fontSize: 11,
                                borderRadius: 10,
                                border: `1px solid var(--border-subtle)`,
                                boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
                                background: 'var(--bg-elevated)',
                                color: 'var(--text-main)',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="avg"
                            stroke="var(--border-subtle)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="actual"
                            stroke={color}
                            strokeWidth={2.4}
                            dot={{ r: 3.2, strokeWidth: 1, fill: '#fff' }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
