const ratings = [
  { cls: 'r1', label: '1', review: '+1 day' },
  { cls: 'r2', label: '2', review: '+2 days' },
  { cls: 'r3', label: '3', review: '+4 days' },
  { cls: 'r4', label: '4', review: '+8 days' },
  { cls: 'r5', label: '5', review: '+14 days' },
]

export default function CardPreview() {
  return (
    <section className="preview-section">
      <div className="section-label">In action</div>
      <h2 className="section-title">What a study session looks like</h2>
      <p className="section-sub">Every card is a micro-retrieval exercise. You think, you struggle, you rate.</p>

      <div className="card-mockup">
        <div className="card-header">
          <span className="card-topic">Dynamic Programming</span>
          <span className="card-progress">Card 4 of 11</span>
        </div>
        <div className="card-body">
          <div className="card-q">
            What is the time and space complexity of the bottom-up tabulation approach for the 0/1 Knapsack problem?
          </div>
          <div className="card-divider" />
          <div className="card-a">
            Bottom-up DP fills a 2D table{' '}
            <code style={{ color: '#9fe1cb' }}>dp[n+1][W+1]</code>:
            <div className="card-code">{'Time:  O(n × W)\nSpace: O(n × W)  →  reducible to O(W) with 1D DP'}</div>
          </div>
        </div>
        <div className="card-footer">
          {ratings.map(({ cls, label, review }) => (
            <button key={label} className={`rating-btn ${cls}`}>
              {label}
              <span className="next-review">{review}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
