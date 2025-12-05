// Shared constants and helpers for dashboard data

export const TIME_GRAINS = [
    { id: 'daily', label: 'Daily', disabled: false },
    { id: 'period', label: 'Period', disabled: false },
    { id: 'ytd', label: 'YTD', disabled: true },
];

export const timeGrainLabel = {
    daily: 'Daily',
    period: 'Period',
    ytd: 'YTD',
};

export const PERIODS = [
    { id: '202501', label: 'Period 1' },
    { id: '202502', label: 'Period 2' },
    { id: '202503', label: 'Period 3' },
    { id: '202504', label: 'Period 4' },
    { id: '202505', label: 'Period 5' },
    { id: '202506', label: 'Period 6' },
    { id: '202507', label: 'Period 7' },
    { id: '202508', label: 'Period 8' },
];

export function getPeriodIndex(periodId) {
    const idx = PERIODS.findIndex((p) => p.id === periodId);
    return idx === -1 ? 0 : idx;
}

export const PERIOD_CALENDAR = [
    { number: 1, start: '2025-04-26' },
    { number: 2, start: '2025-05-24' },
    { number: 3, start: '2025-06-21' },
    { number: 4, start: '2025-07-19' },
    { number: 5, start: '2025-08-16' },
    { number: 6, start: '2025-09-13' },
    { number: 7, start: '2025-10-11' },
    { number: 8, start: '2025-11-08' },
];

export function getCurrentPeriodLabel(date = new Date()) {
    const target = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    const schedule = PERIOD_CALENDAR.map((p) => ({
        ...p,
        startDate: new Date(p.start),
    })).sort((a, b) => a.startDate - b.startDate);

    let current = schedule[0];
    for (let i = 0; i < schedule.length; i += 1) {
        if (target >= schedule[i].startDate) {
            current = schedule[i];
        } else {
            break;
        }
    }

    return `Period ${current.number}`;
}

export function getPeriodFactor(periodId) {
    const idx = getPeriodIndex(periodId);
    return 0.96 + idx * 0.012;
}

export function getLast7DayLabels() {
    const today = new Date();
    const labels = [];
    for (let i = 6; i >= 0; i -= 1) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        labels.push(
            d.toLocaleDateString('en-GB', {
                weekday: 'short',
            })
        );
    }
    return labels;
}

