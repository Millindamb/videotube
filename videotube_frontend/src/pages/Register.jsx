import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="register-center">
      <div className="register-box">
        <div className="register-text">
          <h2>Create an Account</h2>
          <p>Join Videotube and start Streaming</p>
        </div>
        <div className="register-input">
          <div className="image-upload">
            <label>Upload Profile Picture</label>
            <input type="file" accept="image/*" />
            <label>Upload Cover Image</label>
            <input type="file" accept="image/*" />
          </div>
          <form className="details">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" autoComplete='Name'/>

            <label>Username</label>
            <input type="text" placeholder="Choose a username" />

            <label>Email</label>
            <input type="email" placeholder="Enter your email" autoComplete='email'/>

            <label>Password</label>
            <input type="password" placeholder="Create a password" autoComplete="new-password"/>

            <div className="register-btn">
              <button type="submit">Create Account</button>
            </div>
          </form>
          <div className='desc'>
            <p>Already have an account? <Link to="/users/login" className='login'>Sign-in</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
