import {
  LayoutDashboard,
  Search,
  FilePlus,
  ClipboardList,
  HelpCircle,
  Settings,
  LogOut
} from 'lucide-react'

function UserSidebar({
  activePage,
  onPageChange,
  onLogout,
  onReportItem
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

          <strong>
            MINSU
          </strong>

          <span>
            FindIt
          </span>

        </div>

      </div>


      {/* STUDENT PORTAL */}
      <div className="sidebar-section-title">
        STUDENT PORTAL
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
              onClick={() => {

                if (
                  item.name === 'Report Item' &&
                  typeof onReportItem === 'function'
                ) {
                  onReportItem()
                  return
                }

                onPageChange(item.name)
              }}
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


      {/* LOGOUT */}
      <div className="sidebar-bottom">

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

export default UserSidebar