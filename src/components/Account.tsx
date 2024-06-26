// hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDataAPI from "../hooks/useDataAPI";

// context
import { useAuthContext } from "../context/AuthContext";

// components
import RedirectButton from "./RedirectButton";
import OrderItem from "./OrderItem";

const Account = () => {
    const [userEmail, setUserEmail] = useState(undefined);
    const Auth = useAuthContext();
    const navigate = useNavigate()

    const data = useDataAPI("abuyuanjustin@gmail.com");
    console.log(data)

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
            <form className="flex flex-col gap-3">
              <label className="text-lg font-bold">Current Orders</label>
              <OrderItem />
            </form>
          </div>
          <RedirectButton onClick={onClick}>Log out</RedirectButton>
          </div>
        </div>
    );
}

export default Account;