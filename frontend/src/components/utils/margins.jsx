import React from 'react';
import { MARGIN_MERGE_RULES } from '../../data/constants';

export function collapseMarginPairs(metrics) {
    const used = new Set();
    const result = [];

    metrics.forEach((metric, idx) => {
        if (used.has(idx)) return;

        const rule = MARGIN_MERGE_RULES.find((r) => r.valueLabel === metric.label);

        if (rule) {
            const percentIdx = metrics.findIndex(
                (m, i) => !used.has(i) && m.label === rule.percentLabel
            );

            if (percentIdx !== -1) {
                used.add(idx);
                used.add(percentIdx);
                const percentMetric = metrics[percentIdx];
                const mergedLabel = percentMetric.label.replace(/\s*\(%\)/, '');
                const mergedValue = (
                    <span className="metric-value-combo">
                        {metric.value}{' '}
                        <span className="metric-percentage">| {percentMetric.value}</span>
                    </span>
                );

                result.push({
                    ...metric,
                    label: mergedLabel,
                    value: mergedValue,
                });
                return;
            }
        }

        used.add(idx);
        result.push(metric);
    });

    return result;
}
