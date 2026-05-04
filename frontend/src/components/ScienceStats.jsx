const stats = [
  { num: '2×',   label: 'better retention with active recall vs. re-reading, per cognitive science research' },
  { num: '90%',  label: 'of what you read is forgotten within a week without spaced review' },
  { num: 'FSRS', label: 'algorithm — 20–30% fewer reviews than traditional SM-2 for the same retention' },
  { num: '0',    label: 'tech-interview-focused spaced repetition tools exist today. Until now.' },
]

export default function ScienceStats() {
  return (
    <section className="section">
      <div className="section-label">The science</div>
      <h2 className="section-title">
        Studying harder isn't the answer.<br />Studying smarter is.
      </h2>
      <p className="section-sub">
        Your brain isn't designed to remember everything you read once.
        It's designed to remember what it retrieves repeatedly, at the right intervals.
        That's exactly what Ninaivu is built around.
      </p>
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.num} className="stat-card">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
