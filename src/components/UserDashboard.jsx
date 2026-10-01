import {
  Search,
  FilePlus,
  ClipboardList,
  PackageCheck,
  MapPin,
  ArrowRight
} from 'lucide-react'

function UserDashboard({
  items = [],
  onReport,
  onFind,
  onMyReports
}) {

  // Only show found items that are approved/available.
  // Pending reports should not appear as available items.
  const availableItems = items.filter(
    item =>
      item.type === 'Found' &&
      item.status !== 'Claimed' &&
      item.status !== 'Pending'
  )


  // Get the latest campus submissions
  // using the actual creation date when available.
  const recentItems = items
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 4)


  return (
    <div className="dashboard">

      {/* WELCOME */}

      <div className="welcome-row">

        <div>

          <p className="eyebrow">
            MINSU CAMPUS
          </p>

          <h1>
            Welcome to <span>FindIt</span>
          </h1>

          <p className="welcome-text">
            Lost something on campus? Find it here
            or report an item you've found.
          </p>

        </div>


        <button
          type="button"
          className="primary-button"
          onClick={onReport}
        >

          <FilePlus size={18} />

          Report an Item

        </button>

      </div>


      {/* QUICK ACTIONS */}

      <div className="user-actions">

        {/* FIND ITEM */}

        <button
          type="button"
          className="quick-action"
          onClick={onFind}
        >

          <div className="quick-icon green">
            <Search size={21} />
          </div>

          <div>

            <strong>
              Find an Item
            </strong>

            <span>
              Search found items
            </span>

          </div>

          <ArrowRight size={17} />

        </button>


        {/* REPORT ITEM */}

        <button
          type="button"
          className="quick-action"
          onClick={onReport}
        >

          <div className="quick-icon beige">
            <FilePlus size={21} />
          </div>

          <div>

            <strong>
              Report an Item
            </strong>

            <span>
              Lost or found something?
            </span>

          </div>

          <ArrowRight size={17} />

        </button>


        {/* MY REPORTS */}

        <button
          type="button"
          className="quick-action"
          onClick={onMyReports}
        >

          <div className="quick-icon sage">
            <ClipboardList size={21} />
          </div>

          <div>

            <strong>
              My Reports
            </strong>

            <span>
              View your submissions
            </span>

          </div>

          <ArrowRight size={17} />

        </button>

      </div>


      {/* RECENTLY FOUND ITEMS */}

      <div className="section-card">

        <div className="section-header">

          <div>

            <h2>
              Recently Found Items
            </h2>

            <p>
              Items recently reported on campus
            </p>

          </div>


          <button
            type="button"
            className="text-button"
            onClick={onFind}
          >

            View all

            <ArrowRight size={16} />

          </button>

        </div>


        <div className="user-items">

          {availableItems.length === 0 ? (

            <div className="empty-state">

              <PackageCheck size={30} />

              <p>
                No found items available yet.
              </p>

            </div>

          ) : (

            availableItems
              .slice(0, 5)
              .map(item => {

                const title =
                  item.title?.trim() ||
                  'Unnamed Item'

                const location =
                  item.location?.trim() ||
                  'Location not specified'

                return (

                  <div
                    className="user-item"
                    key={item.id}
                  >

                    <div className="user-item-avatar">

                      {title
                        .charAt(0)
                        .toUpperCase()}

                    </div>


                    <div className="user-item-info">

                      <strong>
                        {title}
                      </strong>

                      <span>

                        <MapPin size={12} />

                        {location}

                      </span>

                    </div>


                    <span className="found-badge">
                      Found
                    </span>

                  </div>

                )
              })

          )}

        </div>

      </div>


      {/* RECENT CAMPUS ACTIVITY */}

      <div className="section-card">

        <div className="section-header">

          <div>

            <h2>
              Campus Activity
            </h2>

            <p>
              Latest reports submitted
            </p>

          </div>

        </div>


        <div className="user-items">

          {recentItems.length === 0 ? (

            <div className="empty-state">

              <ClipboardList size={30} />

              <p>
                No reports have been submitted yet.
              </p>

            </div>

          ) : (

            recentItems.map(item => {

              const title =
                item.title?.trim() ||
                'Unnamed Item'

              const location =
                item.location?.trim() ||
                'Location not specified'

              const type =
                item.type || 'Unknown'

              const status =
                item.status || 'Pending'

              return (

                <div
                  className="user-item"
                  key={item.id}
                >

                  <div className="user-item-avatar">

                    {title
                      .charAt(0)
                      .toUpperCase()}

                  </div>


                  <div className="user-item-info">

                    <strong>
                      {title}
                    </strong>

                    <span>
                      {type} · {location}
                    </span>

                  </div>


                  <span
                    className={`status-badge ${
                      status.toLowerCase()
                    }`}
                  >
                    {status}
                  </span>

                </div>

              )
            })

          )}

        </div>

      </div>

    </div>
  )
}

export default UserDashboard