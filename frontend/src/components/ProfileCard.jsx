import { useState } from 'react'
import Button from './Button'
export const SECTIONS = [['about', 'About Me'], ['goals', 'Goals'], ['preferences', 'Preferences'], ['priorities', 'Priorities'], ['routines', 'Routines'], ['patterns', 'Decision Patterns']]

export default function ProfileCard({ title, groups, onChange, forceEdit, addLabel = '+ Add', fixed }) {
  const [own, setOwn] = useState(false)
  const editing = own || forceEdit
  const set = (gi, vals) => onChange(groups.map((g, i) => (i === gi ? { ...g, values: vals } : g)))
  return (
    <section className="card">
      <div className="row"><h3>{title}</h3>{!forceEdit && <Button variant="ghost" onClick={() => setOwn(!own)}>{own ? 'Done' : 'Edit'}</Button>}</div>
      {groups.map((g, gi) => (
        <div key={g.label} className="group"><span className="lbl">{g.label}</span>
          {editing ? (
            <div className="edit">
              {g.values.map((v, vi) => (
                <div key={vi} className="ed"><input value={v} onChange={(e) => set(gi, g.values.map((x, i) => (i === vi ? e.target.value : x)))} />
                  {!fixed && <button aria-label="Remove" onClick={() => set(gi, g.values.filter((_, i) => i !== vi))}>×</button>}</div>
              ))}
              {!fixed && <button className="link" onClick={() => set(gi, [...g.values, ''])}>{addLabel}</button>}
            </div>
          ) : <ul>{g.values.map((v, i) => <li key={i}>{v || '—'}</li>)}</ul>}
        </div>
      ))}
    </section>
  )
}

export function ProfileSections({ profile, setProfile, forceEdit, mine }) {
  return (
    <div className="grid2">
      {SECTIONS.map(([k, t]) => (
        <ProfileCard key={k} title={mine && k !== 'about' ? `My ${t}` : t} groups={profile[k]} forceEdit={forceEdit} fixed={k === 'about'}
          addLabel={k === 'goals' ? '+ Add goal' : '+ Add'} onChange={(g) => setProfile({ ...profile, [k]: g })} />
      ))}
    </div>
  )
}
