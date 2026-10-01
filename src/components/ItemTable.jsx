import {
  Pencil,
  Trash2,
  CheckCircle,
  MapPin,
  CalendarDays
} from 'lucide-react'

function ItemTable({
  items,
  onEdit,
  onDelete,
  onClaim
}) {

  if (items.length === 0) {
    return (
      <div className="empty-table">
        <div className="empty-icon">
          <SearchIcon />
        </div>

        <h3>No items found</h3>

        <p>
          Try changing your search or filter.
        </p>
      </div>
    )
  }

  return (
    <div className="table-wrapper">

      <table className="item-table">

        <thead>

          <tr>
            <th>ITEM</th>
            <th>TYPE</th>
            <th>CATEGORY</th>
            <th>LOCATION</th>
            <th>DATE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>

        </thead>

        <tbody>

          {items.map((item) => (

            <tr key={item.id}>

              {/* ITEM + PHOTO */}

              <td>

                <div className="item-name">

                  <div className="item-avatar">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.title}
                      />

                    ) : (

                      item.title
                        .charAt(0)
                        .toUpperCase()

                    )}

                  </div>


                  <div>

                    <strong>
                      {item.title}
                    </strong>

                    <span>
                      Reported by {item.reporter}
                    </span>

                  </div>

                </div>

              </td>


              {/* TYPE */}

              <td>

                <span
                  className={`type-badge ${
                    item.type.toLowerCase()
                  }`}
                >
                  {item.type}
                </span>

              </td>


              {/* CATEGORY */}

              <td>

                <span className="category-text">
                  {item.category}
                </span>

              </td>


              {/* LOCATION */}

              <td>

                <div className="location-cell">

                  <MapPin size={14} />

                  {item.location}

                </div>

              </td>


              {/* DATE */}

              <td>

                <div className="date-cell">

                  <CalendarDays size={14} />

                  {item.date}

                </div>

              </td>


              {/* STATUS */}

              <td>

                <span
                  className={`status-badge ${
                    item.status.toLowerCase()
                  }`}
                >
                  {item.status}
                </span>

              </td>


              {/* ACTIONS */}

              <td>

                <div className="action-buttons">

                  {/* EDIT */}

                  <button
                    className="action-btn edit"
                    title="Edit"
                    onClick={() => onEdit(item)}
                  >

                    <Pencil size={16} />

                  </button>


                  {/* CLAIM */}

                  {item.status !== 'Claimed' && (

                    <button
                      className="action-btn claim"
                      title="Mark as Claimed"
                      onClick={() =>
                        onClaim(item.id)
                      }
                    >

                      <CheckCircle size={16} />

                    </button>

                  )}


                  {/* DELETE */}

                  <button
                    className="action-btn delete"
                    title="Delete"
                    onClick={() =>
                      onDelete(item.id)
                    }
                  >

                    <Trash2 size={16} />

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}


function SearchIcon() {

  return (

    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >

      <circle
        cx="11"
        cy="11"
        r="8"
      />

      <path d="m21 21-4.3-4.3" />

    </svg>

  )

}


export default ItemTable