import { useEffect, useMemo, useState } from 'react'
import {
  Bell,
  CheckCheck,
  Trash2,
  X
} from 'lucide-react'

import UserSidebar from './components/UserSidebar'
import AdminSidebar from './components/AdminSidebar'
import Topbar from './components/Topbar'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import ItemTable from './components/ItemTable'
import ItemModal from './components/ItemModal'
import HelpCenter from './components/HelpCenter'
import SettingsPage from './components/SettingsPage'

import Login from './components/Login'
import Register from './components/Register'
import UserManagement from './components/UserManagement'

import './App.css'


/* =========================================================
   DEFAULT ADMIN
========================================================= */

const DEFAULT_ADMIN = {
  id: 'admin-001',
  fullName: 'System Administrator',
  studentId: 'ADMIN-001',
  email: 'admin@minsu.edu.ph',
  password: 'admin123',
  role: 'admin',
  status: 'Active',
  createdAt: '2026-01-01T00:00:00.000Z',
  lastLogin: null
}


/* =========================================================
   DEFAULT SETTINGS
========================================================= */

const DEFAULT_SETTINGS = {
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


/* =========================================================
   APP
========================================================= */

function App() {

  /* =======================================================
     AUTHENTICATION
  ======================================================= */

  const [isAuthenticated, setIsAuthenticated] =
    useState(false)

  const [currentUser, setCurrentUser] =
    useState(null)

  const [authPage, setAuthPage] =
    useState('login')


  /* =======================================================
     ITEMS
  ======================================================= */

  const [items, setItems] = useState(() => {
    try {
      const savedItems =
        localStorage.getItem('minsu-findit-items')

      return savedItems
        ? JSON.parse(savedItems)
        : []
    } catch {
      return []
    }
  })


  /* =======================================================
     PORTAL / PAGE
  ======================================================= */

  const [portal, setPortal] =
    useState('user')

  const [activePage, setActivePage] =
    useState('Dashboard')


  /* =======================================================
     SEARCH / FILTER
  ======================================================= */

  const [search, setSearch] =
    useState('')

  const [category, setCategory] =
    useState('All')

  const [status, setStatus] =
    useState('All')


  /* =======================================================
     MODAL
  ======================================================= */

  const [isModalOpen, setIsModalOpen] =
    useState(false)

  const [editingItem, setEditingItem] =
    useState(null)


  /* =======================================================
     NOTIFICATIONS
  ======================================================= */

  const [showNotifications, setShowNotifications] =
    useState(false)

  const [notifications, setNotifications] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            'minsu-findit-notifications'
          )

        return saved
          ? JSON.parse(saved)
          : []
      } catch {
        return []
      }
    })


  /* =======================================================
     SETTINGS
  ======================================================= */

  const [settings, setSettings] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            'minsu-findit-settings'
          )

        return saved
          ? {
              ...DEFAULT_SETTINGS,
              ...JSON.parse(saved)
            }
          : DEFAULT_SETTINGS
      } catch {
        return DEFAULT_SETTINGS
      }
    })


  /* =======================================================
     USERS
  ======================================================= */

  const [users, setUsers] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem('minsu-users')

        if (saved) {
          const parsed = JSON.parse(saved)

          if (Array.isArray(parsed)) {

            const adminExists =
              parsed.some(
                user =>
                  user.email?.toLowerCase() ===
                  DEFAULT_ADMIN.email.toLowerCase()
              )

            if (!adminExists) {
              return [
                DEFAULT_ADMIN,
                ...parsed
              ]
            }

            return parsed
          }
        }
      } catch {
        // Use default admin
      }

      return [DEFAULT_ADMIN]
    })


  /* =======================================================
     RESTORE LOGIN SESSION
  ======================================================= */

  useEffect(() => {

    const savedSession =
      localStorage.getItem(
        'minsu-current-user'
      )

    if (!savedSession) {
      return
    }

    try {

      const session =
        JSON.parse(savedSession)

      if (!session) {
        return
      }

      /*
        Validate the saved session against
        the registered users.
      */

      const registeredUser =
        users.find(
          user =>
            user.id === session.id &&
            user.email?.toLowerCase() ===
              session.email?.toLowerCase()
        )

      if (
        !registeredUser ||
        registeredUser.status === 'Blocked'
      ) {

        localStorage.removeItem(
          'minsu-current-user'
        )

        return
      }

      setCurrentUser(registeredUser)
      setIsAuthenticated(true)

      if (registeredUser.role === 'admin') {

        setPortal('admin')
        setActivePage('Admin Dashboard')

      } else {

        setPortal('user')
        setActivePage('Dashboard')

      }

    } catch (error) {

      console.error(
        'Unable to restore login session:',
        error
      )

      localStorage.removeItem(
        'minsu-current-user'
      )
    }

  }, [users])


  /* =======================================================
     SAVE ITEMS
  ======================================================= */

  useEffect(() => {

    localStorage.setItem(
      'minsu-findit-items',
      JSON.stringify(items)
    )

  }, [items])


  /* =======================================================
     SAVE SETTINGS
  ======================================================= */

  useEffect(() => {

    localStorage.setItem(
      'minsu-findit-settings',
      JSON.stringify(settings)
    )

  }, [settings])


  /* =======================================================
     SAVE NOTIFICATIONS
  ======================================================= */

  useEffect(() => {

    localStorage.setItem(
      'minsu-findit-notifications',
      JSON.stringify(notifications)
    )

  }, [notifications])


  /* =======================================================
     SAVE USERS
  ======================================================= */

  useEffect(() => {

    localStorage.setItem(
      'minsu-users',
      JSON.stringify(users)
    )

  }, [users])


  /* =======================================================
     DARK / COMPACT MODE
  ======================================================= */

  useEffect(() => {

    document.body.classList.toggle(
      'dark-mode',
      settings.darkMode
    )

    document.body.classList.toggle(
      'compact-mode',
      settings.compactMode
    )

  }, [
    settings.darkMode,
    settings.compactMode
  ])


  /* =======================================================
     LOGIN
  ======================================================= */

  const handleLogin = (user) => {

    if (!user) {
      return
    }

    if (user.status === 'Blocked') {

      alert(
        'This account has been blocked. Please contact the administrator.'
      )

      return
    }

    const loggedUser = {
      ...user,
      lastLogin: new Date().toISOString()
    }

    setUsers(previousUsers =>
      previousUsers.map(existingUser =>
        existingUser.id === loggedUser.id
          ? loggedUser
          : existingUser
      )
    )

    setCurrentUser(loggedUser)
    setIsAuthenticated(true)

    localStorage.setItem(
      'minsu-current-user',
      JSON.stringify(loggedUser)
    )

    if (loggedUser.role === 'admin') {

      setPortal('admin')
      setActivePage('Admin Dashboard')

    } else {

      setPortal('user')
      setActivePage('Dashboard')

    }

    setSearch('')
    setCategory('All')
    setStatus('All')
  }


  /* =======================================================
     ADMIN LOGIN
  ======================================================= */

  const handleAdminLogin = (admin) => {

    if (!admin) {
      return
    }

    if (admin.status === 'Blocked') {

      alert(
        'This administrator account has been blocked.'
      )

      return
    }

    const loggedAdmin = {
      ...admin,
      role: 'admin',
      lastLogin: new Date().toISOString()
    }

    setUsers(previousUsers =>
      previousUsers.map(existingUser =>
        existingUser.id === loggedAdmin.id
          ? loggedAdmin
          : existingUser
      )
    )

    setCurrentUser(loggedAdmin)
    setIsAuthenticated(true)

    localStorage.setItem(
      'minsu-current-user',
      JSON.stringify(loggedAdmin)
    )

    setPortal('admin')
    setActivePage('Admin Dashboard')

    setSearch('')
    setCategory('All')
    setStatus('All')
  }


  /* =======================================================
     REGISTER
  ======================================================= */

  const handleRegistered = (newUser) => {

    setUsers(previousUsers => {

      const exists =
        previousUsers.some(
          user =>
            user.email?.toLowerCase() ===
            newUser.email?.toLowerCase()
        )

      if (exists) {
        return previousUsers
      }

      return [
        ...previousUsers,
        {
          ...newUser,
          id:
            newUser.id ||
            `user-${Date.now()}`,
          role: 'student',
          status: 'Active',
          createdAt:
            newUser.createdAt ||
            new Date().toISOString()
        }
      ]
    })

    setAuthPage('login')
  }


  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {

    localStorage.removeItem(
      'minsu-current-user'
    )

    setCurrentUser(null)
    setIsAuthenticated(false)
    setAuthPage('login')

    setPortal('user')
    setActivePage('Dashboard')

    setShowNotifications(false)

    setSearch('')
    setCategory('All')
    setStatus('All')
  }


  /* =======================================================
     NOTIFICATIONS
  ======================================================= */

  const addNotification = (notification) => {

    if (!settings.notifications) {
      return
    }

    const newNotification = {

      id:
        Date.now() +
        Math.random(),

      title:
        notification.title ||
        'Notification',

      message:
        notification.message ||
        '',

      type:
        notification.type ||
        'info',

      read: false,

      createdAt:
        new Date().toISOString()

    }

    setNotifications(previous => [
      newNotification,
      ...previous
    ])


    if (settings.soundNotifications) {

      try {

        const audio =
          new Audio('/notification.mp3')

        audio.volume = 0.6

        audio.play().catch(() => {})

      } catch {
        // Ignore audio errors
      }
    }
  }


  const markNotificationRead = (id) => {

    setNotifications(previous =>
      previous.map(notification =>
        notification.id === id
          ? {
              ...notification,
              read: true
            }
          : notification
      )
    )
  }


  const markAllNotificationsRead = () => {

    setNotifications(previous =>
      previous.map(notification => ({
        ...notification,
        read: true
      }))
    )
  }


  const deleteNotification = (id) => {

    setNotifications(previous =>
      previous.filter(
        notification =>
          notification.id !== id
      )
    )
  }


  const clearNotifications = () => {
    setNotifications([])
  }


  const unreadCount =
    notifications.filter(
      notification =>
        !notification.read
    ).length


  /* =======================================================
     PORTAL NAVIGATION
  ======================================================= */

  const openUserPortal = () => {

    if (currentUser?.role !== 'admin') {
      return
    }

    setPortal('user')
    setActivePage('Dashboard')

    setSearch('')
    setCategory('All')
    setStatus('All')
  }


  /* =======================================================
     MODAL
  ======================================================= */

  const openAddModal = () => {

    setEditingItem(null)
    setIsModalOpen(true)
  }


  const openEditModal = (item) => {

    setEditingItem(item)
    setIsModalOpen(true)
  }


  const closeModal = () => {

    setIsModalOpen(false)
    setEditingItem(null)
  }


  /* =======================================================
     TOPBAR EVENTS
  ======================================================= */

  useEffect(() => {

    const handleOpenReportModal = () => {

      if (
        portal === 'user' &&
        currentUser?.role === 'student'
      ) {

        openAddModal()
      }
    }

    window.addEventListener(
      'open-report-modal',
      handleOpenReportModal
    )

    return () => {

      window.removeEventListener(
        'open-report-modal',
        handleOpenReportModal
      )

    }

  }, [portal, currentUser])


  useEffect(() => {

    const handleOpenSettings = () => {

      setShowNotifications(false)
      setActivePage('Settings')

    }

    window.addEventListener(
      'open-settings-page',
      handleOpenSettings
    )

    return () => {

      window.removeEventListener(
        'open-settings-page',
        handleOpenSettings
      )

    }

  }, [])


  /* =======================================================
     SAVE ITEM
  ======================================================= */

  const saveItem = (formData) => {

    /* EDIT */

    if (editingItem) {

      const updatedItem = {
        ...editingItem,
        ...formData,
        updatedAt:
          new Date().toISOString()
      }

      setItems(previous =>
        previous.map(item =>
          item.id === editingItem.id
            ? updatedItem
            : item
        )
      )

      addNotification({
        title: 'Report Updated',
        message:
          `"${formData.title || formData.itemName || 'Item'}" has been updated.`,
        type: 'success'
      })

      closeModal()
      return
    }


    /* NEW ITEM */

    const newItem = {

      ...formData,

      id:
        formData.id ||
        `item-${Date.now()}`,

      reporter:
        currentUser?.role === 'student'
          ? currentUser.fullName
          : formData.reporter,

      reporterId:
        currentUser?.role === 'student'
          ? currentUser.id
          : formData.reporterId,

      status:
        formData.status ||
        'Open',

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString()
    }


    setItems(previous => [
      newItem,
      ...previous
    ])


    addNotification({
      title: 'Report Submitted',
      message:
        `"${newItem.title || newItem.itemName || 'Item'}" has been added to the lost and found records.`,
      type: 'success'
    })


    closeModal()
  }


  /* =======================================================
     DELETE ITEM
  ======================================================= */

  const deleteItem = (item) => {

    if (!item) {
      return
    }


    /*
      Students can delete only their own reports.
      Admins can manage all reports.
    */

    if (
      portal === 'user' &&
      currentUser?.role === 'student'
    ) {

      const isOwner =
        item.reporterId === currentUser.id ||
        item.reporter === currentUser.fullName

      if (!isOwner) {

        alert(
          'You can only delete your own reports.'
        )

        return
      }
    }


    if (settings.confirmDelete) {

      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${
            item.title ||
            item.itemName ||
            'this item'
          }"?`
        )

      if (!confirmed) {
        return
      }
    }


    setItems(previous =>
      previous.filter(
        currentItem =>
          currentItem.id !== item.id
      )
    )


    addNotification({
      title: 'Report Deleted',
      message:
        `"${item.title || item.itemName || 'Item'}" has been removed.`,
      type: 'warning'
    })
  }


  /* =======================================================
     CLAIM ITEM
  ======================================================= */

  const claimItem = (item) => {

    if (!item) {
      return
    }

    if (item.status === 'Claimed') {
      return
    }


    const confirmed =
      window.confirm(
        `Mark "${
          item.title ||
          item.itemName ||
          'this item'
        }" as claimed?`
      )

    if (!confirmed) {
      return
    }


    setItems(previous =>
      previous.map(currentItem =>
        currentItem.id === item.id
          ? {
              ...currentItem,
              status: 'Claimed',
              claimedBy:
                currentUser?.fullName ||
                'Student User',
              claimedById:
                currentUser?.id ||
                null,
              claimedAt:
                new Date().toISOString(),
              updatedAt:
                new Date().toISOString()
            }
          : currentItem
      )
    )


    addNotification({
      title: 'Item Claimed',
      message:
        `"${item.title || item.itemName || 'Item'}" has been marked as claimed.`,
      type: 'success'
    })
  }


  /* =======================================================
     USER MANAGEMENT
  ======================================================= */

  const handleUsersUpdate = (updatedUsers) => {

    if (Array.isArray(updatedUsers)) {

      setUsers(updatedUsers)

      return
    }


    if (
      updatedUsers &&
      updatedUsers.id
    ) {

      setUsers(previous =>
        previous.map(user =>
          user.id === updatedUsers.id
            ? updatedUsers
            : user
        )
      )


      if (
        currentUser?.id ===
        updatedUsers.id
      ) {

        setCurrentUser(updatedUsers)

        localStorage.setItem(
          'minsu-current-user',
          JSON.stringify(updatedUsers)
        )
      }
    }
  }


  /* =======================================================
     FILTER ITEMS
  ======================================================= */

  const filteredItems =
    useMemo(() => {

      return items.filter(item => {

        const searchText =
          search
            .trim()
            .toLowerCase()


        const searchableText = [
          item.title,
          item.itemName,
          item.name,
          item.description,
          item.location,
          item.foundLocation,
          item.lostLocation,
          item.category,
          item.reporter,
          item.status
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()


        const matchesSearch =
          !searchText ||
          searchableText.includes(
            searchText
          )


        const matchesCategory =
          category === 'All' ||
          item.category === category


        const matchesStatus =
          status === 'All' ||
          item.status === status


        return (
          matchesSearch &&
          matchesCategory &&
          matchesStatus
        )

      })

    }, [
      items,
      search,
      category,
      status
    ])


  /* =======================================================
     USER CONTENT
  ======================================================= */

  const renderUserContent = () => {

    /* DASHBOARD */

    if (
      activePage === 'Dashboard'
    ) {

      return (
        <UserDashboard
          items={items}
          currentUser={currentUser}
          onAdd={openAddModal}
          onPageChange={setActivePage}
        />
      )
    }


    /* FIND ITEMS */

    if (
      activePage === 'Find Items'
    ) {

      return (
        <div className="page-content">

          <div className="page-heading">

            <div>

              <p className="eyebrow">
                LOST & FOUND
              </p>

              <h1>
                Find Items
              </h1>

              <p>
                Search for items reported on campus.
              </p>

            </div>

          </div>


          <div className="filters-card">

            <div className="filter-group">

              <label>
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={event =>
                  setSearch(event.target.value)
                }
                placeholder="Search items..."
              />

            </div>


            <div className="filter-group">

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={event =>
                  setCategory(event.target.value)
                }
              >

                <option value="All">
                  All
                </option>

                <option value="Personal Items">
                  Personal Items
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Documents">
                  Documents
                </option>

                <option value="Accessories">
                  Accessories
                </option>

                <option value="Clothing">
                  Clothing
                </option>

                <option value="School Supplies">
                  School Supplies
                </option>

                <option value="Others">
                  Others
                </option>

              </select>

            </div>


            <div className="filter-group">

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={event =>
                  setStatus(event.target.value)
                }
              >

                <option value="All">
                  All
                </option>

                <option value="Open">
                  Open
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Claimed">
                  Claimed
                </option>

              </select>

            </div>

          </div>


          <ItemTable
            items={filteredItems}
            onEdit={openEditModal}
            onDelete={deleteItem}
            onClaim={claimItem}
            currentUser={currentUser}
            portal="user"
          />

        </div>
      )
    }


    /* MY REPORTS */

    if (
      activePage === 'My Reports'
    ) {

      const myReports =
        items.filter(item =>
          item.reporterId === currentUser?.id ||
          item.reporter === currentUser?.fullName
        )


      return (
        <div className="page-content">

          <div className="page-heading">

            <div>

              <p className="eyebrow">
                STUDENT PORTAL
              </p>

              <h1>
                My Reports
              </h1>

              <p>
                View and manage the items you have reported.
              </p>

            </div>

            <button
              type="button"
              className="primary-button"
              onClick={openAddModal}
            >
              + Report Item
            </button>

          </div>


          <ItemTable
            items={myReports}
            onEdit={openEditModal}
            onDelete={deleteItem}
            onClaim={claimItem}
            currentUser={currentUser}
            portal="user"
          />

        </div>
      )
    }


    /* HELP CENTER */

    if (
      activePage === 'Help Center'
    ) {

      return (
        <HelpCenter />
      )
    }


    /* SETTINGS */

    if (
      activePage === 'Settings'
    ) {

      return (
        <SettingsPage
          settings={settings}
          onSettingsChange={setSettings}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )
    }


    return (
      <div className="page-content">

        <div className="page-heading">

          <div>

            <p className="eyebrow">
              STUDENT PORTAL
            </p>

            <h1>
              {activePage}
            </h1>

          </div>

        </div>

      </div>
    )
  }


  /* =======================================================
     ADMIN CONTENT
  ======================================================= */

  const renderAdminContent = () => {

    /* ADMIN DASHBOARD */

    if (
      activePage === 'Admin Dashboard'
    ) {

      return (
        <AdminDashboard
          items={items}
          users={users}
          currentUser={currentUser}
          onPageChange={setActivePage}
          onAdd={openAddModal}
        />
      )
    }


    /* USER MANAGEMENT */

    if (
      activePage === 'Users' ||
      activePage === 'User Management'
    ) {

      return (
        <UserManagement
          users={users}
          onUserUpdate={handleUsersUpdate}
        />
      )
    }


    /* ADMIN ITEM PAGES */

    if (
      [
        'All Items',
        'Lost Items',
        'Found Items',
        'Pending Reports',
        'Claimed Items'
      ].includes(activePage)
    ) {

      let pageItems =
        filteredItems


      if (
        activePage === 'Lost Items'
      ) {

        pageItems =
          pageItems.filter(
            item =>
              item.type === 'Lost'
          )
      }


      if (
        activePage === 'Found Items'
      ) {

        pageItems =
          pageItems.filter(
            item =>
              item.type === 'Found'
          )
      }


      if (
        activePage === 'Pending Reports'
      ) {

        pageItems =
          pageItems.filter(
            item =>
              item.status === 'Pending'
          )
      }


      if (
        activePage === 'Claimed Items'
      ) {

        pageItems =
          pageItems.filter(
            item =>
              item.status === 'Claimed'
          )
      }


      return (
        <div className="page-content">

          <div className="page-heading">

            <div>

              <p className="eyebrow">
                ADMIN PORTAL
              </p>

              <h1>
                {activePage}
              </h1>

              <p>
                Manage campus lost and found records.
              </p>

            </div>

            <button
              type="button"
              className="primary-button"
              onClick={openAddModal}
            >
              + Add Item
            </button>

          </div>


          <div className="filters-card">

            <div className="filter-group">

              <label>
                Search
              </label>

              <input
                type="text"
                value={search}
                onChange={event =>
                  setSearch(event.target.value)
                }
                placeholder="Search items..."
              />

            </div>


            <div className="filter-group">

              <label>
                Category
              </label>

              <select
                value={category}
                onChange={event =>
                  setCategory(event.target.value)
                }
              >

                <option value="All">
                  All
                </option>

                <option value="Personal Items">
                  Personal Items
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Documents">
                  Documents
                </option>

                <option value="Accessories">
                  Accessories
                </option>

                <option value="Clothing">
                  Clothing
                </option>

                <option value="School Supplies">
                  School Supplies
                </option>

                <option value="Others">
                  Others
                </option>

              </select>

            </div>


            <div className="filter-group">

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={event =>
                  setStatus(event.target.value)
                }
              >

                <option value="All">
                  All
                </option>

                <option value="Open">
                  Open
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Claimed">
                  Claimed
                </option>

              </select>

            </div>

          </div>


          <ItemTable
            items={pageItems}
            onEdit={openEditModal}
            onDelete={deleteItem}
            onClaim={claimItem}
            currentUser={currentUser}
            portal="admin"
          />

        </div>
      )
    }


    /* REPORTS & ANALYTICS */

    if (
      activePage === 'Reports & Analytics'
    ) {

      const totalItems =
        items.length

      const lostCount =
        items.filter(
          item =>
            item.type === 'Lost'
        ).length

      const foundCount =
        items.filter(
          item =>
            item.type === 'Found'
        ).length

      const pendingCount =
        items.filter(
          item =>
            item.status === 'Pending'
        ).length

      const claimedCount =
        items.filter(
          item =>
            item.status === 'Claimed'
        ).length

      return (
        <div className="page-content">

          <div className="page-heading">

            <div>

              <p className="eyebrow">
                ADMIN PORTAL
              </p>

              <h1>
                Reports & Analytics
              </h1>

              <p>
                Overview of campus lost and found records.
              </p>

            </div>

          </div>


          <div className="dashboard-grid">

            <div className="stat-card">
              <span>
                Total Items
              </span>

              <strong>
                {totalItems}
              </strong>
            </div>


            <div className="stat-card">
              <span>
                Lost Items
              </span>

              <strong>
                {lostCount}
              </strong>
            </div>


            <div className="stat-card">
              <span>
                Found Items
              </span>

              <strong>
                {foundCount}
              </strong>
            </div>


            <div className="stat-card">
              <span>
                Pending Reports
              </span>

              <strong>
                {pendingCount}
              </strong>
            </div>


            <div className="stat-card">
              <span>
                Claimed Items
              </span>

              <strong>
                {claimedCount}
              </strong>
            </div>


            <div className="stat-card">
              <span>
                Registered Users
              </span>

              <strong>
                {users.length}
              </strong>
            </div>

          </div>

        </div>
      )
    }


    /* HELP CENTER */

    if (
      activePage === 'Help Center'
    ) {

      return (
        <HelpCenter />
      )
    }


    /* SETTINGS */

    if (
      activePage === 'Settings'
    ) {

      return (
        <SettingsPage
          settings={settings}
          onSettingsChange={setSettings}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )
    }


    return (
      <div className="page-content">

        <div className="page-heading">

          <div>

            <p className="eyebrow">
              ADMIN PORTAL
            </p>

            <h1>
              {activePage}
            </h1>

          </div>

        </div>

      </div>
    )
  }


  /* =======================================================
     NOTIFICATION PANEL
  ======================================================= */

  const NotificationPanel = () => {

    return (
      <div className="notification-panel">

        <div className="notification-header">

          <div>

            <h3>
              Notifications
            </h3>

            <span>
              {unreadCount} unread
            </span>

          </div>


          <button
            type="button"
            onClick={() =>
              setShowNotifications(false)
            }
          >
            <X size={18} />
          </button>

        </div>


        <div className="notification-actions">

          <button
            type="button"
            onClick={
              markAllNotificationsRead
            }
          >

            <CheckCheck size={15} />

            Mark all as read

          </button>


          <button
            type="button"
            onClick={
              clearNotifications
            }
          >

            <Trash2 size={15} />

            Clear

          </button>

        </div>


        <div className="notification-list">

          {notifications.length === 0 ? (

            <div className="empty-notifications">

              <Bell size={30} />

              <p>
                No notifications
              </p>

            </div>

          ) : (

            notifications.map(
              notification => (

                <div
                  key={
                    notification.id
                  }
                  className={
                    `notification-item ${
                      notification.read
                        ? 'read'
                        : 'unread'
                    }`
                  }
                >

                  <div className="notification-icon">

                    <Bell size={16} />

                  </div>


                  <div className="notification-content">

                    <strong>
                      {notification.title}
                    </strong>

                    <p>
                      {notification.message}
                    </p>

                    <small>
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </small>

                  </div>


                  <div className="notification-item-actions">

                    {!notification.read && (

                      <button
                        type="button"
                        onClick={() =>
                          markNotificationRead(
                            notification.id
                          )
                        }
                        title="Mark as read"
                      >

                        <CheckCheck size={15} />

                      </button>

                    )}


                    <button
                      type="button"
                      onClick={() =>
                        deleteNotification(
                          notification.id
                        )
                      }
                      title="Delete"
                    >

                      <Trash2 size={15} />

                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>
    )
  }


  /* =======================================================
     AUTH SCREEN
  ======================================================= */

  if (!isAuthenticated) {

    if (
      authPage === 'register'
    ) {

      return (
        <Register
          onBackToLogin={() =>
            setAuthPage('login')
          }
          onRegistered={
            handleRegistered
          }
        />
      )
    }


    return (
      <Login
        onLogin={
          handleLogin
        }
        onAdminLogin={
          handleAdminLogin
        }
        onRegister={() =>
          setAuthPage('register')
        }
      />
    )
  }


  /* =======================================================
     MAIN APPLICATION
  ======================================================= */

  return (

    <div
      className={
        `app-shell ${
          portal === 'admin'
            ? 'admin-portal'
            : 'user-portal'
        } ${
          settings.darkMode
            ? 'dark'
            : ''
        } ${
          settings.compactMode
            ? 'compact'
            : ''
        }`
      }
    >

      {/* =================================================
          STUDENT SIDEBAR
      ================================================= */}

      {portal === 'user' ? (

        <UserSidebar
          activePage={
            activePage
          }

          onPageChange={
            setActivePage
          }

          onLogout={
            handleLogout
          }

          onReportItem={
            openAddModal
          }
        />

      ) : (

        /* =================================================
           ADMIN SIDEBAR
        ================================================= */

        <AdminSidebar
          activePage={
            activePage
          }

          onPageChange={
            setActivePage
          }

          onBack={
            openUserPortal
          }

          currentUser={
            currentUser
          }

          onLogout={
            handleLogout
          }
        />

      )}


      {/* =================================================
          MAIN AREA
      ================================================= */}

      <main className="main-area">

        <Topbar

          portal={
            portal
          }

          currentUser={
            currentUser
          }

          search={
            search
          }

          setSearch={
            setSearch
          }

          onAdd={
            openAddModal
          }

          onNotificationClick={() =>
            setShowNotifications(
              previous =>
                !previous
            )
          }

          unreadCount={
            unreadCount
          }

          onLogout={
            handleLogout
          }

          onSettings={() => {

            setShowNotifications(false)

            setActivePage(
              'Settings'
            )

          }}

        />


        {/* NOTIFICATIONS */}

        {showNotifications && (
          <NotificationPanel />
        )}


        {/* CONTENT */}

        <div className="content-area">

          {portal === 'user'
            ? renderUserContent()
            : renderAdminContent()
          }

        </div>

      </main>


      {/* ITEM MODAL */}

      <ItemModal

        isOpen={
          isModalOpen
        }

        onClose={
          closeModal
        }

        onSave={
          saveItem
        }

        editingItem={
          editingItem
        }

        currentUser={
          currentUser
        }

      />

    </div>
  )
}


export default App