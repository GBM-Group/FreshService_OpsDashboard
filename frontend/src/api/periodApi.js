// src/api/periodApi.js

// For now we ignore DF/PW and just model "group" site
export async function fetchPeriodSnapshot(periodNumber) {
    const base = 100000;
    const factor = 1 + (periodNumber - 1) * 0.05;

    function mk(id, label, value, unit = '£', precision = 0, comparisons = []) {
        return { id, label, value, unit, precision, comparisons };
    }

    return {
        periodNumber,
        periodEnd: `2025-0${Math.min(9, periodNumber)}-15`,
        site: 'group',
        overview: {
            title: 'Group overview',
            scope: 'period',
            metrics: [
                mk('income', 'Income', base * factor, '£', 0, [
                    { label: 'vs last period', value: 3.2, unit: '%' },
                    { label: 'vs last year', value: 5.7, unit: '%' },
                ]),
                mk('gp', 'Gross profit', base * 0.35 * factor, '£', 0, [
                    { label: 'margin', value: 35, unit: '%' },
                ]),
                mk('np', 'Net profit', base * 0.08 * factor, '£', 0, [
                    { label: 'margin', value: 8, unit: '%' },
                ]),
            ],
        },
        ops: {
            title: 'Operational performance',
            scope: 'period',
            metrics: [
                mk(
                    'vol_pallets',
                    'Pallets handled',
                    25000 * factor,
                    'pallets',
                    0
                ),
                mk('load_no', 'Loads moved', 1400 * factor, 'loads', 0),
                mk('hours', 'Total hours', 9000 * factor, 'hours', 0),
                mk('cost_per_pal', 'Cost per pallet', 4.2 * factor, '£', 2, [
                    { label: 'vs budget', value: 1.1, unit: '%' },
                ]),
                mk('gp_per_pal', 'GP per pallet', 1.3 * factor, '£', 2, [
                    { label: 'vs last year', value: 2.4, unit: '%' },
                ]),
            ],
        },
        finance: {
            title: 'P&L view',
            scope: 'period',
            metrics: [
                mk('income_f', 'Income', base * factor, '£'),
                mk('direct_costs', 'Direct costs', base * 0.55 * factor, '£'),
                mk(
                    'indirect_costs',
                    'Indirect costs',
                    base * 0.3 * factor,
                    '£'
                ),
                mk('gp_f', 'Gross profit', base * 0.15 * factor, '£'),
                mk('gp_margin', 'Gross margin', 15 * factor, '%', 1),
                mk('np_f', 'Net profit', base * 0.08 * factor, '£'),
                mk('np_margin', 'Net margin', 8 * factor, '%', 1),
            ],
        },
    };
}
