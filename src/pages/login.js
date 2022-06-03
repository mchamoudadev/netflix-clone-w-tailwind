import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '../misc/firebase';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const Login = () => {

    // for useform validation
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {
            const { email, password } = data;
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            // custome hook that we created for login and register
            login(userCredentials);
            navigate('/browse');
        } catch (error) {
            toast.error(error.message);
        }

    };

    return (
        <div className="relative flex h-screen w-screen flex-col md:items-center md:justify-center">
            <img src="./images/misc/home.jpeg" alt="" className="absolute h-screen w-full object-cover -z-10 !hidden opacity-60 sm:!inline" />

            <img src="./images/logo/mainlogo.svg" alt=""
                className="absolute top-0 left-2 w-[100px] md:w-[150px] object-contain"
            />

            <form className="relative mt-24 space-y-8 rounded bg-black/70 py-10 px-6 md:mt-0 md:max-w-md md:px-14" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-white text-4xl font-semibold my-6">Sign In</h1>
                <label className="inline-block w-full">
                    <input type="email" placeholder="email" className="form-control" {...register("email", { required: true })} />
                    {errors.email && <p className="pt-2 text-sm text-orange-500">Please enter valid email</p>}
                </label>
                <label className="inline-block w-full">
                    <input type="password" placeholder="password" className="form-control" {...register("password", { required: true })} />
                    {errors.password && <p className="pt-2 text-sm text-orange-500">Please enter valid password</p>}
                </label>
                <button className="btn">Sign in</button>
                <div className="flex flex-row space-x-2 my-4">
                    <p className="text-[#8d8d8d] text-lg">New to netflix ?</p> <Link className="hover:underline" to="/signup" >Sign up now</Link>
                </div>

            </form>

        </div>
    );
};

export default Login;
