import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { AIAssistantWidget } from './components/AIAssistantWidget';
import { TimeGrainToggle } from './components/ui/controls/TimeGrainToggle';
import { PeriodSelector } from './components/ui/controls/PeriodSelector';
import { TabToggle } from './components/ui/controls/TabToggle';
import { ThemeToggle } from './components/ui/controls/ThemeToggle';
import { OpsView } from './components/views/OpsView';
import { FinanceView } from './components/views/FinanceView';
import { DailyView } from './components/views/DailyView';
import { getPeriodIndex, getPeriodFactor } from './data/constants';

export default function App() {
    const [activeTab, setActiveTab] = useState('ops');
    const [timeGrain, setTimeGrain] = useState('period');
    const [theme, setTheme] = useState('light');
    const [period, setPeriod] = useState('202501');
    const [headerElevated, setHeaderElevated] = useState(false);
    const headerSentinelRef = useRef(null);

    const headingBase = 'EWT/Fresh Service Dashboard';
    const periodIndex = getPeriodIndex(period);
    const periodLabel = `P${periodIndex + 1}`;
    const periodFactor = getPeriodFactor(period);
    const todayLabel = new Date().toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    useEffect(() => {
        const sentinel = headerSentinelRef.current;
        if (!sentinel) return undefined;

        const observer = new IntersectionObserver(
            ([entry]) => setHeaderElevated(!entry.isIntersecting),
            { threshold: [0, 1] }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={`app theme-${theme}`}>
            <div
                ref={headerSentinelRef}
                aria-hidden="true"
                style={{ height: 1 }}
            />
            <header
                className={`app-header ${
                    headerElevated ? 'app-header-solid' : ''
                }`}
            >
                <div className="app-header-left">
                    <h1 className="app-title">{headingBase}</h1>

                    <div className="app-date">Today · {todayLabel}</div>
                </div>

                <div className="app-header-center">
                    <TabToggle
                        activeTab={activeTab}
                        onChange={setActiveTab}
                        disableFinance={timeGrain === 'daily'}
                    />
                </div>

                <div className="app-header-right">
                    {timeGrain === 'period' && (
                        <PeriodSelector value={period} onChange={setPeriod} />
                    )}
                    <TimeGrainToggle
                        value={timeGrain}
                        onChange={(tg) => {
                            setTimeGrain(tg);
                            if (tg === 'daily') setActiveTab('ops');
                        }}
                    />
                    <ThemeToggle
                        theme={theme}
                        onToggle={() =>
                            setTheme(theme === 'light' ? 'dark' : 'light')
                        }
                    />
                </div>
            </header>

            <main className="app-main">
                {timeGrain === 'daily' ? (
                    <DailyView />
                ) : activeTab === 'ops' ? (
                    <OpsView
                        highlightPeriod={periodLabel}
                        periodFactor={periodFactor}
                    />
                ) : (
                    <FinanceView periodFactor={periodFactor} />
                )}
            </main>

            <AIAssistantWidget darkMode={theme === 'dark'} />
        </div>
    );
}
