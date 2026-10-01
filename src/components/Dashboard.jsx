import {
  Package,
  Search,
  PackageCheck,
  ClipboardList,
  Plus,
  ArrowUpRight
} from 'lucide-react'

function Dashboard({
  items,
  stats,
  onAdd,
  onViewAll
}) {

  const recentItems = [...items]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div className="dashboard">

      <div className="welcome-row">

        <div>
          <p className="eyebrow">CAMPUS LOST & FOUND</p>

          <h1>
            Welcome back,
            <span> Student</span>
          </h1>

          <p className="welcome-text">
            Here's what's happening with campus lost and found items.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={onAdd}
        >
          <Plus size={18} />
          Report Item
        </button>

      </div>


      {/* STATISTICS */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon green">
            <Package size={21} />
          </div>

          <div className="stat-content">
            <span>Total Items</span>
            <strong>{stats.total}</strong>
            <small>All reported items</small>
          </div>

          <ArrowUpRight size={18} className="stat-arrow" />
        </div>


        <div className="stat-card">
          <div className="stat-icon orange">
            <Search size={21} />
          </div>

          <div className="stat-content">
            <span>Lost Items</span>
            <strong>{stats.lost}</strong>
            <small>Items reported lost</small>
          </div>

          <ArrowUpRight size={18} className="stat-arrow" />
        </div>


        <div className="stat-card">
          <div className="stat-icon blue">
            <PackageCheck size={21} />
          </div>

          <div className="stat-content">
            <span>Found Items</span>
            <strong>{stats.found}</strong>
            <small>Items turned in</small>
          </div>

          <ArrowUpRight size={18} className="stat-arrow" />
        </div>


        <div className="stat-card">
          <div className="stat-icon purple">
            <ClipboardList size={21} />
          </div>

          <div className="stat-content">
            <span>Claimed</span>
            <strong>{stats.claimed}</strong>
            <small>Successfully returned</small>
          </div>

          <ArrowUpRight size={18} className="stat-arrow" />
        </div>

      </div>


      {/* RECENT ITEMS */}

      <div className="section-card">

        <div className="section-header">

          <div>
            <h2>Recent Reports</h2>
            <p>Latest lost and found activity on campus</p>
          </div>

          <button
            className="text-button"
            onClick={onViewAll}
          >
            View all
            <ArrowUpRight size={16} />
          </button>

        </div>


        <div className="recent-list">

          {recentItems.length === 0 ? (

            <div className="empty-state">
              No reports available.
            </div>

          ) : (

            recentItems.map((item) => (

              <div
                className="recent-item"
                key={item.id}
              >

                <div className="recent-item-icon">
                  <Package size={20} />
                </div>

                <div className="recent-item-info">

                  <strong>{item.title}</strong>

                  <span>
                    {item.location} · {item.date}
                  </span>

                </div>

                <div
                  className={`type-badge ${
                    item.type.toLowerCase()
                  }`}
                >
                  {item.type}
                </div>

                <div
                  className={`status-badge ${
                    item.status.toLowerCase()
                  }`}
                >
                  {item.status}
                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  )
}

export default Dashboard