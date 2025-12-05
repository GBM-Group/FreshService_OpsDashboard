import React, { useState } from 'react';
import {
    DAILY_COMPARISON,
    DAILY_ISSUES,
    DAILY_METRICS,
    VEHICLE_VORS,
    VEHICLE_DEFECTS,
    VEHICLE_DEFECTS_RESOLVED,
    SERVICE_SCHEDULE,
    SERVICE_TYPE_COLORS,
} from '../../data/constants';
import { Section } from '../ui/Section';
import { MetricCard } from '../ui/MetricCard';
import { DailyComparisonChart } from '../ui/DailyComparisonChart';

export function DailyView() {
    const [vors, setVors] = useState(VEHICLE_VORS);
    const [serviceGrain, setServiceGrain] = useState('week');
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [expandedPanel, setExpandedPanel] = useState(null); // 'vors' | 'defects' | null
    const [isComplianceCollapsed, setIsComplianceCollapsed] = useState(false);
    const [serviceSchedule, setServiceSchedule] = useState(() => ({
        week: SERVICE_SCHEDULE.week.map((row) => ({
            ...row,
            slots: [...row.slots],
        })),
        period: SERVICE_SCHEDULE.period.map((row) => ({
            ...row,
            slots: [...row.slots],
        })),
        '12w': SERVICE_SCHEDULE['12w'].map((row) => ({
            ...row,
            slots: [...row.slots],
        })),
    }));

    const handleVorChange = (idx, field, value) => {
        setVors((prev) =>
            prev.map((v, i) => (i === idx ? { ...v, [field]: value } : v))
        );
    };

    const SLOT_COUNTS = { week: 7, period: 28, '12w': 84 };
    const expandSlots = (slots, count) =>
        Array.from(
            { length: count },
            (_, i) => slots[i % slots.length] || null
        );

    const handleAddVehicle = () => {
        const newReg = `NEW-${Math.floor(Math.random() * 900 + 100)}`;
        const slotCount = SLOT_COUNTS[serviceGrain] || 7;
        const newRow = { reg: newReg, slots: Array(slotCount).fill(null) };
        setServiceSchedule((prev) => ({
            ...prev,
            [serviceGrain]: [...prev[serviceGrain], newRow],
        }));
    };

    return (
        <>
            <Section title="Daily Performance" variant="group">
                <div className="metrics-grid daily-metrics">
                    {DAILY_METRICS.map((m, idx) => (
                        <MetricCard
                            key={m.label}
                            {...m}
                            variant={idx < 3 ? 'primary' : 'default'}
                        />
                    ))}
                </div>
            </Section>

            <Section title="Non-Conformance Issues">
                <div className="metrics-grid split-grid">
                    {DAILY_ISSUES.map((issue) => (
                        <MetricCard
                            key={issue.label}
                            label={issue.label}
                            value={issue.value}
                            change=""
                            direction="flat"
                            variant="muted"
                        />
                    ))}
                </div>
            </Section>

            <Section title="Daily vs 7-day rolling average">
                <div className="chart-row">
                    {DAILY_COMPARISON.map((c) => (
                        <DailyComparisonChart
                            key={c.label}
                            title={c.label}
                            data={c.data}
                            color={c.color}
                        />
                    ))}
                </div>
            </Section>
            <Section title="Vehicle Compliance">
                <div className="section-toggle-row">
                    <div className="section-subtitle">
                        Fleet readiness at a glance
                    </div>
                    <button
                        type="button"
                        className="ghost-button"
                        onClick={() => {
                            setIsComplianceCollapsed((c) => {
                                const next = !c;
                                if (next) setExpandedPanel(null);
                                return next;
                            });
                        }}
                        aria-expanded={!isComplianceCollapsed}
                    >
                        {isComplianceCollapsed ? 'Expand' : 'Collapse'}
                    </button>
                </div>

                {!isComplianceCollapsed && (
                    <div className="compliance-card">
                        <div className="compliance-grid-2">
                            <div className="compliance-tile">
                                <div className="compliance-tile-header">
                                    <div>
                                        <div className="compliance-tile-title">
                                            VORs
                                        </div>
                                        <div className="compliance-tile-sub">
                                            Vehicles Off Road
                                        </div>
                                    </div>
                                    <div className="compliance-tile-number">
                                        {vors.length}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="compliance-summary button-link"
                                onClick={() =>
                                    setExpandedPanel((p) =>
                                        p === 'vors' ? null : 'vors'
                                    )
                                }
                                aria-expanded={expandedPanel === 'vors'}
                            >
                                Expand for details
                            </button>
                                {expandedPanel === 'vors' && (
                                    <div className="compliance-dropdown">
                                        <div className="dropdown-header">
                                            <div className="dropdown-title">
                                                Vehicles Off Road
                                            </div>
                                            <button
                                                type="button"
                                                className="ghost-button"
                                                onClick={() =>
                                                    setExpandedPanel(null)
                                                }
                                            >
                                                Close
                                            </button>
                                        </div>
                                        <div className="dropdown-body">
                                            {vors.map((v, idx) => (
                                                <div
                                                    key={v.reg}
                                                    className="overlay-row"
                                                >
                                                    <div className="overlay-row-title">
                                                        {v.reg}
                                                    </div>
                                                    <div className="compliance-fields inline">
                                                        <label>
                                                            Reason
                                                            <input
                                                                value={
                                                                    v.reason
                                                                }
                                                                onChange={(e) =>
                                                                    handleVorChange(
                                                                        idx,
                                                                        'reason',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </label>
                                                        <label>
                                                            Date VORed
                                                            <input
                                                                type="date"
                                                                value={
                                                                    v.dateVored
                                                                }
                                                                onChange={(e) =>
                                                                    handleVorChange(
                                                                        idx,
                                                                        'dateVored',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </label>
                                                        <label className="wide">
                                                            Comments
                                                            <textarea
                                                                value={
                                                                    v.comments
                                                                }
                                                                onChange={(e) =>
                                                                    handleVorChange(
                                                                        idx,
                                                                        'comments',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="compliance-tile">
                                <div className="compliance-tile-header">
                                    <div>
                                        <div className="compliance-tile-title">
                                            Current defects
                                        </div>
                                        <div className="compliance-tile-sub">
                                            Open items
                                        </div>
                                    </div>
                                    <div className="compliance-tile-number">
                                        {VEHICLE_DEFECTS.length}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="compliance-summary button-link"
                                onClick={() =>
                                    setExpandedPanel((p) =>
                                        p === 'defects' ? null : 'defects'
                                    )
                                }
                                aria-expanded={expandedPanel === 'defects'}
                            >
                                Expand for details
                            </button>
                                {expandedPanel === 'defects' && (
                                    <div className="compliance-dropdown">
                                        <div className="dropdown-header">
                                            <div className="dropdown-title">
                                                Current defects
                                            </div>
                                            <button
                                                type="button"
                                                className="ghost-button"
                                                onClick={() =>
                                                    setExpandedPanel(null)
                                                }
                                            >
                                                Close
                                            </button>
                                        </div>
                                        <div className="dropdown-body">
                                            <div className="compliance-list">
                                                {VEHICLE_DEFECTS.map((d) => (
                                                    <button
                                                        key={d.id}
                                                        type="button"
                                                        className="defect-button"
                                                        onClick={() =>
                                                            setSelectedVehicle(
                                                                d.reg
                                                            )
                                                        }
                                                    >
                                                        <div className="defect-title">
                                                            {d.id} · {d.title}
                                                        </div>
                                                        <div className="defect-meta">
                                                            {d.status}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="compliance-section services">
                            <div className="services-header">
                                <div className="compliance-section-title">
                                    Services required
                                </div>
                                <div className="services-actions">
                                    <div className="pill-toggle">
                                        {[
                                            { id: 'week', label: 'Week' },
                                            { id: 'period', label: 'Period' },
                                            { id: '12w', label: '12-week' },
                                        ].map((g) => (
                                            <button
                                                key={g.id}
                                                type="button"
                                                className={
                                                    'pill-toggle-option' +
                                                    (serviceGrain === g.id
                                                        ? ' pill-toggle-active'
                                                        : '')
                                                }
                                                onClick={() =>
                                                    setServiceGrain(g.id)
                                                }
                                            >
                                                {g.label}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="ghost-button"
                                        onClick={handleAddVehicle}
                                    >
                                        Add vehicle
                                    </button>
                                </div>
                            </div>

                            <div className="services-grid">
                                <div className="services-legend">
                                    {Object.entries(SERVICE_TYPE_COLORS).map(
                                        ([type, color]) => (
                                            <div
                                                key={type}
                                                className="legend-item"
                                            >
                                                <span
                                                    className="legend-swatch"
                                                    style={{
                                                        background: color,
                                                    }}
                                                />
                                                <span className="legend-label">
                                                    {type.toUpperCase()}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="services-matrix">
                                    {serviceSchedule[serviceGrain].map(
                                        (row) => {
                                            const slotCount =
                                                SLOT_COUNTS[serviceGrain] || 7;
                                            const expandedSlots = expandSlots(
                                                row.slots,
                                                slotCount
                                            );
                                            const minWidth =
                                                slotCount * 22 + 170;
                                            return (
                                                <div
                                                    key={row.reg}
                                                    className="services-row"
                                                >
                                                    <button
                                                        type="button"
                                                        className={
                                                            'service-reg' +
                                                            (selectedVehicle ===
                                                            row.reg
                                                                ? ' service-reg-active'
                                                                : '')
                                                        }
                                                        onClick={() =>
                                                            setSelectedVehicle(
                                                                row.reg
                                                            )
                                                        }
                                                    >
                                                        {row.reg}
                                                    </button>
                                                    <div
                                                        className="service-slots"
                                                        style={{
                                                            gridTemplateColumns: `repeat(${slotCount}, 1fr)`,
                                                            minWidth: `${minWidth}px`,
                                                        }}
                                                    >
                                                        {expandedSlots.map((slot, idx) => {
                                                            const color = slot ? SERVICE_TYPE_COLORS[slot] : null;
                                                            return (
                                                                <div
                                                                    key={`${row.reg}-${idx}`}
                                                                    className={
                                                                        'service-slot' +
                                                                        (color ? ' service-slot-filled' : '')
                                                                    }
                                                                    style={{
                                                                        background: color || 'var(--bg-elevated-soft)',
                                                                        borderColor: color
                                                                            ? 'rgba(15,23,42,0.12)'
                                                                            : undefined,
                                                                    }}
                                                                    title={slot ? slot.toUpperCase() : 'No service'}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            {selectedVehicle && (
                                <div className="services-details">
                                    <div className="services-details-title">
                                        {selectedVehicle} · Defects & history
                                    </div>
                                    <div className="services-details-grid">
                                        <div>
                                            <div className="services-details-sub">
                                                Current defects
                                            </div>
                                            <div className="compliance-list">
                                                {VEHICLE_DEFECTS.filter(
                                                    (d) =>
                                                        d.reg ===
                                                        selectedVehicle
                                                ).map((d) => (
                                                    <div
                                                        key={d.id}
                                                        className="defect-chip"
                                                    >
                                                        {d.id} · {d.title} ·{' '}
                                                        {d.status}
                                                    </div>
                                                ))}
                                                {VEHICLE_DEFECTS.filter(
                                                    (d) =>
                                                        d.reg ===
                                                        selectedVehicle
                                                ).length === 0 && (
                                                    <div className="defect-empty">
                                                        No open defects
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="services-details-sub">
                                                Resolved defects
                                            </div>
                                            <div className="compliance-list">
                                                {VEHICLE_DEFECTS_RESOLVED.filter(
                                                    (d) =>
                                                        d.reg ===
                                                        selectedVehicle
                                                ).map((d) => (
                                                    <div
                                                        key={d.id}
                                                        className="defect-chip resolved"
                                                    >
                                                        {d.id} · {d.title} ·{' '}
                                                        {d.resolvedOn}
                                                    </div>
                                                ))}
                                                {VEHICLE_DEFECTS_RESOLVED.filter(
                                                    (d) =>
                                                        d.reg ===
                                                        selectedVehicle
                                                ).length === 0 && (
                                                    <div className="defect-empty">
                                                        No resolved defects
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </Section>
        </>
    );
}
