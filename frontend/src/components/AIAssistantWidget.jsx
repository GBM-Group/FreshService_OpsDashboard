import React, { useEffect, useMemo, useRef, useState } from 'react';
import './AIAssistant.css';

function buildInitialMessages() {
    return [
        {
            id: 'a1',
            role: 'assistant',
            text: "Hi there! I'm your assistant. Ask me anything about the dashboard.",
        },
    ];
}

export function AIAssistantWidget({ darkMode = false }) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState(() => buildInitialMessages());
    const [input, setInput] = useState('');
    const listRef = useRef(null);

    useEffect(() => {
        const el = listRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [messages, open]);

    const themeClass = darkMode ? 'dark' : '';

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        const userMessage = {
            id: `u-${Date.now()}`,
            role: 'user',
            text: input.trim(),
        };
        const reply = {
            id: `a-${Date.now() + 1}`,
            role: 'assistant',
            text: 'Real AI coming soon. Thanks for reaching out!',
        };
        setMessages((prev) => [...prev, userMessage, reply]);
        setInput('');
    };

    const messageItems = useMemo(
        () =>
            messages.map((m) => (
                <div
                    key={m.id}
                    className={`ai-message ${m.role === 'assistant' ? 'assistant' : 'user'}`}
                >
                    {m.text}
                </div>
            )),
        [messages]
    );

    return (
        <div className="ai-assistant-container" aria-live="polite">
            <div
                className={`ai-assistant-panel ${open ? 'open' : ''} ${themeClass}`}
                role="dialog"
                aria-modal="false"
                aria-hidden={!open}
                aria-label="AI assistant chat"
            >
                <div className={`ai-assistant-header ${themeClass}`}>
                    <h2 className="ai-assistant-title">AI Assistant</h2>
                    <button
                        className={`ai-assistant-close ${themeClass}`}
                        onClick={() => setOpen(false)}
                        aria-label="Close assistant"
                        type="button"
                    >
                        ×
                    </button>
                </div>

                <div ref={listRef} className="ai-assistant-messages">
                    {messageItems}
                </div>

                <form
                    className={`ai-assistant-input-row ${themeClass}`}
                    onSubmit={handleSend}
                >
                    <label className="sr-only" htmlFor="ai-assistant-input">
                        Message
                    </label>
                    <input
                        id="ai-assistant-input"
                        className="ai-assistant-input"
                        placeholder="Ask me anything…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        autoComplete="off"
                    />
                    <button className="ai-assistant-send" type="submit">
                        Send
                    </button>
                </form>
            </div>

            <button
                type="button"
                className={`ai-assistant-fab ${themeClass}`}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="ai-assistant-panel"
                aria-label="Open AI assistant"
            >
                <img
                    src="/aiBot.png"
                    alt="AI bot"
                    className="ai-assistant-icon"
                    loading="lazy"
                    decoding="async"
                />
            </button>
        </div>
    );
}
