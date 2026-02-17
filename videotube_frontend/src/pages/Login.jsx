import React,{useContext,useState} from 'react'
import './Login.css'
import { isAuthContext } from '../context/context'
import { Link,useNavigate } from 'react-router-dom'
import { loginInUser } from '../api/Login'

const Login = () => {
  const values=useContext(isAuthContext);
  const navigate=useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try {
      const response = await loginInUser(username, password)

      if (response.data.success){
        localStorage.setItem("accessToken", response.data.data.accessToken)
        localStorage.setItem("user",JSON.stringify(response.data.data.user))
        navigate("/")
        values.setLoggedIn(true)
      }else{
        setError("Invalid credentials. Try again.")
      }
    }catch(err){
      setError("Login failed. Try again.")
      console.log(err)
    }
  }
  return (
    <div className='login-center'>
      <form className='login-box' onSubmit={handleSubmit}>
        <div className='login-text'>
          <h2>Welcome back</h2>
          <p>Sign in to your StreamVault account</p>
        </div>
        <div className='login-input'>
          <p>username</p>
          <input type="text" placeholder='user_1234' autoComplete='username' required value={username} onChange={(e)=>setUsername(e.target.value)}/>
          <p>Password</p>
          <input type="password" placeholder='************' autoComplete="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        {error && <div className='error' style={{color:'red'}}>{error}</div>}
        <div className='login-buttons'>
          <button type='submit'>Sign In</button>
        </div>
        <div className='desc'>
          <p>Don't have an account? <Link to="/users/register" className='register'>Sign-up</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Login
