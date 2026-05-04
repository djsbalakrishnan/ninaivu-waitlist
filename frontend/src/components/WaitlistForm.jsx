import { useState } from 'react'
import { joinWaitlist } from '../api/waitlist'

export default function WaitlistForm({
  buttonText = 'Join waitlist',
  source = '',
  formClassName = 'email-form',
  placeholder = 'Enter your email address',
  successTitle = "You're on the list!",
  successMessage = "We'll reach out as soon as early access opens.",
  onSuccess,
}) {
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const email = e.target.elements.email.value.trim()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await joinWaitlist(email, source)
      if (res.ok) {
        setStatus('success')
        onSuccess?.()
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data.email?.[0] || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="success-box show">
        <div className="check">✓</div>
        <div>
          <strong>{successTitle}</strong>{' '}
          {successMessage}
        </div>
      </div>
    )
  }

  return (
    <>
      <form className={formClassName} onSubmit={handleSubmit}>
        <input
          className="email-input"
          type="email"
          name="email"
          placeholder={placeholder}
          required
          autoComplete="email"
        />
        <button
          className={`submit-btn${status === 'loading' ? ' loading' : ''}`}
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Joining…' : buttonText}
        </button>
      </form>
      {status === 'error' && (
        <div className="error-msg show">{errorMsg}</div>
      )}
    </>
  )
}
