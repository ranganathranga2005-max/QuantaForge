import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { QuantumPage, QuantumHeader, QuantumPanel, QuantumCard, QuantumBadge, QuantumButton, QuantumInput } from '../components/ui/QuantumPrimitives';
import { queryAI, buildContextEnvelope } from '../services/aiClient';

export default function AITutor() {
  const location = useLocation();
  const contextData = location.state || {};
  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: 'system',
      text: 'llm_not_configured'
    },
    {
      role: 'ai',
      text: 'AI Assistant Interface Ready. The platform intelligence layer is active and ready to process context across Quantum Lab, Circuit Builder, Algorithms, and Visualizations.',
      sources: []
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useMock, setUseMock] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput('');

    setMessages(prev => [
      ...prev,
      { role: 'user', text: userText }
    ]);
    setLoading(true);

    const envelope = buildContextEnvelope({
      page: 'aitutor',
      circuit: contextData.circuitContext || contextData.circuit,
      result: contextData.latestResult || contextData.quantum_result,
      learning: { topic: contextData.lessonId }
    });

    const res = await queryAI({
      question: userText,
      taskType: 'chat',
      context: envelope,
      providerOverride: useMock ? 'mock' : null
    });

    setMessages(prev => [
      ...prev,
      { role: 'system', text: res.status },
      {
        role: 'ai',
        text: res.answer === 'llm_not_configured' 
          ? 'LLM Provider unconfigured. (Add OPENAI_API_KEY to enable live generative AI responses or check "Test with Mock Provider" above).' 
          : res.answer,
        intent: res.intent,
        sources: res.sources || [],
        actions: res.actions || []
      }
    ]);
    setLoading(false);
  };

  return (
    <QuantumPage env="aitutor" maxWidth={1280}>
      <QuantumHeader
        title="Contextual Quantum AI Tutor"
        subtitle="Context-aware quantum learning assistant designed to ground explanations in live Q-AST circuits, backend statevectors, execution traces, and lesson progress."
        category="ASSIST & EXPLAIN"
        actions={
          <div className="flex items-center space-x-3">
            <label className="text-xs text-slate-300 flex items-center space-x-1 cursor-pointer">
              <input
                type="checkbox"
                checked={useMock}
                onChange={(e) => setUseMock(e.target.checked)}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500"
              />
              <span>Test Mock Provider</span>
            </label>
            <QuantumBadge variant={useMock ? 'violet' : 'amber'}>
              {useMock ? 'MOCK PROVIDER' : 'PLATFORM INTELLIGENCE ACTIVE'}
            </QuantumBadge>
          </div>
        }
      />

      {/* Main Layout: Conversation + Quantum Context Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Chat Conversation */}
        <QuantumPanel title="Conversation History" badgeText="Context Grounded" badgeVariant="violet">
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px', 
              minHeight: '360px', 
              maxHeight: '500px', 
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '6px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {messages.map((m, idx) => {
              if (m.role === 'system') {
                return (
                  <div key={idx} style={{ alignSelf: 'center', padding: '6px 14px', backgroundColor: m.text === 'success' || m.text === 'mock_response' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', fontSize: '0.8rem', color: m.text === 'success' || m.text === 'mock_response' ? '#34d399' : '#fbbf24', fontFamily: 'monospace' }}>
                    Status: {m.text}
                  </div>
                );
              }

              const isAi = m.role === 'ai';

              return (
                <div
                  key={idx}
                  style={{
                    alignSelf: isAi ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    padding: '14px 18px',
                    backgroundColor: isAi ? 'rgba(11, 17, 33, 0.9)' : 'rgba(6, 182, 212, 0.12)',
                    border: isAi ? '1px solid var(--border-active)' : '1px solid var(--accent-secondary)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: isAi ? 'var(--accent-secondary)' : 'var(--accent-primary)', fontWeight: 700, fontFamily: 'monospace', marginBottom: '4px', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{isAi ? 'Quantum Assistant' : 'Learner'}</span>
                    {isAi && m.intent && <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Intent: {m.intent}</span>}
                  </div>
                  {m.text}

                  {/* Sources display */}
                  {isAi && m.sources && m.sources.length > 0 && (
                    <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#94a3b8' }}>
                      <strong style={{ color: '#38bdf8' }}>Sources ({m.sources.length}):</strong>
                      <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                        {m.sources.map((s, sIdx) => (
                          <li key={sIdx}>{s.title || s.document_id}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <div style={{ flex: 1 }}>
              <QuantumInput
                placeholder="Ask a question about the attached circuit or lesson..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                disabled={loading}
                style={{ width: '100%' }}
              />
            </div>
            <QuantumButton variant="primary" onClick={handleSendMessage} disabled={!input.trim() || loading}>
              {loading ? 'ANALYZING...' : 'SEND'}
            </QuantumButton>
          </div>
        </QuantumPanel>

        {/* Right Column: Quantum Context Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <QuantumPanel title="Attached Quantum Context" badgeText="Live Inspector" badgeVariant="cyan">
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              This panel inspects the exact state payload that will be provided to the AI intelligence core.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
              <QuantumCard hoverable={false} active={!!(contextData?.circuitContext || contextData?.circuit)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Q-AST Circuit Payload</span>
                  <QuantumBadge variant={(contextData?.circuitContext || contextData?.circuit) ? 'green' : 'amber'}>
                    {(contextData?.circuitContext || contextData?.circuit) ? 'ATTACHED' : 'NONE'}
                  </QuantumBadge>
                </div>
              </QuantumCard>

              <QuantumCard hoverable={false} active={!!(contextData?.latestResult || contextData?.quantum_result)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Statevector Simulation Result</span>
                  <QuantumBadge variant={(contextData?.latestResult || contextData?.quantum_result) ? 'green' : 'amber'}>
                    {(contextData?.latestResult || contextData?.quantum_result) ? 'ATTACHED' : 'NONE'}
                  </QuantumBadge>
                </div>
              </QuantumCard>

              <QuantumCard hoverable={false} active={!!contextData?.lessonId}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Active Lesson Context</span>
                  <QuantumBadge variant={contextData?.lessonId ? 'green' : 'amber'}>
                    {contextData?.lessonId ? contextData.lessonId : 'NONE'}
                  </QuantumBadge>
                </div>
              </QuantumCard>
            </div>
          </QuantumPanel>

          <QuantumPanel title="System Architecture Notice">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 8px 0', color: '#38bdf8', fontWeight: 600 }}>
                Phase 5 Central AI Intelligence Core Active
              </p>
              Quantum simulation remains 100% in the authoritative backend engine. The AI interprets, explains, and acts on verified execution state without duplicating simulation mechanics.
            </div>
          </QuantumPanel>
        </div>

      </div>
    </QuantumPage>
  );
}

