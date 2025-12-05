import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ReferenceDot,
} from 'recharts';

function sanitizeId(title) {
    return `grad-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

export function ChartCard({ title, series, color = '#2563eb', highlightPeriod }) {
    const gridColor = 'var(--border-subtle)';
    const axisColor = 'var(--text-muted)';
    const values = series.map((s) => s.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const spread = Math.max(maxVal - minVal, 1);
    const pad = spread * 0.15;
    const domain = [
        Math.floor((minVal - pad) / 1000) * 1000,
        Math.ceil((maxVal + pad) / 1000) * 1000,
    ];
    const gradientId = sanitizeId(title);

    return (
        <div className="chart-card">
            <div className="chart-title">{title}</div>
            <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series} margin={{ top: 5, right: 12, bottom: 0, left: 0 }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 4" stroke={gridColor} vertical={false} />
                        <XAxis
                            dataKey="period"
                            tickLine={false}
                            axisLine={false}
                            fontSize={10}
                            tick={{ fill: axisColor }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            fontSize={10}
                            tick={{ fill: axisColor }}
                            stroke={gridColor}
                            width={40}
                            domain={domain}
                            tickFormatter={(v) =>
                                Math.abs(v) >= 1000 ? `${Math.round(v / 1000)}k` : v
                            }
                        />
                        <Tooltip
                            contentStyle={{
                                fontSize: 11,
                                borderRadius: 10,
                                border: `1px solid ${gridColor}`,
                                boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
                                background: 'var(--bg-elevated)',
                                color: 'var(--text-main)',
                            }}
                            formatter={(value) => [value, title]}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2.6}
                            fill={`url(#${gradientId})`}
                            dot={{ r: 3.2, strokeWidth: 1, fill: '#fff' }}
                            activeDot={{ r: 5 }}
                        />
                        {highlightPeriod && (
                            <ReferenceDot
                                x={highlightPeriod}
                                y={series.find((point) => point.period === highlightPeriod)?.value}
                                r={6}
                                fill="#fff"
                                stroke={color}
                                strokeWidth={2}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
