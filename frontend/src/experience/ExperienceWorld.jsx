import React, { useState, useRef } from 'react';
import CinematicHomeScene from './CinematicHomeScene';
import GoalDiscoveryScene from './GoalDiscoveryScene';
import DiagnosticScene from './DiagnosticScene';
import RoadmapWorldScene from './RoadmapWorldScene';
import SpatialMissionScene from './SpatialMissionScene';
import QuantumPuzzleScene from './QuantumPuzzleScene';
import ContextualLabScene from './ContextualLabScene';
import LanternProofScene from './LanternProofScene';
import ContentResolver from './ContentResolver';
import MinimalGlobalChrome from './MinimalGlobalChrome';
import LearningStateModel from './LearningState';
import RouteGeneratorEngine from './RouteGenerator';
import SpatialTransitionController, { WORLD_STATES } from './SpatialTransitionController';
import GenieSpatialController from '../genie/GenieSpatialController';
import GeniePathController from '../genie/GeniePathController';
import LivingVoidBackground from '../components/ui/LivingVoidBackground';

export default function ExperienceWorld() {
  const [learningState, setLearningState] = useState(() => LearningStateModel.loadFromStorage());
  const [worldState, setWorldState] = useState(() => {
    const savedGoal = localStorage.getItem('ql_user_goal');
    return savedGoal ? 'home' : WORLD_STATES.DISCOVERY;
  });

  const [currentRoute, setCurrentRoute] = useState(() => {
    return RouteGeneratorEngine.generateRoute({ goal: learningState.goal });
  });

  const [activeMissionContent, setActiveMissionContent] = useState(null);

  const pathControllerRef = useRef(new GeniePathController());
  const worldTransform = SpatialTransitionController.getTransformForState(worldState);

  const handleGoalSelected = (selectedGoal) => {
    const updatedState = new LearningStateModel({ ...learningState, goal: selectedGoal });
    setLearningState(updatedState);

    const newRoute = RouteGeneratorEngine.generateRoute({ goal: selectedGoal });
    setCurrentRoute(newRoute);

    setWorldState(WORLD_STATES.DIAGNOSTIC);
  };

  const handleDiagnosticComplete = (diagnosticResults) => {
    const newRoute = RouteGeneratorEngine.generateRoute({
      goal: learningState.goal,
      diagnosticResults
    });
    setCurrentRoute(newRoute);
    setWorldState(WORLD_STATES.ROADMAP);
  };

  const handleStartPath = (node) => {
    const targetNode = node || currentRoute.getActiveNode();
    const resolvedContent = ContentResolver.resolveMissionContent(targetNode, learningState);
    setActiveMissionContent(resolvedContent);
    setWorldState(WORLD_STATES.MISSION);
  };

  const handleModifyRoute = (actionType) => {
    currentRoute.modifyRoute(actionType);
    setCurrentRoute(RouteGeneratorEngine.generateRoute({ goal: learningState.goal }));
  };

  const handleResetGoal = () => {
    setWorldState(WORLD_STATES.DISCOVERY);
  };

  const handleBackToRoadmap = () => {
    setWorldState(WORLD_STATES.ROADMAP);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0B0F19', color: '#FFF', position: 'relative', overflow: 'hidden' }}>
      {/* Living Ambient Void Background */}
      <LivingVoidBackground />

      {/* Ultra-Minimal Overlay */}
      <MinimalGlobalChrome
        goal={learningState.goal}
        currentWorldState={worldState}
        onBackToRoadmap={handleBackToRoadmap}
        onResetGoal={handleResetGoal}
      />

      {/* CONTINUOUS SPATIAL WORLD CANVAS */}
      <div
        style={{
          width: '100vw',
          height: '100vh',
          transform: `scale(${worldTransform.scale}) translate(${worldTransform.translateX}px, ${worldTransform.translateY}px)`,
          opacity: worldTransform.opacity,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
          position: 'relative'
        }}
      >
        {worldState === 'home' && (
          <CinematicHomeScene
            learningState={learningState}
            route={currentRoute}
            onStartMission={() => handleStartPath()}
            onOpenRoadmap={() => setWorldState(WORLD_STATES.ROADMAP)}
            onOpenProof={() => setWorldState('proof')}
          />
        )}

        {worldState === WORLD_STATES.DISCOVERY && (
          <GoalDiscoveryScene onGoalSelected={handleGoalSelected} />
        )}

        {worldState === WORLD_STATES.DIAGNOSTIC && (
          <DiagnosticScene onComplete={handleDiagnosticComplete} />
        )}

        {worldState === WORLD_STATES.ROADMAP && (
          <RoadmapWorldScene
            route={currentRoute}
            onStartPath={handleStartPath}
            onModifyRoute={handleModifyRoute}
          />
        )}

        {worldState === WORLD_STATES.MISSION && (
          <SpatialMissionScene
            missionContent={activeMissionContent}
            onMissionCompleted={() => setWorldState('puzzle')}
            onBackToRoadmap={handleBackToRoadmap}
          />
        )}

        {worldState === 'puzzle' && (
          <QuantumPuzzleScene
            targetStateLabel="|1⟩"
            onPuzzleSolved={() => setWorldState('lab')}
            onBackToPath={handleBackToRoadmap}
          />
        )}

        {worldState === 'lab' && (
          <ContextualLabScene onBackToPath={handleBackToRoadmap} />
        )}

        {worldState === 'proof' && (
          <LanternProofScene onBackToPath={handleBackToRoadmap} />
        )}
      </div>

      {/* 3D Cute Quantum Creature Spatial Companion */}
      <GenieSpatialController
        initialText={
          worldState === 'home'
            ? "What are we working toward today?"
            : worldState === WORLD_STATES.DISCOVERY
            ? "Where do you want to go?"
            : worldState === WORLD_STATES.DIAGNOSTIC
            ? "Let me check your starting baseline!"
            : worldState === WORLD_STATES.ROADMAP
            ? "Here is your personal path! Click any flag to inspect."
            : worldState === 'puzzle'
            ? "Build the circuit to reach target state |1⟩!"
            : "Let's explore quantum statevector interference!"
        }
      />
    </div>
  );
}
