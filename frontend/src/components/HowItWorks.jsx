const steps = [
  { n: '1', title: 'Pick your deck',          desc: 'Choose from curated DSA or Data Engineering templates, or build your own cards from scratch.' },
  { n: '2', title: 'Hide → struggle → reveal', desc: 'Active recall: see the question, force yourself to answer, then reveal. The struggle is the learning.' },
  { n: '3', title: 'Rate your recall',         desc: "Score yourself 1–5. The FSRS algorithm schedules your next review at the exact moment before you'd forget." },
  { n: '4', title: 'Know your readiness',      desc: 'A per-topic readiness score shows exactly where you stand, days before the interview.' },
]

export default function HowItWorks() {
  return (
    <section className="section how-bg" id="how">
      <div className="section-label">How it works</div>
      <h2 className="section-title">Four steps to interview confidence</h2>
      <p className="section-sub">A tight loop designed around the science of memory consolidation.</p>
      <div className="how-grid">
        {steps.map((s) => (
          <div key={s.n} className="how-card">
            <div className="how-num">{s.n}</div>
            <div className="how-title">{s.title}</div>
            <div className="how-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
