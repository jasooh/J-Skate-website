// components
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import RedirectButton from './RedirectButton';

// context
import { useCartContext } from '../context/CartContext';

interface Props {
    name: string,
    text: string,
    src: string,
    id: number,
    price: number
}

const StoreItem = ({name, text, src, id, price}:Props) => {
    // context
    const Cart = useCartContext();
    const Auth = useAuthContext();
    const navigate = useNavigate();

    function onClick(isLoggedIn: boolean, id: number, name: string, price: number) {
        if (isLoggedIn) {
            Cart.addItemWithId(id, name, src, price); // add item to cart
        } else {
            navigate("/login"); // redirect the user to login
        }
    }
    
    // component
    return (
        <div className="w-[20rem] h-[25rem] flex flex-col justify-center items-center bg-gray-50 border bring-2 rounded-3xl p-5 hover:scale-[101%] hover:border-indigo-600 duration-300">
            <h1 className="font-semibold text-xl text-gray-600 mb-5">{ name }</h1>
            <p className="flex items-baseline gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900 mb-5">{ text }</span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">CAD</span>
            </p>
            <img src={src} className="hidden mt-5 rounded-3xl object-cover min-w-5 min-h-5 mb-5 lg:block" />
            <RedirectButton onClick={() => onClick(Auth.isLoggedIn, id, name, price)}>Add</RedirectButton>
        </div>
    );
}

export default StoreItem;