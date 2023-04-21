import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';



export const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const [load,setLoad]=useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="formcontainer">
            <div className="formwrapper">
                <span className="logo">AayuChat</span>
                <span className="title">Login</span>
                <form action="" onSubmit={handleSubmit}>
                    <input type="email" placeholder='someone@email.com' />
                    <input type="password" placeholder='passwordXX' />
                    <button>{load?"Loading...":"Sign In"}</button>
                    {err && <span>Invalid Email or Password</span>}
                </form>

                <span className='signin'>Don't have an account? <Link to={"/register"}> <u><b>Register</b></u>  </Link></span>

            </div>
        </div>
    )
}
