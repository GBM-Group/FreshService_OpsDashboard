// src/components/KpiCard.jsx
import React from 'react';

function formatValue(value, unit, precision = 0) {
    const rounded =
        precision === 0 ? Math.round(value) : Number(value.toFixed(precision));

    const withThousands = rounded.toLocaleString('en-GB', {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
    });

    if (unit === '£') return `£${withThousands}`;
    if (unit === '%') return `${withThousands}%`;
    return withThousands;
}

export function KpiCard({ metric }) {
    return (
        <div
            style={{
                borderRadius: 12,
                padding: '1rem',
                background: '#111827',
                border: '1px solid #374151',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                minWidth: 0,
            }}
        >
            <div style={{ fontSize: 12, color: '#9CA3AF' }}>{metric.label}</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: '#F9FAFB' }}>
                {formatValue(metric.value, metric.unit, metric.precision)}
            </div>
            {metric.comparisons && metric.comparisons.length > 0 && (
                <div
                    style={{
                        marginTop: 4,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                        fontSize: 11,
                    }}
                >
                    {metric.comparisons.map((c) => {
                        const sign = c.value > 0 ? '+' : '';
                        const isBad = c.label.toLowerCase().includes('cost')
                            ? c.value > 0
                            : c.value < 0;

                        return (
                            <span
                                key={c.label}
                                style={{
                                    padding: '2px 6px',
                                    borderRadius: 999,
                                    background: isBad
                                        ? '#7F1D1D33'
                                        : '#064E3B33',
                                    color: isBad ? '#FECACA' : '#BBF7D0',
                                }}
                            >
                                {c.label}: {sign}
                                {c.value}
                                {c.unit || '%'}
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
