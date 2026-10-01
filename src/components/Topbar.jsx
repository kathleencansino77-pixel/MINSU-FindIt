import {
  Search,
  Bell,
  Plus,
  ShieldCheck,
  User,
  LogOut,
  UserCircle
} from 'lucide-react'

import { useState } from 'react'

function Topbar({
  portal,
  currentUser,
  onNotificationClick,
  unreadCount,
  onLogout
}) {

  const [showProfile, setShowProfile] =
    useState(false)

  return (

    <header className="topbar">

      {/* SEARCH */}

      <div className="topbar-search">

        <Search size={18} />

        <input
          type="text"
          placeholder={
            portal === 'admin'
              ? 'Search campus records...'
              : 'Search lost & found items...'
          }
        />

      </div>


      {/* ACTIONS */}

      <div className="topbar-actions">

        {/* REPORT ITEM */}

        {portal === 'user' && (

          <button
            type="button"
            className="report-button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('open-report-modal')
              )
            }}
          >

            <Plus size={18} />

            Report Item

          </button>

        )}


        {/* NOTIFICATION */}

        <button
          type="button"
          className="icon-button"
          onClick={onNotificationClick}
          title="Notifications"
        >

          <Bell size={19} />

          {unreadCount > 0 && (

            <span className="notification-dot">
              {unreadCount > 9
                ? '9+'
                : unreadCount}
            </span>

          )}

        </button>


        {/* PROFILE */}

        <div className="profile-container">

          <button
            type="button"
            className="profile"
            onClick={() =>
              setShowProfile(
                previous => !previous
              )
            }
          >

            <div className="profile-avatar">

              {portal === 'admin'
                ? <ShieldCheck size={18} />
                : <User size={18} />}

            </div>


            <div className="profile-info">

              <strong>
                {currentUser?.fullName ||
                  (
                    portal === 'admin'
                      ? 'System Administrator'
                      : 'Student User'
                  )}
              </strong>

              <span>
                {portal === 'admin'
                  ? 'MINSU Staff'
                  : (
                      currentUser?.studentId ||
                      'MINSU Student'
                    )}
              </span>

            </div>

          </button>


          {/* PROFILE DROPDOWN */}

          {showProfile && (

            <div className="profile-dropdown">

              <div className="profile-dropdown-header">

                <div className="profile-dropdown-avatar">

                  {portal === 'admin'
                    ? <ShieldCheck size={20} />
                    : <User size={20} />}

                </div>

                <div>

                  <strong>
                    {currentUser?.fullName ||
                      'Student User'}
                  </strong>

                  <span>
                    {currentUser?.email ||
                      'No email available'}
                  </span>

                </div>

              </div>


              <div className="profile-dropdown-divider">
              </div>


              <button
                type="button"
                className="profile-dropdown-item"
                onClick={() => {
                  setShowProfile(false)

                  window.dispatchEvent(
                    new CustomEvent(
                      'open-settings-page'
                    )
                  )
                }}
              >

                <UserCircle size={17} />

                <span>
                  Profile & Settings
                </span>

              </button>


              <button
                type="button"
                className="profile-dropdown-item logout-dropdown-item"
                onClick={() => {

                  setShowProfile(false)

                  if (
                    typeof onLogout === 'function'
                  ) {
                    onLogout()
                  }

                }}
              >

                <LogOut size={17} />

                <span>
                  Logout
                </span>

              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  )
}

export default Topbar