import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompanion } from '../../context/CompanionContext';
import { generateTeachingPlan } from '../../services/teachingPlanEngine';
import InlineBlochSimulator from './InlineBlochSimulator';
import { playQuantumSoundEffect } from '../ai/Companion3DCanvas';

export default function InteractiveTeachingStage({ conceptName = 'Superposition', userLevel = 1, onClose }) {
  const navigate = useNavigate();
  const { setCompanionState, speakText, stopSpeaking } = useCompanion();

  const [teachingPlan, setTeachingPlan] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [userPrediction, setUserPrediction] = useState(null);
  const [predictionFeedback, setPredictionFeedback] = useState(null);
  const [appliedGates, setAppliedGates] = useState([]);
  const [currentBlochVector, setCurrentBlochVector] = useState([0, 0, 1]);
  const [probabilities, setProbabilities] = useState({ '|0⟩': 1.0, '|1⟩': 0.0 });
  const [phaseAngle, setPhaseAngle] = useState(0);

  // Initialize Teaching Plan
  useEffect(() => {
    const plan = generateTeachingPlan({ concept: conceptName, userLevel });
    setTeachingPlan(plan);
    setCurrentStepIndex(0);
    setAppliedGates([]);
    setCurrentBlochVector([0, 0, 1]);
    setProbabilities({ '|0⟩': 1.0, '|1⟩': 0.0 });
    setPhaseAngle(0);
    setUserPrediction(null);
    setPredictionFeedback(null);
  }, [conceptName, userLevel]);

  const currentStep = teachingPlan?.actions?.[currentStepIndex];

  // Action Executor mapping structured step to visual state & voice narration (Req #2 & #9)
  const executeStep = useCallback((step) => {
    if (!step) return;

    // 1. Update 3D Character Expression & Gesture
    if (step.characterState && setCompanionState) {
      setCompanionState(step.characterState);
    }

    // 2. Synchronize Segmented Voice Narration
    if (step.voiceNarration && speakText) {
      speakText(step.voiceNarration);
    }

    // 3. Map Structured Action to Visual Components
    switch (step.type) {
      case 'SHOW_QUBIT':
        setAppliedGates([]);
        setCurrentBlochVector([0, 0, 1]);
        setProbabilities({ '|0⟩': 1.0, '|1⟩': 0.0 });
        break;

      case 'SHOW_BLOCH':
        if (step.params?.vector) {
          setCurrentBlochVector(step.params.vector);
        }
        break;

      case 'APPLY_GATE':
        if (step.params?.gate) {
          setAppliedGates(prev => [...prev, { gate: step.params.gate, qubit: step.params.qubitIndex || 0 }]);
          playQuantumSoundEffect('chime');
        }
        break;

      case 'ANIMATE_STATE_TRANSITION':
        if (step.params?.theta !== undefined) {
          // Equator rotation for superposition state |+⟩
          setCurrentBlochVector([1, 0, 0]);
        }
        if (step.params?.prob0 !== undefined) {
          setProbabilities({ '|0⟩': step.params.prob0, '|1⟩': step.params.prob1 });
        } else if (step.params?.statevector) {
          setProbabilities({ '|00⟩': 0.5, '|01⟩': 0.0, '|10⟩': 0.0, '|11⟩': 0.5 });
        }
        break;

      case 'SHOW_PROBABILITY':
        if (step.params?.prob0 !== undefined) {
          setProbabilities({ '|0⟩': step.params.prob0, '|1⟩': step.params.prob1 });
        } else if (step.params?.probabilities) {
          setProbabilities(step.params.probabilities);
        }
        break;

      case 'SHOW_PHASE':
        if (step.params?.phase1 !== undefined) {
          setPhaseAngle(step.params.phase1);
        }
        break;

      case 'ASK_PREDICTION':
        setIsPlaying(false); // Automatically pause for learner active response
        break;

      case 'RUN_CIRCUIT':
        playQuantumSoundEffect('success');
        break;

      case 'CELEBRATE':
        playQuantumSoundEffect('success');
        break;

      default:
        break;
    }
  }, [setCompanionState, speakText]);

  // Handle Step Advancement
  useEffect(() => {
    if (currentStep) {
      executeStep(currentStep);
    }
  }, [currentStepIndex, currentStep, executeStep]);

  const handleNextStep = () => {
    if (!teachingPlan || currentStepIndex >= teachingPlan.actions.length - 1) return;
    setUserPrediction(null);
    setPredictionFeedback(null);
    setCurrentStepIndex(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (currentStepIndex <= 0) return;
    setUserPrediction(null);
    setPredictionFeedback(null);
    setCurrentStepIndex(prev => prev - 1);
  };

  // Prediction Answer Handler (Active Learning Req #11 & Misconception Handling Req #12)
  const handleSelectPrediction = (index) => {
    if (!currentStep || currentStep.type !== 'ASK_PREDICTION') return;
    const isCorrect = index === currentStep.params.correctIndex;
    setUserPrediction(index);

    if (isCorrect) {
      setPredictionFeedback({
        success: true,
        text: `✨ ${currentStep.params.explanation}`
      });
      setCompanionState?.('CELEBRATING');
      playQuantumSoundEffect('success');
      speakText(`Spot on! ${currentStep.params.explanation}`);
    } else {
      setPredictionFeedback({
        success: false,
        text: `🤔 Interesting perspective! Notice that quantum measurement forces state collapse into a single classical outcome. Let's run the circuit to observe.`
      });
      setCompanionState?.('CORRECTING');
      speakText("Notice that quantum measurement forces state collapse into a single classical outcome. Let's test it!");
    }
  };

  const handleTryInLab = () => {
    stopSpeaking();
    navigate('/lab', { state: { preset: appliedGates } });
  };

  if (!teachingPlan) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      backgroundColor: 'rgba(15, 23, 42, 0.94)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      flexDirection: 'column',
      color: '#F8FAFC',
      padding: '24px',
      overflowY: 'auto'
    }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1E293B',
        paddingBottom: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.08em' }}>
            INTERACTIVE AI QUANTUM TEACHER • {teachingPlan.concept.toUpperCase()}
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '2px 0 0 0', color: '#FFF' }}>
            {teachingPlan.title}
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={handleTryInLab}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1E293B',
              border: '1px solid #3B82F6',
              borderRadius: '8px',
              color: '#60A5FA',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            ⚛️ Open Circuit in Lab
          </button>

          <button
            onClick={() => {
              stopSpeaking();
              onClose && onClose();
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              borderRadius: '8px',
              color: '#F87171',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            ✕ Exit Stage
          </button>
        </div>
      </div>

      {/* Progress Step Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
        {teachingPlan.actions.map((act, idx) => (
          <div
            key={act.id}
            onClick={() => setCurrentStepIndex(idx)}
            style={{
              flex: 1,
              height: '6px',
              borderRadius: '3px',
              backgroundColor: idx === currentStepIndex ? '#38BDF8' : idx < currentStepIndex ? '#22C55E' : '#334155',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title={`Step ${idx + 1}: ${act.type}`}
          />
        ))}
      </div>

      {/* Main Interactive Stage Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '24px', flex: 1 }}>
        
        {/* Left: Scientific Visual Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Bloch Sphere Simulator */}
          <div style={{
            backgroundColor: '#020617',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #1E293B',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
          }}>
            <InlineBlochSimulator title={`Live Bloch Vector State Representation (${teachingPlan.concept})`} />
          </div>

          {/* Applied Circuit & Probabilities Panel */}
          <div style={{
            backgroundColor: '#0F172A',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #1E293B',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {/* Circuit Sequence */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', marginBottom: '8px' }}>
                CURRENT CIRCUIT SEQUENCE:
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px',
                backgroundColor: '#020617',
                borderRadius: '10px',
                minHeight: '60px'
              }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#94A3B8' }}>|0⟩ ──</span>
                {appliedGates.length === 0 ? (
                  <span style={{ color: '#475569', fontSize: '0.85rem' }}>No gates applied yet</span>
                ) : (
                  appliedGates.map((g, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: g.gate === 'H' ? '#2563EB' : g.gate === 'CNOT' ? '#DB2777' : '#7C3AED',
                        color: '#FFF',
                        fontWeight: 900,
                        borderRadius: '6px',
                        fontSize: '0.9rem'
                      }}
                    >
                      {g.gate}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Probability Bars */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', marginBottom: '8px' }}>
                STATE PROBABILITIES |Ψ|²:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px', backgroundColor: '#020617', borderRadius: '10px' }}>
                {Object.entries(probabilities).map(([stateKey, probVal]) => (
                  <div key={stateKey} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.85rem', width: '36px' }}>{stateKey}</span>
                    <div style={{ flex: 1, backgroundColor: '#1E293B', height: '14px', borderRadius: '7px', overflow: 'hidden' }}>
                      <div style={{ width: `${(probVal * 100).toFixed(0)}%`, backgroundColor: '#38BDF8', height: '100%', transition: 'width 0.3s' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, width: '40px' }}>{(probVal * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Teacher Narration & Active Learner Interaction */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Current Action Narration Card */}
          <div style={{
            backgroundColor: '#0F172A',
            borderRadius: '16px',
            padding: '24px',
            border: '1.5px solid #38BDF8',
            boxShadow: '0 10px 30px rgba(56, 189, 248, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8' }}>
                STEP {currentStepIndex + 1} OF {teachingPlan.actions.length} • {currentStep?.type}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 600 }}>
                Gesture: {currentStep?.characterState}
              </span>
            </div>

            <div style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#F8FAFC', fontWeight: 600 }}>
              "{currentStep?.voiceNarration}"
            </div>
          </div>

          {/* Active Prediction Challenge (Req #11 & #12) */}
          {currentStep?.type === 'ASK_PREDICTION' && currentStep.params && (
            <div style={{
              backgroundColor: '#1E1B4B',
              borderRadius: '16px',
              padding: '24px',
              border: '2px solid #818CF8',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.25)',
              animation: 'fadeIn 0.2s ease'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#A5B4FC', letterSpacing: '0.08em', marginBottom: '8px' }}>
                🎯 ACTIVE PREDICTION QUESTION
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: '0 0 16px 0' }}>
                {currentStep.params.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {currentStep.params.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectPrediction(oIdx)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: userPrediction === oIdx
                        ? (oIdx === currentStep.params.correctIndex ? '2px solid #22C55E' : '2px solid #EF4444')
                        : '1px solid #4338CA',
                      backgroundColor: userPrediction === oIdx
                        ? (oIdx === currentStep.params.correctIndex ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                        : '#312E81',
                      color: '#FFF',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {String.fromCharCode(65 + oIdx)}. {opt}
                  </button>
                ))}
              </div>

              {predictionFeedback && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: predictionFeedback.success ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: predictionFeedback.success ? '1px solid #22C55E' : '1px solid #EF4444',
                  color: predictionFeedback.success ? '#4ADE80' : '#F87171',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}>
                  {predictionFeedback.text}
                </div>
              )}
            </div>
          )}

          {/* Action Step Playback Controls (Req #10) */}
          <div style={{
            marginTop: 'auto',
            padding: '20px',
            backgroundColor: '#0F172A',
            borderRadius: '16px',
            border: '1px solid #1E293B',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex <= 0}
              style={{
                padding: '10px 18px',
                backgroundColor: 'transparent',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: currentStepIndex <= 0 ? '#475569' : '#94A3B8',
                fontWeight: 700,
                cursor: currentStepIndex <= 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ← Previous Step
            </button>

            <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 700 }}>
              {currentStepIndex + 1} / {teachingPlan.actions.length}
            </div>

            <button
              onClick={handleNextStep}
              disabled={currentStepIndex >= teachingPlan.actions.length - 1}
              style={{
                padding: '12px 24px',
                backgroundColor: '#2563EB',
                border: 'none',
                borderRadius: '8px',
                color: '#FFF',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: currentStepIndex >= teachingPlan.actions.length - 1 ? 'not-allowed' : 'pointer',
                opacity: currentStepIndex >= teachingPlan.actions.length - 1 ? 0.5 : 1,
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              {currentStepIndex >= teachingPlan.actions.length - 1 ? 'Teaching Completed ✓' : 'Next Action →'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
