import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { UserOutlined, MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import type { AppDispatch, RootState } from '../../../store'
import { registerUser, clearError } from '../../../store/authSlice'
import styles from '../styles/auth.module.css'

const VIDEO_URL = 'https://res.cloudinary.com/dcdmbhxv4/video/upload/f_auto:video,q_auto/Futuristic_digital_landscape_loo__202607301025_vivmuk'

export function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, isAuthenticated } = useSelector((s: RootState) => s.auth)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [touched, setTouched] = useState({ name: false, email: false, password: false, confirm: false })

  const nameError = touched.name && !name.trim() ? 'Name is required' : ''
  const emailError = touched.email && !email.trim() ? 'Email is required' : !email.includes('@') && touched.email ? 'Enter a valid email' : ''
  const passError = touched.password && !password ? 'Password is required' : password.length < 6 && touched.password ? 'At least 6 characters' : ''
  const confirmError = touched.confirm && !confirm ? 'Please confirm your password' : confirm !== password && touched.confirm ? 'Passwords do not match' : ''

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirm: true })
    if (!name.trim() || !email.trim() || !password || confirm !== password) return
    dispatch(clearError())
    dispatch(registerUser({ name: name.trim(), email: email.trim(), password }))
  }, [name, email, password, confirm, dispatch])

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className={styles.authPage}>
      <video
        className={styles.authBgVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%230c0b14'/%3E%3C/svg%3E"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className={styles.authOverlay} />
      <div className={`${styles.authGlow} ${styles.authGlow1}`} />
      <div className={`${styles.authGlow} ${styles.authGlow2}`} />

      <div className={styles.authCard}>
        <div className={styles.authBrand}>
          <span className={styles.authBrandLogo}>i</span>
          <span className={styles.authBrandText}>IntelliDocs<span className={styles.authBrandAi}>AI</span></span>
        </div>

        <div className={styles.authWelcome}>
          <h1>Create your account</h1>
          <p>Join IntelliDocs AI to get started</p>
        </div>

        {error && (
          <div className={styles.authAlert}>
            <span>⚠</span> {error}
          </div>
        )}

        <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
          <div className={styles.authField}>
            <label className={styles.authLabel}>Full Name</label>
            <div className={styles.authInputWrap}>
              <span className={styles.authInputIcon}><UserOutlined /></span>
              <input
                className={`${styles.authInput}${nameError ? ` ${styles.authInputError}` : ''}`}
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => { setName(e.target.value); dispatch(clearError()) }}
                onBlur={() => setTouched(p => ({ ...p, name: true }))}
                autoFocus
                autoComplete="name"
              />
            </div>
            {nameError && <p className={styles.authFieldError}>✕ {nameError}</p>}
          </div>

          <div className={styles.authField}>
            <label className={styles.authLabel}>Email</label>
            <div className={styles.authInputWrap}>
              <span className={styles.authInputIcon}><MailOutlined /></span>
              <input
                className={`${styles.authInput}${emailError ? ` ${styles.authInputError}` : ''}`}
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); dispatch(clearError()) }}
                onBlur={() => setTouched(p => ({ ...p, email: true }))}
                autoComplete="email"
              />
            </div>
            {emailError && <p className={styles.authFieldError}>✕ {emailError}</p>}
          </div>

          <div className={styles.authField}>
            <label className={styles.authLabel}>Password</label>
            <div className={styles.authInputWrap}>
              <span className={styles.authInputIcon}><LockOutlined /></span>
              <input
                className={`${styles.authInput}${passError ? ` ${styles.authInputError}` : ''}`}
                type={showPass ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); dispatch(clearError()) }}
                onBlur={() => setTouched(p => ({ ...p, password: true }))}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.authTogglePass}
                onClick={() => setShowPass(p => !p)}
                tabIndex={-1}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            </div>
            {passError && <p className={styles.authFieldError}>✕ {passError}</p>}
          </div>

          <div className={styles.authField}>
            <label className={styles.authLabel}>Confirm Password</label>
            <div className={styles.authInputWrap}>
              <span className={styles.authInputIcon}><LockOutlined /></span>
              <input
                className={`${styles.authInput}${confirmError ? ` ${styles.authInputError}` : ''}`}
                type={showPass ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); dispatch(clearError()) }}
                onBlur={() => setTouched(p => ({ ...p, confirm: true }))}
                autoComplete="new-password"
              />
            </div>
            {confirmError && <p className={styles.authFieldError}>✕ {confirmError}</p>}
          </div>

          <button
            type="submit"
            className={styles.authSubmit}
            disabled={loading}
          >
            {loading && <span className={styles.authSpinner} />}
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className={styles.authLinks}>
          <span className={styles.authDivider} />
          <Link to="/login" className={`${styles.authLink} ${styles.authLinkStrong}`}>
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
