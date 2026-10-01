import { useState } from 'react'
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'

function Register({
  onBackToLogin,
  onRegistered
}) {

  const [form, setForm] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [showPassword, setShowPassword] =
    useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [error, setError] = useState('')

  const [success, setSuccess] = useState('')

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target

    setForm(previous => ({
      ...previous,
      [name]: value
    }))

    setError('')
    setSuccess('')
  }

  const handleSubmit = (event) => {

    event.preventDefault()

    setError('')
    setSuccess('')

    /*
      BASIC VALIDATION
    */

    if (
      !form.fullName.trim() ||
      !form.studentId.trim() ||
      !form.email.trim() ||
      !form.password ||
      !form.confirmPassword
    ) {

      setError(
        'Please complete all required fields.'
      )

      return
    }

    if (form.password.length < 6) {

      setError(
        'Password must contain at least 6 characters.'
      )

      return
    }

    if (
      form.password !==
      form.confirmPassword
    ) {

      setError(
        'Passwords do not match.'
      )

      return
    }

    /*
      LOAD EXISTING USERS
    */

    const savedUsers =
      localStorage.getItem('minsu-users')

    let users = []

    try {

      users = savedUsers
        ? JSON.parse(savedUsers)
        : []

    } catch {

      users = []

    }

    /*
      CHECK DUPLICATE EMAIL
    */

    const emailExists =
      users.some(
        user =>
          user.email.toLowerCase() ===
          form.email.trim().toLowerCase()
      )

    if (emailExists) {

      setError(
        'An account with this email already exists.'
      )

      return
    }

    /*
      CHECK DUPLICATE STUDENT ID
    */

    const studentIdExists =
      users.some(
        user =>
          user.studentId.toLowerCase() ===
          form.studentId.trim().toLowerCase()
      )

    if (studentIdExists) {

      setError(
        'This student ID is already registered.'
      )

      return
    }

    /*
      CREATE ACCOUNT
    */

    const newUser = {

      id:
        'user-' +
        Date.now(),

      fullName:
        form.fullName.trim(),

      studentId:
        form.studentId.trim(),

      email:
        form.email.trim().toLowerCase(),

      password:
        form.password,

      role:
        'student',

      status:
        'Active',

      createdAt:
        new Date().toISOString(),

      lastLogin:
        null

    }

    const updatedUsers = [
      ...users,
      newUser
    ]

    localStorage.setItem(
      'minsu-users',
      JSON.stringify(updatedUsers)
    )

    setSuccess(
      'Account created successfully! You can now sign in.'
    )

    setForm({
      fullName: '',
      studentId: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    if (onRegistered) {
      onRegistered(newUser)
    }
  }

  return (

    <div className="auth-page">

      <div className="auth-card register-card">

        <div className="auth-brand">

          <div className="auth-logo">
            <ShieldCheck size={30} />
          </div>

          <div>
            <h1>MINSU FindIt</h1>
            <p>Campus Lost & Found System</p>
          </div>

        </div>

        <div className="auth-heading">

          <h2>Create Student Account</h2>

          <p>
            Register to report and manage
            lost and found items.
          </p>

        </div>

        {error && (

          <div className="auth-error">

            <AlertCircle size={18} />

            <span>
              {error}
            </span>

          </div>

        )}

        {success && (

          <div className="auth-success">

            <CheckCircle2 size={18} />

            <span>
              {success}
            </span>

          </div>

        )}

        <form onSubmit={handleSubmit}>

          <div className="auth-field">

            <label>
              Full Name
            </label>

            <div className="auth-input-wrapper">

              <User size={18} />

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
              />

            </div>

          </div>

          <div className="auth-field">

            <label>
              Student ID
            </label>

            <div className="auth-input-wrapper">

              <User size={18} />

              <input
                type="text"
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                placeholder="Enter your student ID"
              />

            </div>

          </div>

          <div className="auth-field">

            <label>
              Email Address
            </label>

            <div className="auth-input-wrapper">

              <Mail size={18} />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
              />

            </div>

          </div>

          <div className="auth-field">

            <label>
              Password
            </label>

            <div className="auth-input-wrapper">

              <LockKeyhole size={18} />

              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                autoComplete="new-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    previous => !previous
                  )
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

          <div className="auth-field">

            <label>
              Confirm Password
            </label>

            <div className="auth-input-wrapper">

              <LockKeyhole size={18} />

              <input
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    previous => !previous
                  )
                }
              >

                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}

              </button>

            </div>

          </div>

          <button
            type="submit"
            className="auth-submit"
          >

            <UserPlus size={18} />

            Create Account

          </button>

        </form>

        <button
          type="button"
          className="auth-back-button"
          onClick={onBackToLogin}
        >

          <ArrowLeft size={17} />

          Back to Login

        </button>

        <div className="auth-security-note">

          <ShieldCheck size={16} />

          <span>
            Only registered accounts can
            access the student portal.
          </span>

        </div>

      </div>

    </div>
  )
}

export default Register