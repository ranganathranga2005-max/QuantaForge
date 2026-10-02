import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EXPRESSIONS } from './GenieExpression';

/**
 * GenieBody.jsx
 * Three.js 3D Cute Quantum Creature Companion
 * Pure transparent 3D character with soft volumetric body, expressive eyes,
 * tiny cute mouth, quantum orb antenna, and orbital particle rings.
 * DEFAULT visual size: 200px. NO RECTANGULAR CARD / NO CONTAINER BOX.
 */
export default function GenieBody({
  size = 200,
  expression = EXPRESSIONS.IDLE,
  gaze = { x: 0, y: 0 },
  rotationZ = 0,
  onClick
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const bodyMeshRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const mouthRef = useRef(null);
  const antennaOrbRef = useRef(null);
  const orbitalRingsRef = useRef(null);

  useEffect(() => {
    const width = size;
    const height = size;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.2); // Cyan rim light
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc084fc, 1.6); // Soft purple fill
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    // 3. Cute Creature Body (Soft Sphere with Slight Vertical Stretch)
    const bodyGroup = new THREE.Group();
    scene.add(bodyGroup);
    bodyMeshRef.current = bodyGroup;

    const bodyGeo = new THREE.SphereGeometry(1.0, 64, 64);
    bodyGeo.scale(1.05, 1.18, 0.98); // Cute soft proportions

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transmission: 0.25,
      ior: 1.3
    });

    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyGroup.add(bodyMesh);

    // 4. Large Cute Expressive Eyes
    const eyeGeo = new THREE.SphereGeometry(0.26, 32, 32);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.36, 0.22, 0.84);
    bodyGroup.add(leftEye);
    leftEyeRef.current = leftEye;

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.36, 0.22, 0.84);
    bodyGroup.add(rightEye);
    rightEyeRef.current = rightEye;

    // Pupils (Deep Cyan with Shiny Reflection)
    const pupilGeo = new THREE.SphereGeometry(0.14, 32, 32);
    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.1 });

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(0, 0, 0.15);
    leftEye.add(leftPupil);
    leftPupilRef.current = leftPupil;

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0, 0, 0.15);
    rightEye.add(rightPupil);
    rightPupilRef.current = rightPupil;

    // Shiny Eye Highlights (Specular Dots)
    const shineGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const shineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftShine = new THREE.Mesh(shineGeo, shineMat);
    leftShine.position.set(0.06, 0.06, 0.12);
    leftPupil.add(leftShine);

    const rightShine = new THREE.Mesh(shineGeo, shineMat);
    rightShine.position.set(0.06, 0.06, 0.12);
    rightPupil.add(rightShine);

    // 5. Tiny Cute Mouth
    const mouthGeo = new THREE.TorusGeometry(0.09, 0.02, 16, 32, Math.PI);
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    mouthMesh.rotation.x = Math.PI; // Happy smile curve
    mouthMesh.position.set(0, -0.16, 0.94);
    bodyGroup.add(mouthMesh);
    mouthRef.current = mouthMesh;

    // 6. Antenna & Quantum Floating Orb
    const stemGeo = new THREE.CylinderGeometry(0.02, 0.03, 0.35, 16);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.set(0, 1.28, 0);
    bodyGroup.add(stem);

    const orbGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.6,
      roughness: 0.1
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    orb.position.set(0, 1.52, 0);
    bodyGroup.add(orb);
    antennaOrbRef.current = orb;

    // 7. Orbital Particle Rings
    const ringGroup = new THREE.Group();
    bodyGroup.add(ringGroup);
    orbitalRingsRef.current = ringGroup;

    const ringGeo1 = new THREE.TorusGeometry(1.45, 0.016, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.6, 0.013, 16, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    // 8. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle breathing & floating motion
      if (bodyGroup) {
        bodyGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.06;
        bodyGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.12;
      }

      // Spin orbital quantum rings
      if (ringGroup) {
        ringGroup.rotation.y = elapsedTime * 0.7;
        ringGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2;
      }

      // Pulsate quantum antenna orb
      if (antennaOrbRef.current) {
        const scale = 1 + Math.sin(elapsedTime * 4) * 0.08;
        antennaOrbRef.current.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      scene.clear();
    };
  }, [size]);

  // Update eyes/gaze based on props
  useEffect(() => {
    if (leftPupilRef.current && rightPupilRef.current) {
      leftPupilRef.current.position.x = gaze.x * 0.06;
      leftPupilRef.current.position.y = gaze.y * 0.06;
      rightPupilRef.current.position.x = gaze.x * 0.06;
      rightPupilRef.current.position.y = gaze.y * 0.06;
    }
  }, [gaze]);

  // Update expression eye blinking / mouth curvature
  useEffect(() => {
    if (leftEyeRef.current && rightEyeRef.current) {
      if (expression === EXPRESSIONS.SLEEPING) {
        leftEyeRef.current.scale.y = 0.1;
        rightEyeRef.current.scale.y = 0.1;
      } else if (expression === EXPRESSIONS.EXCITED || expression === EXPRESSIONS.CELEBRATING) {
        leftEyeRef.current.scale.y = 1.25;
        rightEyeRef.current.scale.y = 1.25;
      } else {
        leftEyeRef.current.scale.y = 1.0;
        rightEyeRef.current.scale.y = 1.0;
      }
    }
  }, [expression]);

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      style={{
        width: size,
        height: size,
        cursor: 'grab',
        userSelect: 'none',
        transform: `rotate(${rotationZ}rad)`,
        transition: 'transform 0.1s ease-out'
      }}
    />
  );
}
