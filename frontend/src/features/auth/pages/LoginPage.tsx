import { useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { MailOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import type { AppDispatch, RootState } from '../../../store'
import { loginUser, clearError } from '../../../store/authSlice'
import styles from '../styles/auth.module.css'

const VIDEO_URL = 'https://res.cloudinary.com/dcdmbhxv4/video/upload/f_auto:video,q_auto/Futuristic_digital_landscape_loo__202607301025_vivmuk'

export function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, isAuthenticated } = useSelector((s: RootState) => s.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })
  const videoRef = useRef<HTMLVideoElement>(null)

  const emailError = touched.email && !email.trim() ? 'Email is required' : !email.includes('@') && touched.email ? 'Enter a valid email' : ''
  const passError = touched.password && !password ? 'Password is required' : ''

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (!email.trim() || !password) return
    dispatch(clearError())
    dispatch(loginUser({ email: email.trim(), password }))
  }, [email, password, dispatch])

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className={styles.authPage}>
      <video
        ref={videoRef}
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
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {error && (
          <div className={styles.authAlert}>
            <span>⚠</span> {error}
          </div>
        )}

        <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
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
                autoFocus
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); dispatch(clearError()) }}
                onBlur={() => setTouched(p => ({ ...p, password: true }))}
                autoComplete="current-password"
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

          <button
            type="submit"
            className={styles.authSubmit}
            disabled={loading}
          >
            {loading && <span className={styles.authSpinner} />}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.authLinks}>
          <Link to="/forgot-password" className={styles.authLink}>
            Forgot password?
          </Link>
          <span className={styles.authDivider} />
          <Link to="/register" className={`${styles.authLink} ${styles.authLinkStrong}`}>
            Create an account
          </Link>
        </div>

        <div className={styles.authLinks} style={{ marginTop: 16 }}>
          <span className={styles.authLink} style={{ fontSize: 12 }}>
            Demo: demo@intellidocs.ai / password
          </span>
        </div>
      </div>
    </div>
  )
}
