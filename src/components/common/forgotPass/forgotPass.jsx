import React from 'react'
import './styleForgotPass.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
function ForgotPass() {
  return (
    <div className="container" id="container">
      <div className="form-container sign-in">
        <form>
          <h1>Forgot password</h1>
          <input type="email" placeholder="Email" />
          <button type="button">Send OTP</button>
        </form>
      </div>
    </div>
  )
}
export default ForgotPass;