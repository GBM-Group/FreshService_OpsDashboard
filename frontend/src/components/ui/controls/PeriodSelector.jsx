import React from 'react';
import { PERIODS } from '../../../data/constants';

export function PeriodSelector({ value, onChange }) {
    return (
        <div className="period-selector">
            <select
                className="period-select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {PERIODS.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
