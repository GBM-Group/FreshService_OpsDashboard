import React from 'react';
import {
    FINANCE_KPIS,
    distributionVolumeSeries,
    warehousePalletSeriesDF,
    warehousePalletSeriesPW,
    qcCostSeries,
    csCostSeries,
    groupIncomeSeries,
    groupNetPLSeries,
    adjustMetrics,
} from '../../data/constants';
import { collapseMarginPairs } from '../utils/margins.jsx';
import { Section } from '../ui/Section';
import { MetricCard } from '../ui/MetricCard';
import { ChartCard } from '../ui/ChartCard';

export function FinanceView({ periodFactor }) {
    const adjust = (metrics) => adjustMetrics(metrics, periodFactor);

    return (
        <>
            <Section
                title="Group"
                variant="group"
                footer={
                    <div className="chart-row">
                        <ChartCard title="Group Income" series={groupIncomeSeries} color="#2563eb" />
                        <ChartCard title="Group Net P&L" series={groupNetPLSeries} color="#16a34a" />
                    </div>
                }
            >
                <div className="metrics-grid">
                    {adjust(FINANCE_KPIS.group).map((m, idx) => (
                        <MetricCard key={m.label} {...m} variant={idx < 3 ? 'primary' : 'default'} />
                    ))}
                </div>
            </Section>

            <Section
                title="Distribution"
                footer={
                    <div className="chart-row">
                        <ChartCard
                            title="Distribution pallets"
                            series={distributionVolumeSeries}
                            color="#0ea5e9"
                        />
                    </div>
                }
            >
                <div className="metrics-grid">
                    {collapseMarginPairs(adjust(FINANCE_KPIS.distribution)).map((m, idx) => (
                        <MetricCard
                            key={m.label}
                            {...m}
                            variant={idx < 3 ? 'primary' : 'default'}
                        />
                    ))}
                </div>

                <div className="section-divider" />
                <div className="subsection-header">Express (Vans)</div>
                <div className="metrics-grid">
                    {adjust(FINANCE_KPIS.distributionExpress).map((m, idx) => (
                        <MetricCard key={m.label} {...m} variant={idx < 2 ? 'primary' : 'default'} />
                    ))}
                </div>
            </Section>

            <Section
                title="Warehouse"
                footer={
                    <div className="chart-row">
                        <ChartCard title="WH-DF pallets" series={warehousePalletSeriesDF} color="#a855f7" />
                        <ChartCard title="WH-PW pallets" series={warehousePalletSeriesPW} color="#ec4899" />
                    </div>
                }
            >
                <div className="split-row">
                    <div className="split-column segment-card">
                        <div className="split-column-title">Dartford</div>
                        <div className="metrics-grid split-grid">
                            {collapseMarginPairs(adjust(FINANCE_KPIS.warehouse.dartford)).map(
                                (m, idx) => (
                                    <MetricCard
                                        key={m.label}
                                        {...m}
                                        variant={idx < 3 ? 'primary' : 'default'}
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className="split-column segment-card">
                        <div className="split-column-title">Paddock Wood</div>
                        <div className="metrics-grid split-grid">
                            {collapseMarginPairs(adjust(FINANCE_KPIS.warehouse.paddockWood)).map(
                                (m, idx) => (
                                    <MetricCard
                                        key={m.label}
                                        {...m}
                                        variant={idx < 3 ? 'primary' : 'default'}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Section>

            <Section
                title="Quality Control"
                footer={
                    <div className="chart-row">
                        <ChartCard title="QC Indirect Costs" series={qcCostSeries} color="#f97316" />
                    </div>
                }
            >
                <div className="metrics-grid">
                    {adjust(FINANCE_KPIS.qc).map((m, idx) => (
                        <MetricCard key={m.label} {...m} variant={idx === 2 ? 'primary' : 'default'} />
                    ))}
                </div>
            </Section>

            <Section
                title="Other Cost Centres"
                footer={
                    <div className="chart-row">
                        <ChartCard title="CS Indirect Costs" series={csCostSeries} color="#22c55e" />
                    </div>
                }
            >
                <div className="split-row">
                    <div className="split-column segment-card">
                        <div className="split-column-title">Customer Service</div>
                        <div className="metrics-grid split-grid">
                            {adjust(FINANCE_KPIS.other.cs).map((m, idx) => (
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
                            {adjust(FINANCE_KPIS.other.fa).map((m) => (
                                <MetricCard key={m.label} {...m} />
                            ))}
                        </div>
                    </div>
                    <div className="split-column segment-card">
                        <div className="split-column-title">Accounts / HR</div>
                        <div className="metrics-grid split-grid">
                            {adjust(FINANCE_KPIS.other.accHr).map((m, idx) => (
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
