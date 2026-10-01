import {
  User,
  Bell,
  Shield,
  Palette,
  Lock,
  Mail,
  ChevronRight,
  Check,
  RotateCcw,
  CheckCircle2
} from 'lucide-react'

import { useEffect, useState } from 'react'

function SettingsPage({
  settings,
  onSettingsChange,
  currentUser
}) {

  /* ================================
     DEFAULT SETTINGS
  ================================= */

  const defaultSettings = {
    notifications: true,
    reportUpdates: true,
    potentialMatches: true,
    announcements: false,
    emailNotifications: true,
    soundNotifications: true,
    darkMode: false,
    compactMode: false,
    confirmDelete: true
  }


  /* ================================
     SETTINGS STATE
  ================================= */

  const [localSettings, setLocalSettings] =
    useState(
      settings || defaultSettings
    )


  /* ================================
     PROFILE STATE
  ================================= */

  const [profile, setProfile] =
    useState(() => {

      try {

        const savedProfile =
          localStorage.getItem(
            'minsu-profile'
          )

        if (savedProfile) {

          return JSON.parse(
            savedProfile
          )

        }

      } catch {

        // use current account

      }

      return {
        fullName:
          currentUser?.fullName || '',
        studentId:
          currentUser?.studentId || '',
        email:
          currentUser?.email || ''
      }

    })


  const [savedMessage, setSavedMessage] =
    useState(false)


  /* ================================
     SYNC SETTINGS
  ================================= */

  useEffect(() => {

    if (settings) {

      setLocalSettings(settings)

    }

  }, [settings])


  /* ================================
     SYNC PROFILE WITH ACCOUNT
  ================================= */

  useEffect(() => {

    if (!currentUser) {
      return
    }

    setProfile(previous => ({

      ...previous,

      fullName:
        previous.fullName ||
        currentUser.fullName ||
        '',

      studentId:
        previous.studentId ||
        currentUser.studentId ||
        '',

      email:
        previous.email ||
        currentUser.email ||
        ''

    }))

  }, [currentUser])


  /* ================================
     UPDATE SETTING
  ================================= */

  const updateSetting = (
    key,
    value
  ) => {

    const updatedSettings = {

      ...localSettings,

      [key]: value

    }

    setLocalSettings(
      updatedSettings
    )

    if (
      typeof onSettingsChange ===
      'function'
    ) {

      onSettingsChange(
        updatedSettings
      )

    }

    localStorage.setItem(
      'minsu-findit-settings',
      JSON.stringify(
        updatedSettings
      )
    )

  }


  /* ================================
     UPDATE PROFILE
  ================================= */

  const updateProfile = (
    key,
    value
  ) => {

    setProfile(previous => ({

      ...previous,

      [key]: value

    }))

  }


  /* ================================
     SAVE PROFILE
  ================================= */

  const saveProfile = () => {

    localStorage.setItem(
      'minsu-profile',
      JSON.stringify(profile)
    )

    setSavedMessage(true)

    setTimeout(() => {

      setSavedMessage(false)

    }, 2500)

  }


  /* ================================
     CANCEL PROFILE
  ================================= */

  const cancelProfile = () => {

    try {

      const savedProfile =
        localStorage.getItem(
          'minsu-profile'
        )

      if (savedProfile) {

        setProfile(
          JSON.parse(savedProfile)
        )

        return

      }

    } catch {

      // use current account

    }

    setProfile({

      fullName:
        currentUser?.fullName || '',

      studentId:
        currentUser?.studentId || '',

      email:
        currentUser?.email || ''

    })

  }


  /* ================================
     RESET SETTINGS
  ================================= */

  const resetSettings = () => {

    const confirmed =
      window.confirm(
        'Reset all settings to their default values?'
      )

    if (!confirmed) {
      return
    }

    setLocalSettings(
      defaultSettings
    )

    localStorage.setItem(
      'minsu-findit-settings',
      JSON.stringify(
        defaultSettings
      )
    )

    if (
      typeof onSettingsChange ===
      'function'
    ) {

      onSettingsChange(
        defaultSettings
      )

    }

  }


  /* ================================
     DARK MODE
  ================================= */

  useEffect(() => {

    document.body.classList.toggle(
      'dark-mode',
      Boolean(
        localSettings.darkMode
      )
    )

  }, [
    localSettings.darkMode
  ])


  /* ================================
     COMPACT MODE
  ================================= */

  useEffect(() => {

    document.body.classList.toggle(
      'compact-mode',
      Boolean(
        localSettings.compactMode
      )
    )

  }, [
    localSettings.compactMode
  ])


  return (

    <div className="settings-page">

      {/* HEADER */}

      <div className="settings-header">

        <div>

          <span className="section-label">
           
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Manage your account preferences and
            Campus Lost &amp; Found experience.
          </p>

        </div>

      </div>


      <div className="settings-layout">

        {/* MAIN SETTINGS */}

        <div className="settings-main">


          {/* =================================
              PROFILE
          ================================= */}

          <section className="settings-section">

            <div className="settings-section-title">

              <div className="settings-title-icon">
                <User size={19} />
              </div>

              <div>

                <h3>
                  Profile Information
                </h3>

                <p>
                  Your basic account information
                </p>

              </div>

            </div>


            <div className="profile-settings">

              <div className="profile-photo">

                <div className="profile-photo-inner">
                  <User size={30} />
                </div>

                <button
                  type="button"
                  className="change-photo"
                  onClick={() =>
                    alert(
                      'Profile photo upload can be added here.'
                    )
                  }
                >
                  Change
                </button>

              </div>


              <div className="profile-fields">

                <div className="setting-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={
                      profile.fullName
                    }
                    onChange={e =>
                      updateProfile(
                        'fullName',
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="setting-field">

                  <label>
                    Student ID
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your student ID"
                    value={
                      profile.studentId
                    }
                    onChange={e =>
                      updateProfile(
                        'studentId',
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="setting-field">

                  <label>
                    Email Address
                  </label>

                  <div className="input-with-icon">

                    <Mail size={16} />

                    <input
                      type="email"
                      placeholder="student@minsu.edu.ph"
                      value={
                        profile.email
                      }
                      onChange={e =>
                        updateProfile(
                          'email',
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>

            </div>


            <div className="settings-footer">

              <button
                type="button"
                className="secondary-button"
                onClick={
                  cancelProfile
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={
                  saveProfile
                }
              >

                <Check size={16} />

                Save Changes

              </button>

            </div>


            {savedMessage && (

              <div className="settings-saved-message">

                <CheckCircle2 size={16} />

                Profile changes saved successfully.

              </div>

            )}

          </section>


          {/* =================================
              NOTIFICATIONS
          ================================= */}

          <section className="settings-section">

            <div className="settings-section-title">

              <div className="settings-title-icon">
                <Bell size={19} />
              </div>

              <div>

                <h3>
                  Notifications
                </h3>

                <p>
                  Choose what notifications you want
                  to receive
                </p>

              </div>

            </div>


            <div className="settings-options">

              <SettingToggle
                title="System Notifications"
                description="Receive notifications about activity in the Lost & Found system."
                checked={
                  localSettings.notifications
                }
                onChange={value =>
                  updateSetting(
                    'notifications',
                    value
                  )
                }
              />


              <SettingToggle
                title="Report Updates"
                description="Receive updates when your lost or found report changes."
                checked={
                  localSettings.reportUpdates
                }
                onChange={value =>
                  updateSetting(
                    'reportUpdates',
                    value
                  )
                }
                disabled={
                  !localSettings.notifications
                }
              />


              <SettingToggle
                title="Potential Matches"
                description="Notify me when an item may match my report."
                checked={
                  localSettings.potentialMatches
                }
                onChange={value =>
                  updateSetting(
                    'potentialMatches',
                    value
                  )
                }
                disabled={
                  !localSettings.notifications
                }
              />


              <SettingToggle
                title="Announcements"
                description="Receive important Campus Lost & Found announcements."
                checked={
                  localSettings.announcements
                }
                onChange={value =>
                  updateSetting(
                    'announcements',
                    value
                  )
                }
                disabled={
                  !localSettings.notifications
                }
              />


              <SettingToggle
                title="Email Notifications"
                description="Allow the system to send notifications through your registered email."
                checked={
                  localSettings.emailNotifications
                }
                onChange={value =>
                  updateSetting(
                    'emailNotifications',
                    value
                  )
                }
                disabled={
                  !localSettings.notifications
                }
              />


              <SettingToggle
                title="Notification Sound"
                description="Play a sound when a new notification is received."
                checked={
                  localSettings.soundNotifications
                }
                onChange={value =>
                  updateSetting(
                    'soundNotifications',
                    value
                  )
                }
                disabled={
                  !localSettings.notifications
                }
              />

            </div>

          </section>


          {/* =================================
              PRIVACY & SECURITY
          ================================= */}

          <section className="settings-section">

            <div className="settings-section-title">

              <div className="settings-title-icon">
                <Shield size={19} />
              </div>

              <div>

                <h3>
                  Privacy &amp; Security
                </h3>

                <p>
                  Control how your account information
                  is protected
                </p>

              </div>

            </div>


            <div className="settings-action">

              <div className="settings-action-icon">
                <Lock size={18} />
              </div>

              <div>

                <strong>
                  Account Security
                </strong>

                <span>
                  Manage your password and account
                  security.
                </span>

              </div>

              <ChevronRight size={18} />

            </div>


            <div className="settings-options">

              <SettingToggle
                title="Confirm Before Delete"
                description="Ask for confirmation before permanently deleting an item."
                checked={
                  localSettings.confirmDelete
                }
                onChange={value =>
                  updateSetting(
                    'confirmDelete',
                    value
                  )
                }
              />

            </div>

          </section>


          {/* =================================
              APPEARANCE
          ================================= */}

          <section className="settings-section">

            <div className="settings-section-title">

              <div className="settings-title-icon">
                <Palette size={19} />
              </div>

              <div>

                <h3>
                  Appearance
                </h3>

                <p>
                  Customize how the system looks
                </p>

              </div>

            </div>


            <div className="theme-options">

              {/* LIGHT */}

              <button
                type="button"
                className={`theme-option ${
                  !localSettings.darkMode
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  updateSetting(
                    'darkMode',
                    false
                  )
                }
              >

                <div className="theme-preview light-preview">
                  <div></div>
                </div>

                <span>
                  Light
                </span>

                {!localSettings.darkMode && (
                  <Check size={16} />
                )}

              </button>


              {/* DARK */}

              <button
                type="button"
                className={`theme-option ${
                  localSettings.darkMode
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  updateSetting(
                    'darkMode',
                    true
                  )
                }
              >

                <div className="theme-preview dark-preview">
                  <div></div>
                </div>

                <span>
                  Dark
                </span>

                {localSettings.darkMode && (
                  <Check size={16} />
                )}

              </button>

            </div>


            <div className="settings-options">

              <SettingToggle
                title="Compact Mode"
                description="Reduce spacing between system elements to display more information."
                checked={
                  localSettings.compactMode
                }
                onChange={value =>
                  updateSetting(
                    'compactMode',
                    value
                  )
                }
              />

            </div>

          </section>


          {/* =================================
              RESET
          ================================= */}

          <section className="settings-section settings-danger-section">

            <div className="settings-section-title">

              <div className="settings-title-icon">
                <RotateCcw size={19} />
              </div>

              <div>

                <h3>
                  Reset Settings
                </h3>

                <p>
                  Restore all system preferences
                  to their default values.
                </p>

              </div>

            </div>


            <div className="settings-footer">

              <button
                type="button"
                className="secondary-button"
                onClick={
                  resetSettings
                }
              >

                <RotateCcw size={16} />

                Reset Preferences

              </button>

            </div>

          </section>

        </div>


        {/* =================================
            SUMMARY
        ================================= */}

        <aside className="settings-summary">

          <div className="settings-summary-card">

            <div className="summary-icon">
              <User size={22} />
            </div>

            <h3>
              Your Account
            </h3>

            <p>
              Keep your information updated so
              that the Lost &amp; Found team can
              contact you about your reports.
            </p>

            <div className="account-status">

              <span className="status-dot"></span>

              Account Active

            </div>

          </div>


          <div className="settings-summary-card">

            <div className="summary-icon">
              <Bell size={22} />
            </div>

            <h3>
              Current Preferences
            </h3>


            <div className="summary-preference">

              <span>
                Notifications
              </span>

              <strong>
                {localSettings.notifications
                  ? 'ON'
                  : 'OFF'}
              </strong>

            </div>


            <div className="summary-preference">

              <span>
                Report Updates
              </span>

              <strong>
                {localSettings.reportUpdates
                  ? 'ON'
                  : 'OFF'}
              </strong>

            </div>


            <div className="summary-preference">

              <span>
                Potential Matches
              </span>

              <strong>
                {localSettings.potentialMatches
                  ? 'ON'
                  : 'OFF'}
              </strong>

            </div>


            <div className="summary-preference">

              <span>
                Theme
              </span>

              <strong>
                {localSettings.darkMode
                  ? 'Dark'
                  : 'Light'}
              </strong>

            </div>

          </div>


          <div className="settings-tip">

            <span>
              TIP
            </span>

            <p>
              Use an active email address when
              submitting a report so you can
              receive possible match notifications.
            </p>

          </div>

        </aside>

      </div>

    </div>

  )
}


/* ============================================
   SETTING TOGGLE
============================================ */

function SettingToggle({
  title,
  description,
  checked,
  onChange,
  disabled = false
}) {

  return (

    <label
      className={`setting-toggle ${
        disabled
          ? 'setting-toggle-disabled'
          : ''
      }`}
    >

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>


      <input
        type="checkbox"
        checked={Boolean(checked)}
        disabled={disabled}
        onChange={e =>
          onChange(
            e.target.checked
          )
        }
      />


      <span className="toggle-slider"></span>

    </label>

  )
}

export default SettingsPage