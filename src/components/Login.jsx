import { useState } from 'react'
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  UserPlus,
  AlertCircle
} from 'lucide-react'

function Login({
  onLogin,
  onRegister,
  onAdminLogin
}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)


  /* =========================================================
     LOGIN
  ========================================================= */

  const handleSubmit = (event) => {

    event.preventDefault()

    if (loading) {
      return
    }

    setError('')

    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail || !password.trim()) {

      setError(
        'Please enter your email and password.'
      )

      return
    }

    setLoading(true)


    /*
      Small delay so the button can show
      "Signing in..."
    */

    setTimeout(() => {

      const savedUsers =
        localStorage.getItem('minsu-users')

      let users = []

      try {

        users = savedUsers
          ? JSON.parse(savedUsers)
          : []

        if (!Array.isArray(users)) {
          users = []
        }

      } catch {

        users = []

      }


      /* =====================================================
         ADMIN LOGIN
      ===================================================== */

      const adminEmail =
        'admin@minsu.edu.ph'

      const adminPassword =
        'admin123'


      if (
        cleanEmail === adminEmail &&
        password === adminPassword
      ) {

        const adminUser = {
          id: 'admin-001',
          fullName: 'System Administrator',
          studentId: 'ADMIN-001',
          email: adminEmail,
          role: 'admin',
          status: 'Active',
          createdAt:
            '2026-01-01T00:00:00.000Z',
          lastLogin:
            new Date().toISOString()
        }


        localStorage.setItem(
          'minsu-current-user',
          JSON.stringify(adminUser)
        )


        /*
          Also make sure admin exists
          in the users list.
        */

        const adminExists =
          users.some(
            user =>
              user.email?.toLowerCase() ===
              adminEmail
          )


        if (!adminExists) {

          localStorage.setItem(
            'minsu-users',
            JSON.stringify([
              adminUser,
              ...users
            ])
          )

        }


        setLoading(false)


        if (typeof onAdminLogin === 'function') {
          onAdminLogin(adminUser)
        }

        return
      }


      /* =====================================================
         NORMAL STUDENT LOGIN
      ===================================================== */

      const foundUser =
        users.find(
          user =>
            user.email?.toLowerCase() ===
              cleanEmail &&
            user.password === password
        )


      if (!foundUser) {

        setError(
          'Invalid email or password. Please check your account.'
        )

        setLoading(false)

        return
      }


      /* =====================================================
         BLOCKED ACCOUNT
      ===================================================== */

      if (
        foundUser.status === 'Blocked'
      ) {

        setError(
          'This account has been blocked. Please contact the administrator.'
        )

        setLoading(false)

        return
      }


      /* =====================================================
         SUCCESSFUL STUDENT LOGIN
      ===================================================== */

      const loggedInUser = {
        ...foundUser,
        lastLogin:
          new Date().toISOString()
      }


      const updatedUsers =
        users.map(
          user =>
            user.id === foundUser.id
              ? loggedInUser
              : user
        )


      localStorage.setItem(
        'minsu-users',
        JSON.stringify(updatedUsers)
      )


      localStorage.setItem(
        'minsu-current-user',
        JSON.stringify(loggedInUser)
      )


      setLoading(false)


      if (typeof onLogin === 'function') {
        onLogin(loggedInUser)
      }

    }, 500)

  }


  /* =========================================================
     REGISTER BUTTON
  ========================================================= */

  const handleRegisterClick = () => {

    if (loading) {
      return
    }

    setError('')

    if (typeof onRegister === 'function') {
      onRegister()
    }

  }


  /* =========================================================
     PASSWORD VISIBILITY
  ========================================================= */

  const togglePassword = () => {

    setShowPassword(
      previous => !previous
    )

  }


  /* =========================================================
     UI
  ========================================================= */

  return (

    <div className="auth-page">

      <div className="auth-card">


        {/* =================================================
            BRAND
        ================================================= */}

        <div className="auth-brand">

          <div className="auth-logo">
            <ShieldCheck size={30} />
          </div>

          <div>

            <h1>
              MINSU FindIt
            </h1>

            <p>
              Campus Lost & Found System
            </p>

          </div>

        </div>


        {/* =================================================
            HEADING
        ================================================= */}

        <div className="auth-heading">

          <h2>
            Welcome Back
          </h2>

          <p>
            Sign in to access your account.
          </p>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="auth-error">

            <AlertCircle size={18} />

            <span>
              {error}
            </span>

          </div>

        )}


        {/* =================================================
            LOGIN FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          noValidate
        >


          {/* EMAIL */}

          <div className="auth-field">

            <label htmlFor="login-email">
              Email Address
            </label>

            <div className="auth-input-wrapper">

              <Mail size={18} />

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={event =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="Enter your email"
                autoComplete="email"
                disabled={loading}
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="auth-field">

            <label htmlFor="login-password">
              Password
            </label>

            <div className="auth-input-wrapper">

              <LockKeyhole size={18} />

              <input
                id="login-password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={password}
                onChange={event =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />


              <button
                type="button"
                className="password-toggle"
                onClick={togglePassword}
                disabled={loading}
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >

                {showPassword ? (

                  <EyeOff size={18} />

                ) : (

                  <Eye size={18} />

                )}

              </button>

            </div>

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >

            <LogIn size={18} />

            <span>
              {loading
                ? 'Signing in...'
                : 'Sign In'
              }
            </span>

          </button>

        </form>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="auth-divider">

          <span>
            or
          </span>

        </div>


        {/* =================================================
            REGISTER
        ================================================= */}

        <button
          type="button"
          className="auth-register-button"
          onClick={handleRegisterClick}
          disabled={loading}
        >

          <UserPlus size={18} />

          <span>
            Create Student Account
          </span>

        </button>


        {/* =================================================
            SECURITY NOTE
        ================================================= */}

        <div className="auth-security-note">

          <ShieldCheck size={16} />

          <span>
            Your account is protected by
            authenticated access.
          </span>

        </div>


        {/* =================================================
            ADMIN NOTE
        ================================================= */}

        <div className="auth-admin-note">

          <strong>
            Administrator Access
          </strong>

          <span>
            Admin accounts are restricted
            to authorized personnel.
          </span>

        </div>

      </div>

    </div>

  )

}

export default Login