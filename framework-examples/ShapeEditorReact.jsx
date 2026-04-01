import React, { useMemo, useState } from 'react';

const mk = (type) => ({ id: crypto.randomUUID(), type, x: 260, y: 160, width: 120, height: 120, rotation: 0, stroke: '#ff5f5f', fill: '#ff5f5f', fillOpacity: 0.15, cornerRadius: 12 });

export default function ShapeEditorReact() {
  const [shapes, setShapes] = useState([]);
  const [sel, setSel] = useState(null);
  const selected = useMemo(() => shapes.find((s) => s.id === sel), [shapes, sel]);

  const mutate = (id, fn) => setShapes((p) => p.map((s) => (s.id === id ? fn({ ...s }) : s)));

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        {['rect', 'circle', 'triangle'].map((t) => <button key={t} onClick={() => { const s = mk(t); setShapes((p) => [...p, s]); setSel(s.id); }}>{t}</button>)}
        {selected && <input type="color" value={selected.stroke} onChange={(e) => mutate(sel, (s) => (s.stroke = e.target.value, s))} />}
      </div>
      <svg width="100%" height="320" viewBox="0 0 520 320" style={{ background: '#151515' }}>
        {shapes.map((s) => (
          <g key={s.id} transform={`translate(${s.x} ${s.y}) rotate(${s.rotation})`} onMouseDown={() => setSel(s.id)}>
            {s.type === 'circle' ? <ellipse rx={s.width / 2} ry={s.height / 2} fill={s.fill} fillOpacity={s.fillOpacity} stroke={s.stroke} strokeWidth="2" /> : s.type === 'triangle' ? <polygon points={`0,${-s.height/2} ${s.width/2},${s.height/2} ${-s.width/2},${s.height/2}`} fill={s.fill} fillOpacity={s.fillOpacity} stroke={s.stroke} strokeWidth="2" /> : <rect x={-s.width/2} y={-s.height/2} width={s.width} height={s.height} rx={s.cornerRadius} fill={s.fill} fillOpacity={s.fillOpacity} stroke={s.stroke} strokeWidth="2" />}
            {sel === s.id && <rect x={-s.width/2} y={-s.height/2} width={s.width} height={s.height} fill="none" stroke="#22c55e" strokeDasharray="5 4" />}
          </g>
        ))}
      </svg>
    </div>
  );
}
