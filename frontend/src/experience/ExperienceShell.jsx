import React, { useState, useEffect } from 'react';
import GoalDiscovery from './GoalDiscovery';
import Diagnostic from './Diagnostic';
import RoadmapWorld from './RoadmapWorld';
import MissionView from './MissionView';
import ContentResolver from './ContentResolver';
import LearningStateModel, { CONTEXT_MODES } from './LearningState';
import RouteGeneratorEngine from './RouteGenerator';
import ContextualNavigation from '../navigation/ContextualNavigation';
import GenieSpatialController from '../genie/GenieSpatialController';
import LivingVoidBackground from '../components/ui/LivingVoidBackground';

/**
 * ExperienceShell.jsx
 * Experience Shell controlling the living, goal-driven quantum learning environment.
 */
export default function ExperienceShell() {
  const [learningState, setLearningState] = useState(() => LearningStateModel.loadFromStorage());
  const [activeStage, setActiveStage] = useState(() => {
    // If goal is set in storage, go to roadmap, else discovery
    const savedGoal = localStorage.getItem('ql_user_goal');
    return savedGoal ? CONTEXT_MODES.ROADMAP : CONTEXT_MODES.DISCOVERY;
  });

  const [currentRoute, setCurrentRoute] = useState(() => {
    return RouteGeneratorEngine.generateRoute({ goal: learningState.goal });
  });

  const [activeMissionContent, setActiveMissionContent] = useState(null);

  // Synchronize state changes to localStorage
  useEffect(() => {
    learningState.saveToStorage();
  }, [learningState]);

  const handleGoalSelected = (selectedGoal) => {
    const updatedState = new LearningStateModel({ ...learningState, goal: selectedGoal });
    setLearningState(updatedState);

    // Regenerate route
    const newRoute = RouteGeneratorEngine.generateRoute({ goal: selectedGoal });
    setCurrentRoute(newRoute);

    // Proceed to Diagnostic
    setActiveStage(CONTEXT_MODES.DIAGNOSTIC);
  };

  const handleDiagnosticComplete = (diagnosticResults) => {
    // Regenerate route with diagnostic feedback
    const newRoute = RouteGeneratorEngine.generateRoute({
      goal: learningState.goal,
      diagnosticResults
    });
    setCurrentRoute(newRoute);

    // Proceed to Animated Path Roadmap
    setActiveStage(CONTEXT_MODES.ROADMAP);
  };

  const handleStartPath = (node) => {
    const targetNode = node || currentRoute.getActiveNode();
    const resolvedContent = ContentResolver.resolveMissionContent(targetNode, learningState);
    setActiveMissionContent(resolvedContent);
    setActiveStage(CONTEXT_MODES.MISSION);
  };

  const handleModifyRoute = (actionType) => {
    const updatedRoute = new RouteGeneratorEngine();
    currentRoute.modifyRoute(actionType);
    setCurrentRoute(new RouteGeneratorEngine().generateRoute({ goal: learningState.goal }));
  };

  const handleResetGoal = () => {
    setActiveStage(CONTEXT_MODES.DISCOVERY);
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#0B0F19', color: '#FFF', position: 'relative', overflowX: 'hidden' }}>
      {/* Living Ambient Void Background */}
      <LivingVoidBackground />

      {/* Contextual Header Navigation */}
      <ContextualNavigation
        learningState={learningState}
        onResetGoal={handleResetGoal}
      />

      {/* Main Experience Flow Stages */}
      <main style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 64px)' }}>
        {activeStage === CONTEXT_MODES.DISCOVERY && (
          <GoalDiscovery onGoalSelected={handleGoalSelected} />
        )}

        {activeStage === CONTEXT_MODES.DIAGNOSTIC && (
          <Diagnostic onComplete={handleDiagnosticComplete} />
        )}

        {activeStage === CONTEXT_MODES.ROADMAP && (
          <RoadmapWorld
            route={currentRoute}
            onStartPath={handleStartPath}
            onModifyRoute={handleModifyRoute}
          />
        )}

        {activeStage === CONTEXT_MODES.MISSION && (
          <MissionView
            missionContent={activeMissionContent}
            onMissionCompleted={() => setActiveStage(CONTEXT_MODES.ROADMAP)}
            onBackToRoadmap={() => setActiveStage(CONTEXT_MODES.ROADMAP)}
          />
        )}
      </main>

      {/* 3D Cute Quantum Creature Spatial Genie Companion Layer */}
      <GenieSpatialController
        initialText={
          activeStage === CONTEXT_MODES.DISCOVERY
            ? "Hey... where do you want to go?"
            : activeStage === CONTEXT_MODES.DIAGNOSTIC
            ? "Let's check your starting baseline with a few fun micro-experiments!"
            : activeStage === CONTEXT_MODES.ROADMAP
            ? "Here is your personal path! Inspect the milestone flags and adjust anytime."
            : "Let's explore quantum statevector amplitude interference!"
        }
      />
    </div>
  );
}
