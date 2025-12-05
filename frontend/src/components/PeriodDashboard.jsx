// src/components/PeriodDashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchPeriodSnapshot } from '../api/periodApi';
import { KpiCard } from './KpiCard';

const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'ops', label: 'Ops' },
    { id: 'finance', label: 'Finance' },
];

export function PeriodDashboard() {
    const [selectedPeriod, setSelectedPeriod] = useState(8);
    const [activeTab, setActiveTab] = useState('overview');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            try {
                const snapshot = await fetchPeriodSnapshot(selectedPeriod);
                if (!cancelled) setData(snapshot);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [selectedPeriod]);

    const periodOptions = Array.from({ length: 8 }, (_, i) => i + 1);

    let currentSection = null;
    if (data) {
        if (activeTab === 'overview') currentSection = data.overview;
        else if (activeTab === 'ops') currentSection = data.ops;
        else currentSection = data.finance;
    }

    return (
        <div
            style={{
                padding: '1.5rem',
                maxWidth: 1200,
                margin: '0 auto',
                color: '#F9FAFB',
                fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            }}
        >
            {/* Header */}
            <header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                }}
            >
                <div>
                    <h1 style={{ fontSize: 24, marginBottom: 4 }}>
                        EWT/Fresh Service Dashboard
                    </h1>
                    {data && (
                        <p style={{ fontSize: 13, color: '#9CA3AF' }}>
                            Period {data.periodNumber} · Period end{' '}
                            {data.periodEnd} · Scope:{' '}
                            {currentSection?.scope === 'period'
                                ? 'Period totals'
                                : 'Current year vs last year (YTD)'}
                        </p>
                    )}
                </div>

                {/* Controls */}
                <div
                    style={{
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <label
                            style={{
                                fontSize: 11,
                                color: '#9CA3AF',
                                display: 'block',
                            }}
                        >
                            Period
                        </label>
                        <select
                            value={selectedPeriod}
                            onChange={(e) =>
                                setSelectedPeriod(Number(e.target.value))
                            }
                            style={{
                                padding: '0.35rem 0.5rem',
                                borderRadius: 8,
                                background: '#111827',
                                border: '1px solid #374151',
                                color: '#F9FAFB',
                                fontSize: 13,
                            }}
                        >
                            {periodOptions.map((p) => (
                                <option key={p} value={p}>
                                    Period {p}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Site selection (locked to group for now) */}
                    <div>
                        <label
                            style={{
                                fontSize: 11,
                                color: '#9CA3AF',
                                display: 'block',
                            }}
                        >
                            Site
                        </label>
                        <select
                            value="group"
                            disabled
                            style={{
                                padding: '0.35rem 0.5rem',
                                borderRadius: 8,
                                background: '#020617',
                                border: '1px solid #1F2937',
                                color: '#6B7280',
                                fontSize: 13,
                            }}
                        >
                            <option value="group">
                                Group (DF + PW + overheads)
                            </option>
                        </select>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <nav
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    borderBottom: '1px solid #1F2937',
                    marginBottom: '1rem',
                }}
            >
                {TABS.map((tab) => {
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '0.5rem 0.9rem',
                                borderRadius: 999,
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 13,
                                background: active ? '#111827' : 'transparent',
                                color: active ? '#F9FAFB' : '#9CA3AF',
                            }}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </nav>

            {/* Content */}
            {loading && (
                <div style={{ fontSize: 13, color: '#9CA3AF' }}>Loading…</div>
            )}

            {!loading && !data && (
                <div style={{ fontSize: 13, color: '#9CA3AF' }}>
                    No data loaded yet.
                </div>
            )}

            {!loading && data && currentSection && (
                <>
                    <h2 style={{ fontSize: 18, marginBottom: '0.75rem' }}>
                        {currentSection.title}
                    </h2>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '0.75rem',
                            marginBottom: '1.5rem',
                        }}
                    >
                        {currentSection.metrics.map((m) => (
                            <KpiCard key={m.id} metric={m} />
                        ))}
                    </div>

                    <section
                        style={{
                            borderRadius: 12,
                            padding: '1rem',
                            background: '#020617',
                            border: '1px dashed #1F2937',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 13,
                                color: '#9CA3AF',
                                marginBottom: 4,
                            }}
                        >
                            Charts / detail table placeholder
                        </div>
                        <p style={{ fontSize: 12, color: '#6B7280' }}>
                            This is where you can add:
                            <br />
                            • Trend line for key metrics across periods
                            <br />
                            • Breakdown by BU (distribution / express /
                            containers / WH / CS / Acc/HR)
                            <br />• Comparison vs budget / vs last year
                        </p>
                    </section>
                </>
            )}
        </div>
    );
}
