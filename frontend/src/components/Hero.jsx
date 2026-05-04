import { useEffect, useState } from 'react'
import { getWaitlistCount } from '../api/waitlist'
import WaitlistForm from './WaitlistForm'

const COLOURS = ['#534AB7', '#1D9E75', '#BA7517', '#A32D2D', '#185FA5']

function Avatars({ count }) {
  const show = Math.min(count, 5)
  return (
    <div className="avatars">
      {Array.from({ length: show }, (_, i) => (
        <div key={i} className="avatar" style={{ background: COLOURS[i % COLOURS.length] }}>
          {String.fromCharCode(65 + i)}
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    getWaitlistCount()
      .then(data => { if (data.count > 0) setCount(data.count) })
      .catch(() => {})
  }, [])

  function handleSuccess() {
    setCount(c => (c ?? 0) + 1)
  }

  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-badge">
          <span className="dot" />
          Early access — now open
        </div>

        <h1>
          Study smarter.<br />
          <span className="highlight">Remember everything.</span>
        </h1>

        <p className="hero-sub">
          Ninaivu is the spaced repetition platform built for tech interviews.
          DSA, Data Engineering, Kafka, Spark — curated cards that adapt to
          what you forget, so you walk into every interview ready.
        </p>

        <WaitlistForm
          buttonText="Join waitlist"
          source="hero_form"
          onSuccess={handleSuccess}
          successTitle="You're on the list!"
          successMessage="We'll reach out as soon as early access opens."
        />

        <p className="form-note">No spam. Unsubscribe anytime.</p>

        {count !== null && (
          <div className="hero-counter">
            <Avatars count={count} />
            <p className="counter-text">
              <strong>{count}</strong> people already on the waitlist
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
