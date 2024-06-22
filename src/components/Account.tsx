// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// context
import { useAuthContext } from "../context/AuthContext";

// components
import RedirectButton from "./RedirectButton";
import { CognitoUserSession } from "amazon-cognito-identity-js";

const Account = () => {
    const [userEmail, setUserEmail] = useState(undefined);
    const [userAddress, setUserAddress] = useState(undefined);
    const Auth = useAuthContext();
    const navigate = useNavigate()

    const onClick = () => {
      Auth.setIsLoggedIn(false);
      Auth.logout();
      navigate("/"); // send user back to homepage
    }

    useEffect(() => {
      if (!Auth.isLoggedIn) {
        navigate("/");
      } else {
        const user = Auth.getSession();
        user.then((session) => {
          setUserEmail(session?.getIdToken().payload.email);
          setUserAddress(session?.getIdToken().payload.address.formatted);
          console.log(session);
        });
      }
    }, []);

    return (
        <div className="flex items-center justify-center flex-row w-screen h-screen"> 
          <div className="flex flex-col items-start w-2/3 h-1/2 min-w-[25rem] min-h-[20rem] shadow-lg p-20 border">
          <div>
            <span className="text-2xl font-bold text-indigo-600">Hey, <p className="text-black">{userEmail}</p></span>
            <p className="mb-5 text-xs">Welcome to your account page.</p>
          </div>
          <div className="w-full h-full">
            <form className="flex flex-row gap-3 items-end">
              <label className="text-lg font-bold">Address:</label>
              <label>{userAddress}</label>
            </form>
          </div>
          <RedirectButton onClick={onClick}>Log out</RedirectButton>
          </div>
        </div>
    );
}

export default Account;