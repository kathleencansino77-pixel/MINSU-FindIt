import {
  Package,
  Search,
  PackageCheck,
  Clock3,
  Users,
  ArrowUpRight,
  ClipboardCheck
} from 'lucide-react'

function AdminDashboard({
  items,
  onViewItems,
  onViewPending
}) {
  const total = items.length

  const lost = items.filter(
    item => item.type === 'Lost'
  ).length

  const found = items.filter(
    item => item.type === 'Found'
  ).length

  const claimed = items.filter(
    item => item.status === 'Claimed'
  ).length

  const pending = items.filter(
    item => item.status === 'Pending'
  ).length

  return (
    <div className="dashboard">

      {/* WELCOME */}

      <div className="welcome-row">

        <div>

          <p className="eyebrow">
            ADMINISTRATION
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p className="welcome-text">
            Monitor and manage MINSU campus
            lost and found records.
          </p>

        </div>

      </div>


      {/* ADMIN STATISTICS */}

      <div className="stats-grid">

        {/* TOTAL */}

        <div className="stat-card">

          <div className="stat-icon green">
            <Package size={21} />
          </div>

          <div className="stat-content">

            <span>
              Total Items
            </span>

            <strong>
              {total}
            </strong>

            <small>
              All campus records
            </small>

          </div>

          <ArrowUpRight
            size={18}
            className="stat-arrow"
          />

        </div>


        {/* LOST */}

        <div className="stat-card">

          <div className="stat-icon orange">
            <Search size={21} />
          </div>

          <div className="stat-content">

            <span>
              Lost Reports
            </span>

            <strong>
              {lost}
            </strong>

            <small>
              Reported lost items
            </small>

          </div>

        </div>


        {/* FOUND */}

        <div className="stat-card">

          <div className="stat-icon blue">
            <PackageCheck size={21} />
          </div>

          <div className="stat-content">

            <span>
              Found Items
            </span>

            <strong>
              {found}
            </strong>

            <small>
              Items waiting for claim
            </small>

          </div>

        </div>


        {/* PENDING */}

        <div className="stat-card">

          <div className="stat-icon purple">
            <Clock3 size={21} />
          </div>

          <div className="stat-content">

            <span>
              Pending Reports
            </span>

            <strong>
              {pending}
            </strong>

            <small>
              Need admin review
            </small>

          </div>

        </div>

      </div>


      {/* ADMIN OVERVIEW */}

      <div className="admin-overview">

        <div className="section-card">

          <div className="section-header">

            <div>

              <h2>
                System Overview
              </h2>

              <p>
                Current campus records
              </p>

            </div>

          </div>


          <div className="overview-list">

            <div>
              <span>
                Total Reports
              </span>

              <strong>
                {total}
              </strong>
            </div>


            <div>
              <span>
                Lost Items
              </span>

              <strong>
                {lost}
              </strong>
            </div>


            <div>
              <span>
                Found Items
              </span>

              <strong>
                {found}
              </strong>
            </div>


            <div>
              <span>
                Pending Review
              </span>

              <strong>
                {pending}
              </strong>
            </div>


            <div>
              <span>
                Successfully Claimed
              </span>

              <strong>
                {claimed}
              </strong>
            </div>

          </div>

        </div>


        {/* ADMIN ACTION */}

        <div className="section-card admin-summary">

          <div className="admin-summary-icon">
            <Users size={24} />
          </div>

          <h3>
            Campus Reports
          </h3>

          <p>
            Review student submissions, manage
            lost and found records, and monitor
            item claims.
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={onViewItems}
          >
            Manage Items
          </button>

          {pending > 0 && (
            <button
              type="button"
              className="secondary-button"
              onClick={onViewPending}
            >
              <ClipboardCheck size={17} />
              Review Pending Reports
            </button>
          )}

        </div>

      </div>


      {/* RECENT ADMIN ACTIVITY */}

      <div className="section-card">

        <div className="section-header">

          <div>

            <h2>
              Recent Submissions
            </h2>

            <p>
              Latest reports submitted by students
            </p>

          </div>

        </div>


        <div className="recent-list">

          {items.length === 0 ? (

            <div className="empty-state">

              <Package size={30} />

              <p>
                No reports have been submitted yet.
              </p>

            </div>

          ) : (

            items
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt || 0) -
                  new Date(a.createdAt || 0)
              )
              .slice(0, 6)
              .map(item => (

                <div
                  className="recent-item"
                  key={item.id}
                >

                  <div className="recent-item-icon">
                    <Package size={20} />
                  </div>


                  <div className="recent-item-info">

                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      Submitted by {item.reporter}
                    </span>

                  </div>


                  <span
                    className={`type-badge ${
                      item.type?.toLowerCase()
                    }`}
                  >
                    {item.type}
                  </span>


                  <span
                    className={`status-badge ${
                      item.status?.toLowerCase()
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              ))

          )}

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard