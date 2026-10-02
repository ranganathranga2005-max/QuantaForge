/**
 * LearningRoute.js
 * Structure & State Management for Dynamic Personal Learning Routes
 */

export class LearningRouteNode {
  constructor({ id, title, skill, concept, status = 'locked', isOptional = false, isMilestone = false, prerequisites = [], icon = '🚩' }) {
    this.id = id;
    this.title = title;
    this.skill = skill;
    this.concept = concept;
    this.status = status; // 'completed' | 'active' | 'locked'
    this.isOptional = isOptional;
    this.isMilestone = isMilestone;
    this.prerequisites = prerequisites;
    this.icon = icon;
  }
}

export class LearningRoute {
  constructor({ goal, nodes = [], milestones = [], finalGoal = 'Quantum Mastery' }) {
    this.goal = goal;
    this.nodes = nodes.map(n => n instanceof LearningRouteNode ? n : new LearningRouteNode(n));
    this.milestones = milestones;
    this.finalGoal = finalGoal;
  }

  getActiveNode() {
    return this.nodes.find(n => n.status === 'active') || this.nodes[0];
  }

  markCompleted(nodeId) {
    const idx = this.nodes.findIndex(n => n.id === nodeId);
    if (idx !== -1) {
      this.nodes[idx].status = 'completed';
      if (idx + 1 < this.nodes.length && this.nodes[idx + 1].status === 'locked') {
        this.nodes[idx + 1].status = 'active';
      }
    }
  }

  modifyRoute(actionType) {
    // Dynamically adjust route nodes based on user intent
    if (actionType === 'skip') {
      const active = this.getActiveNode();
      if (active) {
        this.markCompleted(active.id);
      }
    } else if (actionType === 'faster') {
      // Streamline by turning non-milestone nodes into optional nodes
      this.nodes.forEach(n => {
        if (!n.isMilestone && n.status !== 'completed') {
          n.isOptional = true;
        }
      });
    } else if (actionType === 'research') {
      // Add advanced noise & VQE research node
      this.nodes.splice(this.nodes.length - 1, 0, new LearningRouteNode({
        id: 'node-res-gap',
        title: 'Noise Models & Literature Gaps',
        skill: 'Quantum Error Analysis',
        concept: 'Density Matrices & Noise',
        status: 'locked',
        isOptional: false,
        isMilestone: true,
        icon: '🔬'
      }));
    }
  }
}

export default LearningRoute;
