import {
  LayoutDashboard,
  Search,
  FilePlus,
  ClipboardList,
  PackageSearch,
  HelpCircle,
  Settings,
  ShieldCheck
} from 'lucide-react'

function UserSidebar({
  activePage,
  setActivePage,
  onAdmin
}) {

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Find Items',
      icon: Search
    },
    {
      name: 'Report Item',
      icon: FilePlus
    },
    {
      name: 'My Reports',
      icon: ClipboardList
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
          <strong>MINSU</strong>
          <span>FindIt</span>
        </div>

      </div>


      <div className="sidebar-section-title">
        STUDENT PORTAL
      </div>


      <nav className="sidebar-menu">

        {menuItems.map((item) => {

          const Icon = item.icon

          return (
            <button
              key={item.name}
              className={`sidebar-item ${
                activePage === item.name
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setActivePage(item.name)
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


      <div className="sidebar-section-title second">
        OTHER
      </div>


      <nav className="sidebar-menu">

        <button
          className={`sidebar-item ${
            activePage === 'Help'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setActivePage('Help')
          }
        >
          <HelpCircle size={19} />
          <span>Help Center</span>
        </button>


        <button
          className={`sidebar-item ${
            activePage === 'Settings'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setActivePage('Settings')
          }
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>

      </nav>


      {/* ADMIN ACCESS */}

      <div className="sidebar-admin">

        <div className="admin-box">

          <div className="admin-icon">
            <ShieldCheck size={18} />
          </div>

          <div>
            <strong>Staff Access</strong>
            <span>Admin Portal</span>
          </div>

        </div>

        <button
          className="admin-button"
          onClick={onAdmin}
        >
          Open Admin Dashboard
        </button>

      </div>

    </aside>
  )
}

export default UserSidebar