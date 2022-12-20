import React from 'react'
const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState('Send')
  const onSubmit = (e) => {
    e.preventDefault()
    setFormStatus('Submitting...')

  const { name, email, message } = e.target.elements
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    }
    console.log(conFom)
  }
  return (
    <div className="container mt-5">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            <h6>Name</h6>
          </label>
          <input className="form-control" type="text" id="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            <h6>Email</h6>
          </label>
          <input className="form-control" type="email" id="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            <h6>Message</h6>
          </label>
          <textarea className="form-control" id="message" required />
        </div>
        <button variant="primary" type="submit">
          {formStatus}
        </button>
      </form>
    </div>
  )
}
export default ContactForm;