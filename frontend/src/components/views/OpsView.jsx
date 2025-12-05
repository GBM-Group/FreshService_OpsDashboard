import React from 'react';
import {
    OPS_KPIS,
    distributionVolumeSeries,
    warehousePalletSeriesDF,
    warehousePalletSeriesPW,
    csCostSeries,
    qcCostSeries,
    groupIncomeSeries,
    groupNetPLSeries,
    adjustMetrics,
} from '../../data/constants';
import { Section } from '../ui/Section';
import { MetricCard } from '../ui/MetricCard';
import { ChartCard } from '../ui/ChartCard';

export function OpsView({ highlightPeriod, periodFactor }) {
    const adjust = (metrics) => adjustMetrics(metrics, periodFactor);

    return (
        <>
            <Section
                title="Group"
                variant="group"
                footer={
                    <div className="chart-row">
                        <ChartCard
                            title="Group Income"
                            series={groupIncomeSeries}
                            color="#2563eb"
                            highlightPeriod={highlightPeriod}
                        />
                        <ChartCard
                            title="Group Net P&L"
                            series={groupNetPLSeries}
                            color="#16a34a"
                            highlightPeriod={highlightPeriod}
                        />
                    </div>
                }
            >
                <div className="metrics-grid">
                    {adjust(OPS_KPIS.group).map((m, idx) => (
                        <MetricCard key={m.label} {...m} variant={idx < 3 ? 'primary' : 'default'} />
                    ))}
                </div>
            </Section>

            <Section
                title="Distribution"
                footer={
                    <div className="chart-row">
                        <ChartCard
                            title="Pallets distributed"
                            series={distributionVolumeSeries}
                            color="#0ea5e9"
                            highlightPeriod={highlightPeriod}
                        />
                    </div>
                }
            >
                <div className="metrics-grid">
                    {adjust(OPS_KPIS.distribution.core).map((m, idx) => (
                        <MetricCard key={m.label} {...m} variant={idx < 2 ? 'primary' : 'default'} />
                    ))}
                </div>

                <div className="split-row">
                    <div className="split-column">
                        <div className="split-column-title">Volume of Pallets Distributed</div>
                        <div className="metrics-grid split-grid">
                            {adjust(OPS_KPIS.distribution.splitDFPW.pallets).map((m) => (
                                <MetricCard
                                    key={m.site + m.label}
                                    label={m.site}
                                    value={m.value}
                                    change=""
                                    direction="flat"
                                    variant="muted"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="split-column">
                        <div className="split-column-title">Avg pallets per load</div>
                        <div className="metrics-grid split-grid">
                            {adjust(OPS_KPIS.distribution.splitDFPW.avgPalletsPerLoad).map((m) => (
                                <MetricCard
                                    key={m.site + m.label}
                                    label={m.site}
                                    value={m.value}
                                    change=""
                                    direction="flat"
                                    variant="muted"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="section-divider" />

                <div className="subsection-header">Express (Vans)</div>
                <div className="metrics-grid">
                    {adjust(OPS_KPIS.distribution.express).map((m, idx) => (
                        <MetricCard key={m.label} {...m} variant={idx < 2 ? 'primary' : 'default'} />
                    ))}
                </div>
            </Section>

            <Section
                title="Warehouse"
                footer={
                    <div className="chart-row">
                        <ChartCard
                            title="WH-DF pallets"
                            series={warehousePalletSeriesDF}
                            color="#a855f7"
                            highlightPeriod={highlightPeriod}
                        />
                        <ChartCard
                            title="WH-PW pallets"
                            series={warehousePalletSeriesPW}
                            color="#ec4899"
                            highlightPeriod={highlightPeriod}
                        />
                    </div>
                }
            >
                <div className="split-row">
                    <div className="split-column segment-card">
                        <div className="split-column-title">Dartford</div>
                        <div className="metrics-grid split-grid">
                            {adjust(OPS_KPIS.warehouse.dartford).map((m, idx) => (
                                <MetricCard
                                    key={m.label}
                                    {...m}
                                    variant={idx < 2 ? 'primary' : 'default'}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="split-column segment-card">
                        <div className="split-column-title">Paddock Wood</div>
                        <div className="metrics-grid split-grid">
                            {adjust(OPS_KPIS.warehouse.paddockWood).map((m, idx) => (
                                <MetricCard
                                    key={m.label}
                                    {...m}
                                    variant={idx < 2 ? 'primary' : 'default'}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            <Section
                title="QC"
                footer={
                    <div className="chart-row">
                        <ChartCard
                            title="QC Indirect Costs"
                            series={qcCostSeries}
                            color="#f97316"
                            highlightPeriod={highlightPeriod}
                        />
                    </div>
                }
            >
                <div className="metrics-grid">
                    {adjust(OPS_KPIS.qc).map((m, idx) => (
                        <MetricCard key={m.label} {...m} variant={idx === 2 ? 'primary' : 'default'} />
                    ))}
                </div>
            </Section>

            <Section
                title="Other cost centres"
                footer={
                    <div className="chart-row">
                        <ChartCard
                            title="CS Indirect Costs"
                            series={csCostSeries}
                            color="#22c55e"
                            highlightPeriod={highlightPeriod}
                        />
                    </div>
                }
            >
                <div className="split-row">
                    <div className="split-column segment-card">
                        <div className="split-column-title">Customer Service</div>
                        <div className="metrics-grid split-grid">
                            {adjust(OPS_KPIS.other.cs).map((m, idx) => (
                                <MetricCard
                                    key={m.label}
                                    {...m}
                                    variant={idx === 2 ? 'primary' : 'default'}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="split-column segment-card">
                        <div className="split-column-title">Facilities</div>
                        <div className="metrics-grid split-grid">
                            {adjust(OPS_KPIS.other.fa).map((m) => (
                                <MetricCard key={m.label} {...m} />
                            ))}
                        </div>
                    </div>
                    <div className="split-column segment-card">
                        <div className="split-column-title">Accounts / HR</div>
                        <div className="metrics-grid split-grid">
                            {adjust(OPS_KPIS.other.accHr).map((m, idx) => (
                                <MetricCard
                                    key={m.label}
                                    {...m}
                                    variant={idx === 5 || idx === 6 ? 'primary' : 'default'}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
