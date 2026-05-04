const features = [
  {
    icon: '📚', iconBg: '#EEEDFE',
    title: 'Curated DSA decks',
    desc: 'Arrays, Trees, Graphs, Dynamic Programming, Sliding Window — structured from beginner to advanced.',
    tag: 'DSA', tagBg: '#EEEDFE', tagColor: '#534AB7',
  },
  {
    icon: '⚡', iconBg: '#E1F5EE',
    title: 'Data Engineering templates',
    desc: 'Spark internals, Kafka, Airflow, AWS Glue, Redshift, dbt — the exact stack interviewers test on.',
    tag: 'DE', tagBg: '#E1F5EE', tagColor: '#1D9E75',
  },
  {
    icon: '🎯', iconBg: '#FAEEDA',
    title: 'Interview readiness score',
    desc: "A per-topic score that tells you exactly where you're strong and where you'll get caught out.",
    tag: 'Analytics', tagBg: '#FAEEDA', tagColor: '#BA7517',
  },
  {
    icon: '✏️', iconBg: '#EAF3DE',
    title: 'Custom card creator',
    desc: 'Build your own cards with rich text, code blocks with syntax highlighting, and custom tags.',
    tag: 'Custom', tagBg: '#EAF3DE', tagColor: '#3B6D11',
  },
  {
    icon: '🔔', iconBg: '#EEEDFE',
    title: 'Smart notifications',
    desc: "Push alerts when cards are due, streaks are at risk, or a topic hasn't been touched in 14 days.",
    tag: 'PWA', tagBg: '#EEEDFE', tagColor: '#534AB7',
  },
  {
    icon: '📱', iconBg: '#E1F5EE',
    title: 'Works on mobile',
    desc: 'Add to your home screen — no app store needed. Study on the bus. Review on your lunch break.',
    tag: 'Mobile', tagBg: '#E1F5EE', tagColor: '#1D9E75',
  },
]

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="section-label">Features</div>
      <h2 className="section-title">
        Everything you need.<br />Nothing you don't.
      </h2>
      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon" style={{ background: f.iconBg }}>{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
            <span className="feature-tag" style={{ background: f.tagBg, color: f.tagColor }}>
              {f.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
