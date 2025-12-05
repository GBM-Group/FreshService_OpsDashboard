import React from 'react';
import { TIME_GRAINS } from '../../../data/constants';

export function TimeGrainToggle({ value, onChange }) {
    return (
        <div className="pill-toggle">
            {TIME_GRAINS.map((tg) => (
                <button
                    key={tg.id}
                    className={
                        'pill-toggle-option' +
                        (value === tg.id ? ' pill-toggle-active' : '') +
                        (tg.disabled ? ' pill-toggle-disabled' : '') +
                        (tg.id === 'ytd' ? ' pill-toggle-muted' : '')
                    }
                    onClick={() => !tg.disabled && onChange(tg.id)}
                    disabled={tg.disabled}
                    type="button"
                >
                    {tg.label}
                </button>
            ))}
        </div>
    );
}
