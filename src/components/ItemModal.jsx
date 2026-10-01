import { useEffect, useRef, useState } from 'react'
import {
  X,
  Upload,
  Image as ImageIcon,
  MapPin,
  CalendarDays,
  FileText,
  Tag,
  User,
  AlertCircle
} from 'lucide-react'


function ItemModal({
  isOpen,
  onClose,
  onSave,
  editingItem,
  currentUser
}) {

  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    title: '',
    type: 'Lost',
    category: 'Personal Items',
    location: '',
    date: '',
    reporter: currentUser?.fullName || 'Student User',
    description: '',
    photo: ''
  })


  /* =====================================================
     LOAD EDITING ITEM / NEW REPORT
  ===================================================== */

  useEffect(() => {

    if (!isOpen) {
      return
    }


    if (editingItem) {

      setFormData({

        title:
          editingItem.title || '',

        type:
          editingItem.type || 'Lost',

        category:
          editingItem.category ||
          'Personal Items',

        location:
          editingItem.location || '',

        date:
          editingItem.date || '',

        /*
          Keep the original reporter when
          editing an existing report.
        */
        reporter:
          editingItem.reporter ||
          currentUser?.fullName ||
          'Student User',

        description:
          editingItem.description || '',

        photo:
          editingItem.photo || ''

      })

    } else {

      setFormData({

        title: '',

        type: 'Lost',

        category: 'Personal Items',

        location: '',

        date:
          new Date()
            .toISOString()
            .split('T')[0],

        /*
          Automatically use the logged-in
          user's registered name.
        */
        reporter:
          currentUser?.fullName ||
          'Student User',

        description: '',

        photo: ''

      })

    }

  }, [isOpen, editingItem, currentUser])


  /* =====================================================
     DON'T RENDER WHEN CLOSED
  ===================================================== */

  if (!isOpen) {
    return null
  }


  /* =====================================================
     HANDLE INPUT
  ===================================================== */

  const handleChange = (event) => {

    const {
      name,
      value
    } = event.target


    setFormData(previous => ({

      ...previous,

      [name]: value

    }))

  }


  /* =====================================================
     HANDLE TYPE
  ===================================================== */

  const handleTypeChange = (type) => {

    setFormData(previous => ({

      ...previous,

      type

    }))

  }


  /* =====================================================
     HANDLE PHOTO
  ===================================================== */

  const handlePhotoChange = (event) => {

    const file =
      event.target.files?.[0]


    if (!file) {
      return
    }


    /* Prevent very large files */

    if (file.size > 5 * 1024 * 1024) {

      alert(
        'Please choose an image smaller than 5MB.'
      )

      event.target.value = ''

      return

    }


    if (!file.type.startsWith('image/')) {

      alert(
        'Please select an image file.'
      )

      event.target.value = ''

      return

    }


    const reader =
      new FileReader()


    reader.onload = () => {

      setFormData(previous => ({

        ...previous,

        photo: reader.result

      }))

    }


    reader.readAsDataURL(file)

  }


  /* =====================================================
     REMOVE PHOTO
  ===================================================== */

  const removePhoto = () => {

    setFormData(previous => ({

      ...previous,

      photo: ''

    }))


    if (fileInputRef.current) {

      fileInputRef.current.value = ''

    }

  }


  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (event) => {

    event.preventDefault()


    if (!formData.title.trim()) {

      alert(
        'Please enter the item name.'
      )

      return

    }


    if (!formData.location.trim()) {

      alert(
        'Please enter the location.'
      )

      return

    }


    if (!formData.date) {

      alert(
        'Please select a date.'
      )

      return

    }


    /*
      Always use the currently logged-in
      user's name for a NEW report.
    */
    const finalReporter =
      editingItem
        ? (
            formData.reporter ||
            currentUser?.fullName ||
            'Student User'
          )
        : (
            currentUser?.fullName ||
            formData.reporter ||
            'Student User'
          )


    onSave({

      ...formData,

      reporter: finalReporter,

      title:
        formData.title.trim(),

      location:
        formData.location.trim(),

      description:
        formData.description.trim()

    })

  }


  /* =====================================================
     CANCEL / CLOSE
  ===================================================== */

  const handleClose = (event) => {

    if (event) {

      event.preventDefault()

      event.stopPropagation()

    }

    onClose()

  }


  return (

    <div
      className="modal-overlay"

      onMouseDown={(event) => {

        /*
          Only close when clicking the dark
          background, not inside the form.
        */

        if (
          event.target ===
          event.currentTarget
        ) {

          handleClose(event)

        }

      }}
    >

      <div
        className="item-modal"

        onMouseDown={event =>
          event.stopPropagation()
        }
      >


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="modal-header">

          <div>

            <div className="modal-eyebrow">
              CAMPUS LOST & FOUND
            </div>

            <h2>
              {editingItem
                ? 'Edit Report'
                : 'Report an Item'
              }
            </h2>

            <p>
              Provide accurate information so
              the item can be identified easily.
            </p>

          </div>


          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="modal-close"
            onClick={handleClose}
            aria-label="Close"
          >

            <X size={21} />

          </button>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          className="item-form"
          onSubmit={handleSubmit}
        >


          {/* =================================================
              ITEM TYPE
          ================================================= */}

          <div className="form-section">

            <div className="form-section-title">

              <Tag size={17} />

              <span>
                What are you reporting?
              </span>

            </div>


            <div className="type-selector">

              <button
                type="button"

                className={
                  formData.type === 'Lost'
                    ? 'type-option active lost'
                    : 'type-option lost'
                }

                onClick={() =>
                  handleTypeChange('Lost')
                }
              >

                <span className="type-option-icon">
                  !
                </span>

                <span>

                  <strong>
                    Lost Item
                  </strong>

                  <small>
                    I lost something on campus
                  </small>

                </span>

              </button>


              <button
                type="button"

                className={
                  formData.type === 'Found'
                    ? 'type-option active found'
                    : 'type-option found'
                }

                onClick={() =>
                  handleTypeChange('Found')
                }
              >

                <span className="type-option-icon">
                  ✓
                </span>

                <span>

                  <strong>
                    Found Item
                  </strong>

                  <small>
                    I found something on campus
                  </small>

                </span>

              </button>

            </div>

          </div>


          {/* =================================================
              PHOTO
          ================================================= */}

          <div className="form-section">

            <div className="form-section-title">

              <ImageIcon size={17} />

              <span>
                Item Photo
              </span>

              <span className="optional-label">
                Optional
              </span>

            </div>


            {!formData.photo ? (

              <button
                type="button"
                className="photo-upload"

                onClick={() =>
                  fileInputRef.current?.click()
                }
              >

                <div className="photo-upload-icon">

                  <Upload size={23} />

                </div>

                <div>

                  <strong>
                    Upload a photo
                  </strong>

                  <span>
                    Click to choose an image
                    from your device
                  </span>

                </div>

              </button>

            ) : (

              <div className="photo-preview">

                <img
                  src={formData.photo}
                  alt="Item preview"
                />

                <div className="photo-preview-overlay">

                  <button
                    type="button"

                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                  >
                    Change Photo
                  </button>


                  <button
                    type="button"
                    onClick={removePhoto}
                  >
                    Remove
                  </button>

                </div>

              </div>

            )}


            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}

              style={{
                display: 'none'
              }}
            />


            <small className="photo-help">
              JPG, PNG, WEBP • Maximum 5MB
            </small>

          </div>


          {/* =================================================
              ITEM INFORMATION
          ================================================= */}

          <div className="form-grid">


            {/* ITEM NAME */}

            <div className="form-field full">

              <label htmlFor="title">

                Item Name

                <span>*</span>

              </label>

              <div className="input-with-icon">

                <Tag size={16} />

                <input
                  id="title"
                  name="title"
                  type="text"

                  value={formData.title}

                  onChange={handleChange}

                  placeholder="e.g. Black Wallet"

                  required
                />

              </div>

            </div>


            {/* CATEGORY */}

            <div className="form-field">

              <label htmlFor="category">

                Category

                <span>*</span>

              </label>

              <select
                id="category"
                name="category"

                value={formData.category}

                onChange={handleChange}

                required
              >

                <option value="Personal Items">
                  Personal Items
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Documents">
                  Documents
                </option>

                <option value="Clothing">
                  Clothing
                </option>

                <option value="Accessories">
                  Accessories
                </option>

                <option value="School Supplies">
                  School Supplies
                </option>

                <option value="Others">
                  Others
                </option>

              </select>

            </div>


            {/* DATE */}

            <div className="form-field">

              <label htmlFor="date">

                Date

                <span>*</span>

              </label>

              <div className="input-with-icon">

                <CalendarDays size={16} />

                <input
                  id="date"
                  name="date"
                  type="date"

                  value={formData.date}

                  onChange={handleChange}

                  required
                />

              </div>

            </div>


            {/* LOCATION */}

            <div className="form-field full">

              <label htmlFor="location">

                Location

                <span>*</span>

              </label>

              <div className="input-with-icon">

                <MapPin size={16} />

                <input
                  id="location"
                  name="location"
                  type="text"

                  value={formData.location}

                  onChange={handleChange}

                  placeholder="e.g. Library, Main Building"

                  required
                />

              </div>

            </div>


            {/* REPORTER */}

            <div className="form-field full">

              <label htmlFor="reporter">

                Reported By

              </label>

              <div className="input-with-icon">

                <User size={16} />

                <input
                  id="reporter"
                  name="reporter"
                  type="text"

                  value={
                    formData.reporter ||
                    currentUser?.fullName ||
                    'Student User'
                  }

                  readOnly

                  aria-readonly="true"
                />

              </div>

              <small
                style={{
                  display: 'block',
                  marginTop: '6px',
                  color: 'var(--text-muted, #6b7280)',
                  fontSize: '12px'
                }}
              >
                This is automatically set to your
                registered account name.
              </small>

            </div>


            {/* DESCRIPTION */}

            <div className="form-field full">

              <label htmlFor="description">

                Description

              </label>

              <div className="textarea-wrapper">

                <FileText size={16} />

                <textarea
                  id="description"
                  name="description"

                  value={formData.description}

                  onChange={handleChange}

                  placeholder="Describe the item, color, brand, distinguishing marks, or other useful details..."

                  rows="5"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              INFORMATION NOTICE
          ================================================= */}

          <div className="form-notice">

            <AlertCircle size={17} />

            <div>

              <strong>
                Please provide accurate information
              </strong>

              <p>
                Avoid including sensitive personal
                information. Only provide details
                necessary to identify the item.
              </p>

            </div>

          </div>


          {/* =================================================
              FOOTER BUTTONS
          ================================================= */}

          <div className="modal-footer">

            <button
              type="button"
              className="secondary-button"
              onClick={handleClose}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="primary-button"
            >

              {editingItem
                ? 'Save Changes'
                : 'Submit Report'
              }

            </button>

          </div>


        </form>

      </div>

    </div>

  )

}


export default ItemModal