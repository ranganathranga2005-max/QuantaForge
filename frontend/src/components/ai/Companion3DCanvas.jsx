import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Cinematic 3D Expressive Spherical Quantum Companion WebGL Renderer (Three.js)
 * Features:
 * - Smooth Spherical / Ovoid Metallic Head Chassis (THREE.SphereGeometry)
 * - Embedded Curved Spherical Glass Visor (THREE.SphereGeometry slice)
 * - 3D Expressive Eyebrows, Dynamic Eye Shapes, Specular Pupils & Audio-Reactive Mouth
 * - Realistic Natural 3D Blinking Loop
 * - 3D Concentric Orbit Rings & Revolving Qubit Spheres
 * - Swirling 3D Quantum Particle Swarm reacting to 12 state transitions
 * - Smooth Mouse Parallax Head Tracking
 */
export default function Companion3DCanvas({ state = 'IDLE', size = 300, className = '' }) {
  const mountRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.background = 'transparent';
    renderer.domElement.style.outline = 'none';
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    mainLight.position.set(5, 5, 8);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xa78bfa, 2.0);
    fillLight.position.set(-5, -3, 5);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0x22d3ee, 4.0, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // 3. Companion Character Mesh Group
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // Color map for 12 states
    const getStateColorHex = (st) => {
      switch (st) {
        case 'LISTENING': return { main: 0x06b6d4, eye: 0x22d3ee, glow: 0x67e8f9 };
        case 'THINKING':
        case 'PROCESSING': return { main: 0x8b5cf6, eye: 0xa78bfa, glow: 0xc4b5fd };
        case 'SPEAKING': return { main: 0x3b82f6, eye: 0x60a5fa, glow: 0x93c5fd };
        case 'EXPLAINING': return { main: 0x7c3aed, eye: 0xc4b5fd, glow: 0xddd6fe };
        case 'CURIOUS': return { main: 0x0284c7, eye: 0x38bdf8, glow: 0xbae6fd };
        case 'ENCOURAGING':
        case 'SUCCESS':
        case 'DISCOVERY': return { main: 0x10b981, eye: 0x34d399, glow: 0x6ee7b7 };
        case 'HINT': return { main: 0xd97706, eye: 0xfbbf24, glow: 0xfde68a };
        case 'WARNING': return { main: 0xef4444, eye: 0xf87171, glow: 0xfca5a5 };
        default: return { main: 0x2563eb, eye: 0x60a5fa, glow: 0xbfdbfe };
      }
    };

    const initialColors = getStateColorHex(state);

    // 3a. Smooth Spherical Metallic Head Chassis
    const headGeo = new THREE.SphereGeometry(1.5, 64, 64);
    const headMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.scale.set(1.05, 0.98, 0.98); // Cute ovoid sphere
    characterGroup.add(headMesh);

    // 3b. Embedded Curved Spherical Glass Visor Screen
    const visorGeo = new THREE.SphereGeometry(
      1.51, 64, 64,
      Math.PI * 0.3, Math.PI * 0.4,
      Math.PI * 0.32, Math.PI * 0.36
    );
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x0b132b,
      metalness: 0.1,
      roughness: 0.05,
      clearcoat: 1.0
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    characterGroup.add(visorMesh);

    // 3c. Left & Right 3D Expressive Eyebrows
    const browGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.32);
    const browMat = new THREE.MeshStandardMaterial({
      color: initialColors.eye,
      emissive: initialColors.eye,
      emissiveIntensity: 1.5
    });

    const leftBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.position.set(-0.48, 0.52, 1.32);
    leftBrow.rotation.z = Math.PI / 2;
    characterGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, browMat);
    rightBrow.position.set(0.48, 0.52, 1.32);
    rightBrow.rotation.z = Math.PI / 2;
    characterGroup.add(rightBrow);

    // 3d. Left & Right 3D Expressive Eye Spheres
    const eyeGeo = new THREE.SphereGeometry(0.26, 32, 32);
    const eyeMatLeft = new THREE.MeshStandardMaterial({
      color: initialColors.eye,
      emissive: initialColors.eye,
      emissiveIntensity: 2.2,
      roughness: 0.15
    });
    const eyeMatRight = eyeMatLeft.clone();

    const leftEyeMesh = new THREE.Mesh(eyeGeo, eyeMatLeft);
    leftEyeMesh.position.set(-0.48, 0.22, 1.32);
    characterGroup.add(leftEyeMesh);

    const rightEyeMesh = new THREE.Mesh(eyeGeo, eyeMatRight);
    rightEyeMesh.position.set(0.48, 0.22, 1.32);
    characterGroup.add(rightEyeMesh);

    // Pupils / Specular Highlights
    const pupilGeo = new THREE.SphereGeometry(0.09, 16, 16);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.06, 0.06, 0.22);
    leftEyeMesh.add(leftPupil);

    const rightPupil = leftPupil.clone();
    rightEyeMesh.add(rightPupil);

    // 3e. Expressive Curved Torus Smile/Mouth
    const mouthGeo = new THREE.TorusGeometry(0.32, 0.04, 16, 32, Math.PI);
    const mouthMat = new THREE.MeshStandardMaterial({
      color: initialColors.eye,
      emissive: initialColors.eye,
      emissiveIntensity: 2.0
    });
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    mouthMesh.position.set(0, -0.28, 1.36);
    mouthMesh.rotation.x = Math.PI; // Smile arc
    characterGroup.add(mouthMesh);

    // 3f. Antenna Stem & Glowing Spark Sphere
    const antennaStemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6);
    const antennaStemMat = new THREE.MeshStandardMaterial({ color: initialColors.main, metalness: 0.85 });
    const antennaStem = new THREE.Mesh(antennaStemGeo, antennaStemMat);
    antennaStem.position.set(0, 1.6, 0);
    characterGroup.add(antennaStem);

    const sparkGeo = new THREE.SphereGeometry(0.18, 24, 24);
    const sparkMat = new THREE.MeshStandardMaterial({
      color: initialColors.glow,
      emissive: initialColors.glow,
      emissiveIntensity: 2.8
    });
    const sparkMesh = new THREE.Mesh(sparkGeo, sparkMat);
    sparkMesh.position.set(0, 1.9, 0);
    characterGroup.add(sparkMesh);

    // 4. 3D Concentric Orbit Rings & Revolving Qubit Spheres
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const ringMat1 = new THREE.MeshStandardMaterial({
      color: initialColors.glow,
      emissive: initialColors.glow,
      emissiveIntensity: 1.4,
      wireframe: true
    });
    const ringMat2 = ringMat1.clone();

    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.022, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 4;
    ring1.rotation.y = Math.PI / 6;
    orbitGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.7, 0.02, 16, 100);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = -Math.PI / 4;
    orbitGroup.add(ring2);

    // Revolving Qubit Node Spheres
    const qubitNodeGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const qubitNodeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 2.2
    });
    const qubitNode1 = new THREE.Mesh(qubitNodeGeo, qubitNodeMat);
    ring1.add(qubitNode1);
    qubitNode1.position.set(2.4, 0, 0);

    const qubitNode2 = qubitNode1.clone();
    ring2.add(qubitNode2);
    qubitNode2.position.set(-2.7, 0, 0);

    // 5. Swirling 3D Quantum Particle Swarm
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.3 + Math.random() * 1.7;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: initialColors.glow,
      size: 0.09,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Interactive Mouse Parallax Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouseX = x * 0.45;
      targetMouseY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Dynamic Blinking Loop (blinks naturally every 3.8s)
    let blinkTimer = 0;
    let isBlinking3D = false;

    // 8. Animation Loop (60fps)
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const st = stateRef.current;
      const curColors = getStateColorHex(st);

      // Handle natural 3D eye blinking
      blinkTimer += 0.016;
      if (blinkTimer > 3.8) {
        isBlinking3D = true;
        if (blinkTimer > 3.96) {
          isBlinking3D = false;
          blinkTimer = 0;
        }
      }

      // Dynamically update material colors per state
      eyeMatLeft.color.setHex(curColors.eye);
      eyeMatLeft.emissive.setHex(curColors.eye);
      eyeMatRight.color.setHex(curColors.eye);
      eyeMatRight.emissive.setHex(curColors.eye);
      browMat.color.setHex(curColors.eye);
      browMat.emissive.setHex(curColors.eye);
      mouthMat.color.setHex(curColors.eye);
      mouthMat.emissive.setHex(curColors.eye);
      sparkMat.color.setHex(curColors.glow);
      sparkMat.emissive.setHex(curColors.glow);
      ringMat1.color.setHex(curColors.glow);
      ringMat1.emissive.setHex(curColors.glow);
      pointLight.color.setHex(curColors.main);

      // Smooth mouse parallax lerp towards user's cursor
      characterGroup.rotation.y += (targetMouseX - characterGroup.rotation.y) * 0.06;
      characterGroup.rotation.x += (-targetMouseY - characterGroup.rotation.x) * 0.06;

      // Orbit rings & particle system rotation
      const orbitSpeed = (st === 'THINKING' || st === 'PROCESSING') ? 2.2 : 0.45;
      ring1.rotation.z += 0.008 * orbitSpeed;
      ring2.rotation.z -= 0.01 * orbitSpeed;
      particleSystem.rotation.y += 0.003 * orbitSpeed;

      // State-driven 3D Eyebrows & Eyes Expressions
      if (isBlinking3D) {
        leftEyeMesh.scale.set(1.1, 0.08, 1.1);
        rightEyeMesh.scale.set(1.1, 0.08, 1.1);
      } else if (st === 'THINKING' || st === 'PROCESSING') {
        // Thoughtful Eyebrows angle + Pupils shift up-right
        leftBrow.rotation.z = (Math.PI / 2) - 0.25;
        rightBrow.rotation.z = (Math.PI / 2) + 0.25;
        leftPupil.position.set(0.08, 0.12, 0.22);
        rightPupil.position.set(0.08, 0.12, 0.22);
        
        characterGroup.position.z += (0 - characterGroup.position.z) * 0.08;
        characterGroup.rotation.z += (-0.16 - characterGroup.rotation.z) * 0.08;
        characterGroup.position.y = Math.sin(elapsedTime * 2.5) * 0.08;
        leftEyeMesh.scale.set(1, 1, 1);
        rightEyeMesh.scale.set(1, 1, 1);
        mouthMesh.scale.set(0.8, 1, 1);
      } else if (st === 'CURIOUS') {
        // Asymmetric eyebrow arch & eye enlargement
        leftBrow.position.y = 0.58;
        leftBrow.rotation.z = (Math.PI / 2) + 0.3;
        rightBrow.position.y = 0.50;
        rightBrow.rotation.z = (Math.PI / 2) - 0.1;
        leftPupil.position.set(-0.06, 0.06, 0.22);
        rightPupil.position.set(-0.06, 0.06, 0.22);

        characterGroup.rotation.z += (0.18 - characterGroup.rotation.z) * 0.08;
        leftEyeMesh.scale.set(1.35, 1.35, 1.35);
        rightEyeMesh.scale.set(0.82, 0.82, 0.82);
        mouthMesh.scale.set(0.6, 1.8, 1); // Open 'O' mouth
      } else if (st === 'LISTENING') {
        // Attentive forward lean + widened cyan gaze
        leftBrow.position.y = 0.54;
        rightBrow.position.y = 0.54;
        leftBrow.rotation.z = Math.PI / 2;
        rightBrow.rotation.z = Math.PI / 2;
        leftPupil.position.set(0, 0, 0.24);
        rightPupil.position.set(0, 0, 0.24);

        characterGroup.position.z += (0.65 - characterGroup.position.z) * 0.08;
        characterGroup.position.y = Math.sin(elapsedTime * 3) * 0.05;
        leftEyeMesh.scale.set(1.25, 1.25, 1.25);
        rightEyeMesh.scale.set(1.25, 1.25, 1.25);
        mouthMesh.scale.set(1, 1, 1);
      } else if (st === 'SPEAKING' || st === 'EXPLAINING') {
        // Rhythmic head bobbing + Audio-reactive speech mouth scaling loop
        leftBrow.position.y = 0.53;
        rightBrow.position.y = 0.53;
        leftBrow.rotation.z = Math.PI / 2;
        rightBrow.rotation.z = Math.PI / 2;
        leftPupil.position.set(-0.06, 0.06, 0.22);
        rightPupil.position.set(-0.06, 0.06, 0.22);

        characterGroup.position.z += (0.3 - characterGroup.position.z) * 0.08;
        characterGroup.position.y = Math.sin(elapsedTime * 6) * 0.06;
        const mouthScaleY = 0.6 + Math.abs(Math.sin(elapsedTime * 14)) * 1.9;
        mouthMesh.scale.set(1.2, mouthScaleY, 1);
        leftEyeMesh.scale.set(1.05, 1.05, 1.05);
        rightEyeMesh.scale.set(1.05, 1.05, 1.05);
      } else if (st === 'SUCCESS' || st === 'DISCOVERY') {
        // Joyful happy arc eyes (^ ^) + celebratory 3D bounce
        leftBrow.position.y = 0.58;
        rightBrow.position.y = 0.58;
        leftBrow.rotation.z = (Math.PI / 2) - 0.2;
        rightBrow.rotation.z = (Math.PI / 2) + 0.2;

        characterGroup.position.y = Math.sin(elapsedTime * 8) * 0.24;
        leftEyeMesh.scale.set(1.25, 0.35, 1.25);
        rightEyeMesh.scale.set(1.25, 0.35, 1.25);
        mouthMesh.scale.set(1.6, 2.2, 1);
      } else {
        // Default IDLE float
        leftBrow.position.y = 0.52;
        rightBrow.position.y = 0.52;
        leftBrow.rotation.z = Math.PI / 2;
        rightBrow.rotation.z = Math.PI / 2;
        leftPupil.position.set(-0.06, 0.06, 0.22);
        rightPupil.position.set(-0.06, 0.06, 0.22);

        characterGroup.position.z += (0 - characterGroup.position.z) * 0.08;
        characterGroup.rotation.z += (0 - characterGroup.rotation.z) * 0.08;
        characterGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.08;
        leftEyeMesh.scale.set(1, 1, 1);
        rightEyeMesh.scale.set(1, 1, 1);
        mouthMesh.scale.set(1, 1, 1);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup & Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || size;
      const h = container.clientHeight || size;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={`companion-3d-canvas-container state-${state.toLowerCase()} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        pointerEvents: 'auto',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }}
      title={`3D Quantum Companion State: ${state}`}
    />
  );
}

/**
 * Play futuristic Web Audio API harmonic sound chime for state events
 */
export function playQuantumSoundEffect(type = 'success') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'chime') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (err) {
    // Audio context play blocked or unallowed silently fallback
  }
}