export function adjustMetricValue(rawValue, factor) {
    if (typeof rawValue !== 'string') return rawValue;
    if (rawValue.includes('/') || rawValue.includes(':')) return rawValue;

    const isPercent = rawValue.trim().endsWith('%');
    const hasCurrency = rawValue.includes('£');

    const numericStr = rawValue.replace(/[^0-9.-]/g, '');
    const decimals = numericStr.split('.')[1]?.length || 0;
    const base = parseFloat(numericStr);
    if (Number.isNaN(base)) return rawValue;

    const adjusted = base * factor;
    const formatted = adjusted.toLocaleString('en-GB', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    let result = formatted;
    if (hasCurrency) result = `£${formatted}`;
    if (isPercent) result = `${formatted}%`;
    return result;
}

export function adjustMetrics(metrics, factor) {
    return metrics.map((m) => ({
        ...m,
        value: adjustMetricValue(m.value, factor),
    }));
}

export const groupIncomeSeries = [
    { period: 'P1', value: 240000 },
    { period: 'P2', value: 260000 },
    { period: 'P3', value: 275000 },
    { period: 'P4', value: 268000 },
    { period: 'P5', value: 280000 },
    { period: 'P6', value: 292000 },
    { period: 'P7', value: 305000 },
    { period: 'P8', value: 310000 },
];

export const groupNetPLSeries = [
    { period: 'P1', value: -135000 },
    { period: 'P2', value: -125000 },
    { period: 'P3', value: -112000 },
    { period: 'P4', value: -118000 },
    { period: 'P5', value: -104000 },
    { period: 'P6', value: -101000 },
    { period: 'P7', value: -98600 },
    { period: 'P8', value: -96600 },
];

export const distributionVolumeSeries = [
    { period: 'P1', value: 25000 },
    { period: 'P2', value: 25865 },
    { period: 'P3', value: 26340 },
    { period: 'P4', value: 25372 },
    { period: 'P5', value: 26410 },
    { period: 'P6', value: 27080 },
    { period: 'P7', value: 27150 },
    { period: 'P8', value: 27300 },
];

export const warehousePalletSeriesDF = [
    { period: 'P1', value: 12000 },
    { period: 'P2', value: 12430 },
    { period: 'P3', value: 12710 },
    { period: 'P4', value: 12980 },
    { period: 'P5', value: 13120 },
    { period: 'P6', value: 13250 },
    { period: 'P7', value: 13320 },
    { period: 'P8', value: 13400 },
];

export const warehousePalletSeriesPW = [
    { period: 'P1', value: 12100 },
    { period: 'P2', value: 13435 },
    { period: 'P3', value: 13680 },
    { period: 'P4', value: 13820 },
    { period: 'P5', value: 13950 },
    { period: 'P6', value: 14010 },
    { period: 'P7', value: 14080 },
    { period: 'P8', value: 14120 },
];

export const qcCostSeries = [
    { period: 'P1', value: 21000 },
    { period: 'P2', value: 21400 },
    { period: 'P3', value: 21550 },
    { period: 'P4', value: 21620 },
    { period: 'P5', value: 21700 },
    { period: 'P6', value: 21800 },
    { period: 'P7', value: 21900 },
    { period: 'P8', value: 22000 },
];

export const csCostSeries = [
    { period: 'P1', value: 32000 },
    { period: 'P2', value: 34200 },
    { period: 'P3', value: 34500 },
    { period: 'P4', value: 34800 },
    { period: 'P5', value: 35200 },
    { period: 'P6', value: 35600 },
    { period: 'P7', value: 35800 },
    { period: 'P8', value: 36000 },
];

export const DAILY_METRICS = [
    { label: 'Market Delivery On-Time %', value: '96.2%', change: '+0.4%' },
    {
        label: 'Non-Market Delivery On-Time %',
        value: '93.5%',
        change: '+0.3%',
    },
    { label: 'Loading On-Time %', value: '95.0%', change: '-0.2%' },
    { label: 'No of Pallets Down', value: '42', change: '+3' },
    { label: 'No of Pallets Charged LOD', value: '18', change: '+1' },
];

export const DAILY_ISSUES = [
    { label: 'Warehouse Issues', value: '5' },
    { label: 'Distribution Issues', value: '7' },
    { label: 'Admin Issues', value: '2' },
    { label: 'Supply Chain Issues', value: '3' },
    { label: 'Commercial Issues', value: '1' },
    { label: 'Customer Issues', value: '4' },
];

const DAILY_COMPARISON_TEMPLATE = [
    {
        label: 'Market Delivery On-Time %',
        actual: [95.6, 96.0, 96.2, 95.8, 96.4, 96.1, 96.5],
        avg: [94.8, 94.9, 95.0, 95.1, 95.2, 95.3, 95.3],
        color: '#22c55e',
    },
    {
        label: 'Non-Market Delivery On-Time %',
        actual: [92.7, 93.1, 93.4, 93.0, 93.6, 93.3, 93.5],
        avg: [92.1, 92.3, 92.5, 92.6, 92.7, 92.8, 92.9],
        color: '#6366f1',
    },
    {
        label: 'Loading On-Time %',
        actual: [94.8, 95.2, 95.1, 94.9, 94.7, 94.6, 95.0],
        avg: [95.0, 95.0, 95.0, 95.1, 95.1, 95.1, 95.1],
        color: '#22d3ee',
    },
    {
        label: 'No of Pallets Down',
        actual: [38, 40, 42, 43, 41, 44, 42],
        avg: [42, 41, 41, 41, 40, 40, 40],
        color: '#f59e0b',
    },
    {
        label: 'No of Pallets Charged LOD',
        actual: [16, 17, 18, 17, 18, 19, 18],
        avg: [15, 15, 15, 15, 15, 15, 15],
        color: '#ef4444',
    },
];

const DAILY_DAY_LABELS = getLast7DayLabels();

export const DAILY_COMPARISON = DAILY_COMPARISON_TEMPLATE.map((metric) => ({
    label: metric.label,
    color: metric.color,
    data: DAILY_DAY_LABELS.map((day, idx) => ({
        period: day,
        actual: metric.actual[idx] ?? metric.actual[metric.actual.length - 1],
        avg: metric.avg[idx] ?? metric.avg[metric.avg.length - 1],
    })),
}));

export const VEHICLE_VORS = [
    {
        reg: 'AB12 CDE',
        reason: 'Brake issue',
        dateVored: '2025-02-05',
        comments: 'Awaiting parts, eta 2 days',
    },
    {
        reg: 'FG34 HIJ',
        reason: 'Body damage',
        dateVored: '2025-02-06',
        comments: 'At body shop for estimate',
    },
];

export const VEHICLE_SERVICES = [
    {
        ourReg: 'KL56 MNO',
        leaseReg: 'LC-9012',
        leasingCompany: 'LeasePlan',
        leasingColor: '#bfdbfe',
        defects: 2,
    },
    {
        ourReg: 'PQ78 RST',
        leaseReg: 'ARVAL-7788',
        leasingCompany: 'Arval',
        leasingColor: '#fed7aa',
        defects: 0,
    },
    {
        ourReg: 'UV90 XYZ',
        leaseReg: 'LG-4432',
        leasingCompany: 'Lex',
        leasingColor: '#c7d2fe',
        defects: 1,
    },
];

export const VEHICLE_DEFECTS = [
    {
        id: 'DF-1021',
        title: 'Indicator fault (DF)',
        reg: 'AB12 CDE',
        status: 'Open',
        link: '#',
    },
    {
        id: 'DF-1044',
        title: 'Door seal issue (PW)',
        reg: 'FG34 HIJ',
        status: 'In progress',
        link: '#',
    },
];

export const VEHICLE_DEFECTS_RESOLVED = [
    {
        id: 'DF-9901',
        title: 'Mirror replacement',
        reg: 'KL56 MNO',
        resolvedOn: '2025-01-18',
    },
    {
        id: 'DF-9902',
        title: 'Brake pad replacement',
        reg: 'PQ78 RST',
        resolvedOn: '2025-01-12',
    },
];

export const SERVICE_TYPE_COLORS = {
    fridge: '#bfdbfe',
    tacho: '#d9f99d',
    mot: '#fde68a',
    pmi: '#fecdd3',
};

export const SERVICE_SCHEDULE = {
    week: [
        {
            reg: 'KL56 MNO',
            slots: ['pmi', 'fridge', 'tacho', null, null, null, null],
        },
        {
            reg: 'PQ78 RST',
            slots: [null, 'mot', null, 'pmi', null, null, null],
        },
        {
            reg: 'UV90 XYZ',
            slots: [null, null, 'fridge', null, null, null, 'tacho'],
        },
    ],
    period: [
        {
            reg: 'KL56 MNO',
            slots: ['pmi', null, null, 'fridge', null, null, null],
        },
        {
            reg: 'PQ78 RST',
            slots: [null, 'mot', null, null, 'tacho', null, null],
        },
        {
            reg: 'UV90 XYZ',
            slots: [null, null, 'pmi', null, 'fridge', null, null],
        },
    ],
    '12w': [
        {
            reg: 'KL56 MNO',
            slots: ['pmi', 'fridge', null, null, 'pmi', null, 'tacho'],
        },
        {
            reg: 'PQ78 RST',
            slots: ['mot', null, 'fridge', null, 'pmi', null, null],
        },
        {
            reg: 'UV90 XYZ',
            slots: ['pmi', null, null, 'mot', null, 'fridge', null],
        },
    ],
};

export const KPI_BREAKDOWNS = {
    loadNumberTotal: [
        { label: 'DI - Consol', value: '210' },
        { label: 'DI - Dist - Dartford', value: '310' },
        { label: 'DI - Dist - Paddock Wood', value: '285' },
        { label: 'DI - Dist - Sub-Contract (DF/PW)', value: '190' },
        { label: 'DI - Direct - Fresh Service', value: '150' },
        { label: 'DI - Direct - Sub-Contract', value: '140' },
        { label: 'DI - Shunts (DF to PW)', value: '70' },
        { label: 'DI - Shunts (PW to DF)', value: '67' },
    ],
};

export const OPS_KPIS = {
    group: [
        {
            label: 'Load Number',
            value: '1,422',
            change: '+1.8%',
            direction: 'up',
            breakdown: KPI_BREAKDOWNS.loadNumberTotal,
        },
        {
            label: 'Vol - Pals (Arrived)',
            value: '25,865',
            change: '+4.2%',
            direction: 'up',
        },
        {
            label: 'Vol - Pals (Distributed)',
            value: '25,372',
            change: '+3.1%',
            direction: 'up',
        },
        {
            label: 'Total Headcount (Direct + Indirect)',
            value: '134',
            change: '+1',
            direction: 'up',
        },
        {
            label: 'Total Hours',
            value: '9,114',
            change: '-0.9%',
            direction: 'down',
        },
        {
            label: 'Avg Pallets per Load',
            value: '18.2',
            change: '+2.1%',
            direction: 'up',
        },
    ],
    distribution: {
        core: [
            {
                label: 'Load Number',
                value: '1,422',
                change: '+1.8%',
                direction: 'up',
            },
            {
                label: 'Vol. of Pallets (Total)',
                value: '25,372',
                change: '+3.1%',
                direction: 'up',
            },
            {
                label: 'Headcount - Direct',
                value: '97',
                change: '=',
                direction: 'flat',
            },
            {
                label: 'Headcount - Indirect',
                value: '18',
                change: '+1',
                direction: 'up',
            },
            {
                label: 'Hours - Direct',
                value: '7,687',
                change: '-0.5%',
                direction: 'down',
            },
            {
                label: 'Hours - Indirect',
                value: '1,427',
                change: '+0.4%',
                direction: 'up',
            },
            {
                label: 'Fuel Consumption (L)',
                value: '86,400',
                change: '+2.0%',
                direction: 'up',
            },
            {
                label: 'Fuel Spend (£)',
                value: '£121,500',
                change: '+1.2%',
                direction: 'up',
            },
        ],
        splitDFPW: {
            pallets: [
                {
                    site: 'Dartford',
                    label: 'Pallets Distributed',
                    value: '12,900',
                },
                {
                    site: 'Paddock Wood',
                    label: 'Pallets Distributed',
                    value: '12,472',
                },
            ],
            avgPalletsPerLoad: [
                {
                    site: 'Dartford',
                    label: 'Avg Pallets per Load',
                    value: '17.9',
                },
                {
                    site: 'Paddock Wood',
                    label: 'Avg Pallets per Load',
                    value: '18.5',
                },
            ],
        },
        express: [
            {
                label: 'Load Number ',
                value: '184',
                change: '+3.0%',
                direction: 'up',
            },
            {
                label: 'Vol of Pallets',
                value: '1,240',
                change: '+2.1%',
                direction: 'up',
            },
            {
                label: 'Headcount',
                value: '24',
                change: '+1',
                direction: 'up',
            },
            {
                label: 'Hours',
                value: '1,240',
                change: '+2.0%',
                direction: 'up',
            },
        ],
    },
    warehouse: {
        dartford: [
            {
                label: 'Pallets Arrived',
                value: '12,430',
                change: '+3.8%',
                direction: 'up',
            },
            {
                label: 'Pallets Distributed',
                value: '12,210',
                change: '+3.2%',
                direction: 'up',
            },
            {
                label: 'Cases (B/D)',
                value: '84,200',
                change: '+2.6%',
                direction: 'up',
            },
            { label: 'Headcount', value: '48', change: '=', direction: 'flat' },
            {
                label: 'Hours',
                value: '4,423',
                change: '-0.9%',
                direction: 'down',
            },
            {
                label: 'Minutes per Pallet',
                value: '9.8',
                change: '-0.4',
                direction: 'up',
            },
            {
                label: 'Minutes per Box (Breakdown)',
                value: '0.62',
                change: '-0.01',
                direction: 'up',
            },
            {
                label: 'Energy Consumption (kWh)',
                value: '32,800',
                change: '+1.3%',
                direction: 'up',
            },
        ],
        paddockWood: [
            {
                label: 'Pallets Arrived',
                value: '13,435',
                change: '+4.2%',
                direction: 'up',
            },
            {
                label: 'Pallets Distributed',
                value: '13,162',
                change: '+3.6%',
                direction: 'up',
            },
            {
                label: 'Cases (B/D)',
                value: '79,100',
                change: '+1.9%',
                direction: 'up',
            },
            { label: 'Headcount', value: '41', change: '+1', direction: 'up' },
            {
                label: 'Hours',
                value: '3,691',
                change: '-0.7%',
                direction: 'down',
            },
            {
                label: 'Minutes per Pallet',
                value: '8.9',
                change: '-0.3',
                direction: 'up',
            },
            {
                label: 'Minutes per Box (Breakdown)',
                value: '0.58',
                change: '-0.01',
                direction: 'up',
            },
            {
                label: 'Energy Consumption (kWh)',
                value: '29,400',
                change: '+1.0%',
                direction: 'up',
            },
        ],
    },
    qc: [
        {
            label: 'Volume of Pallets',
            value: '2,480',
            change: '+1.2%',
            direction: 'up',
        },
        { label: 'Headcount', value: '9', change: '=', direction: 'flat' },
        { label: 'Hours', value: '640', change: '+0.8%', direction: 'up' },

        {
            label: 'Indirect Costs',
            value: '£21,400',
            change: '+1.5%',
            direction: 'up',
        },
        {
            label: 'Net P&L',
            value: '-£21,400',
            change: '-0.4%',
            direction: 'down',
        },
    ],
    other: {
        cs: [
            { label: 'Headcount', value: '12', change: '+1', direction: 'up' },
            { label: 'Hours', value: '820', change: '+2.0%', direction: 'up' },
            {
                label: 'Indirect Costs',
                value: '£34,200',
                change: '+1.8%',
                direction: 'up',
            },
            {
                label: 'Net P&L',
                value: '-£34,200',
                change: '-0.5%',
                direction: 'down',
            },
        ],
        fa: [
            { label: 'Headcount', value: '6', change: '=', direction: 'flat' },
            { label: 'Hours', value: '420', change: '+0.5%', direction: 'up' },
            {
                label: 'Indirect Costs',
                value: '£18,900',
                change: '+1.1%',
                direction: 'up',
            },
            {
                label: 'Net P&L',
                value: '-£18,900',
                change: '-0.3%',
                direction: 'down',
            },
        ],
        accHr: [
            {
                label: 'Invoices (Processed)',
                value: '1,284',
                change: '+4.4%',
                direction: 'up',
            },
            {
                label: 'Liquidity Days (Debtors / Creditors)',
                value: '43 / 34',
                change: '',
                direction: 'flat',
            },
            { label: 'Headcount', value: '11', change: '=', direction: 'flat' },
            { label: 'Hours', value: '710', change: '+1.3%', direction: 'up' },
            {
                label: 'Indirect Costs (£)',
                value: '£39,500',
                change: '+1.9%',
                direction: 'up',
            },
            {
                label: 'Net P&L (£)',
                value: '-£39,500',
                change: '-0.4%',
                direction: 'down',
            },
        ],
    },
};

export const FINANCE_KPIS = {
    group: [
        {
            label: 'Direct Cost Total',
            value: '£767,400',
            change: '+2.8%',
            direction: 'up',
        },
        {
            label: 'Gross P&L',
            value: '£318,300',
            change: '+2.4%',
            direction: 'up',
        },
        {
            label: 'Indirect Cost Total',
            value: '£301,900',
            change: '+1.9%',
            direction: 'up',
        },
        {
            label: 'Net P&L',
            value: '-£96,600',
            change: '+1.2%',
            direction: 'up',
        },
        {
            label: 'Avg Cost per Pallet',
            value: '£8.20',
            change: '-1.1%',
            direction: 'up',
        },
        {
            label: 'Avg Cost per Load',
            value: '£540',
            change: '-0.8%',
            direction: 'up',
        },
    ],
    distribution: [
        {
            label: 'Income',
            value: '£980,676',
            change: '+3.0%',
            direction: 'up',
        },
        {
            label: 'Direct Costs',
            value: '£642,400',
            change: '+2.7%',
            direction: 'up',
        },
        {
            label: 'Indirect Costs',
            value: '£185,900',
            change: '+1.6%',
            direction: 'up',
        },
        {
            label: 'Net P&L',
            value: '£152,376',
            change: '+1.5%',
            direction: 'up',
        },
        {
            label: 'Net P&L (%)',
            value: '15.5%',
            change: '-0.2%',
            direction: 'down',
        },
        {
            label: 'Avg Income per Load',
            value: '£690',
            change: '+0.6%',
            direction: 'up',
        },
        {
            label: 'Avg Cost per Pallet',
            value: '£8.00',
            change: '-0.4%',
            direction: 'up',
        },
        {
            label: 'Avg Cost per Load',
            value: '£580',
            change: '-0.3%',
            direction: 'up',
        },
        {
            label: 'Avg Margin per Pallet',
            value: '£1.40',
            change: '+0.2%',
            direction: 'up',
        },
        {
            label: 'Avg Margin per Pallet (%)',
            value: '14.9%',
            change: '-0.3%',
            direction: 'down',
        },
        {
            label: 'Avg Margin per Load',
            value: '£110',
            change: '+0.8%',
            direction: 'up',
        },
        {
            label: 'Avg Margin per Load (%)',
            value: '16.0%',
            change: '-0.2%',
            direction: 'down',
        },
    ],
    distributionExpress: [
        {
            label: 'Income',
            value: '£96,400',
            change: '+4.3%',
            direction: 'up',
        },
        {
            label: 'Direct Costs',
            value: '£58,200',
            change: '+3.5%',
            direction: 'up',
        },
        {
            label: 'Gross P&L',
            value: '£38,200',
            change: '+5.0%',
            direction: 'up',
        },
        {
            label: 'Indirect Costs',
            value: '£11,700',
            change: '+2.0%',
            direction: 'up',
        },
        {
            label: 'Net P&L',
            value: '£26,500',
            change: '+6.0%',
            direction: 'up',
        },
    ],
    warehouse: {
        dartford: [
            {
                label: 'Income',
                value: '£125,032',
                change: '+3.6%',
                direction: 'up',
            },
            {
                label: 'Direct Costs',
                value: '£82,500',
                change: '+2.2%',
                direction: 'up',
            },
            {
                label: 'Gross P&L',
                value: '£42,532',
                change: '+2.8%',
                direction: 'up',
            },
            {
                label: 'Indirect Costs',
                value: '£66,017',
                change: '+1.9%',
                direction: 'up',
            },
            {
                label: 'Net P&L',
                value: '-£23,485',
                change: '+1.0%',
                direction: 'up',
            },
            {
                label: 'Net Margin (%)',
                value: '-18.8%',
                change: '+0.8%',
                direction: 'up',
            },
            {
                label: 'Income per Pallet',
                value: '£9.60',
                change: '+0.4%',
                direction: 'up',
            },
            {
                label: 'Income per Box',
                value: '£0.45',
                change: '+0.02',
                direction: 'up',
            },
            {
                label: 'Cost per Pallet - Direct',
                value: '£6.20',
                change: '-0.3%',
                direction: 'up',
            },
            {
                label: 'Cost per Pallet - Indirect',
                value: '£2.10',
                change: '+0.1%',
                direction: 'down',
            },
            {
                label: 'Cost per Box (B/D)',
                value: '£0.32',
                change: '-0.01',
                direction: 'up',
            },
            {
                label: 'Labour Cost per Pallet',
                value: '£3.40',
                change: '-0.1%',
                direction: 'up',
            },
        ],
        paddockWood: [
            {
                label: 'Income',
                value: '£117,776',
                change: '+3.0%',
                direction: 'up',
            },
            {
                label: 'Direct Costs',
                value: '£79,300',
                change: '+2.1%',
                direction: 'up',
            },
            {
                label: 'Gross P&L',
                value: '£38,476',
                change: '+2.5%',
                direction: 'up',
            },
            {
                label: 'Indirect Costs',
                value: '£93,465',
                change: '+1.6%',
                direction: 'up',
            },
            {
                label: 'Net P&L',
                value: '-£54,989',
                change: '+1.3%',
                direction: 'up',
            },
            {
                label: 'Net Margin (%)',
                value: '-46.7%',
                change: '+0.7%',
                direction: 'up',
            },
            {
                label: 'Income per Pallet',
                value: '£9.20',
                change: '+0.3%',
                direction: 'up',
            },
            {
                label: 'Income per Box',
                value: '£0.41',
                change: '+0.01',
                direction: 'up',
            },
            {
                label: 'Cost per Pallet - Direct',
                value: '£6.00',
                change: '-0.2%',
                direction: 'up',
            },
            {
                label: 'Cost per Pallet - Indirect',
                value: '£2.30',
                change: '+0.2%',
                direction: 'down',
            },
            {
                label: 'Cost per Box (B/D)',
                value: '£0.34',
                change: '-0.01',
                direction: 'up',
            },
            {
                label: 'Labour Cost per Pallet',
                value: '£3.25',
                change: '-0.1%',
                direction: 'up',
            },
        ],
    },
    qc: [
        { label: 'Headcount', value: '9', change: '=', direction: 'flat' },
        { label: 'Hours', value: '640', change: '+0.8%', direction: 'up' },
        {
            label: 'Indirect Costs',
            value: '£21,400',
            change: '+1.5%',
            direction: 'up',
        },
        {
            label: 'Net P&L',
            value: '-£21,400',
            change: '-0.4%',
            direction: 'down',
        },
    ],
    other: {
        cs: [
            { label: 'Headcount', value: '12', change: '+1', direction: 'up' },
            { label: 'Hours', value: '820', change: '+2.0%', direction: 'up' },
            {
                label: 'Indirect Costs',
                value: '£34,200',
                change: '+1.8%',
                direction: 'up',
            },
            {
                label: 'Net P&L',
                value: '-£34,200',
                change: '-0.5%',
                direction: 'down',
            },
        ],
        fa: [
            { label: 'Headcount', value: '6', change: '=', direction: 'flat' },
            { label: 'Hours', value: '420', change: '+0.5%', direction: 'up' },
            {
                label: 'Indirect Costs',
                value: '£18,900',
                change: '+1.1%',
                direction: 'up',
            },
            {
                label: 'Net P&L',
                value: '-£18,900',
                change: '-0.3%',
                direction: 'down',
            },
        ],
        accHr: [
            {
                label: 'Invoices (Processed)',
                value: '1,284',
                change: '+4.4%',
                direction: 'up',
            },
            {
                label: 'Liquidity Days (Debtors / Creditors)',
                value: '43 / 34',
                change: '',
                direction: 'flat',
            },
            { label: 'Headcount', value: '11', change: '=', direction: 'flat' },
            { label: 'Hours', value: '710', change: '+1.3%', direction: 'up' },
            {
                label: 'Indirect Costs (£)',
                value: '£39,500',
                change: '+1.9%',
                direction: 'up',
            },
            {
                label: 'Net P&L (£)',
                value: '-£39,500',
                change: '-0.4%',
                direction: 'down',
            },
        ],
    },
};

export const MARGIN_MERGE_RULES = [
    { valueLabel: 'Gross P&L', percentLabel: 'Gross Margin (%)' },
    { valueLabel: 'Net P&L', percentLabel: 'Net P&L (%)' },
    {
        valueLabel: 'Avg Margin per Pallet',
        percentLabel: 'Avg Margin per Pallet (%)',
    },
    {
        valueLabel: 'Avg Margin per Load',
        percentLabel: 'Avg Margin per Load (%)',
    },
];
