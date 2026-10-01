import {
  LayoutDashboard,
  Package,
  Search,
  Clock3,
  PackageCheck,
  Users,
  BarChart3,
  HelpCircle,
  Settings,
  ArrowLeft,
  LogOut
} from 'lucide-react'

function AdminSidebar({
  activePage,
  onPageChange,
  onBackToStudent,
  onLogout
}) {

  const menuItems = [
    {
      name: 'Admin Dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'All Items',
      icon: Package
    },
    {
      name: 'Lost Items',
      icon: Search
    },
    {
      name: 'Pending Reports',
      icon: Clock3
    },
    {
      name: 'Claimed Items',
      icon: PackageCheck
    },
    {
      name: 'User Management',
      icon: Users
    },
    {
      name: 'Reports & Analytics',
      icon: BarChart3
    }
  ]

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-logo">

        <div className="logo-wrapper">

          <img
            src="/minsu-logo.jpg"
            alt="Mindoro State University"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />

          <div className="logo-fallback">
            MSU
          </div>

        </div>

        <div className="logo-text">

          <strong>
            MINSU
          </strong>

          <span>
            FindIt
          </span>

        </div>

      </div>


      {/* ADMIN PORTAL */}
      <div className="sidebar-section-title">
        ADMIN PORTAL
      </div>


      <nav className="sidebar-menu">

        {menuItems.map((item) => {

          const Icon = item.icon

          return (
            <button
              type="button"
              key={item.name}
              className={`sidebar-item ${
                activePage === item.name
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                onPageChange(item.name)
              }
            >

              <Icon size={19} />

              <span>
                {item.name}
              </span>

            </button>
          )

        })}

      </nav>


      {/* OTHER */}
      <div className="sidebar-section-title second">
        OTHER
      </div>


      <nav className="sidebar-menu">

        {/* HELP CENTER */}
        <button
          type="button"
          className={`sidebar-item ${
            activePage === 'Help Center'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            onPageChange('Help Center')
          }
        >

          <HelpCircle size={19} />

          <span>
            Help Center
          </span>

        </button>


        {/* SETTINGS */}
        <button
          type="button"
          className={`sidebar-item ${
            activePage === 'Settings'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            onPageChange('Settings')
          }
        >

          <Settings size={19} />

          <span>
            Settings
          </span>

        </button>

      </nav>


      {/* ADMIN ACTIONS */}
      <div className="sidebar-admin">

        {/* BACK TO STUDENT PORTAL */}
        <button
          type="button"
          className="admin-button"
          onClick={onBackToStudent}
        >

          <ArrowLeft size={17} />

          <span>
            Student Portal
          </span>

        </button>


        {/* LOGOUT */}
        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >

          <LogOut size={17} />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  )
}

export default AdminSidebar