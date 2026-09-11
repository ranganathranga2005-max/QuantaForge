import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { QuantumPanel, QuantumMetric } from '../ui/QuantumPrimitives';

export default function BlochSphere3D({ statevector, qubitIndex = 0 }) {
  const containerRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(false);

  // Compute Bloch coordinates (x, y, z) from single-qubit statevector [alpha, beta]
  let alpha = { real: 1, imag: 0 };
  let beta = { real: 0, imag: 0 };

  if (statevector && statevector.length >= 2) {
    // If multi-qubit, take the first subsystem slice
    alpha = statevector[0] || { real: 1, imag: 0 };
    beta = statevector[1] || { real: 0, imag: 0 };
  }

  // |psi> = alpha|0> + beta|1>
  // Bloch coordinates:
  // x = 2 * Re(alpha* * beta)
  // y = 2 * Im(alpha* * beta)
  // z = |alpha|^2 - |beta|^2
  const a_conj_real = alpha.real;
  const a_conj_imag = -alpha.imag;

  const ab_real = a_conj_real * beta.real - a_conj_imag * beta.imag;
  const ab_imag = a_conj_real * beta.imag + a_conj_imag * beta.real;

  const bx = 2 * ab_real;
  const by = 2 * ab_imag;
  const bz = (alpha.real ** 2 + alpha.imag ** 2) - (beta.real ** 2 + beta.imag ** 2);

  // Theta & Phi
  const theta = Math.acos(Math.max(-1, Math.min(1, bz)));
  const phi = Math.atan2(by, bx);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 280;
    const height = 280;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.4, 1.8, 3.2);
    camera.lookAt(0, 0, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // 4. Bloch Sphere Group
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const radius = 1.0;

    // Translucent glass inner sphere
    const sphereGeom = new THREE.SphereGeometry(radius, 32, 32);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xEFF6FF,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
    });
    const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
    sphereGroup.add(sphereMesh);

    // Wireframe grid lines (Latitude / Longitude)
    const wireGeom = new THREE.WireframeGeometry(new THREE.SphereGeometry(radius, 16, 12));
    const wireMat = new THREE.LineBasicMaterial({ color: 0xCBD5E1, linewidth: 1 });
    const wireMesh = new THREE.LineSegments(wireGeom, wireMat);
    sphereGroup.add(wireMesh);

    // Equator ring
    const equatorGeom = new THREE.RingGeometry(radius - 0.005, radius + 0.005, 64);
    const equatorMat = new THREE.MeshBasicMaterial({ color: 0x93C5FD, side: THREE.DoubleSide });
    const equatorMesh = new THREE.Mesh(equatorGeom, equatorMat);
    equatorMesh.rotation.x = Math.PI / 2;
    sphereGroup.add(equatorMesh);

    // Coordinate Axes (X: Red/Sky, Y: Purple, Z: Green)
    // Z Axis (Up)
    const zAxisGeom = new THREE.CylinderGeometry(0.015, 0.015, 2.5, 16);
    const zAxisMat = new THREE.MeshBasicMaterial({ color: 0x10B981 });
    const zAxisMesh = new THREE.Mesh(zAxisGeom, zAxisMat);
    sphereGroup.add(zAxisMesh);

    // X Axis (Forward-Right)
    const xAxisGeom = new THREE.CylinderGeometry(0.015, 0.015, 2.5, 16);
    const xAxisMat = new THREE.MeshBasicMaterial({ color: 0x0284C7 });
    const xAxisMesh = new THREE.Mesh(xAxisGeom, xAxisMat);
    xAxisMesh.rotation.z = Math.PI / 2;
    sphereGroup.add(xAxisMesh);

    // Y Axis (Depth)
    const yAxisGeom = new THREE.CylinderGeometry(0.015, 0.015, 2.5, 16);
    const yAxisMat = new THREE.MeshBasicMaterial({ color: 0x7C3AED });
    const yAxisMesh = new THREE.Mesh(yAxisGeom, yAxisMat);
    yAxisMesh.rotation.x = Math.PI / 2;
    sphereGroup.add(yAxisMesh);

    // Vector Arrow for |psi>
    // Map standard physics Bloch coords (x, y, z) where z is UP to Three.js coords (x, z=y_phys, y=z_phys):
    // In Three.js: Y is up, X is right, Z is forward
    const vecX = bx * radius;
    const vecY = bz * radius; // Z coordinate mapped to Three.js Y (up)
    const vecZ = -by * radius; // Y coordinate mapped to Three.js -Z

    const origin = new THREE.Vector3(0, 0, 0);
    const dir = new THREE.Vector3(vecX, vecY, vecZ);
    const len = dir.length() || 0.001;
    dir.normalize();

    const arrowColor = 0x2563EB; // Royal Blue
    const arrow = new THREE.ArrowHelper(dir, origin, Math.min(len, radius), arrowColor, 0.22, 0.12);
    arrow.line.material.linewidth = 4;
    sphereGroup.add(arrow);

    // State Vector Tip Glow Sphere
    const tipGeom = new THREE.SphereGeometry(0.06, 16, 16);
    const tipMat = new THREE.MeshBasicMaterial({ color: 0x2563EB });
    const tipMesh = new THREE.Mesh(tipGeom, tipMat);
    tipMesh.position.set(vecX, vecY, vecZ);
    sphereGroup.add(tipMesh);

    // Dotted projection line from origin to XY plane
    const projPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(vecX, 0, vecZ),
      new THREE.Vector3(vecX, vecY, vecZ)
    ];
    const projGeom = new THREE.BufferGeometry().setFromPoints(projPoints);
    const projMat = new THREE.LineDashedMaterial({ color: 0x64748B, dashSize: 0.08, gapSize: 0.04 });
    const projLine = new THREE.Line(projGeom, projMat);
    projLine.computeLineDistances();
    sphereGroup.add(projLine);

    // 5. Mouse Drag Orbit Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      targetRotationX = Math.max(-1.2, Math.min(1.2, targetRotationX));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 6. Animation
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        targetRotationY += 0.005;
      }

      sphereGroup.rotation.y += (targetRotationY - sphereGroup.rotation.y) * 0.1;
      sphereGroup.rotation.x += (targetRotationX - sphereGroup.rotation.x) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [bx, by, bz, autoRotate]);

  const isMultiQubit = statevector && statevector.length > 2;

  return (
    <QuantumPanel title="3D Bloch Sphere" badgeText={isMultiQubit ? `Qubit q${qubitIndex} Subsystem` : "Pure State |ψ⟩"}>
      {isMultiQubit && (
        <div style={{ padding: '8px 12px', backgroundColor: '#EFF6FF', borderRadius: '6px', border: '1px solid #BFDBFE', fontSize: '0.8rem', color: '#1E40AF', marginBottom: '8px' }}>
          ℹ️ Multi-qubit system detected ({Math.round(Math.log2(statevector.length))} Qubits). Showing state projection for qubit q{qubitIndex}.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ position: 'relative', width: '100%', height: '280px', display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
          <div ref={containerRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
          
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                padding: '4px 8px',
                backgroundColor: autoRotate ? '#EFF6FF' : '#FFFFFF',
                color: autoRotate ? 'var(--accent-primary)' : 'var(--text-secondary)',
                border: '1px solid var(--border-medium)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {autoRotate ? '⏸ PAUSE' : '▶ ROTATE'}
            </button>
          </div>

          <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            <div>|0⟩ = +Z</div>
            <div>|1⟩ = -Z</div>
          </div>
        </div>

        {/* Vector metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%', marginTop: '12px' }}>
          <QuantumMetric label="X (⟨σx⟩)" value={bx.toFixed(3)} color="#0284C7" />
          <QuantumMetric label="Y (⟨σy⟩)" value={by.toFixed(3)} color="#7C3AED" />
          <QuantumMetric label="Z (⟨σz⟩)" value={bz.toFixed(3)} color="#10B981" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', width: '100%', marginTop: '8px' }}>
          <QuantumMetric label="θ (Polar Angle)" value={(theta * (180 / Math.PI)).toFixed(1)} unit="°" />
          <QuantumMetric label="φ (Azimuthal Phase)" value={(phi * (180 / Math.PI)).toFixed(1)} unit="°" />
        </div>
      </div>
    </QuantumPanel>
  );
}
