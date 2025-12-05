import React from 'react';

export function TabToggle({ activeTab, onChange, disableFinance = false }) {
    return (
        <div className="tab-toggle-centered">
            <div className="tab-toggle-inner">
                <div
                    className={
                        'tab-toggle-indicator' +
                        (disableFinance ? ' indicator-disabled' : '') +
                        (activeTab === 'finance' ? ' indicator-finance' : ' indicator-ops')
                    }
                    aria-hidden="true"
                />
                <button
                    className={
                        'tab-button-centered' +
                        (activeTab === 'ops' ? ' tab-centered-active' : '')
                    }
                    onClick={() => onChange('ops')}
                    type="button"
                >
                    Ops
                </button>
                <div className="tab-divider-line" />
                <button
                    className={
                        'tab-button-centered' +
                        (activeTab === 'finance' ? ' tab-centered-active' : '') +
                        (disableFinance ? ' tab-button-disabled' : '')
                    }
                    onClick={() => !disableFinance && onChange('finance')}
                    disabled={disableFinance}
                    type="button"
                >
                    Finance
                </button>
            </div>
        </div>
    );
}
