import {
  BarChart3,
  Package,
  Search,
  PackageCheck,
  Clock3,
  Users,
  TrendingUp,
  CheckCircle2
} from 'lucide-react'

function ReportsAnalytics({
  items = [],
  users = []
}) {

  /* =========================================
     COUNTS
  ========================================= */

  const count = (test) => items.filter(test).length

  const totalItems = items.length

  const lostItems = count(item => item.type === 'Lost')
  const foundItems = count(item => item.type === 'Found')

  const openItems = count(item => item.status === 'Open')
  const pendingItems = count(item => item.status === 'Pending')
  const claimedItems = count(item => item.status === 'Claimed')

  const unclaimedItems = Math.max(totalItems - claimedItems, 0)

  /* Every account that is not an admin counts as a student */
  const totalStudents = users.filter(
    user => user.role !== 'admin'
  ).length

  const percent = (value) =>
    totalItems > 0
      ? Math.round((value / totalItems) * 100)
      : 0

  const lostPercentage = percent(lostItems)
  const foundPercentage = percent(foundItems)
  const claimedPercentage = percent(claimedItems)

  const statusRows = [
    { label: 'Open', value: openItems, tone: 'open' },
    { label: 'Pending', value: pendingItems, tone: 'pending' },
    { label: 'Claimed', value: claimedItems, tone: 'claimed' }
  ]


  return (

    <div className="ra-page">

      {/* =================================
          HEADER
      ================================= */}

      <div className="welcome-row">

        <div>

          <p className="eyebrow">
            ADMINISTRATION
          </p>

          <h1>
            Reports & Analytics
          </h1>

          <p className="welcome-text">
            Monitor campus lost and found
            activity and system statistics.
          </p>

        </div>

      </div>


      {/* =================================
          SUMMARY CARDS
      ================================= */}

      <div className="ra-stats">

        <div className="ra-stat">

          <div className="ra-stat-icon green">
            <Package size={21} />
          </div>

          <div className="ra-stat-body">
            <span>Total Items</span>
            <strong>{totalItems}</strong>
            <small>All campus records</small>
          </div>

        </div>


        <div className="ra-stat">

          <div className="ra-stat-icon orange">
            <Search size={21} />
          </div>

          <div className="ra-stat-body">
            <span>Lost Items</span>
            <strong>{lostItems}</strong>
            <small>{lostPercentage}% of records</small>
          </div>

        </div>


        <div className="ra-stat">

          <div className="ra-stat-icon sage">
            <PackageCheck size={21} />
          </div>

          <div className="ra-stat-body">
            <span>Found Items</span>
            <strong>{foundItems}</strong>
            <small>{foundPercentage}% of records</small>
          </div>

        </div>


        <div className="ra-stat">

          <div className="ra-stat-icon sand">
            <Clock3 size={21} />
          </div>

          <div className="ra-stat-body">
            <span>Pending</span>
            <strong>{pendingItems}</strong>
            <small>Awaiting review</small>
          </div>

        </div>

      </div>


      {/* =================================
          ROW 1: LOST VS FOUND + STATUS
      ================================= */}

      <div className="ra-grid">

        {/* LOST VS FOUND */}

        <div className="ra-card">

          <div className="ra-card-header">

            <div>
              <h2>Lost vs Found</h2>
              <p>Distribution of all reports</p>
            </div>

            <BarChart3 size={21} />

          </div>

          <div className="ra-split-bar">

            {totalItems > 0 ? (
              <>
                <div
                  className="ra-split lost"
                  style={{ width: `${lostPercentage}%` }}
                />
                <div
                  className="ra-split found"
                  style={{ width: `${foundPercentage}%` }}
                />
              </>
            ) : (
              <div className="ra-split empty" />
            )}

          </div>

          <div className="ra-legend">

            <div>
              <span className="ra-dot lost" />
              <span>Lost</span>
              <strong>{lostItems}</strong>
              <em>{lostPercentage}%</em>
            </div>

            <div>
              <span className="ra-dot found" />
              <span>Found</span>
              <strong>{foundItems}</strong>
              <em>{foundPercentage}%</em>
            </div>

          </div>

        </div>


        {/* ITEM STATUS */}

        <div className="ra-card">

          <div className="ra-card-header">

            <div>
              <h2>Item Status</h2>
              <p>Where each report currently stands</p>
            </div>

            <Clock3 size={21} />

          </div>

          <div className="ra-progress-list">

            {statusRows.map(row => (

              <div
                className="ra-progress-row"
                key={row.label}
              >

                <div className="ra-progress-top">
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>

                <div className="ra-track">
                  <div
                    className={`ra-fill ${row.tone}`}
                    style={{ width: `${percent(row.value)}%` }}
                  />
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* =================================
          ROW 2: CLAIM STATS + STUDENTS
      ================================= */}

      <div className="ra-grid">

        {/* CLAIM STATISTICS */}

        <div className="ra-card">

          <div className="ra-card-header">

            <div>
              <h2>Claim Statistics</h2>
              <p>Overview of item recovery</p>
            </div>

            <TrendingUp size={21} />

          </div>

          <div className="ra-claim">

            <div
              className="ra-ring"
              style={{ '--value': claimedPercentage }}
            >
              <div className="ra-ring-inner">
                <strong>{claimedPercentage}%</strong>
                <span>Claim rate</span>
              </div>
            </div>

            <div className="ra-claim-list">

              <div>
                <span>Total Items</span>
                <strong>{totalItems}</strong>
              </div>

              <div>
                <span>Successfully Claimed</span>
                <strong>{claimedItems}</strong>
              </div>

              <div>
                <span>Unclaimed Items</span>
                <strong>{unclaimedItems}</strong>
              </div>

            </div>

          </div>

        </div>


        {/* REGISTERED STUDENTS */}

        <div className="ra-card ra-students">

          <div className="ra-students-icon">
            <Users size={24} />
          </div>

          <span className="ra-students-label">
            Registered Students
          </span>

          <strong className="ra-students-number">
            {totalStudents}
          </strong>

          <p>
            Students currently registered
            in the MINSU FindIt system.
          </p>

        </div>

      </div>


      {/* =================================
          SYSTEM SUMMARY
      ================================= */}

      <div className="ra-card">

        <div className="ra-card-header">

          <div>
            <h2>System Summary</h2>
            <p>Current MINSU FindIt activity</p>
          </div>

          <CheckCircle2 size={21} />

        </div>

        <div className="ra-summary">

          <div>
            <strong>{totalStudents}</strong>
            <span>Registered Students</span>
          </div>

          <div>
            <strong>{totalItems}</strong>
            <span>Total Reports</span>
          </div>

          <div>
            <strong>{pendingItems}</strong>
            <span>Pending Review</span>
          </div>

          <div>
            <strong>{claimedItems}</strong>
            <span>Claimed Items</span>
          </div>

        </div>

      </div>

    </div>
  )
}

export default ReportsAnalytics