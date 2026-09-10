import React from 'react';

export default function CurriculumTree({ curriculum = [], activeLessonId = null, onSelectLesson }) {
  return (
    <div className="space-y-4">
      {curriculum.map((mod) => (
        <div key={mod.id} className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex justify-between items-center">
            <h4 className="text-sm font-bold text-cyan-300">{mod.title}</h4>
            <span className="text-xs text-slate-400 font-mono">{mod.lessons?.length || 0} Lessons</span>
          </div>

          <div className="divide-y divide-slate-800/50">
            {mod.lessons?.map((les) => {
              const isActive = les.id === activeLessonId;
              return (
                <div
                  key={les.id}
                  onClick={() => onSelectLesson && onSelectLesson(les.id)}
                  className={`p-3 text-xs flex justify-between items-center cursor-pointer transition ${
                    isActive ? 'bg-cyan-950/40 text-cyan-300 font-bold border-l-4 border-cyan-400' : 'hover:bg-slate-850 text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold">{les.title}</p>
                    <p className="text-[11px] text-slate-400 font-normal">{les.difficulty} • {les.time_minutes} min</p>
                  </div>
                  <span className="text-slate-400">→</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
