const templates = [
  {
    cat: 'DSA — Beginner',    catColor: '#534AB7',
    name: 'Arrays & Hashing',
    desc: 'Sliding window, two pointers, prefix sums, frequency maps',
    count: '48 cards', barBg: '#EEEDFE', barFg: '#534AB7', barWidth: '88%',
  },
  {
    cat: 'DSA — Advanced',    catColor: '#534AB7',
    name: 'Dynamic Programming',
    desc: 'Memoization, tabulation, knapsack variants, LCS, LIS',
    count: '55 cards', barBg: '#EEEDFE', barFg: '#534AB7', barWidth: '70%',
  },
  {
    cat: 'Data Engineering',  catColor: '#1D9E75',
    name: 'Apache Spark',
    desc: 'RDD vs DataFrame, shuffles, Catalyst optimizer, partitioning',
    count: '70 cards', barBg: '#E1F5EE', barFg: '#1D9E75', barWidth: '80%',
  },
  {
    cat: 'Data Engineering',  catColor: '#1D9E75',
    name: 'AWS Data Stack',
    desc: 'S3, Glue, Redshift, Athena, EMR, Kinesis, Lake Formation',
    count: '58 cards', barBg: '#E1F5EE', barFg: '#1D9E75', barWidth: '65%',
  },
  {
    cat: 'DSA — Intermediate', catColor: '#534AB7',
    name: 'Trees & Graphs',
    desc: 'BFS, DFS, Dijkstra, topological sort, union-find',
    count: '62 cards', barBg: '#EEEDFE', barFg: '#534AB7', barWidth: '75%',
  },
  {
    cat: 'Data Engineering',  catColor: '#BA7517',
    name: 'Kafka & Streaming',
    desc: 'Partitions, consumer groups, offsets, exactly-once semantics',
    count: '44 cards', barBg: '#FAEEDA', barFg: '#BA7517', barWidth: '55%',
  },
]

export default function TemplateLibrary() {
  return (
    <section className="section how-bg" id="templates">
      <div className="section-label">Template library</div>
      <h2 className="section-title">Start studying in minutes, not hours</h2>
      <p className="section-sub">Pre-built decks you can add to your collection in one click.</p>
      <div className="templates-grid">
        {templates.map((t) => (
          <div key={t.name} className="tmpl-card">
            <div className="tmpl-cat" style={{ color: t.catColor }}>{t.cat}</div>
            <div className="tmpl-name">{t.name}</div>
            <div className="tmpl-desc">{t.desc}</div>
            <div className="tmpl-count">{t.count}</div>
            <div className="tmpl-bar" style={{ background: t.barBg }}>
              <div style={{ width: t.barWidth, height: '3px', borderRadius: '99px', background: t.barFg }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
