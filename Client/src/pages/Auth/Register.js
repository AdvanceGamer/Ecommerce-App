import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/AuthStyle.css'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let toastLoading;
        try {
            toastLoading = toast.loading("Registering...");
            console.log(name, email, password, phone, address, answer);
            const res = await axios.post(`${process.env.REACT_APP_API}api/v1/auth/register`, { name, email, password, phone, address, answer });
            if (res.data.success) {

                toast.update(toastLoading, { render: `${res.data.message}`, type: "success", isLoading: false, autoClose: 3000 });
                const toastRedirect = toast.loading("Redirecting To Login Page");
                setTimeout(() => {
                    toast.done(toastRedirect);
                    navigate('/login');
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
        <Layout title={"Register - Ecommerce app"}>
            <div className='form-container' style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Registration Form</h4>
                    <div className="mb-3">
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control" id="exampleInputName" placeholder='Enter Your Name' required />

                    </div>
                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />

                    </div>

                    <div className="mb-3">
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="form-control" id="exampleInputPhone" placeholder='Enter Your Phone' required />

                    </div>
                    <div className="mb-3">
                        <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} className="form-control" id="exampleInputAddress" placeholder='Enter Your Address' required />

                    </div>
                    <div className="mb-3">
                        <input type="text" value={answer} onChange={(e) => { setAnswer(e.target.value) }} className="form-control" id="exampleInputAnswer" placeholder='What is Your Favourite Sport ?' required />

                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register;