import React, { useRef, useEffect } from 'react';
import { QuantumPanel, QuantumMetric } from '../ui/QuantumPrimitives';

export default function BlochSphere3D({ statevector }) {
  const canvasRef = useRef(null);

  // Compute Bloch coordinates (x, y, z) from single-qubit statevector [alpha, beta]
  let alpha = { real: 1, imag: 0 };
  let beta = { real: 0, imag: 0 };

  if (statevector && statevector.length >= 2) {
    alpha = statevector[0];
    beta = statevector[1];
  }

  // |psi> = a|0> + b|1>
  // Bloch vector:
  // x = 2 * Re(a* b)
  // y = 2 * Im(a* b)
  // z = |a|^2 - |b|^2
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = 240);
    const height = (canvas.height = 240);
    const cx = width / 2;
    const cy = height / 2;
    const radius = 80;

    ctx.clearRect(0, 0, width, height);

    // Sphere wireframe
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Equatorial ellipse
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, radius * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Axes
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.setLineDash([3, 3]);
    // Z axis (vertical)
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius - 10);
    ctx.lineTo(cx, cy + radius + 10);
    ctx.stroke();
    // X axis
    ctx.beginPath();
    ctx.moveTo(cx - radius - 10, cy + 20);
    ctx.lineTo(cx + radius + 10, cy - 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Labels |0> and |1>
    ctx.fillStyle = '#06b6d4';
    ctx.font = '12px monospace';
    ctx.fillText('|0⟩', cx - 8, cy - radius - 14);
    ctx.fillText('|1⟩', cx - 8, cy + radius + 22);

    // Project 3D vector (bx, by, bz) to 2D canvas
    // bx (forward/left-right offset), by (depth offset), bz (up/down)
    const px = cx + bx * radius * 0.85 + by * radius * 0.3;
    const py = cy - bz * radius * 0.85 + by * radius * 0.15;

    // Draw state vector arrow
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Vector tip point
    ctx.fillStyle = '#a78bfa';
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();
  }, [bx, by, bz]);

  const isMultiQubit = statevector && statevector.length > 2;

  return (
    <QuantumPanel title="3D Bloch Sphere" badgeText={isMultiQubit ? "Multi-Qubit Notice" : "Single-Qubit Pure State"}>
      {isMultiQubit ? (
        <div style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', lineHeight: '1.6' }}>
          <div style={{ color: 'var(--accent-secondary)', fontWeight: 600, marginBottom: '8px', fontSize: '0.9rem' }}>
            ℹ️ Multi-Qubit Entangled System ({Math.round(Math.log2(statevector.length))} Qubits)
          </div>
          For a multi-qubit statevector ({statevector.length} amplitudes), individual qubits may be in mixed or entangled reduced states (rho_i = Tr(|psi⟩⟨psi|)).
          <br /><br />
          Displaying single-qubit Bloch vector for qubit q0 subsystem amplitude slice:
        </div>
      ) : null}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <canvas ref={canvasRef} style={{ background: 'transparent' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
          <QuantumMetric label="X" value={bx.toFixed(3)} color="#06b6d4" />
          <QuantumMetric label="Y" value={by.toFixed(3)} color="#a78bfa" />
          <QuantumMetric label="Z" value={bz.toFixed(3)} color="#4ade80" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', width: '100%', marginTop: '0.5rem' }}>
          <QuantumMetric label="θ (theta)" value={(theta * (180 / Math.PI)).toFixed(1)} unit="°" />
          <QuantumMetric label="φ (phi)" value={(phi * (180 / Math.PI)).toFixed(1)} unit="°" />
        </div>
      </div>
    </QuantumPanel>
  );
}
