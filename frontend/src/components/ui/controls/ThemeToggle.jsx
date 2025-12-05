import React from 'react';

export function ThemeToggle({ theme, onToggle }) {
    return (
        <button className="theme-toggle" onClick={onToggle} type="button">
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
    );
}
