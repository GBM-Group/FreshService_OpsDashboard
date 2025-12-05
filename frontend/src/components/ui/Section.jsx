import React from 'react';

export function Section({ title, subtitle, children, variant = 'default', footer }) {
    const sectionClass = 'section-card' + (variant === 'group' ? ' section-group' : '');

    return (
        <section className={sectionClass}>
            <div className="section-header">
                <div>
                    <div className="section-title">{title}</div>
                    {subtitle && <div className="section-subtitle">{subtitle}</div>}
                </div>
            </div>
            <div className="section-body">{children}</div>
            {footer && <div className="section-footer">{footer}</div>}
        </section>
    );
}
