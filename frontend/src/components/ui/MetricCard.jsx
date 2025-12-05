import React from 'react';

export function MetricCard({ label, value, change, direction, variant = 'default' }) {
    let changeClass = 'metric-change';
    if (direction === 'up' && change && change !== '=') changeClass += ' metric-change-up';
    if (direction === 'down' && change && change !== '=') changeClass += ' metric-change-down';
    if (direction === 'flat' || change === '=' || !change) changeClass += ' metric-change-flat';

    const cardClass =
        'metric-card' +
        (variant === 'primary' ? ' metric-card-primary' : '') +
        (variant === 'muted' ? ' metric-card-muted' : '');

    return (
        <div className={cardClass}>
            <div className="metric-content">
                <div className="metric-label">{label}</div>
                <div className="metric-value">{value}</div>
                {change && change !== '' && (
                    <div className={changeClass}>{change === '=' ? 'No change' : change}</div>
                )}
            </div>
        </div>
    );
}
