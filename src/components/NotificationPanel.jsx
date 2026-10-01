import {
  Bell,
  Check,
  Trash2,
  X,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'

function NotificationPanel({
  notifications = [],
  onClose,
  onMarkRead,
  onMarkAllRead,
  onDelete
}) {

  const unreadCount = notifications.filter(
    notification => !notification.read
  ).length


  const getNotificationIcon = (type) => {

    if (type === 'success') {
      return <CheckCircle2 size={18} />
    }

    if (type === 'warning') {
      return <AlertTriangle size={18} />
    }

    return <Info size={18} />
  }


  const formatDate = (date) => {

    if (!date) {
      return 'Just now'
    }

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Just now'
    }

    return parsedDate.toLocaleString()
  }


  return (
    <div className="notification-panel">

      {/* HEADER */}
      <div className="notification-header">

        <div>

          <h3>
            Notifications
          </h3>

          <span>
            {unreadCount > 0
              ? `${unreadCount} unread`
              : 'All caught up'}
          </span>

        </div>


        <button
          type="button"
          onClick={onClose}
          className="notification-close"
          aria-label="Close notifications"
        >

          <X size={18} />

        </button>

      </div>


      {/* MARK ALL AS READ */}
      {notifications.length > 0 && unreadCount > 0 && (

        <div className="notification-actions">

          <button
            type="button"
            onClick={onMarkAllRead}
          >

            <Check size={14} />

            Mark all as read

          </button>

        </div>

      )}


      {/* NOTIFICATION LIST */}
      <div className="notification-list">

        {notifications.length === 0 ? (

          <div className="empty-notifications">

            <div>
              <Bell size={28} />
            </div>

            <strong>
              No notifications
            </strong>

            <span>
              You're all caught up.
            </span>

          </div>

        ) : (

          notifications.map(notification => (

            <div
              key={notification.id}
              className={`notification-item ${
                !notification.read
                  ? 'unread'
                  : ''
              }`}
            >

              {/* TYPE ICON */}
              <div
                className={`notification-type ${
                  notification.type || 'info'
                }`}
              >

                {getNotificationIcon(
                  notification.type
                )}

              </div>


              {/* CONTENT */}
              <div className="notification-content">

                <strong>
                  {notification.title}
                </strong>

                <p>
                  {notification.message}
                </p>

                <small>
                  {formatDate(
                    notification.createdAt
                  )}
                </small>


                {/* ITEM ACTIONS */}
                <div className="notification-item-actions">

                  {!notification.read && (

                    <button
                      type="button"
                      onClick={() =>
                        onMarkRead(notification.id)
                      }
                    >

                      <Check size={13} />

                      Mark read

                    </button>

                  )}


                  <button
                    type="button"
                    onClick={() =>
                      onDelete(notification.id)
                    }
                  >

                    <Trash2 size={13} />

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default NotificationPanel