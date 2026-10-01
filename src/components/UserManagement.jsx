import { useEffect, useState } from 'react'
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Trash2,
  ShieldCheck,
  Mail,
  GraduationCap,
  CalendarDays,
  AlertTriangle,
  X
} from 'lucide-react'

function UserManagement({
  users = [],
  onDeleteUser,
  onToggleUserStatus
}) {

  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] =
    useState(null)

  const [localUsers, setLocalUsers] =
    useState(users)

  /* =========================================
     UPDATE LOCAL USERS WHEN PROPS CHANGE
  ========================================= */

  useEffect(() => {

    setLocalUsers(users)

  }, [users])

  /* =========================================
     SEARCH USERS
  ========================================= */

  const filteredUsers =
    localUsers.filter(user => {

      const query =
        search.trim().toLowerCase()

      if (!query) {
        return true
      }

      return (

        (user.fullName || '')
          .toLowerCase()
          .includes(query)

        ||

        (user.studentId || '')
          .toLowerCase()
          .includes(query)

        ||

        (user.email || '')
          .toLowerCase()
          .includes(query)

      )

    })

  /* =========================================
     USER COUNTS
  ========================================= */

  const activeUsers =
    localUsers.filter(
      user => user.status !== 'Inactive'
    ).length

  const inactiveUsers =
    localUsers.filter(
      user => user.status === 'Inactive'
    ).length

  /* =========================================
     DELETE USER
  ========================================= */

  const handleDelete = user => {

    const confirmed =
      window.confirm(
        `Are you sure you want to delete the account of ${user.fullName}?`
      )

    if (!confirmed) {
      return
    }

    if (onDeleteUser) {
      onDeleteUser(user.id)
    }

    setSelectedUser(null)
  }

  /* =========================================
     TOGGLE STATUS
  ========================================= */

  const handleToggleStatus = user => {

    if (onToggleUserStatus) {

      onToggleUserStatus(
        user.id
      )

    }

  }

  return (

    <div className="user-management-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="page-heading">

        <div>

          <p className="eyebrow">
            ADMINISTRATION
          </p>

          <h1>
            User Management
          </h1>

          <p>
            View and manage registered
            MINSU FindIt users.
          </p>

        </div>

      </div>

      {/* =====================================
          STATISTICS
      ===================================== */}

      <div className="user-management-stats">

        <div className="user-stat-card">

          <div className="user-stat-icon">
            <Users size={21} />
          </div>

          <div>

            <span>
              Total Users
            </span>

            <strong>
              {localUsers.length}
            </strong>

          </div>

        </div>

        <div className="user-stat-card">

          <div className="user-stat-icon">
            <UserCheck size={21} />
          </div>

          <div>

            <span>
              Active Users
            </span>

            <strong>
              {activeUsers}
            </strong>

          </div>

        </div>

        <div className="user-stat-card">

          <div className="user-stat-icon">
            <UserX size={21} />
          </div>

          <div>

            <span>
              Inactive Users
            </span>

            <strong>
              {inactiveUsers}
            </strong>

          </div>

        </div>

      </div>

      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="section-card">

        <div className="user-management-toolbar">

          <div className="user-search">

            <Search size={18} />

            <input
              type="text"
              value={search}
              onChange={event =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search by name, Student ID, or email..."
            />

          </div>

          <span className="user-result-count">

            {filteredUsers.length}
            {' '}
            user
            {filteredUsers.length !== 1
              ? 's'
              : ''}

          </span>

        </div>

        {/* =================================
            TABLE
        ================================= */}

        <div className="table-wrapper">

          <table className="item-table user-table">

            <thead>

              <tr>

                <th>
                  USER
                </th>

                <th>
                  STUDENT ID
                </th>

                <th>
                  EMAIL
                </th>

                <th>
                  REGISTERED
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  ACTIONS
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="user-empty-cell"
                  >

                    <Users size={30} />

                    <strong>
                      No registered users found
                    </strong>

                    <span>
                      Students who create accounts
                      will appear here.
                    </span>

                  </td>

                </tr>

              ) : (

                filteredUsers.map(user => (

                  <tr
                    key={user.id}
                  >

                    {/* USER */}

                    <td>

                      <div className="item-name">

                        <div className="item-avatar">

                          {user.fullName
                            ?.charAt(0)
                            .toUpperCase() || 'U'}

                        </div>

                        <div>

                          <strong>
                            {user.fullName}
                          </strong>

                          <span>
                            {user.role === 'admin'
                              ? 'Administrator'
                              : 'Student User'}
                          </span>

                        </div>

                      </div>

                    </td>

                    {/* STUDENT ID */}

                    <td>

                      <div className="user-info-cell">

                        <GraduationCap size={15} />

                        {user.studentId || '—'}

                      </div>

                    </td>

                    {/* EMAIL */}

                    <td>

                      <div className="user-info-cell">

                        <Mail size={15} />

                        {user.email}

                      </div>

                    </td>

                    {/* REGISTERED */}

                    <td>

                      <div className="user-info-cell">

                        <CalendarDays size={15} />

                        {user.registeredAt
                          ? new Date(
                              user.registeredAt
                            ).toLocaleDateString()
                          : '—'}

                      </div>

                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`status-badge ${
                          user.status === 'Inactive'
                            ? 'inactive'
                            : 'open'
                        }`}
                      >

                        {user.status === 'Inactive'
                          ? 'Inactive'
                          : 'Active'}

                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="action-buttons">

                        <button
                          type="button"
                          className="action-btn edit"
                          title={
                            user.status === 'Inactive'
                              ? 'Activate User'
                              : 'Deactivate User'
                          }
                          onClick={() =>
                            handleToggleStatus(
                              user
                            )
                          }
                        >

                          {user.status ===
                          'Inactive' ? (
                            <UserCheck
                              size={16}
                            />
                          ) : (
                            <UserX
                              size={16}
                            />
                          )}

                        </button>

                        <button
                          type="button"
                          className="action-btn delete"
                          title="Delete User"
                          onClick={() =>
                            handleDelete(
                              user
                            )
                          }
                        >

                          <Trash2
                            size={16}
                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================
          SECURITY NOTICE
      ===================================== */}

      <div className="user-security-notice">

        <ShieldCheck size={19} />

        <div>

          <strong>
            Account Security
          </strong>

          <p>
            Administrators can deactivate
            accounts to prevent users from
            accessing the Student Portal.
          </p>

        </div>

      </div>

      {/* =====================================
          USER DETAIL MODAL
      ===================================== */}

      {selectedUser && (

        <div className="user-detail-overlay">

          <div className="user-detail-modal">

            <button
              type="button"
              className="notification-close-button"
              onClick={() =>
                setSelectedUser(null)
              }
            >
              <X size={18} />
            </button>

            <div className="user-detail-icon">

              <UserCheck size={25} />

            </div>

            <h2>
              {selectedUser.fullName}
            </h2>

            <p>
              Registered User
            </p>

            <div className="user-detail-list">

              <div>
                <strong>
                  Student ID
                </strong>

                <span>
                  {selectedUser.studentId}
                </span>
              </div>

              <div>
                <strong>
                  Email
                </strong>

                <span>
                  {selectedUser.email}
                </span>
              </div>

              <div>
                <strong>
                  Status
                </strong>

                <span>
                  {selectedUser.status}
                </span>
              </div>

              <div>
                <strong>
                  Registered
                </strong>

                <span>
                  {selectedUser.registeredAt
                    ? new Date(
                        selectedUser.registeredAt
                      ).toLocaleString()
                    : '—'}
                </span>
              </div>

            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={() =>
                setSelectedUser(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  )
}

export default UserManagement