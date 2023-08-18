import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/AuthStyle.css'
const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let toastLoading;
    try {
      toastLoading = toast.loading("Resetting...");
      console.log(email, newPassword, answer);
      const res = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/forgot-password`, { email, newPassword, answer });
      if (res.data.success) {
        toast.update(toastLoading, { render: `${res.data.message}`, type: "success", isLoading: false, autoClose: 3000 });
        const toastRedirect = toast.loading("Redirecting To Login");
        setTimeout(() => {
          toast.done(toastRedirect);
          navigate("/login");
        }, 3000);
      }
      else {
        toast.update(toastLoading, { render: `${res.data.message}`, type: "error", isLoading: false, autoClose: 3000 })

      }
    }
    catch (error) {
      console.log(error);
      toast.update(toastLoading, { render: 'Something Went Wrong', type: "error", isLoading: false, autoClose: 3000 })
    }
  }

  return (
    <Layout title={"Forgot Password - Ecommerce app"}>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h4 className='title'>Reset Password</h4>
          <div className="mb-3">

            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' required />

          </div>

          <div className="mb-3">

            <input type="text" value={answer} onChange={(e) => { setAnswer(e.target.value) }} className="form-control" id="exampleInputAnswer" placeholder='What is Your Favourite Sport' required />

          </div>
          <div className="mb-3">
            <input type="password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} className="form-control" id="exampleInputPassword" placeholder='Enter Your Password' required />
          </div>
          <button type="submit" className="btn btn-primary">Reset</button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword;