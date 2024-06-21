// components
import { FormEvent, useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// context
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const Auth = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Auth.authenticate(email, password)
      .then(data => {
        Auth.setIsLoggedIn(true);
        navigate("/"); // navigate to home page
        console.log("Logged in")
      })
      .catch(error => {
        console.error("Error: ", error)
      })
  }

  useEffect(() => {
    if (Auth.isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
      <div className="flex items-center justify-center flex-row w-screen h-screen"> 
        <div className="flex flex-col items-center justify-center w-1/3 h-1/2 min-w-[20rem] min-h-[20rem] shadow-lg">
          <form className="flex flex-col w-2/3 h-2/3" onSubmit={onSubmit}>
            <span className="text-2xl font-bold text-indigo-600">Welcome back.</span>
            <p className="mb-8 text-xs">Log in to see your orders.</p>
            <label className="font-bold text-lg">Email</label>
            <input className="shadow border rounded py-1 px-2 my-2 mb-5" type="text" placeholder="Email" value={email} onChange={(event) => {setEmail(event.target.value)}}/>
            <label className="font-bold text-lg">Password</label>
            <input className="shadow border rounded py-1 px-2 my-2 mb-5" type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
            <div className="flex items-baseline justify-between">
              <button className="flex items-center bg-indigo-600 border border-indigo-600 text-white w-fit h-10 p-5 rounded-lg hover:bg-inherit hover:text-indigo-600 duration-300" type="submit">
                Log in
              </button>
              <Link to="/signup" className="text-indigo-600 hover:underline">Create account</Link>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Login;