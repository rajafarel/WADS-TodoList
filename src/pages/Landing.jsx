// import { Link } from "react-router-dom";


// export default function Landing() {
//   return (
    
//     <div className='flex items-center justify-center my-32 w-full bg-sky-950'>
//         <div className=' flex flex-col justify-center'>
//             <form className='max-w-[400px] w-full mx-auto rounded-lg p-8 px-8'>
//                 <h2 className='text-4xl dark:text-white font-bold text-center'>SIGN IN</h2>
//                 <div className='flex flex-col text-gray-400 py-2'>
//                     <label>Username</label>
//                     <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
//                 </div>
//                 <div className='flex flex-col text-gray-400 py-2'>
//                     <label>Password</label>
//                     <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
//                 </div>
//                 <div className='flex justify-between text-gray-400 py-2'>
//                     <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    
//                 </div>
//                    <Link to="/todo">
//                       <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>SIGN IN</button>
//                    </Link>
//             </form>
//         </div>
//     </div>

    
    
    
    
    
    
    

//   );
// }


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/todo");
  }, [user, loading]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 max-w-[400px] w-full mx-auto rounded-lg p-8 px-8 shadow-lg">
        <h2 className="text-4xl font-bold text-white text-center mb-8">Sign In</h2>
        <input
          type="text"
          className="rounded-lg bg-gray-700 w-full py-2 px-4 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          type="password"
          className="rounded-lg bg-gray-700 w-full py-2 px-4 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Sign In
        </button>
        <button
          className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={signInWithGoogle}
        >
          Sign In with Google
        </button>
        <div className="text-center mt-4">
          <Link to="/reset" className="text-blue-500 hover:underline">
            Forgot Password
          </Link>
        </div>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register now
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default Login;

