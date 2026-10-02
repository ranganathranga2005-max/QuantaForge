import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdaptive } from './AdaptiveContext';
import { queryAI, buildContextEnvelope } from '../services/aiClient';

const CompanionContext = createContext();

export function CompanionProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    userLevel,
    userGoal,
    userRole,
    currentSkillGap,
    activeMission,
    currentGoalData,
    currentLevelData
  } = useAdaptive();

  // Companion States: 'IDLE' | 'LISTENING' | 'PROCESSING' | 'THINKING' | 'SPEAKING' | 'EXPLAINING' | 'ENCOURAGING' | 'SUCCESS' | 'HINT' | 'WARNING' | 'DISCOVERY'
  const [companionState, setCompanionState] = useState('IDLE');
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      role: 'ai',
      text: 'Hello! I am your Quantum Companion. Build a circuit, ask a question, or start your mission anytime.',
      timestamp: Date.now(),
      mode: 'IDLE'
    }
  ]);
  const [activeSpeechText, setActiveSpeechText] = useState('');
  const [isMuted, setIsMuted] = useState(() => localStorage.getItem('ql_companion_muted') === 'true');
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeActions, setActiveActions] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [micError, setMicError] = useState(null);

  // Recognition and Speech Synthesis Refs
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis || null);

  const voiceSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  const ttsSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Sync mute state to localStorage
  useEffect(() => {
    localStorage.setItem('ql_companion_muted', isMuted ? 'true' : 'false');
    if (isMuted && synthRef.current) {
      synthRef.current.cancel();
    }
  }, [isMuted]);

  // Magical Quantum Sound Chime Generator using Web Audio API
  const playQuantumSoundEffect = useCallback((type = 'speak') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'speak') {
        // Crystalline harmonic quantum chime: C5 (523.25Hz) + E5 (659.25Hz) + G5 (783.99Hz)
        const frequencies = [523.25, 659.25, 783.99];
        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.55);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + idx * 0.07 + 0.55);
        });
      } else if (type === 'listen') {
        // Soft listening frequency sweep (440Hz -> 880Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.28);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // Ignore audio context errors if blocked by browser policy
    }
  }, [isMuted]);

  // Voice Output Handler with Magical Quantum Voice Selection & Math Cleaning
  const speakText = useCallback((text) => {
    if (isMuted || !ttsSupported || !text) return;
    try {
      synthRef.current.cancel(); // Stop prior speech
      let cleanedText = text
        .replace(/\|(\d+)\⟩/g, 'state $1')
        .replace(/\|00\⟩/g, 'state zero-zero')
        .replace(/\|01\⟩/g, 'state zero-one')
        .replace(/\|10\⟩/g, 'state one-zero')
        .replace(/\|11\⟩/g, 'state one-one')
        .replace(/\|\+⟩/g, 'state plus')
        .replace(/\|-⟩/g, 'state minus')
        .replace(/\|ψ\⟩/g, 'state psi')
        .replace(/\|φ\⟩/g, 'state phi')
        .replace(/\bCNOT\b/g, 'Controlled NOT gate')
        .replace(/\bH gate\b/gi, 'Hadamard gate')
        .replace(/\bX gate\b/gi, 'X Pauli gate')
        .replace(/\bZ gate\b/gi, 'Z Pauli gate')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Strip markdown links
        .replace(/[*_`#]/g, '') // Strip markdown formatting symbols
        .replace(/```[\s\S]*?```/g, 'code snippet') // Replace code blocks
        .trim();

      if (!cleanedText) return;

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      
      // Select best high-quality natural voice
      const voices = synthRef.current.getVoices();
      const magicalVoice = voices.find(v => 
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Victoria') || v.name.includes('Daniel') || v.name.includes('Zira')) && v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

      if (magicalVoice) {
        utterance.voice = magicalVoice;
      }
      utterance.pitch = 1.15; // Cheerful, warm quantum intelligence tone
      utterance.rate = 0.96; //Deliberate natural cadence

      utterance.onstart = () => {
        setCompanionState('SPEAKING');
        setActiveSpeechText(text);
        playQuantumSoundEffect('speak');
      };
      utterance.onend = () => {
        setCompanionState('IDLE');
        setActiveSpeechText('');
      };
      utterance.onerror = () => {
        setCompanionState('IDLE');
        setActiveSpeechText('');
      };

      synthRef.current.speak(utterance);
    } catch {
      setCompanionState('IDLE');
    }
  }, [isMuted, ttsSupported, playQuantumSoundEffect]);

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setActiveSpeechText('');
    setCompanionState('IDLE');
  }, []);

  // Voice Input (SpeechRecognition) Handler
  const startListening = useCallback(() => {
    if (!voiceSupported) {
      setMicError('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      stopSpeaking();
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setCompanionState('LISTENING');
        setMicError(null);
        setTranscript('');
      };

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setCompanionState('IDLE');
        if (event.error === 'not-allowed') {
          setMicError('Microphone permission denied.');
        } else if (event.error !== 'no-speech') {
          setMicError(`Voice input issue: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript.trim()) {
          askCompanion(transcript.trim());
        } else {
          setCompanionState('IDLE');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      setIsListening(false);
      setCompanionState('IDLE');
      setMicError(err.message);
    }
  }, [voiceSupported, transcript, stopSpeaking]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setCompanionState('IDLE');
  }, []);

  // Query AI Companion
  const askCompanion = useCallback(async (userQuestion, extraContext = {}) => {
    if (!userQuestion || !userQuestion.trim()) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: userQuestion.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setCompanionState('THINKING');
    setActiveActions([]);

    // Determine current page context
    const currentPath = location.pathname;
    let pageType = 'general';
    if (currentPath === '/') pageType = 'home';
    else if (currentPath === '/journey') pageType = 'journey';
    else if (currentPath.startsWith('/learn')) pageType = 'learn';
    else if (currentPath === '/lab') pageType = 'lab';
    else if (currentPath.startsWith('/challenge')) pageType = 'challenge';
    else if (currentPath === '/research') pageType = 'research';

    const envelope = buildContextEnvelope({
      page: pageType,
      location: currentPath,
      studentLevel: currentLevelData?.label || 'Beginner',
      learning: { topic: currentSkillGap, difficulty: userLevel <= 2 ? 'beginner' : 'intermediate' },
      ...extraContext
    });

    try {
      const res = await queryAI({
        question: userQuestion.trim(),
        taskType: pageType === 'lab' ? 'quantum_lab' : 'explain_concept',
        context: envelope,
        history: messages.slice(-6)
      });

      const responseText = res.answer || 'I am keeping an eye on your quantum progress!';
      const actions = res.actions || [];

      const aiMsg = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: responseText,
        timestamp: Date.now(),
        mode: res.intent === 'error' ? 'WARNING' : 'EXPLAINING',
        actions
      };

      setMessages(prev => [...prev, aiMsg]);
      setActiveActions(actions);
      setCompanionState('EXPLAINING');

      // Speak response if TTS active
      speakText(responseText);
    } catch (err) {
      const errorMsg = {
        id: `err-${Date.now()}`,
        role: 'ai',
        text: 'I am temporarily offline, but your quantum learning journey and circuit workspace are fully operational.',
        timestamp: Date.now(),
        mode: 'WARNING'
      };
      setMessages(prev => [...prev, errorMsg]);
      setCompanionState('IDLE');
    }
  }, [location, currentLevelData, currentSkillGap, userLevel, messages, speakText]);

  // Route awareness greeting trigger
  useEffect(() => {
    const path = location.pathname;
    let pageContextName = 'General Workspace';
    if (path === '/') pageContextName = 'Dashboard';
    else if (path === '/journey') pageContextName = 'My Journey';
    else if (path === '/learn') pageContextName = 'Learning Modules';
    else if (path === '/lab') pageContextName = 'Quantum Lab';
    else if (path === '/challenges') pageContextName = 'Quantum Challenges';
    else if (path === '/research') pageContextName = 'Research Environment';

    // Set contextual action pills based on page
    if (path === '/lab') {
      setActiveActions([
        { label: 'Understand Why', action: 'explain_circuit' },
        { label: 'Reset Circuit', action: 'reset_circuit' }
      ]);
    } else if (path === '/') {
      setActiveActions([
        { label: 'Continue Mission', action: 'go_journey' },
        { label: 'Open Lab', action: 'go_lab' }
      ]);
    } else if (path === '/journey') {
      setActiveActions([
        { label: `Focus: ${currentSkillGap}`, action: 'go_learn' }
      ]);
    } else {
      setActiveActions([]);
    }
  }, [location.pathname, currentSkillGap]);

  return (
    <CompanionContext.Provider
      value={{
        companionState,
        setCompanionState,
        messages,
        askCompanion,
        activeSpeechText,
        isMuted,
        setIsMuted,
        toggleMute: () => setIsMuted(prev => !prev),
        isListening,
        startListening,
        stopListening,
        stopSpeaking,
        voiceSupported,
        ttsSupported,
        isExpanded,
        setIsExpanded,
        activeActions,
        transcript,
        micError
      }}
    >
      {children}
    </CompanionContext.Provider>
  );
}

export function useCompanion() {
  const ctx = useContext(CompanionContext);
  if (!ctx) {
    throw new Error('useCompanion must be used within a CompanionProvider');
  }
  return ctx;
}
