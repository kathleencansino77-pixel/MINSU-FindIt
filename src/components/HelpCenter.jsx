import {
  Search,
  MessageCircle,
  ShieldQuestion,
  FileQuestion,
  Mail
} from 'lucide-react'

function HelpCenter() {

  return (
    <div className="page-content">

      <div className="page-heading">

        <div>
          <p className="eyebrow">
            SUPPORT
          </p>

          <h1>Help Center</h1>

          <p>
            Need help using MINSU FindIt?
            Find answers and useful information here.
          </p>
        </div>

      </div>


      <div className="help-search">

        <Search size={18} />

        <input
          placeholder="Search for help..."
        />

      </div>


      <div className="help-grid">

        <div className="help-card">

          <div className="help-icon">
            <FileQuestion size={22} />
          </div>

          <h3>How to report an item?</h3>

          <p>
            Learn how to report a lost or found
            item and provide important details.
          </p>

        </div>


        <div className="help-card">

          <div className="help-icon">
            <ShieldQuestion size={22} />
          </div>

          <h3>Claiming an item</h3>

          <p>
            Learn what information may be needed
            when claiming a reported item.
          </p>

        </div>


        <div className="help-card">

          <div className="help-icon">
            <MessageCircle size={22} />
          </div>

          <h3>Contact Lost & Found</h3>

          <p>
            Contact the appropriate campus
            personnel for assistance.
          </p>

        </div>


        <div className="help-card">

          <div className="help-icon">
            <Mail size={22} />
          </div>

          <h3>Need further assistance?</h3>

          <p>
            Visit the designated Lost & Found
            office for additional support.
          </p>

        </div>

      </div>

    </div>
  )
}

export default HelpCenter