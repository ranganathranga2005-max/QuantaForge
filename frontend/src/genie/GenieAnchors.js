/**
 * GenieAnchors.js
 * Manages UI Target Anchors for Spatial Positioning & Paths
 */

export const ANCHOR_ROLES = {
  HERO: 'hero',
  GOAL_SELECTION: 'goal_selection',
  DIAGNOSTIC: 'diagnostic',
  ROADMAP: 'roadmap',
  MISSION_CARD: 'mission_card',
  CIRCUIT_BUILDER: 'circuit_builder',
  RESULTS_PANEL: 'results_panel',
  BOTTOM_RIGHT: 'bottom_right'
};

export function getAnchorCoordinates(anchorIdOrRole) {
  if (typeof window === 'undefined') return { x: window?.innerWidth - 180 || 800, y: window?.innerHeight - 180 || 600 };

  const el = document.querySelector(`[data-genie-anchor="${anchorIdOrRole}"]`) || document.getElementById(anchorIdOrRole);

  if (el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.right + 20,
      y: rect.top + rect.height / 2 - 40,
      width: rect.width,
      height: rect.height,
      center: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    };
  }

  // Fallback anchor coordinates (responsive bottom-right offset)
  return {
    x: window.innerWidth - 160,
    y: window.innerHeight - 170,
    width: 0,
    height: 0,
    center: { x: window.innerWidth - 160, y: window.innerHeight - 170 }
  };
}
