import WaitlistForm from './WaitlistForm'

export default function FinalCTA() {
  return (
    <section className="cta-section" id="waitlist">
      <div className="section-label">Early access</div>
      <h2 className="section-title">Be first to remember everything</h2>
      <p className="section-sub">
        We're onboarding a small first cohort. Drop your email and
        we'll let you know the moment the doors open.
      </p>

      <WaitlistForm
        buttonText="Get early access"
        source="cta_form"
        formClassName="cta-form"
        placeholder="your@email.com"
        successTitle="You're in!"
        successMessage="We'll be in touch soon."
      />

      <p className="form-note" style={{ marginTop: '14px' }}>
        No spam. No newsletters. Just one email when you're in.
      </p>
    </section>
  )
}
