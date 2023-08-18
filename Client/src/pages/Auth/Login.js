import React, { useState } from 'react'
import {toast}  from 'react-toastify';
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import {AuthStyle} from '../../styles/AuthStyle.css'
import {useAuth} from '../../context/Auth'
const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth]= useAuth();
  const navigate=useNavigate();
const location=useLocation();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    let toastLoading;
    try{
      toastLoading=toast.loading("Logging in...");
        console.log(email,password);
      const res=await axios.post(`${process.env.REACT_APP_API}api/v1/auth/login`, {email,password});
      if(res.data.success){
         
          localStorage.setItem('auth',JSON.stringify(res.data))
          toast.update(toastLoading,{render:`${res.data.message}`,type:"success",isLoading:false ,autoClose:3000});
          const toastRedirect=toast.loading("Redirecting To Dashboard");
          setTimeout(() => {
              toast.done(toastRedirect);
              navigate(location.state || "/");
              setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token
              });
          }, 3000); 
        }
        else{
          toast.update(toastLoading,{render:`${res.data.message}`,type:"error",isLoading:false,autoClose:3000})

      }
   }
   catch(error){
    console.log(error);
    toast.update(toastLoading,{render:'Something Went Wrong',type:"error",isLoading:false,autoClose:3000})
   }
}

  return (
    <Layout title={"Login - Ecommerce app"}>
    <div className='form-container'>
        <form onSubmit={handleSubmit}>
        <h4>Login Form</h4>
            <div className="mb-3">

                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' required/>

            </div>

            <div className="mb-3">
                <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword" placeholder='Enter Your Password' required/>
            </div>
            <div className="mb-3">
             <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot</button>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
</Layout>
  )
}

export default Login